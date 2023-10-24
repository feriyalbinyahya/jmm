import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ConfirmIcon from '../../assets/images/confirm.png'
import { Color, FontConfig } from '../../theme';
import CustomButton from '../../components/customButton';

const CancelEventView = ({navigation, setModalVisible}) => {
    const title="Sayang Sekali...";
    const subtitle=`Yakin ingin batalkan pendaftaranmu?`;
    
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
      <Text style={{...FontConfig.bodyTwo, color: Color.primaryMain, textAlign: 'center'}}>{subtitle}</Text>
      <View style={{height: 15, }}></View>
      <View style={{flexDirection: 'row'}}>
        <CustomButton width='36%' text={"Kembali"} height={38} fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne,}}
        borderWidth={1} borderColor={Color.primaryMain} backgroundColor={Color.primaryMain} onPress={()=>setModalVisible(false)} />
        <View style={{width: 15, }}></View>
        <CustomButton width='60%' height={38} text={"Ya, Batalkan"} fontStyles={{...FontConfig.buttonZeroTwo, color: Color.danger,}}
        borderWidth={1} borderColor={Color.danger} backgroundColor={Color.neutralZeroOne} />
      </View>
    </View>
  )
}

export default CancelEventView

const styles = StyleSheet.create({})