import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../../theme'

const BoxAksi = ({image, jumlah, text, imageWidth, imageHeight}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textJumlah}>{jumlah} </Text>
      <Text style={styles.textAksi}>{text}</Text>
    </View>
  )
}

export default BoxAksi

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center'
    },
    textAksi: {
        ...FontConfig.captionUpperOne,
        color: Color.neutralZeroOne
    },
    textJumlah: {
      ...FontConfig.titleTwo,
      color: Color.neutralZeroOne
    }
})