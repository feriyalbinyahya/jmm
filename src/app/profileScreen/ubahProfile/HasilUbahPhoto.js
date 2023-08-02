import { StyleSheet, Text, View, Button, Pressable, Linking, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { FontConfig, Color } from '../../../theme'
import CustomButton from '../../../components/customButton'
import HeaderWhite from '../../../components/header/headerWhite'
import ProfileServices from '../../../services/profile'
import Utils from '../../../utils/Utils'

const HasilUbahFotoScreen = ({navigation, route}) => {
    const { imageSource } = route.params;

    handleLanjutkan = async() => {
      const dataImage = await Utils.readFileBase64(`file://${imageSource}`);
      console.log(dataImage);
      ProfileServices.putFotoProfil({"foto_profil": dataImage})
      .then(res=> {
        console.log(res.data);
      })
      .catch(err=> {
        console.log(err);
      })
      navigation.pop();
      navigation.goBack();
    }
  return (
    <View style={styles.hasilFotoPage}>
      <HeaderWhite navigation={navigation} title="Ubah Foto" />
      <View style={styles.section}>
        <Text style={styles.textIsiData}>Hasil Foto</Text>
        <View style={{height: 30}}></View>
        <Image source={{uri: `file://${imageSource}`}} style={styles.imageSelfie}/> 
      </View>
      <View style={styles.bottomSection}>
        <CustomButton 
        borderColor={Color.primaryMain}
        borderWidth={1}
        text='Ambil Ulang' 
        fontStyles={{...FontConfig.buttonOne, color:Color.primaryMain}} 
        width='40%'
        height={50}
        onPress={()=>{
          navigation.pop();
        }}
        />
        <View style={{width: '10%'}}></View>
        <CustomButton 
        text='Simpan'
        onPress={handleLanjutkan} 
        fontStyles={{...FontConfig.buttonOne, color:Color.neutralZeroOne}}
        backgroundColor={Color.primaryMain} 
        borderColor={Color.primaryMain}
        width='40%'
        height={50}
        />
      </View>
    </View>
  )
}

export default HasilUbahFotoScreen

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