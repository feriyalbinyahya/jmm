import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';

const YellowWarning = ({text}) => {
  return (
    <View style={styles.container}>
        <Ionicons name="warning-outline" color={Color.warning} size={14}  />
        <View style={{width: 15}}></View>
        <Text style={styles.textWarning}>{text}</Text>
    </View>
  )
}

export default YellowWarning

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Color.warningSurface,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textWarning: {
        ...FontConfig.bodyThree,
        color: Color.neutralTen,
        width:'90%'
    },
})