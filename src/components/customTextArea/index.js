import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'
import { TextArea, Icon } from "native-base";

const CustomTextArea = ({inputNotWrong=true, value, setValue, placeholder, type="text", children=<></>, height=20, width='80%', childLeft=<></>}) => {
  return (
    <TextArea style={styles.input} 
          _focus={{backgroundColor: Color.neutralZeroOne, borderColor: inputNotWrong? Color.neutralZeroSeven : Color.danger}}
          type={type}
          value={value}
          h={height} 
          placeholder={placeholder}
          w={width}
          InputLeftElement={childLeft}
          placeholderTextColor={Color.disable}
          onChangeText={setValue}
          InputRightElement={children}
          borderColor={inputNotWrong ? ((value)? Color.neutralZeroSeven : Color.lightBorder): Color.danger}
    />
  )
}

export default CustomTextArea

const styles = StyleSheet.create({
    input: {
        ...FontConfig.bodyOne,
        color: Color.primaryText,
    },
})