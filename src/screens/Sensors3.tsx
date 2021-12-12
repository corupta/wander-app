// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { DeviceMotion } from 'expo-sensors';
import axios from 'axios';
import flat from 'flat';
import PQueue from 'p-queue';

UPDATE_INTERVAL = 16;

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

const calculateNextState = (prevState = {}, interval, data) => {
    const nextState = {};
    Object.entries(data).forEach(([key, raw]) => {
        if (typeof raw === 'object') {
            nextState[key] = calculateNextState((prevState || {})[key], interval, raw);
            if (key.startsWith('acceleration')) {
                const keyAngle = `accelarationAngle${key.substr(12)}`;
                nextState[keyAngle] = calculateNextState((prevState || {})[keyAngle], interval, accelarationToDegrees(raw));
            }
            return;
        }
        ['raw','int1','int2','der1','der2'].forEach((k) => {
            if (typeof prevState[k] === 'undefined') {
                prevState[k] = 0;
            }
        })
        // raw -> raw
        // int1 -> integral1, int2 -> integral2
        // der1 -> derivative1, der2 -> derivative2
        let int1 = prevState.int1 + ((prevState.raw + raw) / 2) * interval;
        let int2 = prevState.int2 + ((prevState.int1 + int1) / 2) * interval;
        let der1 = (raw - prevState.raw) / interval;
        // can smooth der with der1 = der1 * a + prevState.der1 * (1-a)
        let der2 = (der1 - prevState.der1) / interval;
        nextState[key] =  {
            raw, int1, int2, der1, der2
        };
    })
    return nextState;
}

const dweetState = (state) => {
    flatState = flat(state, { delimiter: '_'});
    return async () => {
        return axios.post('https://dweet.io/dweet/quietly/for/educated-giants', flatState);
    }
}

class Sensors extends React.PureComponent {
    state = {
        avail: undefined
    }
    componentDidMount() {
        DeviceMotion.isAvailableAsync().then((avail) => {
            if (avail) {
                DeviceMotion.addListener(this.deviceMotionListener);
            }
            this.setState({ avail })
        })
        this.queue = new PQueue({ concurrency: 1 });
        this.dataState = {};
        DeviceMotion.setUpdateInterval(UPDATE_INTERVAL);
    }
    deviceMotionListener = (rawData) => {
        let { interval, orientation, ...data } = rawData;
        if (!interval) {
            interval = UPDATE_INTERVAL;
        }
        interval /= 1000; // ms to s
        this.dataState = calculateNextState(this.dataState, interval, data);
        this.queue.add(dweetState(this.dataState));
    }
    render() {
        const { avail } = this.state;
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
            </View>
        )

    }
}

export default Sensors;