// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { DeviceMotion, Gyroscope, Accelerometer, Magnetometer } from 'expo-sensors';
import axios from 'axios';
import flat from 'flat';
import PQueue from 'p-queue';

UPDATE_INTERVAL = 1100;

const SMOOTH_DATA_DEFAULT = true;
const SMOOTH_RATE = 0.8; // 1 means full prev, 0 means full new
const CONCURRENCY = 1; //Math.ceil(2000 / UPDATE_INTERVAL) + 5;

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
    const theta = Math.atan2(-z, x);
    const cosphi = x / Math.cos(theta);
    const phi = Math.atan2(y, cosphi);
    return { phi, theta };
}

const THINGS = {
    DEVICE_MOTION: 'wander-device-motion', 
    ACCELERATION: 'wander-acceleration-gyroscope',
    GYROSCOPE: 'wander-acceleration-gyroscope',
    MAGNETOMETER: 'wander-acceleration-gyroscope'
};

const calculateNextState = (prevState = {}, interval, data, smoothData = SMOOTH_DATA_DEFAULT) => {
    // if (typeof smoothData === 'function') smoothData = smoothData()
    const nextState = {...prevState};
    Object.entries(data).forEach(([key, raw]) => {
        if (typeof raw === 'object') {
            nextState[key] = calculateNextState(prevState[key], interval, raw);
            if (key.startsWith('acceleration')) {
                const keyAngle = `accelarationAngle${key.substr(12)}`;
                nextState[keyAngle] = calculateNextState(prevState[keyAngle], interval, accelarationToDegrees(raw));
            }
            return;
        }
        let prevValue = prevState[key] || {};
        // if(key==='z')console.log('prevState', JSON.stringify(prevValue));
        ['raw','int1','int2','der1','der2'].forEach((k) => {
            // if(key==='z')console.log('prevValue', JSON.stringify(prevValue));
            if (typeof prevValue[k] === 'undefined') {
                prevValue[k] = 0;
            }
        })
        // raw -> raw
        // int1 -> integral1, int2 -> integral2
        // der1 -> derivative1, der2 -> derivative2
        if (smoothData) raw = prevValue.raw * SMOOTH_RATE + raw * (1-SMOOTH_RATE);
        let int1 = prevValue.int1 + raw * interval;
        // if(key==='z')console.log('key raw interval raw * interval p.int1, int1', key, ...[raw, interval, raw*interval, prevValue.int1, int1].map(a => a.toFixed(3)));
        if (smoothData) int1 = prevValue.int1 * SMOOTH_RATE + int1 * (1-SMOOTH_RATE);
        let int2 = prevValue.int2 + int1 * interval;
        if (smoothData) int2 = prevValue.int2 * SMOOTH_RATE + int2 * (1-SMOOTH_RATE);
        let der1 = (raw - prevValue.raw) / interval;
        if (smoothData) der1 = prevValue.der1 * SMOOTH_RATE + der1 * (1-SMOOTH_RATE);
        // can smooth der with der1 = der1 * a + prevValue.der1 * (1-a)
        let der2 = (der1 - prevValue.der1) / interval;
        if (smoothData) der2 = prevValue.der2 * SMOOTH_RATE + der2 * (1-SMOOTH_RATE);
        nextState[key] =  {
            der2, der1, raw, int1, int2
        };
    })
    return nextState;
}

const precisionFix = (n) => {
    return Math.round(n*1000) / 1000;
}

const dweetState = (thing, state) => {
    let flatState = flat(state, { delimiter: '_'});
    flatState = Object.entries(flatState).reduce((acc, [k,v]) => ({
        ...acc,
        [k]: precisionFix(v)
    }), {});
    // console.log('post', thing);
    return async () => {
        try {
            // console.log('post start', thing);
            const res = await axios.post(`https://dweet.io/dweet/quietly/for/${thing}`, flatState);
            // console.log('post complete', thing, res.status);
        } catch (e) {
            console.log('post fail', e);
        }
    }
}

class Sensors extends React.PureComponent {
    state = {
        avail: undefined,
        smoothData: SMOOTH_DATA_DEFAULT
    }
    componentDidMount() {
        this.dmq = new PQueue({ concurrency: CONCURRENCY });
        this.aq = new PQueue({ concurrency: CONCURRENCY });
        this.gq = new PQueue({ concurrency: CONCURRENCY });
        this.mq = new PQueue({ concurrency: CONCURRENCY });
        DeviceMotion.isAvailableAsync().then((avail) => {
            if (avail) {
                DeviceMotion.addListener(this.deviceMotionListener(this.dmq, THINGS.DEVICE_MOTION));
                Gyroscope.addListener(this.deviceMotionListener(this.gq, THINGS.GYROSCOPE, 'accelerationGyro'));
                Accelerometer.addListener(this.deviceMotionListener(this.aq, THINGS.ACCELERATION, 'accelerationSensor'));
                Magnetometer.addListener(this.deviceMotionListener(this.mq, THINGS.MAGNETOMETER, 'accelerationMagnet'));
            }
            this.setState({ avail })
        })
        this.dataState = {};
        DeviceMotion.setUpdateInterval(UPDATE_INTERVAL);
        Gyroscope.setUpdateInterval(UPDATE_INTERVAL);
        Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
        Magnetometer.setUpdateInterval(UPDATE_INTERVAL);
    }
    deviceMotionListener = (q, thing,prepend) => {
        let lastCall;
        return (rawData) => {
            let { interval, orientation, ...data } = rawData;
            if (prepend) {
                data = { [prepend]: data };
            }
            if (!interval) {
                if (lastCall) {
                    interval = Date.now() - lastCall;
                    lastCall += interval;
                } else {
                    lastCall = Date.now();
                    interval = UPDATE_INTERVAL;
                }
            }
            interval /= 1000; // ms to s
            // if (prepend === 'accelerationMagnet') console.log(this.dataState[prepend]);
            this.dataState = calculateNextState(this.dataState, interval, data, this.state.smoothData);
            if (!prepend) {
                setTimeout(() => {
                    q.add(dweetState(thing, this.dataState));
                }, 100);
            }
            console.log(prepend || 'device-motion', interval * 1000, 'ms');
        }
    }
    toggleSmooth = () => {
        this.setState(p => ({ smoothData: !p.smoothData}))
    }
    render() {
        const { avail, smoothData } = this.state;
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
            </View>
        )

    }
}

export default Sensors;