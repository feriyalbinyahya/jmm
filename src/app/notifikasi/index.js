import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import iconArrowLeft from '../../assets/images/icon/icon_arrow_left.png'
import iconMore from '../../assets/images/icon/icon_more.png'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotifikasiPesan from './notifPesan'
import NotifikasiInfoAkun from './notifInfoAkun'
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
   } from "react-native-popup-menu";
import AwesomeAlert from 'react-native-awesome-alerts';

const Tab = createMaterialTopTabNavigator();

const NotifikasiScreen = ({navigation}) => {
    const [terpilih, setTerpilih] = useState(0);
    const [visible, setVisible] = React.useState(false);
    const [allChecked, setAllChecked] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    const [showDeleteNotif, setShowDeleteNotif] = useState(false);

    const [dataPesan, setDataPesan] = useState([]);

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
    <MenuProvider style={styles.containerMenu}>
    <View style={{flex: 1, backgroundColor: Color.grayOne}}>
      {
        terpilih > 0 ? (
            <View style={styles.appBar}>
                <Pressable onPress={() => {
                    setTerpilih(0);
                    setAllChecked(false);
                    }}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
                <Text style={styles.textTitle}>{`${terpilih} Pesan Dipilih`}</Text>
                    <Menu>
                        <MenuTrigger
                            customStyles={{

                            }}
                        >
                            <Image style={styles.iconArrowLeft} source={iconMore} />
                        </MenuTrigger>
                        <MenuOptions customStyles={{
                            optionsContainer: {
                                marginTop: 20,
                                width: 140,
                                alignItems: 'center'
                            }
                        }}>
                            <MenuOption customStyles={{
                                optionText: {
                                    ...FontConfig.bodyTwo, color: Color.title
                                }
                            }} onSelect={() => setShowDeleteNotif(true)} text="Hapus notifikasi" />
                            <MenuOption customStyles={{
                                optionText: {
                                    ...FontConfig.bodyTwo, color: Color.title
                                }
                            }} onSelect={() => {
                                setAllChecked(true);
                                setTerpilih(dataPesan.length)
                                }} text="Pilih semua" />
                        </MenuOptions>
                    </Menu>
            </View>) : (
            <View style={styles.appBar}>
                <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
                <Text style={styles.textTitle}>Notifikasi</Text>
                <View style={{width: 24}}></View>
            </View>
            )
      }
      <View style={styles.container}>
            <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: styles.textTabLabel,
                tabBarActiveTintColor: Color.title,
                tabBarInactiveTintColor: '#000000',
                tabBarIndicatorStyle: {backgroundColor: Color.primaryMain},
            }}
            >
                <Tab.Screen  name="Pesan">
                    {()=> <NotifikasiPesan dataPesan={dataPesan} allChecked={allChecked} setAllChecked={setAllChecked} terpilih={terpilih} setTerpilih={setTerpilih} />}
                </Tab.Screen>
                <Tab.Screen  name="Info Akun">
                    {()=> <NotifikasiInfoAkun />}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    </View>
    <AwesomeAlert
          show={showDeleteNotif}
          showProgress={false}
          title={`Hapus ${terpilih} notifikasi ini?`}
          message="Apakah Anda yakin ingin menghapus notifikasi tersebut?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Hapus"
          cancelText="Batal"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '35%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          cancelButtonStyle={{width: '35%', alignItems: 'center'}}
          cancelButtonTextStyle={{...FontConfig.buttonThree}}
          onConfirmPressed={() => {
            
          }}
          onCancelPressed={()=>{
            setShowDeleteNotif(false);
          }}
        />
    </MenuProvider>
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
        flex: 9
    },
    containerMenu: {
        flex: 1
    },
    textTabLabel: {
        ...FontConfig.titleTwo
    }
})