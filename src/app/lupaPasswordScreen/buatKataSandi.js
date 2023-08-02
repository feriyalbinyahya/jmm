import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Color, FontConfig } from '../../theme'
import { Input, Icon } from "native-base";
import HeaderWhite from '../../components/header/headerWhite'
import CustomInput from '../../components/customInput'
import FormErrorMessage from '../../components/alert/formErrorMessage'
import CustomButton from '../../components/customButton';
import LoginServices from '../../services/login';
import AwesomeAlert from 'react-native-awesome-alerts';

const BuatKataSandiScreen = ({navigation, route}) => {
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [failedUpdatePassword, setFailedUpdatePassword] = useState(false);
    const {phone} = route.params;

    const containsUpperCase = (str) => {
        return /[A-Z]/.test(str);
      }
  
      const containsNumber = (str) => {
        return /[0-9]/.test(str);
      }

    passwordValidation = (password) => {
        if(!(containsUpperCase(password) && password.length>7 && containsNumber(password))){
          setIsPassword(false);
        }else{
          setIsPassword(true);
        }
      }
  
      confirmPasswordValidation = (password, confirmPassword) => {
        if(password != confirmPassword){
          setIsPasswordMatch(false);
        }else{
          setIsPasswordMatch(true);
        }
      }

      handleMasuk = () => {
        LoginServices.forgetPassword({
          "no_hp": phone,
          "password": password,
          "konfirmasi_password": confirmPassword
      })
        .then(res=>{
          if(res.data.message == "Kata sandi berhasil diubah."){
            navigation.popToTop();
          }else{
            setFailedUpdatePassword(false);
          }
        }).catch(err=>{

        })
      }

      useEffect(() => {
        if(password){
          passwordValidation(password);
        }
        if(confirmPassword){
          confirmPasswordValidation(password, confirmPassword);
        }
      }, [password, confirmPassword]);
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        <HeaderWhite navigation={navigation} title="Ubah Kata Sandi" />
        <View style={styles.section}>
            <Text style={styles.textIsiData}>Buat kata sandi baru</Text>
            <Text style={styles.textLengkapi}>Pastikan kata sandi yang kamu masukan berbeda dari sebelumnya</Text>
            <View style={{height: 20}}></View>
            <Text style={styles.titleFormInput}>Kata Sandi</Text>
            <CustomInput inputNotWrong={isPassword} value={password} setValue={setPassword} type={show? "text" : "password"} children={<Pressable onPress={() => setShow(!show)}>
                <Icon as={<Ionicons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color={Color.secondaryText} />
                </Pressable>} 
            />
            <Text style={{...styles.textInfoPassword, color: isPassword? Color.secondaryText: Color.danger}}>Kata sandi minimal 8 karakter, terdiri dari huruf kapital dan angka.</Text>
            <Text style={styles.titleFormInput}>Konfirmasi Kata Sandi</Text>
            <CustomInput inputNotWrong={isPasswordMatch} value={confirmPassword} setValue={setConfirmPassword} type={showConfirm? "text" : "password"} children={<Pressable onPress={() => setShowConfirm(!showConfirm)}>
                <Icon as={<Ionicons name={showConfirm ? "eye" : "eye-off"} />} size={5} mr="2" color={Color.secondaryText} />
                </Pressable>} 
            />
            {isPasswordMatch? <></>: <FormErrorMessage text="Kata sandi yang dimasukkan tidak sama dengan yang kamu buat." />}
            <View style={{height: 30}}></View>
            <CustomButton onPress={handleMasuk} disabled={!(isPassword && isPasswordMatch)} 
            text="Selesai" height={44} 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            backgroundColor={Color.primaryMain}
             />
        </View>
        <AwesomeAlert
          show={failedUpdatePassword}
          showProgress={false}
          title="Gagal membuat kata sandi baru"
          message="Terjadi masalah. Kata sandi tidak berhasil diubah."
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
            setFailedUpdatePassword(false);
          }}
        />
    </View>
  )
}

export default BuatKataSandiScreen

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
    textLengkapi: {
        ...FontConfig.bodyTwo,
        color: Color.graySeven,
        marginTop: 5
    },
})