import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState} from 'react'
import { Color, FontConfig } from '../../theme'
import IconVerifed from '../../assets/images/surveiTerkirim.png'
import HeaderWhite from '../../components/header/headerWhite'
import CustomButton from '../../components/customButton'
import CustomBottomSheet from '../../components/bottomSheet'
import CancelEventView from './cancelEventView'

const InformationEvent = ({navigation}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

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
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, justifyContent: 'space-between'}}>
        <View>
            <HeaderWhite navigation={navigation} title={""} />
            <View style={{alignItems: 'center'}}>
            <View style={{height: 20, paddingHorizontal: 20}}></View>
                <Image source={IconVerifed} style={{width: 210, height: 153}} />
                <Text style={{...FontConfig.titleTwo, color: Color.primaryMain}}>Yeay kamu terdaftar diacara ini!</Text>
                <View style={{height: 8, }}></View>
                <Text style={{...FontConfig.bodyTwo, color: Color.neutralColorGrayNine}}>Pastikan untuk hadir tepat waktu ya</Text>
            </View>
            <View style={{height: 30, }}></View>
            <View style={{paddingHorizontal: 20}}>
                <Text style={{...FontConfig.titleThree, color: Color.primaryMain}}>Hal yang harus kamu persiapkan:</Text>
                <View style={{height: 10, }}></View>
                <SyaratText text={`Pastikan kamu untuk menghadiri acara tepat waktu`} />
                <SyaratText text={`Pada saat masuk tempat acara siapkan Gensatset ID-mu untuk bisa di konfirmasi oleh panitia.`} />
                <SyaratText text={`Untuk menghindari koneksi internet yang kurang baik, bisa simpan screenshot Gensatset ID anda sebagai gambar.`} />
                <View style={{height: 15, }}></View>
            </View>
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}><CustomButton 
            text="Batalkan Pendaftaran" backgroundColor={Color.neutralZeroOne}
            onPress={()=>setIsModalVisible(true)}
            borderColor={Color.danger} borderWidth={1.5} 
            height={40} fontStyles={{...FontConfig.buttonOne, color: Color.danger}} /></View>
        </View>
        <CustomBottomSheet 
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        title=""
        children={<CancelEventView setModalVisible={setIsModalVisible} navigation={navigation} />}
        />
    </View>
  )
}

export default InformationEvent

const styles = StyleSheet.create({
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '10%',
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
      buttonContinue: {
        borderRadius: 20, 
        width: '80%',
    },
})