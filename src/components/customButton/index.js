import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'

const CustomButton = ({disabled=false, onPress, text, fontStyles={}, borderWidth=0, borderColor=Color.neutralZeroSix, borderRadius=32, width='100%', height=20, backgroundColor=Color.neutralZeroOne}) => {
  return (
    <Pressable onPress={disabled? null : onPress} 
      style={disabled ? {...styles.container, ...styles.disabled,width: width, height: height, borderWidth:borderWidth, borderRadius: borderRadius} : {...styles.container, 
        backgroundColor: backgroundColor, width: width, height: height, borderColor: borderColor, borderWidth:borderWidth, borderRadius: borderRadius}}>
      <Text style={disabled? styles.textDisabled : fontStyles}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginVertical: 5,
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