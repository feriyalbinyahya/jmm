import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'

const CustomButton = ({disabled=false, onPress, text, fontStyles={}, borderWidth=0, borderColor=Color.neutralZeroSix,
   borderRadius=32, width='100%', height=20, backgroundColor=Color.neutralZeroOne, marginVertical=5}) => {
  return (
    <Pressable onPress={disabled? null : onPress} 
      style={disabled ? {...styles.container, ...styles.disabled,width: width, height: height, borderWidth:borderWidth, borderRadius: borderRadius, marginVertical: marginVertical} : {...styles.container, 
        backgroundColor: backgroundColor, marginVertical: marginVertical, width: width, height: height, borderColor: borderColor, borderWidth:borderWidth, borderRadius: borderRadius}}>
      <Text style={disabled? styles.textDisabled : fontStyles}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
      backgroundColor: Color.grayFour,
      borderColor: Color.grayFour,
    },
    textDisabled: {
      ...FontConfig.buttonOne, 
      color: Color.disable
    },
})