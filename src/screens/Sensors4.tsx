// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { DeviceMotion, Gyroscope, Accelerometer, Magnetometer } from 'expo-sensors';
import { io } from "socket.io-client";

const UPDATE_INTERVAL = 10;

const SMOOTH_DATA_DEFAULT = true;
const DECAY_DATA_DEFAULT = true;
const SMOOTH_RATE = 0.8; // 1 means full prev, 0 means full new
const DECAY_RATE_RAW = 0.1 ;
const SOCKET_URL = "http://192.168.0.21:8080";

const DECAY_RATE = 1-Math.pow(1-DECAY_RATE_RAW, UPDATE_INTERVAL/1000);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddff88',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sucText: {
        color: '#008800'
    },
    errText: {
        color: '#880000'
    }
})

const accelarationToDegrees = (accel) => {
    const { x, y, z } = accel;
    let theta = Math.atan2(-z, x);
    const cosphi = x / Math.cos(theta);
    let phi = Math.atan2(y, cosphi);
    theta = theta / Math.PI;
    phi = phi / Math.PI;
    return { phi, theta };
}

const calculateNextState = (prevState = {}, interval, data, smoothData = SMOOTH_DATA_DEFAULT, decayData = DECAY_DATA_DEFAULT, isAngle=false) => {
    // if (typeof smoothData === 'function') smoothData = smoothData()
    const nextState = {...prevState};
    Object.entries(data).forEach(([key, raw]) => {
        if (typeof raw === 'object') {
            nextState[key] = calculateNextState(prevState[key], interval, raw, smoothData, decayData);
            // if (key.startsWith('acceleration')) {
            //     const keyAngle = `accelarationAngle${key.substr(12)}`;
            //     nextState[keyAngle] = calculateNextState(prevState[keyAngle], interval, accelarationToDegrees(raw), smoothData, decayData, true);
            // }
            return;
        }
        let prevValue = prevState[key] || {};
        // if(key==='z')console.log('prevState', JSON.stringify(prevValue));
        ['raw','int1','int2'/*,'der1','der2'*/].forEach((k) => {
            // if(key==='z')console.log('prevValue', JSON.stringify(prevValue));
            if (typeof prevValue[k] === 'undefined') {
                prevValue[k] = 0;
            }
        })
        // raw -> raw
        // int1 -> integral1, int2 -> integral2
        // der1 -> derivative1, der2 -> derivative2
        if (smoothData) raw = prevValue.raw * SMOOTH_RATE + raw * (1-SMOOTH_RATE);
        if (decayData) raw = raw * (1 - DECAY_RATE);
        let int1 = prevValue.int1 + raw * interval;
        // if(key==='z')console.log('key raw interval raw * interval p.int1, int1', key, ...[raw, interval, raw*interval, prevValue.int1, int1].map(a => a.toFixed(3)));
        if (decayData) int1 = int1 * (1 - DECAY_RATE);
        if (smoothData) int1 = prevValue.int1 * SMOOTH_RATE + int1 * (1-SMOOTH_RATE);
        if(isAngle)int1 = ((int1+3)%2)-1;
        let int2 = prevValue.int2 + int1 * interval;
        if (decayData) int2 = int2 * (1 - DECAY_RATE);
        if (smoothData) int2 = prevValue.int2 * SMOOTH_RATE + int2 * (1-SMOOTH_RATE);
        if (isAngle)int2 = ((int2+3)%2)-1;
        // let der1 = (raw - prevValue.raw) / interval;
        // if (decayData) der1 = der1 * (1 - DECAY_RATE);
        // if (smoothData) der1 = prevValue.der1 * SMOOTH_RATE + der1 * (1-SMOOTH_RATE);
        // // can smooth der with der1 = der1 * a + prevValue.der1 * (1-a)
        // let der2 = (der1 - prevValue.der1) / interval;
        // if (decayData) der2 = der2 * (1 - DECAY_RATE);
        // if (smoothData) der2 = prevValue.der2 * SMOOTH_RATE + der2 * (1-SMOOTH_RATE);
        nextState[key] =  {
            // der2, der1, 
            raw, int1, int2
        };
    })
    return nextState;
}

const precisionFix = (n) => {
    return Math.round(n*1000) / 1000;
}

class Sensors extends React.PureComponent {
    state = {
        avail: undefined,
        smoothData: SMOOTH_DATA_DEFAULT,
        decayData: DECAY_DATA_DEFAULT
    }
    componentDidMount() {
        console.log('DECAY_RATE', DECAY_RATE);
        this.socket = io(SOCKET_URL);
        DeviceMotion.isAvailableAsync().then((avail) => {
            if (avail) {
                DeviceMotion.addListener(this.deviceMotionListener());
                Gyroscope.addListener(this.deviceMotionListener('gyroAccel'));
                Accelerometer.addListener(this.deviceMotionListener('sensorAccel'));
                Magnetometer.addListener(this.deviceMotionListener('magnet'));
            }
            this.setState({ avail })
        })
        this.dataState = {};
        DeviceMotion.setUpdateInterval(UPDATE_INTERVAL);
        Gyroscope.setUpdateInterval(UPDATE_INTERVAL);
        Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
        Magnetometer.setUpdateInterval(UPDATE_INTERVAL);
    }
    deviceMotionListener = (prepend) => {
        let lastCall;
        return (rawData) => {
            let { interval, orientation, ...data } = rawData;
            if (prepend) {
                data = { [prepend]: data };
            }
            interval = UPDATE_INTERVAL;
            lastCall = Date.now();
            // if (!interval) {
            //     if (lastCall) {
            //         interval = Date.now() - lastCall;
            //         lastCall += interval;
            //     } else {
            //         lastCall = Date.now();
            //         interval = UPDATE_INTERVAL;
            //     }
            // } else {
            //     lastCall = Date.now();
            // }
            interval /= 1000; // ms to s
            // if (prepend === 'accelerationMagnet') console.log(this.dataState[prepend]);
            this.dataState[prepend] = calculateNextState(this.dataState[prepend], interval, data, this.state.smoothData, this.state.decayData);
            this.socket.emit('data', this.dataState[prepend], lastCall)
            // console.log(prepend || 'device-motion', interval * 1000, 'ms');
        }
    }
    toggleSmooth = () => {
        this.setState(p => ({ smoothData: !p.smoothData}))
    }
    toggleDecay = () => {
        this.setState(p => ({ decayData: !p.decayData}))
    }
    render() {
        const { avail, smoothData, decayData } = this.state;
        let mid = null;
        if (avail === true) {
            mid = <Text style={styles.sucText}>DeviceMotion is available.</Text>
        } else if (avail === false)  {
            mid = <Text style={tyles.errText}>DeviceMotion is NOT available.</Text>
        } else {
            mid = <Text>DeviceMotion is loading...</Text>
        }
        return (
            <View style={styles.container}>
                {mid}
                <Button 
                    title={smoothData ? 'smoothing data' : 'NOT smoothing data'}
                    onPress={this.toggleSmooth} 
                />
                <Button 
                    title={decayData ? 'decaying data' : 'NOT decaying data'}
                    onPress={this.toggleDecay} 
                />
            </View>
        )

    }
}

export default Sensors;