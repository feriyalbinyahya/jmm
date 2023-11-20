import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import iconArrowLeft from '../../assets/images/icon/icon_arrow_left.png'
import { Color, FontConfig } from '../../theme'

const HeaderWhiteNoBorder = ({navigation, title, subtitle="", rightChild=<></>}) => {
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

export default HeaderWhiteNoBorder

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: Color.neutralZeroOne,
    },
    iconArrowLeft: {
        width: 24,
        height: 24
    },
    textTitle: {
        ...FontConfig.titleTwo,
        color: Color.title,
        marginLeft: -20,
        
    },
    textSubtitle: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroSix,
        marginLeft: -20,
    },
})