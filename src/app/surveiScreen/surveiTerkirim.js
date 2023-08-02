import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import SuccessImage from '../../assets/images/surveiTerkirim.png'
import CustomButton from '../../components/customButton'
import { Color, FontConfig } from '../../theme'

const SurveiTerkirim = ({navigation}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: Color.neutralZeroOne, alignItems: 'center', justifyContent: 'center'}}>
      <Image style={{width: 170, height: 170}} source={SuccessImage} />
      <View style={{height: 10}}></View>
      <Text style={{...FontConfig.titleTwo, color: '#000000', textAlign: 'center'}}>Survei Berhasil Terkirim!</Text>
      <View style={{height: 5}}></View>
      <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Terima kasih sudah mengisi survei</Text>
      <View style={{height: 20}}></View>
      <CustomButton width='80%' height={45} text="Kembali ke Beranda"
      backgroundColor={Color.primaryMain}
      onPress={()=>{
        navigation.popToTop();
      }}
      fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}}
       />
    </View>
  )
}

export default SurveiTerkirim

const styles = StyleSheet.create({})