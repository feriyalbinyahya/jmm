import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, SafeAreaView, Dimensions, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderWhite from '../../../components/header/headerWhite'
import ImageExample from '../../../assets/images/example/laporan.png'
import { Color, FontConfig } from '../../../theme'
import IconSeen from '../../../assets/images/icon/icon_seen.png'
import BoxKategori from '../../../components/kategori'
import IconTime from '../../../assets/images/icon/icon_time.png';
import IconDeadline from '../../../assets/images/icon/icon_deadline.png';
import IconComment from '../../../assets/images/icon/icon_comment.png';
import IconShare from '../../../assets/images/icon/icon_share.png';
import IconLike from '../../../assets/images/icon/icon_like.png';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import BeritaServices from '../../../services/berita'
import { useIsFocused } from '@react-navigation/native';
import Share from 'react-native-share';
import IconLiked from '../../../assets/images/icon/icon_liked.png'
import CustomButton from '../../../components/customButton'
import CustomBottomSheet from '../../../components/bottomSheet'
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../../utils/Utils';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TentangOrganisasi from '../../kartuAnggotaScreen/tentangOrganisasi'
import RiwayatOrganisasi from '../../kartuAnggotaScreen/riwayatOrganisasi'
import TentangCSR from './tentangCSR'
import RiwayatLaporan from './riwayatLaporan'
import ProgramServices from '../../../services/program'

const Tab = createMaterialTopTabNavigator();

const ProgramBerjalanScreen = ({navigation, route}) => {
    const [height, setHeight] = useState(0);
    const webViewScript = 'window.ReactNativeWebView.postMessage(document.body.scrollHeight)';
    const _editor = React.createRef();
    const isFocused = useIsFocused();
    const {id, dataAcara} = route.params;
    const [dataBerita, setDataBerita] = useState([]);
    const [dataProgram, setDataProgram] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);


    const getProgramDetail = () => {
        setIsLoading(true);
        ProgramServices.getProgramDetail(id)
        .then(res=>{
            console.log(res.data.data);
            setDataProgram(res.data.data);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
            setIsLoading(false);
        })
    }

    const [onSelect, setOnSelect] = useState("");

      handleSelected = (item, id) => {
        setOnSelect(item);
      }

      handlePilih = () => {
        if(onSelect != ''){
            setIsModalVisible(false);
            navigation.navigate("BuatLaporan", {jenisLaporan: 1, typeLaporan: onSelect, id: id})
        }
      }


    const Item = ({text, id}) => (
        <Pressable onPress={()=> {handleSelected(text, id);}}>
            <View style={text === onSelect? styles.selected : styles.unSelected}>
                <Text style={styles.title}>{text}</Text>
                {text=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
                : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
            </View>
        </Pressable>
      );

    const LaporanChoice = () => {
        return(
            <View>
                <Item text={`Kegiatan`} id={1} />
                <Item text={`Kendala`} id={2} />
                <View style={{marginTop: 5}}>
                    <CustomButton onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
                </View>
            </View>
        )
    }

    useEffect(()=> {
        if(isFocused){
            setHeight(0);
            getProgramDetail();
        }
    },[isFocused]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.neutralZeroOne, justifyContent: 'space-between'}}>
        <CustomBottomSheet 
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        title="Buat Laporan"
        children={<LaporanChoice />}
        />
        <View>
        <HeaderWhite navigation={navigation} title={`CSR`} />
        {!isLoading ?
            dataProgram.length != 0 ?
        <View style={{backgroundColor: Color.neutralZeroOne}}>
            <Image style={styles.imageBerita} source={{uri: `data:image/png;base64,${dataProgram.cover}`}} />
            <View style={styles.container}>
                <Tab.Navigator 
                screenOptions={{
                    tabBarLabelStyle: styles.textTabLabel,
                    tabBarActiveTintColor: Color.hitam,
                    tabBarInactiveTintColor: Color.neutral70,
                    tabBarIndicatorStyle: {backgroundColor: Color.hitam}
                    
                }}
                
                >
                    <Tab.Screen name="Tentang CSR" component={TentangCSR} initialParams={{judul: dataProgram.judul, deskripsi: dataProgram.deskripsi,
                        convertedDate: dataProgram.tanggal_dibuat, namaPembuat: dataProgram.nama_pembuat
                    }}  />
                    <Tab.Screen name="Riwayat Laporan" component={RiwayatLaporan} initialParams={{navigation: navigation, idProgram: id}} />
                </Tab.Navigator>
            </View>
        </View> 
        : <></>
        : <View style={{height: '100%', backgroundColor: Color.neutralZeroOne}}>
            <ActivityIndicator style={{marginTop: '50%'}} size="large" color={Color.primaryMain} />
            </View>
        }
        </View>
        {dataProgram.status_csr == "Sedang Berjalan" ?<View style={styles.bottomSection}>
            <View style={styles.buttonContinue}><CustomButton 
            text="Buat Laporan" backgroundColor={Color.primaryMain} onPress={()=>setIsModalVisible(true)}
            height={40} fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}} /></View>
        </View> :<></>}
    </SafeAreaView>
  )
}

export default ProgramBerjalanScreen

const styles = StyleSheet.create({
    imageBerita: {
        width: '100%',
        height: 192
    },
    containBeritaSection: {
        paddingVertical: 20,
        flex: 1,
    },
    container: {
        width: '100%',
        height: '65%',
        paddingHorizontal: 20
      },
    rowInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInfo: {
        ...FontConfig.bodyThree,
        color: Color.grayEight,
        marginLeft: 3
    },
    iconInfo: {
        width: 14,
        height: 14
    },
    textCreatedBy: {
        ...FontConfig.bodyTwo,
        color: '#000000'
    },
    textJudulBerita: {
        ...FontConfig.titleOne,
        color: Color.title,
        marginVertical: 10,
        paddingHorizontal: 20
    },
    textDeskripsiBerita: {
        marginVertical: 10,
        ...FontConfig.bodyTwo,
        color: Color.primaryText,
        textAlign: 'justify'
    },
    textKategori: {
        ...FontConfig.bodyThree,
        color: Color.primaryText
    },
    kategoriSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
        columnGap: 10,
        marginVertical: 10
    },
    infoBeritaSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 10
    },
    iconBerita: {
        width: 20,
        height: 20
    },
    textIconBerita: {
        ...FontConfig.bodyThree,
        color: '#000000',
        marginLeft: 4
    },
    editor: {
        flex: 0,
        padding: 0,
        borderColor: Color.primaryMain,
        borderWidth: 1,
        marginHorizontal: 30,
        marginVertical: 5,
        backgroundColor: 'white',
        flex: 1,
        
    },
    textTabLabel: {
        ...FontConfig.title5,
        color: Color.hitam
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 10,
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    buttonContinue: {
        borderRadius: 20, 
        width: '80%',
    },
    unSelected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.neutralZeroThree
    },
    title: {
        ...FontConfig.bodyOne,
        color: Color.title
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
})