import { StyleSheet, Text, View, Button, Pressable, Linking, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import HeaderWhite from '../../../components/header/headerWhite'
import { Color, FontConfig } from '../../../theme'
import CustomButton from '../../../components/customButton'
import { useSelector } from 'react-redux'
import Utils from '../../../utils/Utils'

const HasilUnggahFotoSimpatisan = ({navigation, route}) => {
    const { imageSource } = route.params;

    const photoSimpatisan = useSelector(state => {
        return state.simpatisan.uploadPhoto;
    });

    handleLanjutkan = async() => {
        const dataImage = await Utils.readFileBase64(`file://${imageSource}`);
        console.log(dataImage);
        photoSimpatisan.setPhoto(dataImage);
        navigation.goBack();
    }
  return (
    <View style={styles.hasilFotoPage}>
      <HeaderWhite navigation={navigation} title="Ambil Foto" />
      <View style={styles.section}>
        <Text style={styles.textIsiData}>Hasil Foto</Text>
        <View style={{height: 30}}></View>
        <Image source={{uri: `file://${imageSource}`}} style={styles.imageSelfie}/> 
      </View>
      <View style={{height: 50}}></View>
      <View style={styles.bottomSection}>
        <CustomButton 
        text='Lanjut'
        onPress={handleLanjutkan} 
        fontStyles={{...FontConfig.buttonOne, color:Color.neutralZeroOne}}
        backgroundColor={Color.primaryMain} 
        borderColor={Color.primaryMain}
        width='90%'
        height={50}
        />
      </View>
    </View>
  )
}

export default HasilUnggahFotoSimpatisan

const styles = StyleSheet.create({
    hasilFotoPage: {
        backgroundColor: Color.neutralZeroOne,
        height: '100%',
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: '71%',
        alignItems: 'center'
    },
    textIsiData: {
        ...FontConfig.titleOne,
        color: Color.grayThirteen,
    },
    imageSelfie: {
        width: '100%',
        height: '100%',
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '14%',
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 10
    },
})