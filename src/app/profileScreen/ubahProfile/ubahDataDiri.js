import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderWhite from '../../../components/header/headerWhite'
import { Color, FontConfig } from '../../../theme'
import CustomInput from '../../../components/customInput'
import FormErrorMessage from '../../../components/alert/formErrorMessage'
import { useDispatch } from 'react-redux'
import { setDataDiri } from '../../../redux/account'
import ProfileServices from '../../../services/profile'
import RegistrationService from '../../../services/registration'
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomTextArea from '../../../components/customTextArea'
import CustomButton from '../../../components/customButton'
import CustomInputAddon from '../../../components/customInputAddon'
import IconInstagram from '../../../assets/images/icon/icon_instagram.png';
import IconTiktok from '../../../assets/images/icon/icon_tiktok.png';
import IconTwitter from '../../../assets/images/icon/icon_twitter.png';
import IconFacebook from '../../../assets/images/icon/icon_facebook.png';

const UbahDataDiriScreen = ({navigation, route}) => {
    const {namaLengkap, userName, biodata, medsos} = route.params;
    const [fullname, setFullname] = useState(namaLengkap);
    const [isFullname, setIsFulname] = useState(true);
    const [username, setUsername] = useState(userName);
    const [isUsername, setIsUsername] = useState(true);
    const [bio, setBio] = useState(biodata);
    const [isBio, setIsBio] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isContinue, setIsContinue] = useState(true);
    const [instagram, setInstagram] = useState(medsos[0].instagram);
    const [tiktok, setTiktok] = useState(medsos[0].tiktok);
    const [twitter, setTwitter] = useState(medsos[0].twitter);
    const [facebook, setFacebook] = useState(medsos[0].facebook);

    const dispatch = useDispatch();

    changeDataDiri = () => {
        ProfileServices.putFullnameUsername({"nama_lengkap": fullname, "username": username, "bio": bio, 
        "facebook": facebook, "instagram": instagram, "tiktok": tiktok, "twitter": twitter})
        .then(res=> {
            console.log(res.data);
            if(res.data.status == 'success'){
                setIsLoading(false);
                navigation.goBack();
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    handleLanjutkan = () => {
        if(username != userName || fullname != namaLengkap || bio != biodata || facebook != medsos[0].facebook ||
            instagram != medsos[0].instagram || tiktok != medsos[0].tiktok || twitter != medsos[0].twitter
            ){
            setIsLoading(true);
            if(username == userName){
                console.log("edit");
                changeDataDiri();
            }else{
                if(username != ''){
                    RegistrationService.checkUsername({"username": username})
                    .then(res=>{
                        if(res.data.message == 'Username belum dipakai.'){
                            setIsUsername(true);
                            changeDataDiri();
                        }else{
                            setIsUsername(false);
                            setIsLoading(false);
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }else{
                    changeDataDiri();
                }
            }
        }else{
            navigation.goBack();
        }

    }

    handleValidation = () => {
        if(fullname && bio && isBio && (facebook || instagram || tiktok || twitter)){
          setIsContinue(true);
        }else{
          setIsContinue(false);
        }
    }

    usernameValidation = () => {
        //checking to database about unique username
    }

    useEffect(()=>{
        if(bio.length > 280){
          setIsBio(false);
        }else{
          setIsBio(true);
        }
    }, [bio])

    useEffect(()=>{
        handleValidation();
    }, [bio, fullname, instagram, facebook, tiktok, twitter])
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite navigation={navigation} title="Ubah Data Diri" />
      <ScrollView style={styles.container}>
        <Text style={styles.textUntukNama}>Untuk nama lengkap, 
        harap gunakan nama asli untuk memudahkan verifikasi.</Text>
        <Text style={styles.titleFormInput}>Nama Lengkap</Text>
        <CustomInput inputNotWrong={isFullname} value={fullname} setValue={setFullname} placeholder="Masukkan nama lengkapmu" />
        <Text style={styles.titleFormInput}>{`Username (Optional)`}</Text>
        <CustomInput value={username} setValue={setUsername} placeholder="ex: ganjarpranowo" />
        {isUsername? <></> : <FormErrorMessage text="Username sudah diapakai." />}
        <Text style={styles.titleFormInput}>Tentangmu</Text>
        <CustomTextArea value={bio} setValue={setBio} inputNotWrong={isBio} type='text' width='100%'
            placeholder="Masukkan tentang dirimu dan komunitas yang kamu ikuti." />
        <Text style={{...styles.textMasukanDeskripsi, color: isBio ? Color.secondaryText : Color.danger}}>
        Maksimal 280 karakter.
        </Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Instagram</Text>
        <View style={{height: 5}}></View>
        <CustomInputAddon placeholder="Nama akun/username" 
        value={instagram} setValue={setInstagram}
        leftChild={<Image source={IconInstagram} style={styles.iconStyle}
        />} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tiktok</Text>
        <View style={{height: 5}}></View>
        <CustomInputAddon placeholder="Nama akun/username" 
        value={tiktok} setValue={setTiktok}
        leftChild={<Image source={IconTiktok} style={styles.iconStyle}
        />} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Twitter</Text>
        <View style={{height: 5}}></View>
        <CustomInputAddon placeholder="Nama akun/username" 
        value={twitter} setValue={setTwitter}
        leftChild={<Image source={IconTwitter} style={styles.iconStyle}
        />} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Facebook</Text>
        <View style={{height: 5}}></View>
        <CustomInputAddon placeholder="Nama akun/username" 
        value={facebook} setValue={setFacebook}
        leftChild={<Image source={IconFacebook} style={styles.iconStyle}
        />} />
        <View style={{height: 30}}></View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}>
            <CustomButton
                onPress={handleLanjutkan} 
                fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                width='100%' height={44} text="Simpan Perubahan"
                disabled={!isContinue}
                backgroundColor={Color.primaryMain}
                />
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
          show={!isUsername}
          showProgress={false}
          title="Username tidak sesuai"
          message="Username yang Anda masukkan sudah dipakai sebelumnya. Silakan masukkan username yang lain."
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
            setIsUsername(true);
          }}
        />
    </View>
  )
}

export default UbahDataDiriScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '80%'
    },
    textUntukNama: {
        ...FontConfig.bodyTwo,
        color: Color.secondaryText
    },
    titleFormInput:{
        color: Color.secondaryText,
        ...FontConfig.bodyTwo,
        marginTop: 10,
        marginBottom: 1
    },
    textMasukanDeskripsi: {
        ...FontConfig.bodyThree,
        marginVertical: 5
    },
    iconStyle: {
        width: 20,
        height: 20,
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