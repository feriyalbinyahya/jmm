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

    const onPressNotif = (id, kategori) => {
        if(kategori == "Berita"){
            navigation.navigate("BeritaDetail", {id: id});
        }else if(kategori == "Survei"){
            navigation.navigate("StartSurvei", {id:id});
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
                {/**<Tab.Screen  name="Info Akun">
                    {()=> <NotifikasiInfoAkun />}
        </Tab.Screen>**/}
            </Tab.Navigator>
        </View>
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