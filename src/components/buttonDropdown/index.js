import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import iconArrowDown from '../../assets/images/icon/icon_arrow_down.png'

const DropDownButton = ({text='', onPress, disabled=false, placeholder='', childLeft=<></>}) => {

  return (
    <Pressable onPress={onPress}>
        <View style={{...styles.container, borderColor: text? Color.neutralZeroSeven : Color.lightBorder}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {childLeft}
                {text != '' ? <Text style={styles.textSelectedItem}>{text}</Text>: 
                <Text style={styles.textPilihPekerjaan}>{placeholder}</Text>
                }
            </View>
            <Image style={styles.iconArrowLeft} source={iconArrowDown} />
        </View>
    </Pressable>
  )
}

export default DropDownButton

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconArrowLeft: {
        width: 18,
        height: 18,
    },
    textPilihPekerjaan: {
        ...FontConfig.bodyOne,
        color: Color.disable,
    },
    textSelectedItem: {
        color: Color.primaryText
    },
});