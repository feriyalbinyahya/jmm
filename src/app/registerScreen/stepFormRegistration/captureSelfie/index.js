import { StyleSheet, Text, View, Button, Pressable, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderRegistration from '../../../../components/headerRegistration'
import { Color, FontConfig } from '../../../../theme'
import ImageSelfie from '../../../../assets/images/info/selfie.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '../../../../components/customButton'

const AmbilSelfieScreen = ({navigation}) => {
    const textKetentuan = ["Memiliki pencahayaan yang baik", "Wajahmu terlihat jelas sepenuhnya dan tidak buram",
    "Tidak memakai topi", "Tidak memakai masker"];

    handleLanjutkan = () => {
        navigation.navigate('AmbilFotoRegister', {path: 'HasilFotoRegister', type: 'holes'});
    }

  return (
    <View style={styles.ambilSelfiePage}>
      <HeaderRegistration navigation={navigation} numberStep={3} />
      <View style={styles.section}>
        <Text style={styles.textIsiData}>Ambil Foto Selfie</Text>
        <Text style={styles.textLengkapi}>Ketentuan foto selfie</Text>
        <Image style={styles.imageSelfie} source={ImageSelfie} />
        <View style={{margin: 10}}>
            {textKetentuan.map((item) => {
                return <View key={item} style={styles.rowTextKetentuan}>
                    <Text style={{fontSize: 10, color: Color.graySeven, marginTop: 2}}>{'\u2B24'}</Text>
                    <Text style={styles.textKetentuan}>{item}</Text>
                </View>
            })}
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="information-circle-outline" color={Color.warning} size={12} />
            <Text style={styles.textWarning}>Data ini hanya digunakan untuk verifikasi</Text>
        </View>
        <View style={styles.buttonContinue}>
            <CustomButton
                onPress={handleLanjutkan} 
                fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                width='100%' height={44} text="Ambil Selfie"
                backgroundColor={Color.primaryMain}
                />
        </View>
      </View>
    </View>
  )
}

export default AmbilSelfieScreen

const styles = StyleSheet.create({
    ambilSelfiePage: {
        backgroundColor: Color.neutralZeroOne,
        height: '100%',
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '14%',
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 10
    },
    buttonContinue: {
        borderRadius: 20, 
        width: '100%',
        paddingHorizontal: 20,
    },
    imageSelfie: {
        width: 360,
        height: 180
    },
    rowTextKetentuan: {
        flexDirection: 'row',
        marginVertical: 5
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: '71%'
    },
    textIsiData: {
        ...FontConfig.titleOne,
        color: Color.grayThirteen,
    },
    textLengkapi: {
        ...FontConfig.bodyTwo,
        color: Color.graySeven,
        marginTop: 5
    },
    textKetentuan: {
        ...FontConfig.bodyTwo,
        color: Color.graySeven,
        marginHorizontal: 8
    },
    textWarning: {
        ...FontConfig.captionOne,
        color: Color.title,
        marginHorizontal: 3
    },
})