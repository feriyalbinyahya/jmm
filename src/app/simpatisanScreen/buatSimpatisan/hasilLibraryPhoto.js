import { StyleSheet, Text, View, Button, Pressable, Linking, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { FontConfig, Color } from '../../../theme'
import CustomButton from '../../../components/customButton'
import HeaderWhite from '../../../components/header/headerWhite'
import ProfileServices from '../../../services/profile'
import { useSelector } from 'react-redux'

const HasilLibraryFotoSimpatisan = ({navigation, route}) => {
    const { imageSource, imageBase64 } = route.params;

    const photoSimpatisan = useSelector(state => {
        return state.simpatisan.uploadPhoto;
    });

    handleLanjutkan = () => {
        photoSimpatisan.setPhoto(imageBase64);
        navigation.goBack();
    }
  return (
    <View style={styles.hasilFotoPage}>
      <HeaderWhite navigation={navigation} title="Unggah Foto" />
      <View style={styles.section}>
        <Text style={styles.textIsiData}>Hasil Foto</Text>
        <View style={{height: 30}}></View>
        <Image source={imageSource} style={styles.imageSelfie}/> 
      </View>
      <View style={styles.bottomSection}>
        <CustomButton 
        text='Lanjutkan'
        onPress={handleLanjutkan} 
        fontStyles={{...FontConfig.buttonOne, color:Color.neutralZeroOne}}
        backgroundColor={Color.primaryMain} 
        borderColor={Color.primaryMain}
        width='100%'
        height={50}
        />
      </View>
    </View>
  )
}

export default HasilLibraryFotoSimpatisan

const styles = StyleSheet.create({
    hasilFotoPage: {
        backgroundColor: Color.neutralZeroOne,
        height: '100%',
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: '78%',
        alignItems: 'center'
    },
    textIsiData: {
        ...FontConfig.titleOne,
        color: Color.grayThirteen,
    },
    imageSelfie: {
        width: 293,
        height: 285,
        borderRadius: 8
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '14%',
        paddingHorizontal: 20,
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