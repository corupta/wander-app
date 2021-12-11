// @ts-nocheck
import React from 'react';
import { View, StyleSheet } from 'react-native'
import {
    Accelerometer,
    Gyroscope,
  } from 'expo-sensors';
  import Accel from './Accel';
  import Gyro from './Gyro';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddee99',
        flex: 1
    }
})

class Sensors extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Accel/>
                <Gyro/>
            </View>
        );
    }
}

export default Sensors;