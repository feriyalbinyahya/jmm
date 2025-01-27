import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, Dimensions, ScrollView, RefreshControl, Linking, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import AppBarRelawan from '../../components/appBar'
import { Color, FontConfig } from '../../theme'
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


const HomepageScreen = ({navigation}) => {
    const [laporanJenis, setLaporanJenis] = useState([]);
    const [dataBeritaTerkini, setDataBeritaTerkini] = useState([]);
    const [dataMisi, setDataMisi] = useState([]);
    const [dataBeritaOrganisasi, setDataBeritaOrganisasi] = useState([]);
    const [beritaTerkiniLoading, setBeritaTerkiniLoading] = useState(false);
    const [beritaOrganisasiLoading, setBeritaOrganisasiLoading] = useState(false);
    const [laporanLoading, setLaporanLoading] = useState(false);
    const [surveiLoading, setSurveiLoading] = useState(false);
    const [allSurvei, setAllSurvei] = useState([]);
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
            console.log(res.data);
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
        dispatch(
          setCredentials({fotoOrganisasi: data.foto_organisasi, namaOrganisasi: data.nama_organisasi, idOrganisasi: data.id_organisasi, idUser: data.id_user,
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

    const BeritaView = ({data, size}) => {
        return (
            <>
            {data?.map((item, index)=> {
                return(
                    <View key={index} style={{width: size}}>
                        <CardBerita topik={item["kategori"]}
                        tanggal={item["tanggal"]} 
                        image={item["cover_berita"]} 
                        berita={item["judul"]}
                        id={item["id_berita"]}
                        navigation={navigation}
                        />
                    </View>
                )
              })}
            </>
        )
    }

    const DiskusiView = ({data, size}) => {
        return (
            <>
            {data?.map((item, index)=> {
                return(
                    <View key={index} style={{width: size}}>
                        <CardTopik topik={item["kategori"]}
                        tanggal={item["tanggal"]} 
                        berita={item["judul"]}
                        id={item["id_berita"]}
                        navigation={navigation}
                        />
                    </View>
                )
              })}
            </>
        )
    }


    const MisiView = ({data, size}) => {
        return (
            <>
            {data?.map((item, index)=> {
                return(
                    <View key={index} style={{width: size}}>
                        {item.tingkat_kepentingan == "Sangat Penting" ? 
                        <CardGradient status={item.status_konfirmasi} navigation={navigation} is_important={true} publish_date={item.tanggal_publish} deskripsi={item.deskripsi} id={item.id_misi} kategori={item.kategori[0].nama_kategori} judul={item.judul} expired_date={item.batas_waktu} /> :
                        <CardWhite status={item.status_konfirmasi} navigation={navigation} is_important={false} publish_date={item.tanggal_publish} deskripsi={item.deskripsi} id={item.id_misi} kategori={item.kategori[0].nama_kategori} judul={item.judul} expired_date={item.batas_waktu} />
                        }
                    </View>
                )
              })}
            </>
        )
    }

    const SurveiView = ({data, size}) => {
        return (
            <>
            {data?.map((item, index)=> {
                return(
                    <View key={index} style={{width: size, marginHorizontal: 10}}>
                        <CardSurvei navigation={navigation} id={item.id_survey} judul={item.judul} image={item.cover_survey} />
                    </View>
                )
              })}
            </>
        )
    }

    const SurveiSkeleton = () => {
        return (
            <View style={{padding: 10, alignItems: 'center'}}>
                <Skeleton style={{borderRadius: 8}} width={150} height={130} />
                <View style={{height:10}}></View> 
                <Skeleton style={{borderRadius: 6}} width={150} height={15} />
                <View style={{height:10}}></View>
                <Skeleton style={{borderRadius: 10}} width={150} height={30} />
            </View>
        )
    }
    const BeritaSkeleton = () => {
        return (
            <Skeleton style={{borderRadius: 8, marginHorizontal: 8,
                marginVertical: 5,}} width={width*0.67} height={4*width/3} />
        )
    }

    const getLaporanJenisData = () => {
        setLaporanLoading(true);
        LaporanServices.getLaporanJenis()
        .then(res=>{
            if(res.data.message != "Token expired."){
                setLaporanJenis(res.data.data);
                setLaporanLoading(false);
            }else{
                handleLogout();
            }
        })
        .catch(err=> {
            console.log(err);
            setLaporanLoading(false);
        })
    }

    const getBeritaTerkini = () => {
        setBeritaTerkiniLoading(true);
        BeritaServices.getBeritaHomepage("terkini")
        .then(res=>{
            setDataBeritaTerkini(res.data.data);
            setBeritaTerkiniLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setBeritaTerkiniLoading(false);
        })
    }

    const getBeritaOrganisasi = () => {
        setBeritaOrganisasiLoading(true);
        BeritaServices.getBeritaHomepage("organisasi")
        .then(res=>{
            setDataBeritaOrganisasi(res.data.data);
            setBeritaOrganisasiLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setBeritaOrganisasiLoading(false);
        })
    }

    const getAllSurveyData = () => {
        setSurveiLoading(true);
        SurveiServices.getAllSurvei()
        .then(res=> {
            if(res.data.message != "Token expired."){
                setAllSurvei(res.data.data);
                setSurveiLoading(false);
            }else{
                handleLogout();
            }
        })
        .catch(err=> {
            console.log(err);
            setSurveiLoading(false);
        })
    }

    const getAllMisiData = () => {
        MisiServices.getMisiHomepage()
        .then(res=>{
            setDataMisi(res.data.data);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }


    const [selectedMenuBeritaTerkini, setSelectedMenuBeritaTerkini] = useState("Terbaru");
    const [selectedMenuBeritaOrganisasi, setSelectedMenuBeritaOrganisasi] = useState("Terbaru");

    const menus = ["Terbaru", "Kesehatan", "Pendidikan", "Politik", "Olahraga"];
    const width = Dimensions.get('window').width;

    const saveJenisLaporan = (id, nama, deskripsi, desc_required, is_estimasi_partisipan_required, is_tag_kawan) => {
        dispatch(
            setJenisLaporan({id: id, nama: nama, deskripsi: deskripsi, desc_required: desc_required,
                is_estimasi_partisipan_required: is_estimasi_partisipan_required, is_tag_kawan: is_tag_kawan})
        );
    }

    const savePrivacyPolicy = () => {
        dispatch(
            setPrivacyPolicy()
        );
    }

    const onRefresh = React.useCallback(async () => {
        handleRefreshToken();
        setRefreshing(true);
        getLaporanJenisData();
        if(status == "Diterima"){
            getAllSurveyData();
            getBeritaOrganisasi();
            //fetchAllDataHomepage();
        }
        getBeritaTerkini();
        getAllMisiData();
        getAppVersion();
        getReferalData();
        setRefreshing(false);
      }, [refreshing]);

    useFocusEffect(
        React.useCallback(() => {
            getLaporanJenisData();
            handleRefreshToken();
            if(status == "Diterima"){
                getAllSurveyData();
                getBeritaOrganisasi();
                //fetchAllDataHomepage();
            }
            getBeritaTerkini();
            getAllMisiData();
            getReferalData();
        }, [])
    );

    const [referal, setReferal] = useState("");
    const [isLoadingReferal, setIsLoadingReferal] = useState(false);
    const [isModalVisibleReferal, setModalVisibleReferal] = useState(false);
    const [isPrivacySelected, setIsPrivacySelected] = useState(false);

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
            console.log(res.data);
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
        console.log(statusPolicy);
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
            
            {/** laporan section */}
            <View style={styles.laporanSection}>
            <View style={{height: 10}}></View>
                <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Laporan</Text>
                {!laporanLoading ?  <View style={styles.menuLaporan}>
                    {laporanJenis.length != 0 ? laporanJenis.map((item, index) => {
                        if(status == "Diterima" && statusAktif == 'Active'){
                        return (
                            <Pressable key={index} onPress={()=>{ 
                                saveJenisLaporan(item.id_jenis_laporan, item.jenis_laporan, item.deskripsi, item.desc_required, 
                                    item.is_estimasi_partisipan_required,
                                    item.is_tag_kawan);
                                navigation.navigate("Laporan");
                                }} style={styles.itemMenu}>
                                <Image source={item.jenis_laporan == "APK" ?  IconApk : 
                                item.jenis_laporan == 'Acara' ? IconAcara : item.jenis_laporan == "Markas Komunitas" ? 
                                IconMarkasKomunitas : item.jenis_laporan == "Posko" ? IconPosko : item.jenis_laporan == "Perhitungan Suara" ? IconPemungutanSuara : IconAksi} style={styles.iconLaporan} />
                                <Text style={styles.textMenu}>{item.jenis_laporan}</Text>
                            </Pressable>
                        )}
                        else{
                            return(
                                <View key={index} style={styles.itemMenu}>
                                    <Image source={item.jenis_laporan == "APK" ?  IconApkDisable : 
                                    item.jenis_laporan == 'Acara' ? IconAcaraDisable : item.jenis_laporan == "Markas Komunitas" ? 
                                    IconMarkasKomunitasDisable : item.jenis_laporan == "Posko" ? IconPoskoDisable : IconAksiDisable} style={styles.iconLaporan} />
                                    <Text style={styles.textMenu}>{item.jenis_laporan}</Text>
                                </View> 
                            )
                        }
                    }) : <></> }
                    {status == "Diterima" && statusAktif == 'Active' ? <>
                    <Pressable onPress={()=>{ 
                        //saveJenisLaporan(item.id_jenis_laporan, item.jenis_laporan, item.deskripsi, item.desc_required);
                        navigation.navigate("ListCSR");
                        }} style={styles.itemMenu}>
                        <Image source={IconCSR} style={styles.iconLaporan} />
                        <Text style={styles.textMenu}>CSR</Text>
                    </Pressable>
                    {/**<Pressable onPress={()=>{ 
                        //saveJenisLaporan(item.id_jenis_laporan, item.jenis_laporan, item.deskripsi, item.desc_required);
                        navigation.navigate("ListFigur");
                        }} style={styles.itemMenu}>
                        <Image source={IconFigur} style={styles.iconLaporan} />
                        <Text style={styles.textMenu}>Figur</Text>
                    </Pressable>*/
                    /**<Pressable onPress={()=>{ 
                        //saveJenisLaporan(item.id_jenis_laporan, item.jenis_laporan, item.deskripsi, item.desc_required);
                        navigation.navigate("LaporanOffline");
                        }} style={styles.itemMenu}>
                        <Image source={IconFigur} style={styles.iconLaporan} />
                        <Text style={styles.textMenu}>Laporan Offline</Text>
                    </Pressable>*/}
                    </>
                     :
                    <></>
                    }
                </View> : <Skeleton height={100} width={width-40} style={{borderRadius: 8, marginVertical: 16}} />
                }
            </View>
            {status == "Diterima" && statusAktif == 'Active' ? <Box style={styles.dataKawan} shadow={1}>
                <View style={{flexDirection: 'row', paddingHorizontal: 20, 
                justifyContent: 'space-between', paddingVertical: 5, alignItems: 'center'}}>
                    <View>
                        <Text style={{...FontConfig.titleThree, color: Color.neutralZeroOne}}>Ayo datakan Kawanmu</Text>
                        <Text style={{...FontConfig.captionOne, color: Color.neutralZeroOne}}>Kumpulkan poinnya!</Text>
                    </View>
                    <CustomButton onPress={()=>navigation.navigate("ReferalSimpatisan")} borderRadius={16} text="Ajak Kawan" height="85%" width={99} 
                    backgroundColor={Color.neutralZeroOne}
                     borderColor={Color.primaryMain} fontStyles={{...FontConfig.buttonThree, color: Color.primaryMain}} />
                </View>
            </Box> : 
            <Box style={styles.dataKawanDisable} shadow={1}>
                <View style={{flexDirection: 'row', paddingHorizontal: 20, 
                justifyContent: 'space-between', paddingVertical: 5, alignItems: 'center'}}>
                    <View>
                        <Text style={{...FontConfig.titleThree, color: '#757575'}}>Ayo datakan Kawanmu</Text>
                        <Text style={{...FontConfig.captionOne, color: Color.grayEight}}>Kumpulkan poinnya!</Text>
                    </View>
                    <CustomButton borderRadius={16} text="Data Kawan" height={32} width={99} 
                    backgroundColor={Color.neutralZeroSix}
                    borderColor={Color.primaryMain} fontStyles={{...FontConfig.buttonThree, color: Color.neutralZeroOne}} />
                </View>
            </Box>
            }

            {/** misi section */}
            { status == "Diterima" && statusAktif == 'Active' ? !surveiLoading ? (dataMisi.length != 0 ?
            <View style={styles.surveiSection}>
                <View style={{flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Selesaikan Misi-mu!</Text>
                    <Pressable onPress={()=>navigation.navigate('ListMisi')}><Text style={styles.textLihatSelengkapnya}>Lihat Selengkapnya</Text></Pressable>
                </View>
                <View style={{height: 20}}></View>
                <View style={{paddingLeft: 10}}><CustomCarousel width={width} height={190} children={<MisiView size={width*0.75} data={dataMisi} />} size={width*0.5} /></View>
                {/** <CustomCarousel width={width} height={255} children={<SurveiView data={allSurvei} size={width*0.6} />} size={width*0.5} />*/}
            </View> : 
            <View style={styles.surveiSection}>
                <View style={{flexDirection: 'row', alignItems: 'center',  paddingHorizontal: 15,  justifyContent: 'space-between'}}>
                    <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Selesaikan Misi-mu!</Text>
                    <Pressable onPress={()=>navigation.navigate('ListMisi')}><Text style={styles.textLihatSelengkapnya}>Lihat Selengkapnya</Text></Pressable>
                </View>
                <View style={{height: 30}}></View>
                <View style={{alignItems: 'center', justifyContent:'center',  paddingHorizontal: 20,}}>
                    <Image source={IconNoMisi} style={{width: 74, height: 54}} />
                    <View style={{height: 15}}></View>
                    <Text style={{...FontConfig.titleTwo, color: Color.hitam}}>{`Belum ada misi yang Aktif`}</Text>
                    <View style={{height: 3}}></View>
                    <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tunggu yaa, misi akan segera ditampilkan</Text>
                </View>
            </View>
            ) : 
            <View style={styles.surveiSection}>
                <View style={{flexDirection: 'row',  paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Selesaikan Misi-mu!</Text>
                    <Pressable onPress={()=>navigation.navigate('ListMisi')}><Text style={styles.textLihatSelengkapnya}>Lihat Selengkapnya</Text></Pressable>
                </View>
                <View style={{height: 20}}></View>
                <View style={{paddingLeft: 10}}><CustomCarousel width={width} height={255} children={<><SurveiSkeleton /><SurveiSkeleton /></>} size={width*0.5} /></View>
            </View> : <></>
            }

            {/** laporan section 
            <View style={styles.laporanSection}>
                <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Kirim Laporan Yuk</Text>
                {!laporanLoading ? <View style={styles.menuLaporan}>
                    {laporanJenis.length != 0 ? laporanJenis.map((item, index) => {
                        if(status == "Diterima"){
                        return (
                            <Pressable key={index} onPress={()=>{ 
                                saveJenisLaporan(item.id_jenis_laporan, item.jenis_laporan, item.deskripsi, item.desc_required, item.is_estimasi_partisipan_required,
                                    item.is_tag_kawan);
                                navigation.navigate("Laporan");
                                }} style={{...styles.itemMenu, width: (width/5)-10}}>
                                <Image source={item.jenis_laporan == "Media Luar Ruang" ?  IconApk : 
                                item.jenis_laporan == 'Acara' ? IconAcara : item.jenis_laporan == "Markas Komunitas" ? 
                                IconMarkasKomunitas : item.jenis_laporan == "Posko" ? IconPosko : IconAksi} style={{width: (width/5)-40, height: (width/5)-40}} />
                                <Text style={styles.textMenu}>{item.jenis_laporan}</Text>
                            </Pressable>
                            
                        )}
                        else{
                            return(
                                <View key={index} style={styles.itemMenu}>
                                    <Image source={item.jenis_laporan == "Media Luar Ruang" ?  IconApkDisable : 
                                    item.jenis_laporan == 'Acara' ? IconAcaraDisable : item.jenis_laporan == "Markas Komunitas" ? 
                                    IconMarkasKomunitasDisable : item.jenis_laporan == "Posko" ? IconPoskoDisable : IconAksiDisable} style={{width: (width/5)-40, height: (width/5)-40}} />
                                    <Text style={styles.textMenu}>{item.jenis_laporan}</Text>
                                </View>
                            )
                        }
                    }) : <></> }
                </View> : <Skeleton height={100} width={width-40} style={{borderRadius: 8, marginVertical: 16}} /> 
                }
            </View> */}

            {/** survei section */}
            {status == "Diterima" && statusAktif == 'Active' ? !surveiLoading ? (allSurvei.length != 0 ?
            <View style={styles.surveiSection}>
                <Text style={{...FontConfig.titleTwo, color: '#111111', paddingLeft: 20}}>Isi Survei Yuk</Text>
                <View style={{height: 20}}></View>
                <View style={{paddingLeft: 10}}><CustomCarousel width={width} height={265} children={<SurveiView data={allSurvei} size={width*0.6} />} size={width*0.5} /></View>
            </View> : <></>) : 
            <View style={styles.surveiSection}>
                <Text style={{...FontConfig.titleTwo, color: '#111111', paddingLeft: 20}}>Isi Survei Yuk</Text>
                <View style={{height: 20}}></View>
                <View style={{flexDirection: 'row'}}>
                <View style={{paddingLeft: 10}}><CustomCarousel width={width} height={265} children={<><SurveiSkeleton /><SurveiSkeleton /></>} size={width*0.5} /></View>
                </View>
            </View> : <></>
            }

            {/** diskusi section */}
            {status == "Diterima" && statusAktif == 'Active' ?
            !beritaTerkiniLoading ? dataBeritaTerkini.length !=0 ? <View style={styles.beritaSection}>
                <View style={{flexDirection: 'row', alignItems: 'center',  paddingHorizontal: 15, justifyContent: 'space-between'}}>
                    <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Topik Diskusi Terbaru</Text>
                    <Pressable onPress={()=>navigation.navigate('Diskusi')}><Text style={styles.textLihatSelengkapnya}>Lihat Selengkapnya</Text></Pressable>
                </View>
                
                <View style={{height: 15}}></View>
                <View style={{paddingLeft: 10}}><CustomCarousel height={200} width={width} children={<DiskusiView data={dataBeritaTerkini} size={width*0.9} />} size={width*0.5} /></View>
            </View> : <>
            <Text style={{...FontConfig.titleTwo, color: '#111111', padding: 20}}>Topik Diskusi Terbaru</Text>
            <View style={{alignItems: 'center', padding: 20}}>
                <Image source={IconBerita} style={{width: 123, height: 90}} />
                <View style={{height: 5}}></View>
                <Text style={{...FontConfig.titleTwo, color: '#000000'}}>Belum ada berita</Text>
                <View style={{height: 5}}></View>
                <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tunggu yaa, diskusi akan segera ditampilkan</Text>
            </View></> :
            <View style={styles.beritaSection}>
                <Text style={{...FontConfig.titleTwo, color: '#111111',  paddingHorizontal: 20,}}>Topik Diskusi Terbaru</Text>
                <View style={{height: 20}}></View>
                <View style={{paddingLeft: 10}}><CustomCarousel height={225} width={width} children={<><BeritaSkeleton /><BeritaSkeleton /></>} size={width*0.67} /></View>
            </View> : <></>
            }

            {/** berita terkini section */}
            {!beritaTerkiniLoading ? dataBeritaTerkini.length !=0 ? <View style={styles.beritaSection}>
                <View style={{flexDirection: 'row', alignItems: 'center',  paddingHorizontal: 15, justifyContent: 'space-between'}}>
                    <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Berita Terkini</Text>
                    <Pressable onPress={()=>navigation.navigate('BeritaTerkini')}><Text style={styles.textLihatSelengkapnya}>Lihat Selengkapnya</Text></Pressable>
                </View>
                
                <View style={{height: 15}}></View>
                <View style={{paddingLeft: 10}}><CustomCarousel height={225} width={width} children={<BeritaView data={dataBeritaTerkini} size={width*0.67} />} size={width*0.5} /></View>
            </View> : <>
            <Text style={{...FontConfig.titleTwo, color: '#111111', padding: 20}}>Berita Terkini</Text>
            <View style={{alignItems: 'center', padding: 20}}>
                <Image source={IconBerita} style={{width: 123, height: 90}} />
                <View style={{height: 5}}></View>
                <Text style={{...FontConfig.titleTwo, color: '#000000'}}>Belum ada berita</Text>
                <View style={{height: 5}}></View>
                <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tunggu yaa, berita akan segera ditampilkan</Text>
            </View></> :
            <View style={styles.beritaSection}>
                <Text style={{...FontConfig.titleTwo, color: '#111111',  paddingHorizontal: 20,}}>Berita Terkini</Text>
                <View style={{height: 20}}></View>
                <View style={{paddingLeft: 10}}><CustomCarousel height={225} width={width} children={<><BeritaSkeleton /><BeritaSkeleton /></>} size={width*0.67} /></View>
            </View>
            }
            
            {/** berita organisasi section */}
            <View style={styles.beritaDaerahSection}>
                {status == "Diterima" && statusAktif == 'Active' ? !beritaOrganisasiLoading ? dataBeritaOrganisasi.length != 0 ?
                <><View style={{flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between'}}>
                    <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Berita Daerahmu</Text>
                    <Pressable onPress={()=>navigation.navigate('BeritaOrganisasi')}><Text style={styles.textLihatSelengkapnya}>Lihat Selengkapnya</Text></Pressable>
                </View>
                <View style={{height: 15}}></View>
                <BeritaDaerah data={dataBeritaOrganisasi} navigation={navigation} />
                </> : 
                <>
                <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Berita Daerahmu</Text>
                <View style={{alignItems: 'center', padding: 20}}>
                    <Image source={IconBerita} style={{width: 123, height: 90}} />
                    <View style={{height: 5}}></View>
                    <Text style={{...FontConfig.titleTwo, color: '#000000'}}>Belum ada berita</Text>
                    <View style={{height: 5}}></View>
                    <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tunggu yaa, berita akan segera ditampilkan</Text>
                </View></>
                 : 
                <>
                    <Text style={{...FontConfig.titleTwo, color: '#111111'}}>Berita Daerahmu</Text>
                    <View style={{height: 20}}></View>
                    <BeritaDaerahSkeleton />
                    <View style={{height: 10}}></View>
                    <BeritaDaerahSkeleton />
                </>
                 : <>
                <Text style={{...FontConfig.headingThree, color: '#111111'}}>Berita Daerahmu</Text>
                <View style={{alignItems: 'center', padding: 20}}>
                    <Image source={IconBerita} style={{width: 123, height: 90}} />
                    <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tunggu ya, berita akan segera ditampilkan</Text>
                </View>
                </>}
            </View> 
            <View style={{height: 10}}></View>
        </ScrollView>
        <AwesomeAlert
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
        />
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