import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import OTPTextInput from 'react-native-otp-textinput'
import HeaderRegistration from '../../../components/headerRegistration'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import { useSelector } from 'react-redux'
import RegistrationService from '../../../services/registration'
import AwesomeAlert from 'react-native-awesome-alerts';
import { getRemainingTimeUnitMsTimestamp } from '../../../utils/CountdownTimer'
import dayjs from 'dayjs';
import CustomButton from '../../../components/customButton'

const KodeOTPScreen = ({navigation, route}) => {
    const [code, setCode] = useState('');
    const [timerRunning, setTimerRunning] = useState(true);
    const [timerCount, setTimer] = useState(59)
    const [minutesCount, setMinutesCount] = useState(1);
    const {onPress} = route.params;
    const [alertVerifRegis, setAlertVerifRegis] = useState(false);
    const [alertWrongOTP, setAlertWrongOTP] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [remainingTime, setRemainingTime] = useState({seconds: 0, minutes: 2})
    const {phone} = route.params;
    const [unixTimeNow, setUnixTimeNow] = useState(dayjs().unix() + 120);

    const timerCheck = () => {
        if (timerCount < 0){
            if(minutesCount == 0){
                setTimerRunning(false);
            }else{
                setTimer(59);
                setMinutesCount((oldMinutes)=> oldMinutes -1);
            }
        }
    }

    handleKirimUlang = () => {
        getOtp();
        const interval = setInterval(() => {
            if(timerRunning){
                setTimer((oldTimer)=> oldTimer -1);
            }else{
                clearInterval(interval);
            }
        }, 1000);

        return ()=> clearInterval(interval);

    }

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUnitMsTimestamp(countdown));
    }

    handleLanjutkan = () => {
        setIsLoading(true);
        RegistrationService.verifyOtp({"no_hp": phone, "otp_code": code})
        .then(res=> {
            if(res.data.message == 'kode OTP berhasil diverifikasi.'){
                setAlertVerifRegis(true);
            }else{
                setAlertWrongOTP(true);
            }
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const getOtp = () => {
        RegistrationService.getOtp({"no_hp":phone})
        .then(res=> {
            console.log(res.data);
        })
        .catch(err=> {
            console.log(err);
        })
    }
    useEffect(()=> {
        handleKirimUlang();
    }, []);

    useEffect(()=>{
        timerCheck();
    }, [timerCount])

  return (
    <View style={styles.kodeOTPPage}>
        {onPress == "homepage" ? <HeaderRegistration navigation={navigation} numberStep={5} /> :
        <HeaderWhite navigation={navigation} title="Verifikasi Kode" />
        }
        <View style={styles.topSection}>
            <Text style={styles.textIsiData}>Masukkan kode verifikasi</Text>
            <Text style={styles.textLengkapi}>{`Masukkan kode verifikasi yang telah dikirimkan ke nomor ponsel (Whatsapp) :`} 
                <Text style={{color: Color.grayTen}}> {phone}</Text>
            </Text>
        </View>
        <View style={styles.bottomSection}>
            <View style={{width: '86%'}}><OTPTextInput  inputCount={6} textInputStyle={styles.cellContainer}
            offTintColor={Color.neutralZeroFive} tintColor={Color.neutralZeroSeven} 
            defaultValue={code} handleTextChange={(text) => setCode(text)}
            />
            </View>
            <View style={{height: '8%'}}></View>
            <View style={styles.buttonContinue}>
                <CustomButton
                    onPress={handleLanjutkan} 
                    fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                    width='100%' height={44} text="Lanjutkan"
                    backgroundColor={Color.primaryMain}
                    />
            </View>
            <View style={styles.textBelumDapatKode}>
                <Text style={{...FontConfig.bodyTwo, color: Color.neutralZeroSeven}}>Masih belum dapat kode?</Text><View style={{width: 5}}></View>
                {timerRunning? <Text style={styles.textTimer}>{`0${minutesCount}`}:{timerCount < 10 ?  `0${timerCount}` : `${timerCount}`}</Text> : 
                <>
                <Pressable onPress={()=>{
                    setTimer(59);
                    setMinutesCount(1);
                    setTimerRunning(true);
                    handleKirimUlang();}
                }><Text style={styles.linkKirimUlang}>Kirim Ulang</Text></Pressable></>
                }
            </View>
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
          show={alertVerifRegis}
          showProgress={false}
          title="Berhasil Verifikasi"
          message="Nomor ponsel Anda berhasil diverifikasi"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '40%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setAlertVerifRegis(false);
            if(onPress == "newpassword"){
                navigation.navigate("BuatKataSandi", {phone: phone});
            }else if(onPress == "ubahakun"){
                navigation.navigate("UbahKataSandiProfile");
            }else{
                navigation.popToTop();
            }
          }}
        />
        <AwesomeAlert
          show={alertWrongOTP}
          showProgress={false}
          title="Kode OTP Salah"
          message="Kode OTP yang Anda masukkan tidak benar. Silakan masukkan kode OTP yang telah dikirimkan."
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
            setAlertWrongOTP(false);
          }}
        />
    </View>
  )
}

export default KodeOTPScreen

const styles = StyleSheet.create({
    cellContainer: {
        borderWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 4,
        width: '13%',
        height: '80%'
    },
    kodeOTPPage: {
        flex:1, 
        backgroundColor: Color.neutralZeroOne
    },
    buttonContinue: {
        borderRadius: 20, 
        width: '80%',
    },
    bottomSection: {
        alignItems: 'center',
        marginTop: '8%',
        height: '69%'
    },
    linkKirimUlang: {
        textDecorationLine: 'underline',
        ...FontConfig.titleThree,
        color: Color.title,

    },
    textTimer: {
        ...FontConfig.titleThree,
        color: Color.title,

    },
    topSection: {
        paddingTop: 20,
        paddingHorizontal: 20
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
    textBelumDapatKode: {
        marginTop: '5%',
        flexDirection: 'row'
    },
})