import React, {useState, useEffect} from "react";
import { Text, StyleSheet, View, Image, Pressable, ActivityIndicator, Linking, ScrollView } from "react-native";
import {
  Margin,
  FontFamily,
  FontSize,
  Color,
  Padding,
  Border,
  FontConfig,
} from '../../theme';
import Logo from '../../assets/images/logo_desaraya.png';
import iconGoogle from '../../assets/images/icon/icon_google.png';
import { TextInput } from "react-native/Libraries/Components/TextInput/TextInput";
import CustomInput from "../../components/customInput";
import { Input, Icon } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from "../../components/customButton";
import ChildrenButton from "../../components/customButtonChildren";
import LoginServices from "../../services/login";
import { setCredentials } from "../../redux/credentials";
import { useDispatch, useSelector } from "react-redux";
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomBottomSheet from "../../components/bottomSheet";
import IconWhatsapp from '../../assets/images/icon/whatsapp.png';
import ImageWarning from '../../assets/images/warning/empty.png';
import { VERSION } from '../../utils/environment';
import LinearGradient from 'react-native-linear-gradient';
import { Box } from "native-base";
import NotifikasiServices from "../../services/notifikasi";
import { getTokenNotification } from "../../utils/Utils";
import { NAMA_APP } from "../../utils/const";

