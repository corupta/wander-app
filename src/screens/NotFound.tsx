import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Routes } from '../constants'

import { RootParamList } from '../types/Navigation'

export default function NotFoundScreen({ navigation }: StackScreenProps<RootParamList, Routes.NotFound>): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesnt exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace(Routes.Home)} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})
