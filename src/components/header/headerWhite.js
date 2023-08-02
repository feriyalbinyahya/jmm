import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import iconArrowLeft from '../../assets/images/icon/icon_arrow_left.png'
import { Color, FontConfig } from '../../theme'

const HeaderWhite = ({navigation, title, subtitle="", rightChild=<></>}) => {
  return (
    <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
        <View style={{alignItems: 'center', flex:1}}>
            <Text style={styles.textTitle}>{title}</Text>
            {subtitle != "" ? <Text style={styles.textSubtitle}>{subtitle}</Text> : <></>}
        </View>
        {rightChild}
    </View>
  )
}

export default HeaderWhite

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: Color.grayOne,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: Color.lightBorder
    },
    iconArrowLeft: {
        width: 24,
        height: 24
    },
    textTitle: {
        ...FontConfig.titleOne,
        color: Color.title,
        marginLeft: -20,
        
    },
    textSubtitle: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroSix
    },
})