const SignInPage = ({navigation}) => {
    const dispatch = useDispatch();
    const [emailphone, setEmailPhone] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [showAlertWrongPassword, setShowAlertWrongPassword] = useState(false);
    const [showAlertWrongPhone, setShowAlertWrongPhone] = useState(false);
    const [showAlertStatusAccount, setShowStatusAccount] = useState(false);
    const [showAlertPhoneNotVerified, setShowAlertPhoneNotVerified] = useState(false);
    const [showAlertSomethingWrong, setShowAlertSomethingWrong] = useState(false);
    const [showAlertNoWhatsapp, setShowAlertNoWhatsapp] = useState(false);
    const [showAlertVersionWrong, setShowAlertVersionWrong] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isStatusActiveVisible, setStatusActiveVisible] = useState(false);

    const getToken = async() =>{
      return await getTokenNotification();
    }

    const no_hp_cs = "0811-1111-1111";

    const handleLogin = () => {
      setIsLoading(true);
      LoginServices.login({"no_hp": emailphone, "password": password})
      .then(async(res)=> {
        console.log(res.data.data);
        if(res.data.message == "Login sukses."){
          let fcmToken = await getTokenNotification();
          console.log({"fcmtoken": fcmToken});
          NotifikasiServices.postToken(res.data.data.token, {"fcmToken": fcmToken})
          .then(res=>{
            console.log(res.data);
          })
          .catch(err=>{
            console.log(err.response);
          })
          saveCredentials(res.data.data);
        }else if(res.data.message == 'Kata sandi yang anda masukan salah.'){
          setShowAlertWrongPassword(true);
        }else if(res.data.message == 'Nomor ponsel tidak terdaftar.'){
          setShowAlertWrongPhone(true);
        }else if(res.data.message == "Akunmu telah dinonaktifkan, silahkan hubungi organisasimu untuk detail selengkapnya."){
          setShowStatusAccount(true);
        }else if(res.data.message == "No HP belum diverifikasi."){
          setShowAlertPhoneNotVerified(true);
        }else{
          setShowAlertSomethingWrong(true);
        }
        setIsLoading(false);
      })
      .catch(err=> {
        console.log(err.response);
        setIsLoading(false);
      })
    }

    const saveCredentials = (data) => {
      dispatch(
        setCredentials({fotoOrganisasi: data.foto_organisasi, namaOrganisasi: data.nama_organisasi, idOrganisasi: data.id_organisasi, idUser: data.id_user,
        isNoHpVerified: data.is_no_hp_verified, fullname: data.nama_user, noHp: data.no_hp, 
        status: data.status_persetujuan, token: data.token, fotoProfil: data.foto_profil, isReferalOrganization: data.is_referal_organization, statusPolicy: data.status_policy})
      );
      AsyncStorage.setItem('token', data.token);
    }

    const getAppVersion = () => {
      LoginServices.appVersion(VERSION.split(" ")[1])
      .then(res=>{
        console.log(res.data.data);
        setShowAlertVersionWrong(res.data.data.need_update);
      })
      .catch(err=>{
        console.log(err.response);
      })
    }

    const handleLupaKatSandi = () => {
      navigation.navigate("LupaPassword");
    }

    const handleContinue = () => {
      if(emailphone && password){
        setIsContinue(true);
      }else{
        setIsContinue(false);
      }
    }

    const openGooglePlay = () => {
      Linking.openURL(
        'http://play.google.com/store/apps/details?id=com.gensatset'
      );
    };

    const handleWhatsapp = () => {
      var no_hp = no_hp_cs.substring(1);
      const url = `https://wa.me/62${no_hp}`;
      Linking.openURL(url);
    }

    const ContactUs = () => {
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{...FontConfig.bodyThree, color: Color.neutralColorGrayEight}}>Customer Service {NAMA_APP}</Text>
            <View style={{height: 5}}></View>
            <Text style={{...FontConfig.buttonThree, color: Color.primaryMain}}>{no_hp_cs}</Text>
          </View>
          <View style={{height: 10}}></View>
          <ChildrenButton borderColor={Color.successMain} 
          borderRadius={26}
          onPress={handleWhatsapp}
          height={44} backgroundColor={Color.neutralZeroOne}
          children={<View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="logo-whatsapp" size={21} color={Color.successMain} />
            <View style={{width: 5}}></View>
            <Text style={{...FontConfig.buttonOne, color: Color.successMain}}>Hubungi Whatsapp</Text>
          </View>}
          />
        </View>
      )
    }

    const StatusNonActive = () => {
      let message = 'Akunmu telah dinonaktifkan, silahkan hubungi organisasimu untuk detail selengkapnya.';
      return(
        <View style={{alignItems: 'center'}}>
          <Image source={ImageWarning} style={{width: 232, height: 170}} />
          <View style={{height: 10}}></View>
          <Text style={{...FontConfig.titleOne, color: '#000000', width: '80%', textAlign: 'center'}}>Yah, akunmu tidak bisa diakses</Text>
          <View style={{height: 10}}></View>
          <Text style={{...FontConfig.bodyTwo, color: '#7B7B7B', textAlign: 'center'}}>{message}</Text>
          <View style={{height: 20}}></View>
          <CustomButton width="90%" height={40} fontStyles={{...FontConfig.buttonOne, color: 'white'}} text="OK"
          backgroundColor={Color.primaryMain} 
          onPress={()=>setShowStatusAccount(false)}
            />
        </View>
      )
    }

    useEffect(()=> {
      handleContinue();
    }, [emailphone, password])

    useEffect(()=>{
      getAppVersion();
    },[])
    return (
    <View style={styles.signInPage}>
        <CustomBottomSheet children={<ContactUs />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
        title="Hubungi Kami" />
        <CustomBottomSheet children={<StatusNonActive />} 
        isModalVisible={showAlertStatusAccount} setModalVisible={setShowStatusAccount} 
        title="" />
        <View style={styles.header}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}><Image source={Logo} style={styles.logoDashboard} /></View>
          <View style={styles.topSection}>
              <Text style={styles.textSelamatDatang}>Selamat Bergabung</Text>
              <View style={{height: 20}}></View>
              <Text style={styles.textTopSection}>Masukan nomor ponsel dan kata sandi yang sudah terdaftar.
              </Text>
          </View>
          <Box shadow={2} style={styles.bottomSection}>
            <ScrollView>
                <Text style={styles.titleFormInput}>Nomor Ponsel</Text>
                <View style={{marginVertical: 5}}><CustomInput value={emailphone} setValue={setEmailPhone} placeholder="08" type="text" /></View>
                <View style={{height: 10}}></View>
                <Text style={styles.titleFormInput}>Kata Sandi</Text>
                <View style={{marginVertical: 5}}>
                  <CustomInput value={password} setValue={setPassword} type={show? "text" : "password"} children={<Pressable onPress={() => setShow(!show)}>
                    <Icon as={<Ionicons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color={Color.secondaryText} />
                    </Pressable>} 
                  />
                </View>
                <View style={styles.forgotPassword}>
                  <Pressable onPress={handleLupaKatSandi}><Text style={styles.textForgotPassword}>Lupa Kata Sandi</Text></Pressable>
                </View>
                <CustomButton disabled={!isContinue} onPress={handleLogin} fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}} 
                text="Masuk" backgroundColor={Color.primaryMain} height={44} />
                {/***<View style={styles.atau}><Text style={{...FontConfig.captionTwo, color: Color.grayEight}}>ATAU</Text></View>
        
                <ChildrenButton children={<View style={styles.masukGoogle}>
                  <Image source={iconGoogle} style={{height:20, width:20}} />
                  <Text style={styles.textMasukGoogle}>Masuk dengan Google</Text>
                  </View>} borderColor={Color.graySix} /> **/}

                <View style={styles.tidakPunyaAkun}>
                  <Text style={styles.textBelumPunyaAkun}>Belum punya akun?</Text>
                  <Pressable onPress={()=> navigation.navigate('Register')}><Text style={styles.textDaftar}>Daftar disini</Text></Pressable>
                </View>

                <View style={styles.butuhBantuan}>
                  <Ionicons name="call-outline" size={18} color={Color.neutralColorGrayEight} />
                  <View style={{width: 10}}></View>
                  <Text style={{...FontConfig.bodyThree, color: Color.neutralColorGrayEight}}>Butuh bantuan?</Text>
                  <View style={{width: 5}}></View>
                  <Pressable onPress={()=>setModalVisible(true)}><Text style={{...FontConfig.buttonThree, color: Color.primaryMain}}>Hubungi Kami</Text>
                  </Pressable>
                </View>
              </ScrollView>
          </Box>
          <View style={styles.version}>
            <Text style={{...FontConfig.bodyThree, color: Color.graySeven}}>{VERSION}</Text>
          </View>
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
          show={showAlertWrongPassword}
          showProgress={false}
          title="Kata sandi salah"
          message="Kata sandi yang Anda masukkan salah. Silakan coba lagi."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%',  alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertWrongPassword(false);
          }}
        />
        <AwesomeAlert
          show={showAlertWrongPhone}
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
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertWrongPhone(false);
          }}
        />
        <AwesomeAlert
          show={showAlertNoWhatsapp}
          showProgress={false}
          title="Tidak dapat menghubungi"
          message="Aplikasi whatsapp belum terinstall di perangkat Anda"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Oke, mengerti"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertNoWhatsapp(false);
          }}
        />
        <AwesomeAlert
          show={showAlertPhoneNotVerified}
          showProgress={false}
          title="Nomor ponsel belum diverifikasi"
          message="Nomer ponsel yang Anda masukkan belum terverifikasi. Verifikasi terlebih dahulu untuk dapat melanjutkan."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Pergi Verifikasi"
          cancelText="Batal"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '50%', height: '80%',  alignItems: 'center'}}
          cancelButtonStyle={{width: '40%', height: '80%',  alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            navigation.navigate('KodeOTPRegister', {onPress: "homepage", phone: emailphone});
          }}
          onCancelPressed={()=>{
            setShowAlertPhoneNotVerified(false);
          }}
        />
        <AwesomeAlert
          show={showAlertSomethingWrong}
          showProgress={false}
          title="Tidak bisa masuk"
          message="Ada yang salah. Anda tidak dapat masuk ke aplikasi."
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
            setShowAlertSomethingWrong(false);
          }}
        />
        <AwesomeAlert
          show={showAlertVersionWrong}
          showProgress={false}
          title="Ikuti terus pembaruan aplikasi terbaru kami!"
          message="Anda perlu mengupdate aplikasi GEN Sat Set ke versi terbaru untuk dapat melanjutkan"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Perbarui Sekarang"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%',  alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            openGooglePlay();
          }}
        />
    </View>
    );
};

