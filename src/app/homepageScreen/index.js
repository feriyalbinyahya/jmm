import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, Dimensions, ScrollView, RefreshControl, Linking, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import AppBarRelawan from '../../components/appBar'
import { Color, FontConfig } from '../../theme'
import IconNoData from '../../assets/images/warning/empty2.png'
import IconApk from '../../assets/images/icon/icon_apk.png'
import IconApkDisable from '../../assets/images/icon/icon_apk_disable.png'
import IconAcara from '../../assets/images/icon/icon_acara.png'
import IconCSR from '../../assets/images/icon/icon_csr.png'
import IconMarkasKomunitas from '../../assets/images/icon/icon_markas_komunitas.png'
import IconPosko from '../../assets/images/icon/icon_posko.png'
import IconFigur from '../../assets/images/icon/icon_figur.png'
import IconPemungutanSuara from '../../assets/images/icon/icon_pemungutan_suara.png'
import IconMarkasKomunitasDisable from '../../assets/images/icon/icon_markas_komunitas_disable.png'
import IconPoskoDisable from '../../assets/images/icon/icon_posko_disable.png'
import IconAcaraDisable from '../../assets/images/icon/icon_acara_disable.png'
import IconAksi from '../../assets/images/icon/icon_aksi.png'
import IconAksiDisable from '../../assets/images/icon/icon_aksi_disable.png'
import IconSimpatisan from '../../assets/images/icon/icon_simpatisan.png'
import IconSimpatisanDisable from '../../assets/images/icon/icon_simpatisan_disable.png'
import CustomCarousel from '../../components/customCarousel'
import ScrollMenuButton from '../../components/scrollMenu'
import LaporanServices from '../../services/laporan'
import Skeleton from '../../components/skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { setJenisLaporan } from '../../redux/laporan'
import { deleteCredentials, setCredentials, setKeaktifan, setPrivacyPolicy } from '../../redux/credentials'
import CardBerita from '../../components/cardBerita'
import CardSurvei from '../../components/cardSurvei'
import SurveiServices from '../../services/survei'
import BeritaServices from '../../services/berita'
import IconWaiting from '../../assets/images/icon/waiting.png'
import IconNonAktif from '../../assets/images/icon/nonaktif.png'
import IconBerita from '../../assets/images/icon/berita_monokrom.png'
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import ProfileServices from '../../services/profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient'
import CustomButton from '../../components/customButton'
import { Box } from 'native-base'
import IconPhoneQR from '../../assets/images/icon/phone_qr.png'
import IconCopy from '../../assets/images/icon/icon_copy.png'
import SimpatisanServices from '../../services/simpatisan'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'
import QRCode from 'react-native-qrcode-svg'
import CustomBottomSheet from '../../components/bottomSheet'
import BeritaDaerah from '../../components/beritaDaerah'
import BeritaDaerahSkeleton from '../../components/beritaDaerah/skeleton'
import CardGradient from '../../components/misi/cardGradient'
import MisiServices from '../../services/misi'
import CardWhite from '../../components/misi/cardWhite'
import IconNoMisi from '../../assets/images/warning/nomisi.png'
import AwesomeAlert from 'react-native-awesome-alerts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
import CardAcara from '../../components/cardAcara'
import AcaraServices from '../../services/acara'
import LoginServices from '../../services/login'
import { VERSION } from '../../utils/environment'
import CardTopik from '../../components/cardTopik'
import CardProgram from '../../components/cardProgram'
import ProgramServices from '../../services/program'


