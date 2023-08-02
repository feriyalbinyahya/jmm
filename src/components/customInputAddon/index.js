import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { InputGroup, InputLeftAddon, InputRightAddon, Input} from "native-base";
import { Color, FontConfig } from '../../theme';

const CustomInputAddon = ({leftChild="", rightChild="", placeholder, value, setValue, containerStyle, fontStyle, placeholderTextColor}) => {
  return (
    <InputGroup fontStyle={fontStyle} style={containerStyle} w={{
        base: "100%",
        md: "285"
        }}>
        {leftChild != "" ? <InputLeftAddon children={leftChild} /> : <></>}
        <Input
        value={value}
        onChangeText={setValue}
        _focus={{backgroundColor: Color.neutralZeroOne, borderColor: Color.neutralZeroSeven}} 
        style={styles.inputStyle} w={{
        base: "90%",
        md: "100%"
        
    }} placeholder={placeholder} placeholderTextColor={Color.disable} />
        {rightChild != "" ? <InputRightAddon children={rightChild} /> : <></>}
    </InputGroup>
  )
}

export default CustomInputAddon

const styles = StyleSheet.create({
    inputStyle: {
        ...FontConfig.bodyOne,
        color: Color.primaryText,
    },
})