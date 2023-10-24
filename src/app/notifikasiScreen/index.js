import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import iconArrowLeft from '../../assets/images/icon/icon_arrow_left.png'
import iconMore from '../../assets/images/icon/icon_more.png'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotifikasiPesan from '../notifikasi/notifPesan'
import NotifikasiInfoAkun from '../notifikasi/notifInfoAkun'
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
   } from "react-native-popup-menu";
import AwesomeAlert from 'react-native-awesome-alerts';
import HeaderWhite from '../../components/header/headerWhite'
import MisiServices from '../../services/misi'

const Tab = createMaterialTopTabNavigator();

const NotifikasiScreen = ({navigation}) => {
    const [terpilih, setTerpilih] = useState(0);
    const [visible, setVisible] = React.useState(false);
    const [allChecked, setAllChecked] = useState(false);
    const [jumlahPesan, setJumlahPesan] = useState(0);
    const [jumlahInfoAkun, setJumlahInfoAkun] = useState(0);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    const [showDeleteNotif, setShowDeleteNotif] = useState(false);

    const [dataPesan, setDataPesan] = useState([]);
    const [dataInfoAkun, setDataInfoAkun] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onPressNotif = (item) => {
        const {id_content, kategori} = item;
        console.log(id_content);
        if(kategori == "Berita"){
            navigation.navigate("BeritaDetail", {id: id_content});
        }else if(kategori == "Survey"){
            navigation.navigate("StartSurvei", {id: id_content});
        }else if(kategori == "Misi" || kategori == "Misi Penting"){
            setIsLoading(true);
            MisiServices.getMisiNotif(id_content)
            .then(res=>{
                let data = res.data.data[0];
                setIsLoading(false);
                if(kategori == "Misi"){
                    navigation.navigate("StartMisi", {id: id_content, judul: data.judul, deskripsi: data.deskripsi ,
                        startDate: data.tanggal_publish, deadlineDate: data.batas_waktu, is_important: 0, kategori: data.kategori[0].nama_kategori});
                }else{
                    navigation.navigate("StartMisi", {id: id_content, judul: data.judul, deskripsi: data.deskripsi ,
                        startDate: data.tanggal_publish, deadlineDate: data.batas_waktu, is_important: 1, kategori: data.kategori[0].nama_kategori});
                }
            })
            .catch(err=>{
                console.log(err.response);
            })
        }else if(kategori == "Laporan"){
            navigation.navigate("DetailLaporan", {id: id_content});
        }else if(kategori == "Kawan"){
            navigation.navigate("ListSimpatisan");
        }else if(kategori == "Pengumuman"){
            const dataBerita = {judul: item.judul, deskripsi: item.deskripsi, tanggal: item.tanggal, cover_berita: item.cover_berita}
            navigation.navigate("Pengumuman", {id: id_content, dataBerita: dataBerita});
        }
    }

    const getDataPesan = () => {
        setDataPesan([
            {
                id: '1',
                title: 'Survei Relawan',
                deskripsi: 'Survei Kepuasan Kinerja Pak ganjar ini di tunjukan untuk mengukur kinerja pak ganjar pada 2022 dari penilaian masyarakat.',
                type: 'Survei',
                tanggal: '27-01-2023'
            },
            {
                id: '2',
                title: 'Survei Relawan',
                deskripsi: 'Survei Kepuasan Kinerja Pak ganjar ini di tunjukan untuk mengukur kinerja pak ganjar pada 2022 dari penilaian masyarakat.',
                type: 'Survei',
                tanggal: '27-01-2023'
            },
            {
                id: '3',
                title: 'Survei Relawan',
                deskripsi: 'Survei Kepuasan Kinerja Pak ganjar ini di tunjukan untuk mengukur kinerja pak ganjar pada 2022 dari penilaian masyarakat.',
                type: 'Survei',
                tanggal: '27-01-2023'
            },

        ]);
    }

    useEffect(()=> {
        getDataPesan();
    }, [])
  return (
    <View style={{flex:1}}>
        <HeaderWhite title="Notifikasi" navigation={navigation} />
        <View style={styles.container}>
            <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: styles.textTabLabel,
                tabBarActiveTintColor: Color.title,
                tabBarInactiveTintColor: '#000000',
                tabBarIndicatorStyle: {backgroundColor: Color.primaryMain},
            }}
            >
                <Tab.Screen  name={`Pesan (${jumlahPesan})`}>
                    {()=> <NotifikasiPesan onPressNotif={onPressNotif} setJumlah={setJumlahPesan} dataPesan={dataPesan} allChecked={allChecked} setAllChecked={setAllChecked} terpilih={terpilih} setTerpilih={setTerpilih} />}
                </Tab.Screen>
                <Tab.Screen  name={`Info Akun (${jumlahInfoAkun})`}>
                    {()=> <NotifikasiInfoAkun onPressNotif={onPressNotif} setJumlah={setJumlahInfoAkun} dataPesan={dataInfoAkun} />}
                </Tab.Screen>
            </Tab.Navigator>
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
    </View>
  )
}

export default NotifikasiScreen

const styles = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        padding: 20,
        borderColor: Color.lightBorder,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Color.neutralZeroOne
    },
    iconArrowLeft: {
        width: 24,
        height: 24
    },
    textTitle: {
        ...FontConfig.titleOne,
        color: Color.title,
        marginLeft: -20,
        
    },
    container: {
        flex: 1,
        backgroundColor: Color.neutralZeroOne
    },
    containerMenu: {
        flex: 1
    },
    textTabLabel: {
        ...FontConfig.titleTwo
    }
})