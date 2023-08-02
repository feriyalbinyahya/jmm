import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import iconArrowLeft from '../../assets/images/icon/icon_arrow_left.png'
import { Color, FontConfig } from '../../theme'

const HeaderRegistration = ({navigation, numberStep}) => {
  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
        <View style={{alignItems: 'center', flex:1}}><Text style={styles.textDaftar}>Daftar</Text></View>
      </View>
      <View style={styles.progressBar}>
        <View style={{...styles.progressMain, flex: numberStep}}></View>
        <View style={{...styles.progressRest, flex: 5-numberStep}}></View>
      </View>
      <View style={styles.boxStep}><Text style={styles.textStep}>LANGKAH {numberStep} DARI 5</Text></View>
    </View>
  )
}

export default HeaderRegistration

const styles = StyleSheet.create({
    iconArrowLeft: {
        width: 24,
        height: 24
    },
    boxStep: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#FFFF',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: Color.grayOne,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#F0F0F0',

    },
    progressBar: {
        flexDirection: 'row',
    },
    progressMain: {
        backgroundColor: Color.primaryMain,
        height: 6,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4
    },
    progressRest: {
        backgroundColor: Color.neutralZeroThree,
        height: 6
    },
    textDaftar: {
        ...FontConfig.titleOne,
        color: Color.title,
        marginLeft: -40
    },
    textStep:{
        ...FontConfig.captionTwo,
        color: Color.graySeven,
    },
})