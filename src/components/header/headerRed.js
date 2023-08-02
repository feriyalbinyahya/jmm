import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import iconArrowLeft from '../../assets/images/icon/icon_left_white.png'
import { Color, FontConfig } from '../../theme'

const HeaderRed = ({navigation, title, rightChild=<></>}) => {
  return (
    <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
        <View style={{alignItems: 'center', flex:1}}><Text style={styles.textTitle}>{title}</Text></View>
        {rightChild}
    </View>
  )
}

export default HeaderRed

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: Color.primaryMain,
    },
    iconArrowLeft: {
        width: 24,
        height: 24
    },
    textTitle: {
        ...FontConfig.titleOne,
        color: Color.neutralZeroOne,
        marginLeft: -20,
        
    },
})