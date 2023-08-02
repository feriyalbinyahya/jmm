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
import RegistrationService from '../../../services/registration'
import AwesomeAlert from 'react-native-awesome-alerts';
import ProfileServices from '../../../services/profile'

const UbahAkunScreen = ({navigation, route}) => {
    const nomorPonsel = route.params.phone;
    const [phone, setPhone] = useState(nomorPonsel);
    const [isPhone, setIsPhone] = useState(false);

    const [show, setShow] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const [checkingPhone, setCheckingPhone] = useState(false);
    const [showAlertPhoneWrong, setShowAlertPhoneWrong] = useState(false);

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

    handleLanjutkan = () => {
        if(phone == nomorPonsel){
            navigation.pop();
        }else{
            RegistrationService.checkPhone({"no_hp": phone})
            .then(res=>{
                if(res.data.message == "No seluler belum dipakai."){
                    updateNoHp();
                    navigation.navigate("KodeOTPRegister", {onPress: "ubahakun", phone: phone});
                }else{
                    setShowAlertPhoneWrong(true);
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }

    const updateNoHp = () => {
        ProfileServices.putNoHp({"no_hp": phone})
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(() => {
      if(phone){
        phoneValidation(phone);
      }
    }, [phone]);
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, justifyContent: 'space-between'}}>
      <View style={{height: '70%'}}>
        <HeaderWhite title="Ubah Info Akun" navigation={navigation} /> 
        <View style={styles.topContainer}>
            <Text style={styles.textHarap}>Harap gunakan nomor ponsel yang aktif.</Text>
            <Text style={styles.titleFormInput}>Nomor Ponsel</Text>
            <CustomInput value={phone} setValue={setPhone} 
            placeholder="08123456789" type="text" />
            {isVerified? <View style={{flexDirection: 'row', alignItems: 'center', 
            marginVertical: 4}}>
                <Image source={IconVerified} style={{width: 14, height: 14}} />
                <Text style={styles.textVerifikasi}>Sudah terverifikasi</Text>
            </View> : <></>}
        </View>
      </View>
      <View style={styles.bottomSection}>
          <View style={styles.buttonContinue}><Button onPress={handleLanjutkan} disabled={!isPhone} color={Color.primaryMain} title="Lanjutkan" /></View>
      </View>
      <AwesomeAlert
          show={checkingPhone}
          showProgress={true}
          progressColor={Color.graySeven}
          message="Loading"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
        />
      <AwesomeAlert
          show={showAlertPhoneWrong}
          showProgress={false}
          title="Nomor ponsel tidak valid"
          message="Nomor ponsel yang Anda masukkan sudah terdaftar. Silakan masukkan nomor ponsel yang lain."
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
            setShowAlertPhoneWrong(false);
          }}
        />
    </View>
  )
}

export default UbahAkunScreen

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