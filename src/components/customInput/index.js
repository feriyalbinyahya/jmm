import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'
import { Input, Icon } from "native-base";

const CustomInput = ({inputNotWrong=true, value, borderRadius=5, ref=React.useRef(null), inputColor=Color.primaryText,setValue, placeholder, backgroundColorFocus=Color.neutralZeroOne, type="text", children=<></>, size='lg', childLeft=<></>}) => {
  return (
    <Input style={{...styles.input, color: inputColor,}} 
          _focus={{backgroundColor: backgroundColorFocus, borderColor: inputNotWrong? Color.neutralZeroSeven : Color.danger}}
          type={type}
          borderRadius={borderRadius}
          size={size}
          value={value}
          ref={ref}
          _input={{selectionColor: '#30303080',
            cursorColor: '#303030',}}
          InputLeftElement={childLeft}
          placeholderTextColor={Color.disable}
          onChangeText={setValue}
          InputRightElement={children} placeholder={placeholder}
          borderColor={inputNotWrong ? ((value)? Color.neutralZeroSeven : Color.lightBorder): Color.danger}
    />
  )
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        ...FontConfig.bodyOne,
    },
})