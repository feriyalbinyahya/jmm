import { Alert, Image, PermissionsAndroid, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderWhite from '../../components/header/headerWhite'
import IconEdit from '../../assets/images/icon/icon_edit.png'
import BonarImage from '../../assets/images/example/Bonar.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/customButton'
import CheckPresent from '../../assets/images/icon/check_present.png'
import CheckPast from '../../assets/images/icon/check_past.png'
import {captureRef} from 'react-native-view-shot';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Snackbar from 'react-native-snackbar'
import CustomBottomSheet from '../../components/bottomSheet'
import { border } from 'native-base/lib/typescript/theme/styled-system'
import KartuAnggotaServices from '../../services/kartuAnggota'
import ImageServices from '../../services/getImage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TentangOrganisasi from './tentangOrganisasi'
import RiwayatOrganisasi from './riwayatOrganisasi'
import Barcode from "ccarellice-react-native-barcode-generator/Barcode";

const Tab = createMaterialTopTabNavigator();

const KartuAnggotaScreen = ({navigation}) => {
    const textTitle = "Kartu Anggota";
    const colorCard = "#4644D4";
    const exampleImage = BonarImage;
    const nama = "Bustoni Tonali";
    const role = "Anggota";
    const date = "20 Jul 2023";
    const nomor = "202409876548";
    const organisasi = "Masyarakat Sehat Jawa Barat";
    const status = "Bergabung";
    const [dataAnggota, setDataAnggota] = useState({})
    const [image, setDataImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const viewRef = useRef();
    const [isModalVisible, setModalVisible] = useState(false);

    const getPermissionAndroid = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Image Download Permission',
              message: 'Your permission is required to save images to your device',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          }
          Alert.alert(
            '',
            'Your permission is required to save images to your device',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } catch (err) {
          // handle error as you please
          console.log('err', err);
        }
      };
    
      // download image
      const downloadImage = async () => {
        try {
          // react-native-view-shot caputures component
          const uri = await captureRef(viewRef, {
            format: 'png',
            quality: 0.8,
            fileName: 'kartu_anggota_jmm'
          });
    
    
          // cameraroll saves image
          const image = CameraRoll.saveToCameraRoll(uri, "photo")
          if (image) {
            Snackbar.show({
                text: 'File telah disimpan di galeri Anda',
                duration: Snackbar.LENGTH_SHORT,
            });
          }
        } catch (error) {
          console.log('error', error);
        }
      };

    const RiwayatComponent = ({time, status, organisasi, date}) => {
        return(
            <View style={{flexDirection: 'row', marginVertical: 3}}>
                <Image source={time == "present" ? CheckPresent : CheckPast} 
                style={{width: 20, height: 43}} />
                <View>
                    <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                        <Text style={{...FontConfig.bodyFour, color: Color.neutral70}}>{`${status} - `}</Text>
                        <Text style={{...FontConfig.bodyFour, color: Color.neutral100, width: '90%'}}>{organisasi}</Text>
                    </View>
                    <View style={{height: 8}}></View>
                    <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                        <Ionicons name="calendar-outline" size={12} color={Color.primaryMain} />
                        <Text style={{...FontConfig.body5, color: Color.neutral70,
                        marginHorizontal: 3}}>{date}</Text>
                    </View>
                </View>
                
            </View>
        )
    }

    const UbahKartuAnggotaModal = () => {
      return(
      <View style={{ paddingVertical: 10}}>
          <Pressable onPress={()=>{
            setModalVisible(false);
            navigation.navigate("KeluarOrganisasi");
          }} style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 8,
        paddingHorizontal: 10, borderWidth:1, borderColor: Color.border, borderRadius: 100}}>
            <Ionicons name="log-out-outline" size={18} color={Color.danger} />
            <Text style={{...FontConfig.buttonFour, color: Color.danger, marginLeft: 4}}>Keluar Organisasi</Text>
          </Pressable>
          <View style={{height: 10}}></View>
          <Pressable onPress={()=>{
            setModalVisible(false);
            navigation.navigate("PindahOrganisasi");
          }} style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 8,
        paddingHorizontal: 10, borderWidth:1, borderColor: Color.border, borderRadius: 100}}>
            <Ionicons name="repeat-outline" size={18} color={Color.primaryMain} />
            <Text style={{...FontConfig.buttonFour, color: Color.primaryMain, marginLeft: 4}}>Pindah Organisasi</Text>
          </Pressable>
      </View>
      );
  }

  const getInfoKartu = () => {
    KartuAnggotaServices.getDetailInfo()
    .then(res=>{
      console.log(res.data);
      setDataAnggota(res.data.data[0]);
      ImageServices.getImage("relawan", res.data.data[0].foto)
      .then(res=>{
        setDataImage(res.data.data);
        setIsLoading(false);
      })
      .catch(err=>{
        console.log(err);
      })
    })
    .catch(err=>{
      console.log(err.response);
    })
}


  useEffect(()=>{
    getInfoKartu();
  },[])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet children={<UbahKartuAnggotaModal />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
        title="Keanggotaan Organisasi" />
      <HeaderWhite navigation={navigation} title="" rightChild={<Pressable onPress={()=>setModalVisible(true)}><Image source={IconEdit} style={{height: 20, width: 20}} /></Pressable>} />
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{...FontConfig.headingThree, color: Color.primaryText}}>{textTitle}</Text>
            <Pressable onPress={downloadImage} style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 100,
            borderColor: Color.border, borderWidth: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="card-outline" size={14} color={Color.primaryMain} />
                    <Text style={{...FontConfig.button5, color: Color.primaryMain, marginHorizontal: 3}}>Download</Text>
                </View>
            </Pressable>
        </View>
        <View style={{backgroundColor: colorCard, padding: 20, borderRadius: 6,
        marginVertical: 20}} ref={viewRef}>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: `data:image/png;base64,${image}`}} style={{height: 40, width: 40, borderRadius: 20}} />
                <View style={{marginLeft: 10}}>
                    <Text style={{...FontConfig.buttonFour, color: Color.neutralZeroOne}}>{dataAnggota.nama_lengkap}</Text>
                    <View style={{flexDirection: 'row',}}>
                        <Ionicons name="person-outline" size={11} color={Color.neutralZeroOne} />
                        <Text style={{...FontConfig.buttonSix, color: Color.neutralZeroOne,
                        marginLeft: 3}}>{`${role} - Sejak ${date}`}</Text>
                    </View>
                </View>
            </View>
            <View style={{height: 5}}></View>
            <View style={{marginVertical: 5}}>
                <Text style={{...FontConfig.captionFive, color: Color.neutralZeroOne}}>Nomor Anggota :</Text>
                <Text style={{...FontConfig.buttonFour, color: Color.neutralZeroOne}}>{dataAnggota.nomor_anggota}</Text>
            </View>
            <View style={{marginVertical: 4}}>
                <Text style={{...FontConfig.captionFive, color: Color.neutralZeroOne}}>Organisasi :</Text>
                <Text style={{...FontConfig.buttonFour, color: Color.neutralZeroOne}}>{dataAnggota.nama_organisasi}</Text>
            </View>
            <View style={{marginTop: 20}}>
              <Barcode value="9501101530003" options={{ format: 'EAN13', background: 'white', }}/>
            </View>
        </View>
        <View style={{height:10}}></View>
        { !isLoading ? <View style={styles.container}>
            <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: styles.textTabLabel,
                tabBarActiveTintColor: Color.neutralZeroOne,
                tabBarInactiveTintColor: '#000000',
                tabBarIndicatorStyle: {backgroundColor: Color.primaryMain, height: '100%', zIndex:  -1,
                borderTopRightRadius:30,//add border top right radius
                borderTopLeftRadius:30,
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
              },
                tabBarStyle: {
                  borderTopRightRadius:30,//add border top right radius
                  borderTopLeftRadius:30,
                  borderBottomRightRadius: 30,
                  borderBottomLeftRadius: 30,
                  
                },
            }}
            
            >
                <Tab.Screen name="Tentang Organisasi" component={TentangOrganisasi} initialParams={{}}  />
                <Tab.Screen name="Riwayat" component={RiwayatOrganisasi} initialParams={{}} />
            </Tab.Navigator>
        </View> : <ActivityIndicator size="large" color={Color.graySix} style={{marginTop: 150}} />}
        {/**
        <View style={{height:20}}></View>
        <Text style={{...FontConfig.title3, color: Color.primaryText}}>Riwayat Keanggotaan</Text>
        <View style={{height:10}}></View>
        <RiwayatComponent time={"present"} status={status} organisasi={organisasi} date={date} />
        <RiwayatComponent time={"past"} status={status} organisasi={organisasi} date={date} />
        <RiwayatComponent time={"past"} status={status} organisasi={organisasi} date={date} /> */}
      </View>
    </SafeAreaView>
  )
}

export default KartuAnggotaScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '60%',
  },
  textTabLabel: {
      ...FontConfig.button5,
      textTransform: 'none'
  }
})