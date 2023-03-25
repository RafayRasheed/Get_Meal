import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

export const SafeArea = () =>(
    <SafeAreaView style={styles.container} />
);

const styles= StyleSheet.create({
    container: {
        flex: 1
    }
})