const styles = StyleSheet.create({
  atau: {
    alignItems: 'center',
    marginVertical: 20
  },
  header: {
    height: '100%',

  },
  bottomSection:{
    backgroundColor: Color.neutralZeroOne,
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 20,
    borderRadius: Border.br_lg,
    flex: 1
  },
  forgotPassword:{
    marginVertical: 20,
    alignItems: 'flex-end'
  },
  logoDashboard:{
    width: 60.95,
    height: 56,
    marginVertical: 20
  },
  masukGoogle: {
    flexDirection:'row',
  },
  passwordSection:{
    flexDirection: 'row'
  },
  signInPage: {
    overflow: "hidden",
    height: 800,
    width: "100%",
    flex: 1,
    backgroundColor: Color.neutralZeroOne
  },
  textBelumPunyaAkun: {
    ...FontConfig.bodyThree,
    color: Color.neutralColorGrayEight
  },
  textDaftar: {
    ...FontConfig.buttonThree,
    color: Color.primaryMain,
    marginHorizontal: 5,
  },
  textForgotPassword: {
    ...FontConfig.buttonThree,
    color: Color.grayNine
  },
  textMasukGoogle: {
    ...FontConfig.buttonZeroTwo,
    color: Color.grayThirteen,
    marginHorizontal: 15
  },
  textSelamatDatang:{
    ...FontConfig.titleOne,
    color: Color.primaryMain,
    width: '100%'
  },
  textTopSection: {
    ...FontConfig.bodyTwo,
    color: Color.neutralColorGrayEight
  },
  tidakPunyaAkun: {
    flexDirection: 'row',
    marginVertical: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleFormInput:{
    color: Color.secondaryText,
    ...FontConfig.bodyTwo
  },
  topSection: {
    marginHorizontal:20,
  },
  visibiltyButton:{
    top: 20,
    right: 30
  },
  version: {
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 30,
    justifyContent: 'center',
  },
  butuhBantuan: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.neutralZeroTwo,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 8,
  }
});

export default SignInPage;
