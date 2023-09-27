import { StyleSheet, Text, View, Image, Pressable, TextInput, Linking } from 'react-native'
import React , {useEffect, useState} from 'react'
import iconBack from '../../assets/images/icon/icon_back.png'
import { Color, FontConfig } from '../../theme'
import CustomInput from '../../components/customInput'
import { Input, Icon } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'
import iconGoogle from '../../assets/images/icon/icon_google.png';
import ChildrenButton from "../../components/customButtonChildren";
import CustomButton from "../../components/customButton";
import FormErrorMessage from '../../components/alert/formErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDataRegistration, setAuthRegistration } from '../../redux/registration'
import RegistrationServices from '../../services/registration'
import AwesomeAlert from 'react-native-awesome-alerts';

const RegisterScreen = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const [isPhone, setIsPhone] = useState(true);
    const [phoneNotEmpty, setPhoneNotEmpty] = useState(true);
    const [phoneIsFocused, setPhoneIsFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [phoneExist, setPhoneExist] = useState(false);
    const [privacyPolicyDisabled, setPrivacyPolicyDisabled] = useState(true);
    const [isContinue, setIsContinue] = useState(false);

    const dispatch = useDispatch();

    const containsUpperCase = (str) => {
      return /[A-Z]/.test(str);
    }

    const containsNumber = (str) => {
      return /[0-9]/.test(str);
    }

    phoneValidation = (phone) => {
      const reg = /^[0]?[789]\d{8,11}$/;
      if (reg.test(phone) === false) {
        setIsPhone(false);
      }else{
        setIsPhone(true);
      }
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

    handleDevelopButton = () => {
      navigation.navigate("DataDiriRegister");
    }

    handleDaftarButton = () => {
      if(phone){
        setPhoneNotEmpty(true);
        phoneValidation(phone);
      }else{
        setPhoneNotEmpty(false);
        setIsPhone(false);
      }
      if(password){
        passwordValidation(password);
      }else{
        setIsPassword(false);
      }
      if(confirmPassword){
        confirmPasswordValidation(password, confirmPassword);
      }else{
        setIsPasswordMatch(false);
      }

      if(phone && password && confirmPassword && isPhone && isPassword && isPasswordMatch){
        RegistrationServices.checkPhone({"no_hp": phone})
        .then(res=>{
          console.log(res.data.message);
          if(res.data.message == "No seluler sudah dipakai."){
            setPhoneExist(true);
          }else if(res.data.message == "No seluler belum dipakai."){
            saveAuthRegistration(phone, password, confirmPassword);
            navigation.navigate("DataDiriRegister");
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    useEffect(()=>{
      if(phone){
        phoneValidation(phone);
      }
    }, [phone]);

    useEffect(()=>{
      if(confirmPassword){
        confirmPasswordValidation(password, confirmPassword);
      }
    }, [confirmPassword]);

    useEffect(() => {
      if(password){
        passwordValidation(password);
        confirmPasswordValidation(password, confirmPassword);
      }
    }, [password]);

    useEffect(()=>{
      if(isPhone && isPassword && isPasswordMatch && !privacyPolicyDisabled && phone && password && confirmPassword){
        setIsContinue(true);
      }else{
        setIsContinue(false);
      }
    }, [isPhone, isPassword, isPasswordMatch, privacyPolicyDisabled])

    const saveAuthRegistration = (phone, password, confirmPassword) => {
      dispatch(
        setAuthRegistration({phone: phone, password: password})
      );
    }
  return (
    <View style={styles.registerPage}>
      <View style={styles.section}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.buttonBack} source={iconBack} /></Pressable>
        <View style={{height: 40}}></View>
        <View><Text style={styles.textHeading}>Ayo, jadi bagian dari GENSatSet!</Text></View>
        <View style={{height: 20}}></View>
        <Text style={styles.titleFormInput}>{`Nomor Ponsel (terdaftar di whatsapp)`}</Text>
        <TextInput value={phone} onChangeText={setPhone} onBlur={() => setPhoneIsFocused(false)} onFocus={() => setPhoneIsFocused(true)} 
        style={{...styles.phoneInput, borderColor: !isPhone? Color.danger : ((phoneIsFocused || phone)? Color.neutralZeroSeven : Color.lightBorder)}} 
        keyboardType='number-pad' placeholder='08' placeholderTextColor={Color.disable} />
        {phoneNotEmpty?(isPhone? <></> : <FormErrorMessage text="Nomor ponsel yang dimasukkan tidak valid." />): 
        <FormErrorMessage text="Kolom wajib diisi." />}
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
        <View style={{height: 25}}></View>
        <View style={{flexDirection: 'row',}}>
          <Pressable style={{marginVertical: 5}} onPress={()=>setPrivacyPolicyDisabled(!privacyPolicyDisabled)}>
              {!privacyPolicyDisabled ? <Ionicons name="checkbox" color={Color.primaryMain} size={22} /> 
              : <View style={styles.checkboxOff}></View>}
          </Pressable>
          <Text style={{...FontConfig.captionOne, color: Color.neutralColorGrayEight, marginHorizontal: 5, width: '90%'}}>
            Pilih untuk melanjutkan, dengan memilih kamu menyetujui 
            <Text onPress={()=>Linking.openURL("https://gensatset.org/syarat-ketentuan")} style={{color: Color.purple, textDecorationLine: 'underline'}}>{` Syarat & Ketentuan`} </Text>
            dan 
            <Text onPress={()=>Linking.openURL("https://gensatset.org/kebijakan-privasi")} style={{color: Color.purple, textDecorationLine: 'underline'}}>{` Kebijakan Privasi`} </Text>
            GEN Sat Set
          </Text>
        </View>
        <View style={{height: 20}}></View>
        <CustomButton disabled={!isContinue} onPress={handleDaftarButton} fontStyles={{...FontConfig.buttonOne, color: 'white'}} 
            text="Daftar" backgroundColor={Color.primaryMain} height={44} />
            
            {/***<View style={styles.atau}><Text style={{...FontConfig.captionTwo, color: Color.grayEight}}>ATAU</Text></View>
            <ChildrenButton children={<View style={styles.daftarGoogle}>
              <Image source={iconGoogle} style={{height:20, width:20}} />
              <Text style={styles.textDaftarGoogle}>Daftar dengan Google</Text>
  </View>} borderColor={Color.graySix} />**/}
      </View>
      <AwesomeAlert
          show={phoneExist}
          showProgress={false}
          title="Nomer ponsel sudah dipakai"
          message="Silakan masukkan nomer ponsel yang belum pernah didaftarkan"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyTwo, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setPhoneExist(false);
          }}
        />
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    atau: {
        alignItems: 'center',
        marginVertical: 15
    },
    buttonBack: {
        width: 32,
        height: 32
    },
    checkboxOff: {
      borderWidth: 1.5,
      borderColor: Color.secondaryText,
      width: 16,
      height: 16,
      backgroundColor: Color.neutralZeroOne,
      marginHorizontal: 3
    },
    daftarGoogle: {
        flexDirection:'row',
      },
    registerPage: {
        overflow: "hidden",
        height: 800,
        width: "100%",
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    section:{
        margin:20
    },
    textHeading: {
        ...FontConfig.headingTwo,
        color: '#000000',
        width: '70%'
    },
    textInfoPassword: {
        ...FontConfig.bodyThree,
        width: '80%',
        marginTop: 3
    },
    titleFormInput:{
        color: Color.secondaryText,
        ...FontConfig.bodyTwo,
        marginTop: 10,
        marginBottom: 1
    },
    textDaftarGoogle: {
        ...FontConfig.buttonZeroTwo,
        color: Color.grayThirteen,
        marginHorizontal: 15
      },
    phoneInput: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        ...FontConfig.bodyOne,
        color: Color.primaryText
    },
})