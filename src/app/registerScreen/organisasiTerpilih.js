import { StyleSheet, Text, View, Pressable, Image, Button, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontConfig } from '../../theme'
import iconArrowLeft from '../../assets/images/icon/icon_arrow_left.png'
import ImageGanjar from '../../assets/images/ganjar.png'
import Image1 from '../../assets/images/example/image1.png'
import Image2 from '../../assets/images/example/image2.png'
import Image3 from '../../assets/images/example/image3.png'
import Image4 from '../../assets/images/example/image4.png'
import Image5 from '../../assets/images/example/image5.png'
import RegistrationService from '../../services/registration'
import { useSelector } from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts';
import ImageServices from '../../services/getImage'
import CustomButton from '../../components/customButton'

const OrganisasiTerpilihScreen = ({navigation, route}) => {
    const images = [Image1, Image2, Image3, Image4, Image5];
    const numberOfMember = 30
    const {idOrganisasi, kodeReferalDigunakan, photo} = route.params;
    const [dataOrganisasi, setDataOrganisasi] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const [messageFailed, setMessageFailed] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dataRegistrasi = useSelector((state)=> {
        return state.authRegistration;
    })

    const phone = useSelector((state)=> {
        return state.authRegistration.phone;
    })

    handleLanjutkan = () => {
        setIsLoading(true);
        RegistrationService.registration({
            "no_hp": dataRegistrasi.phone,
            "password": dataRegistrasi.password,
            "confirm_password": dataRegistrasi.password,
            "nama_lengkap": dataRegistrasi.fullname,
            "username": dataRegistrasi.username,
            "pekerjaan": dataRegistrasi.job,
            "bio": dataRegistrasi.bio,
            "jenis_kelamin": dataRegistrasi.gender,
            "tanggal_lahir": dataRegistrasi.dateOfBirth,
            "alamat_lengkap": dataRegistrasi.alamat.address,
            "provinsi": dataRegistrasi.alamat.provinsi,
            "kabkot": dataRegistrasi.alamat.kota,
            "kecamatan": dataRegistrasi.alamat.kecamatan,
            "kelurahan": dataRegistrasi.alamat.kelurahan,
            "rt": dataRegistrasi.alamat.rt,
            "rw": dataRegistrasi.alamat.rw,
            "kodepos": dataRegistrasi.alamat.kodepos,
            "foto_profil": photo,
            "organisasi": idOrganisasi,
            "kode_referal_digunakan": kodeReferalDigunakan
        })
        .then(res=> {
            console.log(res.data.message);
            if(res.data.message == "Registrasi sukses."){
                setShowAlert(true);
            }else{
                setShowAlertFailed(true);
                setMessageFailed(res.data.message);
            }
            setIsLoading(false);
        })
        .catch(err=> {
            console.log(err);
        })
        
    }

    const getDataOrganisasi = () => {
        RegistrationService.getDataOrganisasi(idOrganisasi)
        .then(res=>{
            if(res.data.data != []){
                console.log(res.data.data);
                setDataOrganisasi(res.data.data[0])
            }
        })
        .catch(err=> {
            console.log(err);
        })
    }

    useEffect(()=> {
        getDataOrganisasi();
    },[]);

    const ImageOrganisasi = ({id}) => {
        const [dataImage, setDataImage] = useState("");
        const [isLoading, setIsLoading] = useState(false);

        const getDataImage = () =>{
            setIsLoading(true);
            ImageServices.getImage("organisasi", id)
            .then(res=>{
              setDataImage(res.data.data);
              setIsLoading(false);
            })
            .catch(err=>{
              console.log(err);
            })
          }
    
          useEffect(()=>{
            getDataImage();
          }, [])
        return (
            <Image style={styles.imageOrganisasi} source={{uri: `data:image/png;base64,${dataImage}`}} />
        );
    }

    const ImageRelawan = ({id}) => {
        const [dataImage, setDataImage] = useState("");
        const [isLoading, setIsLoading] = useState(false);

        const getDataImage = () =>{
            setIsLoading(true);
            ImageServices.getImage("relawan", id)
            .then(res=>{
              setDataImage(res.data.data);
              setIsLoading(false);
            })
            .catch(err=>{
              console.log(err);
            })
          }
    
          useEffect(()=>{
            getDataImage();
          }, [])
        return (
            <Image style={styles.imageMember} source={{uri: `data:image/png;base64,${dataImage}`}} />
        );
    }

  return (
    <View style={styles.organisasiTepilihPage}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
      </View>
      { Object.keys(dataOrganisasi).length !=0 ?
      (<View style={{justifyContent: 'space-between'}}>
        <View style={styles.section}>
            <Text style={styles.textAndaAkan}>Anda akan bergabung dengan..</Text>
            <View style={{height: 15}}></View>
            <ImageOrganisasi id={dataOrganisasi.foto_organisasi} />
            <Text style={styles.textNamaOrganisasi}>{dataOrganisasi.nama_organisasi}</Text>
            <Text style={styles.textAnggota}>Anggota :</Text>
            <View style={styles.memberPhotos}>
                {dataOrganisasi.relawan.slice(0, 6).map((item, index) => {
                    return <ImageRelawan id={item.foto_profil} key={index} />
                })}
                <View style={{width:'2%'}}></View>
                <Text style={styles.textNumberOfMember}>{parseInt(dataOrganisasi.jumlah_anggota)%10 == 0 ?
                dataOrganisasi.jumlah_anggota : `${dataOrganisasi.jumlah_anggota}+`}</Text>
            </View>
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}>
                <CustomButton
                    onPress={handleLanjutkan} 
                    fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                    width='100%' height={44} text="Daftar"
                    backgroundColor={Color.primaryMain}
                    />
            </View>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Berhasil mendaftar!"
          message="Silakan verifikasi nomor ponsel untuk langkah terakhir"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Lanjutkan"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyTwo, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlert(false);
            navigation.navigate('KodeOTPRegister', {onPress: "homepage", phone: phone});
          }}
        />
        <AwesomeAlert
          show={showAlertFailed}
          showProgress={false}
          title="Gagal mendaftar!"
          message={messageFailed}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyTwo, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertFailed(false);
          }}
        />
      </View>)
      : <View style={{height: '80%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.primaryMain} /></View>
      }
    </View>
  )
}

export default OrganisasiTerpilihScreen

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
    header: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: Color.grayOne,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#F0F0F0',
        elevation: 10,
        borderWidth: 1,
        borderColor: Color.lightBorder
    },
    organisasiTepilihPage: {
        backgroundColor: Color.neutralZeroOne,
        height: '100%',
    },
    iconArrowLeft: {
        width: 24,
        height: 24
    },
    imageOrganisasi: {
        width: 192,
        height: 186,
        borderRadius: 6
    },
    imageMember: {
        width: 38,
        height: 38,
        marginLeft: -10,
        borderRadius: 20,
    },
    memberPhotos :{
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center'
    },
    section: {
        alignItems: 'center',
        marginTop: '20%',
        height: '69%'
    },
    textAndaAkan: {
        ...FontConfig.bodyOne,
        color: Color.primaryText
    },
    textAnggota: {
        ...FontConfig.bodyTwo,
        color: Color.graySeven
    },
    textNamaOrganisasi: {
        ...FontConfig.titleFive,
        color: Color.title,
        textAlign: 'center',
        width: '80%',
        marginVertical: 15
    },
    textNumberOfMember: {
        ...FontConfig.bodyTwo
    },
    textTitle: {
        ...FontConfig.titleOne,
        color: Color.title,
        marginLeft: -40,
        
    },
    
})