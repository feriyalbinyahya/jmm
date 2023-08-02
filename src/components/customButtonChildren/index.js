import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Color } from '../../theme'

const ChildrenButton = ({onPress, width='100%', height=40, backgroundColor, children, borderColor=Color.gray8}) => {
  return (
    <Pressable onPress={onPress} style={{...styles.container, 
        backgroundColor: backgroundColor, width: width, height: height, borderColor: borderColor, borderWidth: 1}}>
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
    borderRadius: 5
  }
})