const HomepageScreen = ({navigation}) => {
    const [dataProgram, setDataProgram] = useState([]);
    const [programIsLoading, setProgramIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [showAlertPrivacyPolicy, setShowAlertPrivacyPolicy] = useState(false);
    const [privacyPolicyDisabled, setPrivacyPolicyDisabled] = useState(true);
    const [showAlertVersionWrong,setShowAlertVersionWrong] = useState(false);
    const [statusAktif, setStatusAktif] = useState('Active');
    const dispatch = useDispatch();
    var status = useSelector((state)=>{
        return state.credential.status;
    })

    const isReferalOrganization = useSelector((state)=>{
        return state.credential.isReferalOrganization;
    })
    const statusPolicy = useSelector((state)=>{
        return state.credential.statusPolicy;
    })

    handleLogout = () => {
        resetCredentials();
    }

    const resetCredentials = () => {
        dispatch(
          deleteCredentials()
        );
    }

    const openGooglePlay = () => {
        Linking.openURL(
          'http://play.google.com/store/apps/details?id=com.gensatset'
        );
    };

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

    handleRefreshToken = () => {
        ProfileServices.refreshToken({})
        .then(res=> {
          if(res.data.message == "Refresh token berhasil."){
            status = res.data.data.status_persetujuan;
            saveCredentials(res.data.data);
            saveKeaktifan(res.data.data.status);
            setStatusAktif(res.data.data.status);
          }
        })
        .catch(err=> {
          console.log(err);
        })
      }

    const saveCredentials = (data) => {
        console.log("update credential");
        console.log(data);
        dispatch(
          setCredentials({fotoOrganisasi: data.foto_organisasi, namaOrganisasi: data.nama_organisasi, idOrganisasi: data.id_organisasi, idUser: data.id_user, idRelawan: data.id_relawan,
          isNoHpVerified: data.is_no_hp_verified, fullname: data.nama_user, noHp: data.no_hp, 
          status: data.status_persetujuan, token: data.token, fotoProfil: data.foto_profil, isReferalOrganization: data.is_referal_organization, statusPolicy: data.status_policy})
        );
        AsyncStorage.setItem('token', data.token);
    }

    const saveKeaktifan = (data) => {
        dispatch(
          setKeaktifan({keaktifan: data})
        );
    }

    const getProgramTerbaru = () => {
        setProgramIsLoading(true);
        ProgramServices.getProgramHomepage()
        .then(res=>{
            setDataProgram(res.data.data.data);
            setProgramIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
            setProgramIsLoading(false);
        })
    }


    const [selectedMenuBeritaTerkini, setSelectedMenuBeritaTerkini] = useState("Terbaru");
    const [selectedMenuBeritaOrganisasi, setSelectedMenuBeritaOrganisasi] = useState("Terbaru");

    const menus = ["Terbaru", "Kesehatan", "Pendidikan", "Politik", "Olahraga"];
    const width = Dimensions.get('window').width;


    const savePrivacyPolicy = () => {
        dispatch(
            setPrivacyPolicy()
        );
    }

    const onRefresh = React.useCallback(async () => {
        handleRefreshToken();
        setRefreshing(true);
        if(status == "Diterima"){
            //fetchAllDataHomepage();
            getProgramTerbaru();
        }
        getAppVersion();
        getReferalData();
        setRefreshing(false);
      }, [refreshing]);

    useFocusEffect(
        React.useCallback(() => {
            handleRefreshToken();
            if(status == "Diterima"){
                //fetchAllDataHomepage();
                getProgramTerbaru();
            }
            getReferalData();
        }, [])
    );

    const [referal, setReferal] = useState("");
    const [isLoadingReferal, setIsLoadingReferal] = useState(false);
    const [isModalVisibleReferal, setModalVisibleReferal] = useState(false);
    const [isPrivacySelected, setIsPrivacySelected] = useState(false);
    const skeletonProgram = ["1", "2", "3"];

    const getReferalData = () =>{
        setIsLoadingReferal(true);
        ProfileServices.getProfile()
        .then(res=>{
            setReferal(res.data.data[0].kode_referal);
            setIsLoadingReferal(false);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const QRView = ({}) => {
        return(
        <View style={{alignItems: 'center', padding: 20}}>
            {/**<Image style={{width: 180, height: 180}} source={qr} /> **/}
            <QRCode
            value={referal}
            />
            {/**<View style={{height: 10}}></View>
            <CustomButton 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            width='100%' height={44} text="Share"
            backgroundColor={Color.primaryMain}
            />*/}
        </View>
        );
    }

    const handlePrivacyDisabled = () => {
        ProfileServices.privacyPolicy()
        .then(res=>{
            savePrivacyPolicy();
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    const handleSalinTautan = () => {
        Clipboard.setString(referal);
        Snackbar.show({
            text: 'Referal telah disalin',
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    useEffect(()=>{
        getAppVersion();
        if(statusPolicy == 1 || statusPolicy == "1"){

        }else{
            setShowAlertPrivacyPolicy(true);
        }
    }, [])
  return (
    <SafeAreaView style={{backgroundColor: Color.neutralZeroOne, flex: 1}}>
        <CustomBottomSheet children={<QRView />} 
        isModalVisible={isModalVisibleReferal} setModalVisible={setModalVisibleReferal} 
        title="Kode QR Referral" />
        <AppBarRelawan navigation={navigation} isReferal={isReferalOrganization} />
        

        <ScrollView style={styles.scrollView} refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
            {
                status != "Diterima" ? 
                <><View style={styles.waitingStatus}>
                    <Image source={IconWaiting} style={{width: 34, height: 34}} />
                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{...FontConfig.buttonThree, color: Color.neutralTen}}>Akun berhasil dibuat!</Text>
                        <Text style={{...FontConfig.bodyThree, color: Color.neutralTen}}>Silahkan tunggu persetujuan akunmu untuk dapat menggunakan fitur.</Text>
                    </View>
                </View>
                <View style={{height: 80}}></View>
                </>
                : statusAktif != 'Active' ? 
                <><View style={styles.waitingStatus}>
                    <Image source={IconNonAktif} style={{width: 33.41, height: 34.95}} />
                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{...FontConfig.buttonThree, color: Color.neutralTen}}>Akun anda dinonaktifkan!</Text>
                        <Text style={{...FontConfig.bodyThree, color: Color.neutralTen}}>Akunmu telah dinonaktifkan, silahkan hubungi organisasimu untuk informasi selengkapnya.</Text>
                    </View>
                </View>
                <View style={{height: 100}}></View>
                </> : <></>
            }
            <View style={{height: 20}}></View>
            {status == "Diterima" && statusAktif == 'Active' ? !programIsLoading ? <View style={{paddingHorizontal: 20}}>
                <Text style={{...FontConfig.buttonFour, color: "#111111"}}>Program Sedang Berjalan</Text>
                {dataProgram.map((item, index)=>{
                    return(
                        <CardProgram key={index} berita={item.judul} baru={false} tanggal={item.tanggal_dibuat} id={item.id_csr_program} image={item.cover} navigation={navigation}/>
                    )
                })}

            </View> :
            <View style={{paddingHorizontal: 20}}>
            <Text style={{...FontConfig.buttonFour, color: "#111111"}}>Program Sedang Berjalan</Text>
            {skeletonProgram.map((item, index)=>{
                return(
                    <Skeleton key={index} width={width-40} height={160} style={{borderRadius: 10, marginVertical: 10}} />
                )
            })}

            </View>
             :
             <></>
             }
            
            
            <View style={{height: 10}}></View>
        </ScrollView>
        {/**<AwesomeAlert
          show={showAlertPrivacyPolicy}
          showProgress={false}
          title="Butuh Persetujuanmu nih Sebelum Lanjut.."
          customView={<View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...FontConfig.bodyTwo, color: '#7B7B7B', width: '80%'}}>
            Dengan menceklis kotak ini, kamu menyetujui 
                <Text onPress={()=>Linking.openURL("https://gensatset.org/syarat-ketentuan")} style={{color: Color.purple, textDecorationLine: 'underline'}}>{` Syarat & Ketentuan`} </Text>
                dan 
                <Text onPress={()=>Linking.openURL("https://gensatset.org/kebijakan-privasi")} style={{color: Color.purple, textDecorationLine: 'underline'}}>{` Kebijakan Privasi`} </Text>
                GEN Sat Set
            </Text>
            <Pressable onPress={()=>setPrivacyPolicyDisabled(!privacyPolicyDisabled)}>
                {!privacyPolicyDisabled ? <Ionicons name="checkbox" color={Color.primaryMain} size={22} /> 
                        : <View style={styles.checkboxOff}></View>}
            </Pressable>
          </View>}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Kirim"
          cancelText="Tutup"
          titleStyle={{...FontConfig.titleTwo, color: Color.hitam}}
          messageStyle={{...FontConfig.bodyTwo, color: Color.grayEight}}
          confirmButtonStyle={privacyPolicyDisabled ? {width: '50%', height: '80%',
            alignItems: 'center', backgroundColor: Color.grayFour,  borderRadius: 26,} : {width: '50%', height: '80%',
            alignItems: 'center', backgroundColor: Color.primaryMain,  borderRadius: 26,}}
          cancelButtonStyle={{width: '40%', height: '80%',  alignItems: 'center', borderColor: Color.primaryMain,
          borderWidth:1, borderRadius: 26, backgroundColor: Color.neutralZeroOne}}
          confirmButtonTextStyle={privacyPolicyDisabled ? {...FontConfig.buttonThree, color: Color.disable} : 
        {...FontConfig.buttonThree, color: Color.neutralZeroOne}}
        cancelButtonTextStyle={{color: Color.primaryMain, ...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            if(!privacyPolicyDisabled){
                handlePrivacyDisabled();
                setShowAlertPrivacyPolicy(false);
            }
          }}
          onCancelPressed={()=>{
            setShowAlertPrivacyPolicy(false);
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
        /> */}
    </SafeAreaView>
  )
}

export default HomepageScreen

const styles = StyleSheet.create({
    laporanSection: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#EEEEEE',
    },
    imageNoData : {
        width:120,
        height: 88
    },
    checkboxOff: {
        borderWidth: 1.5,
        borderColor: Color.secondaryText,
        width: 16,
        height: 16,
        backgroundColor: Color.neutralZeroOne,
        marginHorizontal: 3
    },
    scrollView: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: Color.neutralZeroOne
    }, 
    beritaSection: {
        paddingVertical: 22,
        borderColor: '#EEEEEE',
        borderBottomWidth: 6
    },
    beritaDaerahSection: {
        paddingHorizontal: 20,
        paddingVertical: 22,
    },
    surveiSection: {
        paddingHorizontal: 0,
        paddingVertical: 22,
        borderColor: '#EEEEEE',
        borderBottomWidth: 6
    },
    carouselSection: {
        paddingVertical: 20
    },
    menuLaporan: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 10,
        paddingVertical: 20,
        rowGap: 20
    },
    dataKawan: {
        height: 60,
        marginHorizontal: 20,
        borderRadius: 6,
        paddingVertical: 5,
        backgroundColor: Color.purple
    },
    dataKawanDisable: {
        height: 60,
        marginHorizontal: 20,
        borderRadius: 6,
        paddingVertical: 5,
        backgroundColor: Color.neutralZeroThree
    },
    iconLaporan: {
        width: 45,
        height: 45,
    },
    itemMenu: {
        alignItems: 'center',
        width: '22%',
    },
    textMenu: {
        ...FontConfig.bodyFive,
        color: Color.title,
        marginTop: 10,
        textAlign: 'center'
    },
    textLihatSelengkapnya:{
        ...FontConfig.buttonThree,
        color: Color.primaryMain,
        
    },
    waitingStatus: {
        padding: 15,
        backgroundColor: '#FFFBE6',
        flexDirection: 'row',
        marginBottom: 15,
        width: '90%',
        position: 'absolute',
        zIndex: 1, top: 10, left: '5%' ,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#FFFBE6'
    }
})