// @ts-nocheck
import React from 'react';
import { View, StyleSheet } from 'react-native'
import {
    Accelerometer,
    Gyroscope,
  } from 'expo-sensors';


class Sensors extends React.PureComponent {
    constructor() {
        Accelerometer.isAvailableAsync().then((...args) => console.log('accel avail', ...args));
        Gyroscope.isAvailableAsync().then((...args) => console.log('gyro avail', ...args));
        const gyroscopeListener = (...args) => {
            console.log(Date.now(), 'gyroscope data', ...args);
        }
        
        Gyroscope.addListener(gyroscopeListener);
        Gyroscope.setUpdateInterval(16);
        
        const accelerometerListener = (...args) => {
            // console.log(Date.now(), 'accelerometer data', ...args);
        }
        
        Accelerometer.addListener(accelerometerListener);
        Accelerometer.setUpdateInterval(16);
        
        const styles = StyleSheet.create({
            container: {
                backgroundColor: '#ddee99'
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

export default Sensors;