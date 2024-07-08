import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, Image, TextInput } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import YellowWarning from '../../../components/warning/yellowWarning'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../../components/customInput'
import CustomTextArea from '../../../components/customTextArea'
import DropDownButton from '../../../components/buttonDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setPhotos, setTeman } from '../../../redux/laporan'
import CustomBottomSheet from '../../../components/bottomSheet'
import LaporanServices from '../../../services/laporan'
import DocumentPicker from 'react-native-document-picker'
import CapresChoice from '../../../components/bottomSheet/CapresChoice'
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomButton from '../../../components/customButton'
import CustomMultipleSelect from '../../../components/customMultipleSelect'
import SelectView from '../../../components/bottomSheet/select'

const BuatLaporanScreen = ({navigation, route}) => {
  const { jenisLaporan } = route.params;
  const [photoKegiatan, setPhotoKegiatan] = useState([]);
  const [tagTeman, setTagTeman] = useState([]);
  const [tagNamaTeman, setTagNamaTeman] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [saran, setSaran] = useState("");
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
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [isDeskripsi, setIsDeskripsi] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [perkiraanPartisipan, setPerkiraanPartisipan] = useState("");
  const [isModalTemanVisible, setIsModalTemanVisible] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [namaFile, setNamaFile] = useState("");
  const [hapusDoc, setHapusDoc] = useState(false);
  const [filePdf, setFilePdf] = useState("");
  const [showAlertYakinKirim, setShowAlertYakinKirim] = useState(false);
  const [showAlertFileBig, setShowAlertFileBig] = useState(false);
  const desc_required = useSelector((state)=>{
    return state.laporan.jenisLaporan.desc_required;
  });

  const is_tag_kawan = useSelector((state)=>{
    return state.laporan.jenisLaporan.is_tag_kawan;
  });

  const is_estimasi_partisipan = useSelector((state)=>{
    return state.laporan.jenisLaporan.is_estimasi_partisipan_required;
  });

  const dispatch = useDispatch();

  const setOldTag = (data, id) => {
    setTag(data);
    setIdTag(id);
  }

  const handlePilihDariFileDocument = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        readContent: true
      });
      console.log(results);
      if(results.size <= 10000000){
        setNamaFile(results.name);
        //let filePdfBase64 = await Utils.readFileBase64(results.uri);
        let fileAtribut = {
          uri: results.uri,
          type: results.type,
          name: results.name,
        };
        setFilePdf(fileAtribut);
      }else{
        setShowAlertFileBig(true);
      }
      
          
    }catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
}

  const handleHapusDocument = () =>{
    setFilePdf("");
    setNamaFile("");
    setHapusDoc(true);
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
      "media": photoKegiatan,
      "simpatisan": tagTeman,
      "perkiraan_partisipan": perkiraanPartisipan,
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

  const saveTemanLaporan = () =>{
    dispatch(
      setTeman({teman: tagTeman, namaTeman: tagNamaTeman, setNamaTeman: setTagNamaTeman, setTeman: setTagTeman})
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

  useEffect(()=> {
    saveTemanLaporan();
  }, [tagTeman])

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
      title="Tahapan"
      children={<CapresChoice data={capresData} item={capres} setItem={setCapres} idCapres={idCapres} setIdCapres={setIdCapres} setModalVisible={setIsModalVisible} />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalTemanVisible}
      setModalVisible={setIsModalTemanVisible}
      title={`Tandai Kawan`}
      children={<SelectView isModalVisible={isModalTemanVisible} setIsModalVisible={setIsModalTemanVisible} jumlah={tagTeman.length} />}
      />
      <HeaderWhite navigation={navigation} title="Buat Laporan" />
      <ScrollView nestedScrollEnabled={true} style={{padding: 20}}>
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
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Tahapan</Text>
        <DropDownButton onPress={()=>setIsModalVisible(true)} placeholder='Tahapan' text={capres} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Judul Laporan</Text>
        <CustomInput value={judul} setValue={setJudul} placeholder="Judul Kegiatan" />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Deskripsi</Text>
        <CustomTextArea inputNotWrong={isDeskripsi} value={deskripsi} setValue={setDeskripsi} placeholder="Deskripsi"
        width='100%' height={100} />
        <Text style={{...styles.textMasukanDeskripsi, color: isDeskripsi ? Color.secondaryText : Color.danger}}>
          {desc_required ? `Masukan deskripsi maksimal 350 karakter.` : `Masukan deskripsi maksimal 350 karakter. (Opsional)`}
        </Text>
        <View style={{height: 5}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, marginVertical: 5}}>Dokumen Proposal</Text>
        <View style={{flexDirection: 'row', borderColor: !namaFile ? Color.lightBorder : Color.primaryMain, borderWidth: 1,
        borderRadius: 4, justifyContent: 'space-between'}}>
            <View style={{paddingHorizontal: 10, paddingVertical: 5, maxWidth: '70%'}}>
                <Text style={{ ...FontConfig.bodyFour, marginTop: 7,
                    color: !namaFile ? Color.disable : Color.blue
                }}>{!namaFile  ? `Belum ada file terpilih` : namaFile}</Text>
            </View>
            {!namaFile ? <CustomButton onPress={handlePilihDariFileDocument} marginVertical={0} text="Unggah" height={40} width='30%'  borderRadius={2} backgroundColor={Color.primaryMain}
                fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}} /> : 
                <Pressable onPress={handleHapusDocument} style={{marginVertical: 10, marginRight: 5}}><Ionicons name="trash-outline" color={Color.danger} size={22} /></Pressable>
            }
        </View>
          <View style={{height: 5}}></View>
          <Text style={{...FontConfig.bodyThree, color: Color.secondaryText}}>Hanya menerima format pdf dan ukuran file maksimal 10mb</Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Lokasi</Text>
        <DropDownButton onPress={handleLokasiButton} placeholder='Lokasi' text={lokasi} 
        childLeft={<Ionicons name="locate-outline" color={Color.secondaryText} size={16} style={{paddingRight: 5}} />} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>{`Saran/Umpan Balik (opsional)`}</Text>
        <CustomTextArea inputNotWrong={true} value={saran} setValue={setSaran} placeholder="Tulis saran atau umpan balikmu disini..."
        width='100%' height={100} />
        <View style={{height: 30}}></View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}>
        <CustomButton
            onPress={handleLanjutkan} 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            width='100%' height={44} text="Kirim"
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
    color: Color.neutralZeroSeven,
    width: '80%'
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
  phoneInput: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    ...FontConfig.bodyOne,
    color: Color.primaryText
},
})