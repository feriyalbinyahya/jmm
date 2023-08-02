import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import YellowWarning from '../../../components/warning/yellowWarning'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../../components/customInput'
import CustomTextArea from '../../../components/customTextArea'
import DropDownButton from '../../../components/buttonDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setPhotos } from '../../../redux/laporan'
import CustomBottomSheet from '../../../components/bottomSheet'
import LaporanServices from '../../../services/laporan'
import CapresChoice from '../../../components/bottomSheet/CapresChoice'
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomButton from '../../../components/customButton'

const BuatLaporanScreen = ({navigation, route}) => {
  const { jenisLaporan } = route.params;
  const [photoKegiatan, setPhotoKegiatan] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [capres, setCapres] = useState("");
  const [idCapres, setIdCapres] = useState(0);
  const [tag, setTag] = useState("");
  const [idTag, setIdTag] = useState(0);
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const [countPhoto, setCountPhoto] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [capresLoading, setCapresLoading] = useState(false);
  const [capresData, setCapresData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [isDeskripsi, setIsDeskripsi] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const desc_required = useSelector((state)=>{
    return state.laporan.jenisLaporan.desc_required;
  });

  const dispatch = useDispatch();

  const setOldTag = (data, id) => {
    setTag(data);
    setIdTag(id);
  }

  handleLanjutkan = () => {
  setIsLoading(true);
    LaporanServices.addLaporan({
      "id_laporan_tag": idTag,
      "judul": judul,
      "deskripsi": deskripsi,
      "id_capres": idCapres,
      "longitude": longitude,
      "latitude": latitude,
      "alamat": lokasi,
      "media": photoKegiatan
  })
  .then(res=>{
    console.log(res.data);
    if(res.data.message == "Laporan berhasil terkirim."){
      navigation.navigate('LaporanTerkirim');
    }else{
      setShowAlert(true);
      setMessage(res.data.message);
    }
    setIsLoading(false);
  })
  .catch(err=>{
    console.log(err);
  })
  }

  handleTagButton = () => {
    navigation.navigate('PilihTagLaporan', {title: 'Tag Kegiatan', item: tag, id_tag: idTag, onGoBack: setOldTag, jenisLaporan: jenisLaporan});
  }

  handleLokasiButton = () => {
    navigation.navigate('Lokasi');
  }

  handleAmbilFoto = () => {
    navigation.navigate("AmbilFotoRegister", {path: 'UploadPhotoLaporan', type: 'noholes'});
  }

  const savePhotosLaporan = () =>{
    dispatch(
      setPhotos({photos: photoKegiatan, setPhoto: setPhotoKegiatan})
    );
  }

  const saveLocationLaporan = () =>{
    dispatch(
      setLocation({lokasi: lokasi, setLokasi: setLokasi, lat: latitude, long: longitude, 
        setLat: setLatitude, setLong: setLongitude})
    );
  }

  const handleRemovePhotoButton = (index) => {
    setPhotoKegiatan(photos => photos.filter((s,i)=>(i != index)));
  }

  const getCapresData = () =>{
    setCapresLoading(true);
    LaporanServices.getCapres()
    .then(res=>{
      setCapresData(res.data.data);
      setCapresLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=> {
    savePhotosLaporan();
  }, [photoKegiatan])

  useEffect(()=>{
    saveLocationLaporan();
  }, [lokasi])

  useEffect(()=>{
    getCapresData();
  },[])

  useEffect(()=>{
    if(photoKegiatan.length > 0 && judul && (deskripsi || !desc_required) && deskripsi.length < 351 && capres && tag && lokasi){
      setIsContinue(true);
    }else{
      setIsContinue(false);
    }
  }, [photoKegiatan, judul, deskripsi, capres, tag, lokasi])

  useEffect(()=>{
    if(deskripsi.length > 350){
      setIsDeskripsi(false);
    }else{
      setIsDeskripsi(true);
    }
  }, [deskripsi])
  return (
    <SafeAreaView style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet 
      isModalVisible={isModalVisible}
      setModalVisible={setIsModalVisible}
      title="Pilih Capres"
      children={<CapresChoice data={capresData} item={capres} setItem={setCapres} idCapres={idCapres} setIdCapres={setIdCapres} setModalVisible={setIsModalVisible} />}
      />
      <HeaderWhite navigation={navigation} title="Buat Laporan" />
      <YellowWarning text="Dalam radius 1 km, kamu hanya dapat membuat laporan dengan capres dan tag yang berbeda." />
      <ScrollView style={{padding: 20}}>
      {
        photoKegiatan.length == 0 ? 
        <View style={styles.uploadSection}>
            <Pressable onPress={handleAmbilFoto} style={styles.boxAddPhoto}><Ionicons name="add-circle-outline" color={Color.title}
            size={24} /></Pressable> 
            <View style={{padding: 20}}>
              <Text style={styles.textUploadFoto}>Upload foto kegiatan</Text>
              <View style={{height: 5}}></View>
              <Text style={styles.textPastikan}>Pastikan foto yang kamu kirimkan terlihat jelas</Text>
            </View>
        </View> :
        <View style={styles.moreUploadSection}>
          <ScrollView horizontal 
          showsHorizontalScrollIndicator={false} 
          decelerationRate='normal'
          style={styles.caraoselPhoto}>
            {photoKegiatan.map((item, index)=> {
              return(
                <View key={index}>
                  <Image source={{uri: `data:image/png;base64,${item}`}} style={styles.imageKegiatan}/>
                  <Pressable onPress={()=> handleRemovePhotoButton(index)} style={styles.removePhotoButton}>
                    <Ionicons style={{marginTop: -2, marginLeft: -1.5}} color={Color.grayTen} name="close-circle-outline" size={20}></Ionicons>
                  </Pressable>
                </View>
              )
            })}
          </ScrollView>
          {
            photoKegiatan.length <3?
            <Pressable onPress={handleAmbilFoto}><Ionicons name="add-circle-outline" color={Color.title}
            size={24} /></Pressable> :
            <></>
          }
        </View>
      }
        <View style={{height: 30}}></View>
        <Text style={styles.textDetailLaporan}>Detail Laporan</Text>
        <View style={{height: 10}}></View>
        <CustomInput value={judul} setValue={setJudul} placeholder="Judul Kegiatan" />
        <View style={{height: 10}}></View>
        <CustomTextArea inputNotWrong={isDeskripsi} value={deskripsi} setValue={setDeskripsi} placeholder="Deskripsi"
        width='100%' height={100} />
        <Text style={{...styles.textMasukanDeskripsi, color: isDeskripsi ? Color.secondaryText : Color.danger}}>
          {desc_required ? `Masukan deskripsi maksimal 350 karakter.` : `Masukan deskripsi maksimal 350 karakter. (Opsional)`}
        </Text>
        <View style={{height: 10}}></View>
        <DropDownButton onPress={()=>setIsModalVisible(true)} placeholder='Pilih Capres' text={capres} />
        <View style={{height: 10}}></View>
        <DropDownButton onPress={handleTagButton} placeholder='Pilih Tag' text={tag} />
        <View style={{height: 10}}></View>
        <DropDownButton onPress={handleLokasiButton} placeholder='Lokasi' text={lokasi} 
        childLeft={<Ionicons name="locate-outline" color={Color.secondaryText} size={16} style={{paddingRight: 5}} />} />
        <View style={{height: 30}}></View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}>
        <CustomButton
            onPress={handleLanjutkan} 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            width='100%' height={44} text="Lanjutkan"
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
          closeOnHardwareBackPress={true}
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
        />
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Laporan gagal dibuat"
          message={message}
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
            setShowAlert(false);
          }}
        />
    </SafeAreaView>
  )
}

export default BuatLaporanScreen

const styles = StyleSheet.create({
  uploadSection: {
    flexDirection: 'row',
  },
  moreUploadSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
  boxAddPhoto: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.grayFour,
    padding: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.lightBorder
  },
  textUploadFoto: {
    ...FontConfig.titleThree,
    color: '#000000'
  },
  textPastikan: {
    ...FontConfig.captionOne,
    color: Color.neutralZeroSeven
  },
  textDetailLaporan: {
    ...FontConfig.titleThree,
    color: '#000000'
  },
  textMasukanDeskripsi: {
    ...FontConfig.bodyThree,
    marginVertical: 5
  },
  caraoselPhoto: {

  },
  imageKegiatan: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 4
  },
  removePhotoButton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 16,
    width: 17,
    height: 17,
    right: 3,
    top: 0
  },
})