import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'

const ChildrenButton = ({onPress, width='100%', disabled=false, height=40, backgroundColor, children, borderRadius=5, borderColor=Color.gray8}) => {
  return (
    <Pressable onPress={disabled? null : onPress} style={disabled ? {...styles.container, ...styles.disabled,width: width, height: height, borderWidth: 1, borderRadius: borderRadius, backgroundColor: backgroundColor,}: {...styles.container, 
        backgroundColor: backgroundColor, borderRadius: borderRadius, width: width, height: height, borderColor: borderColor, borderWidth: 1}}>
        {children}
    </Pressable>
  )
}

export default ChildrenButton

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: Color.grayFour,
    borderColor: Color.grayFour,
  },
})