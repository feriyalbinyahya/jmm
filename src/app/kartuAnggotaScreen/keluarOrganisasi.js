import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderWhite from '../../components/header/headerWhite'
import CustomTextArea from '../../components/customTextArea'
import CustomButton from '../../components/customButton'

const KeluarOrganisasiScreen = ({navigation}) => {
    const subtitle = "Masukan alasan keluar organisasi, setelah keluar anda tidak dapat mengakses akun anda lagi.";
    const [alasan, setAlasan] = useState("");

    const handleLanjutkan = () => {

    }
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite navigation={navigation} title="" />
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View style={{padding: 20}}>
            <Text style={{...FontConfig.title1, color: Color.hitam}}>Keluar Organisasi</Text>
            <Text style={{...FontConfig.bodyFour, color: Color.graySeven, marginVertical: 8}}>{subtitle}</Text>
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.buttonFour, color: Color.neutral70, marginVertical: 2}}>Alasan Keluar Organisasi</Text>
            <CustomTextArea value={alasan} setValue={setAlasan} placeholder="Tulis disini" width='90%' />
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}>
            <CustomButton
                onPress={handleLanjutkan} 
                fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                width='100%' height={44} text="Lanjutkan"
                disabled={!alasan}
                backgroundColor={Color.primaryMain}
                />
            </View>
        </View>
    </View>

    </SafeAreaView>
  )
}

export default KeluarOrganisasiScreen

const styles = StyleSheet.create({
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '12%',
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