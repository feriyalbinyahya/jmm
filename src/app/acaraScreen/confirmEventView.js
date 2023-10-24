import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ConfirmIcon from '../../assets/images/confirm.png'
import { Color, FontConfig } from '../../theme';
import CustomButton from '../../components/customButton';

const ConfirmEventView = ({navigation, setModalVisible}) => {
    const title="Apakah kamu yakin ingin mendaftar acara ini?";
    const subtitle=`Dengan mendaftar acara ini berarti kamu telah menyetujui untuk membagikan datamu kepada penyelenggara acara yaitu, nama nomer hp, jenis kelamin dan tanggal lahir.`;
    
    const SyaratText = ({text}) => {
        return (
            <View style={{flexDirection: 'row',}}>
                <Text style={{fontSize: 6, color: Color.primaryMain, marginTop: 5}}>{'\u2B24'}</Text>
                <View style={{width: 7, }}></View>
                <Text style={{...FontConfig.bodyTwo, color: Color.primaryMain}}>{text}</Text>
            </View>
        )
    }
  
    return (
    <View style={{padding: 10}}>
      <View style={{alignItems:'center'}}><Image source={ConfirmIcon} style={{width: 159, height: 117}} /></View>
      <View style={{height: 15, }}></View>
      <Text style={{...FontConfig.titleTwo, color: Color.primaryMain, textAlign: 'center'}}>{title}</Text>
      <View style={{height: 15, }}></View>
      <Text style={{...FontConfig.bodyTwo, color: Color.primaryMain}}>{subtitle}</Text>
      <View style={{height: 15, }}></View>
      <Text style={{...FontConfig.titleThree, color: Color.primaryMain}}>Hal yang harus kamu persiapkan:</Text>
      <View style={{height: 10, }}></View>
      <SyaratText text={`Pastikan kamu untuk menghadiri acara tepat waktu`} />
      <SyaratText text={`Pada saat masuk tempat acara siapkan Gensatset ID-mu untuk bisa di konfirmasi oleh panitia.`} />
      <SyaratText text={`Untuk menghindari koneksi internet yang kurang baik, bisa simpan screenshot Gensatset ID anda sebagai gambar.`} />
      <View style={{height: 15, }}></View>
      <View style={{flexDirection: 'row'}}>
        <CustomButton width='36%' text={"Batal"} height={38} fontStyles={{...FontConfig.buttonZeroTwo, color: Color.primaryMain,}}
        borderWidth={1} borderColor={Color.primaryMain} onPress={()=>setModalVisible(false)} />
        <View style={{width: 15, }}></View>
        <CustomButton width='60%' height={38} text={"Setuju dan Daftar"} fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne,}}
        borderWidth={1} borderColor={Color.primaryMain} backgroundColor={Color.primaryMain} />
      </View>
    </View>
  )
}

export default ConfirmEventView

const styles = StyleSheet.create({})