import { StyleSheet, Text, View, Button, Pressable, Linking, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { FontConfig, Color } from '../../../theme'
import CustomButton from '../../../components/customButton'
import HeaderWhite from '../../../components/header/headerWhite'
import ProfileServices from '../../../services/profile'

const HasilGalleryFotoScreen = ({navigation, route}) => {
    const { imageSource, imageBase64 } = route.params;

    handleLanjutkan = () => {
      ProfileServices.putFotoProfil({"foto_profil": imageBase64})
      .then(res=> {
        console.log(res.data);
      })
      .catch(err=> {
        console.log(err);
      })
      navigation.goBack();
    }
  return (
    <View style={styles.hasilFotoPage}>
      <HeaderWhite navigation={navigation} title="Ubah Foto" />
      <View style={styles.section}>
        <Text style={styles.textIsiData}>Hasil Foto</Text>
        <View style={{height: 30}}></View>
        <Image source={imageSource} style={styles.imageSelfie}/> 
      </View>
      <View style={styles.bottomSection}>
        <CustomButton 
        text='Simpan'
        onPress={handleLanjutkan} 
        fontStyles={{...FontConfig.buttonOne, color:Color.neutralZeroOne}}
        backgroundColor={Color.primaryMain} 
        borderColor={Color.primaryMain}
        width='80%'
        height={50}
        />
      </View>
    </View>
  )
}

export default HasilGalleryFotoScreen

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
        borderRadius: 150
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