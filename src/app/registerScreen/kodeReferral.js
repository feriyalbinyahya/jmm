import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderRegistration from '../../components/headerRegistration'
import IconScan from '../../assets/images/icon/icon_scan.png'
import CustomInput from '../../components/customInput'
import CustomButton from '../../components/customButton'
import RegistrationService from '../../services/registration'
import Snackbar from 'react-native-snackbar'
import AwesomeAlert from 'react-native-awesome-alerts';

const KodeReferralScreen = ({navigation, route}) => {
    const [kodeReferral, setKodeReferral] = useState('');
    const [isContinue, setIsContinue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlertWrongReferral, setShowAlertWrongReferral] = useState(false);
    const {photo} = route.params;

    handleLanjutkan = () => {
        setIsLoading(true);
        RegistrationService.getIdOrganisasi({kode_referal: kodeReferral})
        .then(res=> {
            if(res.data.data.length != 0){
                let idOrganisasi = res.data.data[0].id_organisasi;
                navigation.navigate("OrganisasiTerpilihRegister", {idOrganisasi: idOrganisasi, kodeReferalDigunakan: kodeReferral, photo: photo});
            }else{
                setShowAlertWrongReferral(true);
            }
            setIsLoading(false);
        })
        .catch(err=> {
            console.log(err);
            setIsLoading(false);
            setShowAlertWrongReferral(true);
        })
    }

    handlePilihOrganisasi = () => {
        navigation.navigate('OrganisasiChoiceRegister');
    }

    useEffect(()=> {
        if(kodeReferral){
            setIsContinue(true);
        }else{
            setIsContinue(false);
        }
    }, [kodeReferral])
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}> 
        <HeaderRegistration navigation={navigation} numberStep={4} />
        <View style={styles.container}>
            <Text style={styles.textIsiData}>Masukkan kode referral</Text>
            <Text style={styles.textLengkapi}>Masukan kode referral pengurusmu.</Text>
            <View style={{height: '20%'}}></View>
            <View style={{flexDirection: 'row'}}>
                <View style={{width: '85%'}}><CustomInput value={kodeReferral} setValue={(value)=>{setKodeReferral(value.replace(/\s/g, ''))}} placeholder='Masukkan kode referral' /></View>
                <View style={{width: '5%'}}></View>
                {/**<Pressable onPress={()=> navigation.navigate('ScanKodeReferralRegister', {setValue: setKodeReferral})}><Image style={styles.iconScan} source={IconScan} /></Pressable>**/}
            </View>
            <View style={{height: '10%'}}></View>
            <View style={styles.buttonSection}>
                <View style={styles.buttonContinue}>
                    <CustomButton
                    onPress={handleLanjutkan} 
                    fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                    width='100%' height={44} text="Lanjutkan"
                    disabled={!isContinue}
                    backgroundColor={Color.primaryMain}
                    />
                </View>
            </View>
            {/** fitur pilih organisasi <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '3%'}}>
                <View style={{flex: 1, height: 1, backgroundColor: Color.divider}} />
                <View>
                    <Text style={{ textAlign: 'center', ...styles.textBelumPunya}}>BELUM PUNYA REFERRAL?</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: Color.divider}} />
            </View>
            <View style={{height:'5%'}}></View>
            <CustomButton height={50} fontStyles={styles.textPilihOrganisasi} text='Pilih Organisasi' onPress={handlePilihOrganisasi} /> **/}
        </View>
        <AwesomeAlert
          show={isLoading}
          showProgress={true}
          progressColor={Color.graySeven}
          message="Loading"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
        />
        <AwesomeAlert
          show={showAlertWrongReferral  }
          showProgress={false}
          title="Kode referal salah"
          message="Kode referal yang Anda masukkan tidak sesuai. Silakan coba lagi."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertWrongReferral(false);
          }}
        />
    </View>
  )
}

export default KodeReferralScreen

const styles = StyleSheet.create({
    buttonSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '12%',
        alignItems: 'center',
    },
    buttonContinue: {
        borderRadius: 20, 
        width: '100%',
    },
    iconScan: {
        width: 40,
        height: 40
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFF'
    },
    textBelumPunya: {
        ...FontConfig.captionTwo,
        color: Color.grayNine,
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
    textPilihOrganisasi: {
        ...FontConfig.buttonOne,
        color: Color.primaryMain
    },
})