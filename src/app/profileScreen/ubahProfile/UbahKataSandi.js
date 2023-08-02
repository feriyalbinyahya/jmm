import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import CustomInput from '../../../components/customInput'
import { Input, Icon } from "native-base";
import IconVerified from '../../../assets/images/icon/icon_verified.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FormErrorMessage from '../../../components/alert/formErrorMessage'
import { useDispatch } from 'react-redux'
import ProfileServices from '../../../services/profile'
import AwesomeAlert from 'react-native-awesome-alerts'

const UbahKataSandiScreen = ({navigation}) => {
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [isContinue, setIsContinue] = useState(false);
    const [alertWrongOldPassword, setAlertWrongOldPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [alertSuccess, setAlertSuccess] = useState(false);

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

      const updateNoHp = () => {
        setIsLoading(true);
        ProfileServices.putPassword({
          "password": oldPassword,
          "password_baru": password,
          "konfirmasi_password_baru": confirmPassword
        })
        .then(res=>{
            console.log(res.data);
            if(res.data.message == "Password berhasil diubah."){
              setAlertSuccess(true);
            }else{
              setMessageError(res.data.message);
              setAlertWrongOldPassword(true);
            }
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setIsLoading(false);
        })
      }

      handleLanjutkan = () => {
        updateNoHp();
      }

      useEffect(() => {
        if(password){
          passwordValidation(password);
        }
        if(confirmPassword){
          confirmPasswordValidation(password, confirmPassword);
        }
      }, [oldPassword, password, confirmPassword]);
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, justifyContent: 'space-between'}}>
        <View style={{height: '80%'}}>
            <HeaderWhite title="Ubah Info Akun" navigation={navigation} /> 
            <View style={{borderWidth: 0.5, borderColor: Color.lightBorder}}></View>
            <View style={styles.bottomContainer}>
                <Text style={styles.textKataSandi}>Kata Sandi</Text>
                <View style={{height: 2}}></View>
                <Text style={styles.textHarap}>Lewati jika tidak ingin diubah.</Text>
                <Text style={styles.titleFormInput}>Kata Sandi Lama</Text>
                <CustomInput  value={oldPassword} setValue={setOldPassword} 
                type={showOldPassword? "text" : "password"} children={<Pressable onPress={() => setShowOldPassword(!showOldPassword)}>
                    <Icon as={<Ionicons name={showOldPassword ? "eye" : "eye-off"} />} size={5} mr="2" color={Color.secondaryText} />
                    </Pressable>} 
                />
                <Text style={styles.titleFormInput}>Kata Sandi</Text>
                <CustomInput inputNotWrong={isPassword} value={password} setValue={setPassword} 
                type={show? "text" : "password"} children={<Pressable onPress={() => setShow(!show)}>
                    <Icon as={<Ionicons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color={Color.secondaryText} />
                    </Pressable>} 
                />
                <Text style={{...styles.textInfoPassword, color: isPassword? Color.secondaryText: Color.danger}}>Kata sandi 
                minimal 8 karakter, terdiri dari huruf kapital dan angka.</Text>
                <Text style={styles.titleFormInput}>Konfirmasi Kata Sandi</Text>
                <CustomInput inputNotWrong={isPasswordMatch} value={confirmPassword} setValue={setConfirmPassword} 
                type={showConfirm? "text" : "password"} children={<Pressable onPress={() => setShowConfirm(!showConfirm)}>
                    <Icon as={<Ionicons name={showConfirm ? "eye" : "eye-off"} />} size={5} mr="2" color={Color.secondaryText} />
                    </Pressable>} 
                />
                {isPasswordMatch? <></>: <FormErrorMessage text="Kata sandi yang dimasukkan tidak sama dengan yang kamu buat." />}
                <View style={{height: 30}}></View>
            </View>
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}><Button onPress={handleLanjutkan} disabled={!(oldPassword && isPassword && confirmPassword && isPasswordMatch)} color={Color.primaryMain} title="Lanjutkan" /></View>
        </View>
        <AwesomeAlert
          show={isLoading}
          showProgress={true}
          progressColor={Color.graySeven}
          message="Loading"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
        />
        <AwesomeAlert
          show={alertWrongOldPassword}
          showProgress={false}
          title="Gagal mengubah kata sandi"
          message={messageError}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%',  alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setAlertWrongOldPassword(false);
          }}
        />
        <AwesomeAlert
          show={alertSuccess}
          showProgress={false}
          title="Sukses mengubah kata sandi"
          message="Kata sandi berhasil diperbarui"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Oke"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '40%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setAlertSuccess(false);
            navigation.pop();
            navigation.pop();
          }}
        />
    </View>
  )
}

export default UbahKataSandiScreen

const styles = StyleSheet.create({
    topContainer: {
        padding: 20
    },
    bottomContainer: {
        padding: 20,
        height: '56%'
    },
    textHarap: {
        ...FontConfig.bodyTwo,
        color: Color.secondaryText
    },
    titleFormInput:{
        color: Color.secondaryText,
        ...FontConfig.bodyTwo,
        paddingVertical: 10
    },
    textVerifikasi: {
        ...FontConfig.captionTwo,
        color: Color.primaryText,
        marginHorizontal: 5
    },
    textKataSandi: {
        ...FontConfig.titleTwo,
        color: Color.primaryText
    },
    titleFormInput:{
        color: Color.secondaryText,
        ...FontConfig.bodyTwo,
        paddingVertical: 10
    },
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