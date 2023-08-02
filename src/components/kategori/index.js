import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color } from '../../theme'

const BoxKategori = ({text, fontStyle, borderColor, backgroundColor=Color.neutralZeroOne, width, height}) => {
  return (
    <View style={{
        backgroundColor: backgroundColor,
        paddingHorizontal: 10,
        height: height,
        borderWidth: 1,
        borderColor: borderColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32
    }}>
      <Text style={fontStyle}>{text}</Text>
    </View>
  )
}

export default BoxKategori

const styles = StyleSheet.create({})