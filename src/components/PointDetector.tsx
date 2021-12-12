// @ts-nocheck
import React from 'react';
import { Gyroscope } from 'expo-sensors'

const UPDATE_INTERVAL = 10;

const SMOOTH_DATA_DEFAULT = true;
const DECAY_DATA_DEFAULT = true;
const SMOOTH_RATE = 0.1; // 1 means full prev, 0 means full new
const DECAY_RATE_RAW = 0.8 ;

const DECAY_RATE = 1-Math.pow(1-DECAY_RATE_RAW, UPDATE_INTERVAL/1000);

type GyroscopeData = { x: number, y: number, z: number };
type CalculatedData = { raw: number, int1: number, int2: number };
type DataState = { x: CalculatedData, y: CalculatedData, z: CalculatedData };

type Point2D = [number, number];
type Point2DArray = Array<Point2D>;

const calculateNextState = (prevState: CalculatedData|DataState|{}={}, interval: number, data: GyroscopeData, smoothData = SMOOTH_DATA_DEFAULT, decayData = DECAY_DATA_DEFAULT) => {
    // if (typeof smoothData === 'function') smoothData = smoothData()
    const nextState = {...prevState};
    Object.entries(data).forEach(([key, raw]) => {
        if (typeof raw === 'object') {
            nextState[key] = calculateNextState(prevState[key], interval, raw, smoothData, decayData);
            return;
        }
        let prevValue = prevState[key] || {};
        ['raw','int1','int2'/*,'der1','der2'*/].forEach((k) => {
            if (typeof prevValue[k] === 'undefined') {
                prevValue[k] = 0;
            }
        })
        // raw -> raw
        // int1 -> integral1, int2 -> integral2
        if (smoothData) raw = prevValue.raw * SMOOTH_RATE + raw * (1-SMOOTH_RATE);
        if (decayData) raw = raw * (1 - DECAY_RATE);
        let int1 = prevValue.int1 + raw * interval;
        if (decayData) int1 = int1 * (1 - DECAY_RATE);
        if (smoothData) int1 = prevValue.int1 * SMOOTH_RATE + int1 * (1-SMOOTH_RATE);
        let int2 = prevValue.int2 + int1 * interval;
        // if (decayData) int2 = int2 * (1 - DECAY_RATE);
        if (smoothData) int2 = prevValue.int2 * SMOOTH_RATE + int2 * (1-SMOOTH_RATE);
        nextState[key] = {
            raw, int1, int2
        } as DataState;
    })
    return nextState;
}

class PointDetector extends React.PureComponent {
    dataState: {} = {};
    points: Point2DArray = [];
    lastCall: number = 0;
    lastPointDate: number = 0;
    componentDidMount() {
        const { unavailableCallback } = this.props;
        Gyroscope.isAvailableAsync().then((avail) => {
            if (!avail) {
                unavailableCallback && unavailableCallback();
            }
        });
    }
    gyroscopeListener = (rawData: GyroscopeData) => {
        let interval = UPDATE_INTERVAL;
        let currDate = Date.now();
        if (currDate - this.lastCall > 2*interval) {
            console.warn('[WARNING] device motion listener lag', currDate - this.lastCall - interval, 'ms');
            interval = currDate - this.lastCall;
        }
        this.lastCall = currDate;
        interval /= 1000; // ms to s
        this.dataState = calculateNextState(this.dataState, interval, rawData);
        if (currDate - this.lastPointDate > 100) {
            this.points.push(
                [
                    -this.dataState.x.int2,
                    this.dataState.z.int2,
                ]
            );
            this.lastPointDate = currDate;
        }
    }
    startTracking = () => {
        this.lastCall = Date.now();
        this.subscription = Gyroscope.addListener(this.gyroscopeListener);
        Gyroscope.setUpdateInterval(UPDATE_INTERVAL);
        
    };
    stopTracking = () => {
        if (this.subscription) {
            this.subscription.remove();
            this.subscription = null;
        }
        const { points } = this;
        this.points = [];
        // TODO check if something is wrong with points?
        return points; 
    };
}