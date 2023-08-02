import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../../theme';

const FormErrorMessage = ({text, size='xs'}) => {
  return (
    <View style={styles.errorMessage}>
      <Text style={styles.textError}>{text}</Text>
    </View>
  )
}

export default FormErrorMessage

const styles = StyleSheet.create({
    errorMessage: {
        marginTop: 5
    },
    textError:{
        ...FontConfig.bodyThree,
        color: Color.danger,
        marginHorizontal: 5
    }
})