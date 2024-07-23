import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderWhite from '../../components/header/headerWhite'
import CustomInput from '../../components/customInput'
import CustomButton from '../../components/customButton'
import RegistrationService from '../../services/registration'
import AwesomeAlert from 'react-native-awesome-alerts';

const LupaPasswordScreen = ({navigation}) => {
    const [phone, setPhone] = useState("");
    const [isPhone, setIsPhone] = useState(false);
    const [phoneNotExist, setPhoneNotExist] = useState(false); 67  
    useEffect(()=> {
        if(phone){
            phoneValidation(phone);
        }
    }, [phone]);

    phoneValidation = (phone) => {
        const reg = /^[0]?[789]\d{8,11}$/;
        if (reg.test(phone) === false) {
            setIsPhone(false);
        }else{
            setIsPhone(true);
        }
    }

    handleValidationOTP = () => {
        navigation.navigate('Homepage');
    }

    handleMasuk = () => {
        RegistrationService.checkPhone({"no_hp": phone})
        .then(res=>{
          console.log(res.data.message);
          if(res.data.message == "No seluler sudah dipakai."){
            navigation.navigate('KodeOTPRegister', {phone: phone, onPress: "newpassword"});
          }else if(res.data.message == "No seluler belum dipakai."){
            setPhoneNotExist(true);
            
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite navigation={navigation} title="Lupa Kata Sandi" />
      <View style={styles.section}>
        <Text style={styles.textIsiData}>Masukan nomor ponsel anda untuk mendapatkan kode</Text>
        <View style={{height: 20}}></View>

        {/** form nomer ponsel */}
        <View style={{marginVertical: 5}}>
            <Text style={styles.titleFormInput}>{`Nomor Ponsel (Whatsapp)`}</Text>
            <CustomInput value={phone} setValue={setPhone} 
            placeholder="08123456789" type="text" />
            <View style={{height: 30}}></View>
            <CustomButton onPress={handleMasuk} disabled={!isPhone} 
            text="Masuk" height={44} 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            backgroundColor={Color.primaryMain}
             />
        </View>
      </View>
      <AwesomeAlert
          show={phoneNotExist}
          showProgress={false}
          title="Nomor ponsel tidak terdaftar"
          message="Nomer ponsel yang Anda masukkan belum terdaftar. Periksa nomer ponsel dan coba lagi."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '40%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setPhoneNotExist(false);
          }}
        />
    </View>
  )
}

export default LupaPasswordScreen

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 20,
        paddingTop: 40
    },
    textIsiData: {
        ...FontConfig.titleSix,
        color: Color.grayThirteen,
    },
    titleFormInput:{
        color: Color.secondaryText,
        ...FontConfig.bodyTwo,
        paddingVertical: 10
    },
})