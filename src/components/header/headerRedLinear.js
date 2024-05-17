import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import iconArrowLeft from '../../assets/images/icon/icon_left_white.png'
import { Color, FontConfig } from '../../theme'
import LinearGradient from 'react-native-linear-gradient';

const HeaderRedLinear = ({navigation, title, children}) => {
  return (
    <LinearGradient style={styles.header} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Color.primaryMain, Color.primaryMain]}>
        <View style={{padding: 20, flexDirection: 'row'}}>
            <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
            <View style={{alignItems: 'center', flex:1}}><Text style={styles.textTitle}>{title}</Text></View>
        </View>
        {children}
    </LinearGradient>
  )
}

export default HeaderRedLinear

const styles = StyleSheet.create({
    header: {
        height: '27%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24

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