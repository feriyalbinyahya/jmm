import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../../theme'

const BoxAksi = ({image, jumlah, text, imageWidth, imageHeight}) => {
  return (
    <View style={styles.container}>
      <Image style={{width: imageWidth, height: imageHeight}} source={image} />
      <View style={{flexDirection: 'row', marginTop:5}}>
        <Text style={styles.textAksi}>{jumlah} </Text>
        <Text style={styles.textAksi}>{text}</Text>
      </View>
    </View>
  )
}

export default BoxAksi

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Color.neutralZeroTwo,
        padding: 10,
        alignItems: 'center'
    },
    textAksi: {
        ...FontConfig.bodyThree,
        color: '#000000'
    },
})