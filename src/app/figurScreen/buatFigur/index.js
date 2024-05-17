import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, Image, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import YellowWarning from '../../../components/warning/yellowWarning'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../../components/customInput'
import CustomTextArea from '../../../components/customTextArea'
import DropDownButton from '../../../components/buttonDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { setPhotos } from '../../../redux/simpatisan'
import CustomBottomSheet from '../../../components/bottomSheet'
import LaporanServices from '../../../services/laporan'
import CapresChoice from '../../../components/bottomSheet/CapresChoice'
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomButton from '../../../components/customButton'
import SelectView from '../../../components/bottomSheet/select'
import StarView from '../../../components/bottomSheet/starChoice'
import FormErrorMessage from '../../../components/alert/formErrorMessage'
import IconStarOutline from '../../../assets/images/icon/icon_star_outline.png';
import ChildrenButton from '../../../components/customButtonChildren'
import { launchImageLibrary } from 'react-native-image-picker'
import FigurChoice from '../../../components/bottomSheet/figurChoice'
import FigurServices from '../../../services/figur'
import KategoriFigurChoice from '../../../components/bottomSheet/kategoriFigurChoice'

const BuatFigurScreen = ({navigation, route}) => {
  const { jenis } = route.params;
  const [photoKegiatan, setPhotoKegiatan] = useState([]);
  const [tagTeman, setTagTeman] = useState([]);
  const [phone, setPhone] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPhone, setIsPhone] = useState(true);
  const [phoneNotEmpty, setPhoneNotEmpty] = useState(true);
  const [judul, setJudul] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [idLokasi, setIdLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const [isModalKategoriTokohVisible, setModalKategoriTokohVisible] = useState(false);
  const [isModalLokasiVisible, setModalLokasiVisible] = useState(false);
  const [kategoriTokoh, setKategoriTokoh] = useState("");
  const [idKategoriTokoh, setIdKategoriTokoh] = useState("");
  const [isModalRekomendasiVisible, setModalRekomendasiVisible] = useState(false);
  const [rekomendasi, setRekomendasi] = useState("");
  const [idRekomendasi, setIdRekomendasi] = useState("");
  const [isModalAfiliasiVisible, setModalAfiliasiVisible] = useState(false);
  const [afiliasi, setAfiliasi] = useState("");
  const [idAfiliasi, setIdAfiliasi] = useState("");
  const [isModalDukunganVisible, setModalDukunganVisible] = useState(false);
  const [dukungan, setDukungan] = useState("");
  const [idDukungan, setIdDukungan] = useState("");
  const [isModalLingkupVisible, setModalLingkupVisible] = useState(false);
  const [lingkup, setLingkup] = useState("");
  const [idLingkup, setIdLingkup] = useState("");
  const [nilai, setNilai] = useState("");
  const [isModalNilaiVisible, setModalNilaiVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [isDeskripsi, setIsDeskripsi] = useState(true);
  const [isAnalisis, setIsAnalisis] = useState(true);
  const [isModalVisiblePhoto, setIsModalVisiblePhoto] = useState(false);
  const [analisis, setAnalisis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fotoFigur, setFotoFigur] = useState("");
  const [perkiraanPartisipan, setPerkiraanPartisipan] = useState("");
  const [isModalTemanVisible, setIsModalTemanVisible] = useState(false);
  const [pengasuh, setPengasuh] = useState("");
  const [jumlahAnggota, setJumlahAnggota] = useState("");
  const [organisasi, setOrganisasi] = useState("");
  const [kategoriLain, setKategoriLain] = useState("");
  const [alamatOrganisasi, setAlamatOrganisasi] = useState("");
  const [showAlertYakinKirim, setShowAlertYakinKirim] = useState(false);
  const desc_required = useSelector((state)=>{
    return state.laporan.jenisLaporan.desc_required;
  });

  const starData = [[1], [1,2], [1,2,3], [1,2,3,4], [1,2,3,4,5]];


  const dispatch = useDispatch();


  handleLanjutkan = () => {
    console.log({
      "foto": fotoFigur,
      "nama": judul,
      "nomor_ponsel": phone,
      "organisasi": organisasi,
      "kabkot": idLokasi,
      "kategori": idKategoriTokoh,
      "afilisasi_pilpres_2019": idAfiliasi,
      "dukungan_capres_saat_ini": idDukungan,
      "lingkup_pengaruh": idLingkup,
      "nilai_klasifikasi": nilai,
      "rekam_jejak_politik": deskripsi,
      "analisis": analisis,
      "rekomendasi": idRekomendasi,
      "pemimpin_pengasuh": pengasuh,
      "alamat_organisasi": alamatOrganisasi,
      "jumlah_anggota": jumlahAnggota,
      "kategori_lain_lain": kategoriLain
    });
  setIsLoading(true);
    FigurServices.addFigur({
      "foto": fotoFigur,
      "nama": judul,
      "nomor_ponsel": phone,
      "organisasi": organisasi,
      "kabkot": idLokasi,
      "kategori": idKategoriTokoh,
      "afilisasi_pilpres_2019": idAfiliasi,
      "dukungan_capres_saat_ini": idDukungan,
      "lingkup_pengaruh": idLingkup,
      "nilai_klasifikasi": nilai,
      "rekam_jejak_politik": deskripsi,
      "analisis": analisis,
      "rekomendasi": idRekomendasi,
      "pemimpin_pengasuh": pengasuh,
      "alamat_organisasi": alamatOrganisasi,
      "jumlah_anggota": jumlahAnggota,
      "kategori_lain_lain": kategoriLain
    }, jenis)
  .then(res=>{
    console.log(res.data);
    if(res.data.message == "Tokoh/Organisasi/Komunitas berhasil dibuat."){
      navigation.navigate('LaporanTerkirim');
    }else{
      setShowAlert(true);
      setMessage(res.data.message);
    }
    setIsLoading(false);
  })
  .catch(err=>{
    console.log(err.response);
  })
  }



  handleAmbilFoto = () => {
    navigation.navigate("AmbilFotoRegister", {path: 'UploadPhotoLaporan', type: 'noholes'});
  }

  const savePhotosLaporan = () =>{
    dispatch(
      setPhotos({photos: photoKegiatan, setPhoto: setPhotoKegiatan})
    );
  }



  const savePhotoLaporan = () =>{
    dispatch(
      setPhotos({photo: fotoFigur, setPhoto: setFotoFigur})
    );
  }

  useEffect(()=> {
    savePhotoLaporan();
  }, [fotoFigur])

  const UbahPhotoModal = () => {
    return(
    <View style={{flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-evenly'}}>
        <ChildrenButton onPress={handleAmbilFoto} height='95%' width='45%' children={<View style={{alignItems: 'center'}}>
            <Text style={styles.textModal}>Ambil Foto</Text>
            <Ionicons name="camera" size={20} color={Color.primaryMain} />
        </View>} borderColor={Color.primaryMain} />
        <ChildrenButton onPress={handlePilihDariGaleri} width='45%' height='95%' children={<View style={{alignItems: 'center'}}>
            <Text style={styles.textModal}>Pilih Dari Galeri</Text>
            <Ionicons name="folder" size={20} color={Color.primaryMain} />
        </View>} borderColor={Color.primaryMain} />
    </View>
    );
  }

  handleAmbilFoto = () => {
    setIsModalVisiblePhoto(false);
    navigation.navigate("AmbilFotoRegister", {path: 'HasilUnggahFotoSimpatisan', type: 'noholes'});
  }

handlePilihDariGaleri = async () => {
    setIsModalVisiblePhoto(false);
    let pathImage = '';
    let imageBase64;
    let didCancel = false;
    const options= {
        storageOptions: {
            mediaType: 'photo',
            quality: 0.8,
        },
        includeBase64: true
    };
    await launchImageLibrary(options, (response)=> {
        if(response.didCancel){
          didCancel = response.didCancel;
        }else{
          pathImage = {uri: 'data:image/jpeg;base64,' + response.assets[0].base64}
          imageBase64 = response.assets[0].base64;
        }
    });
    if(!didCancel){
      navigation.navigate("HasilLibraryFotoSimpatisan", {imageSource: pathImage, imageBase64: imageBase64});
    }

}


  phoneValidation = (phone) => {
    const reg = /^[0]?[789]\d{8,11}$/;
    if (reg.test(phone) === false) {
      setIsPhone(false);
    }else{
      setIsPhone(true);
    }
  }

  handleAddPhoto = () => {
    setIsModalVisiblePhoto(true);
  }

  ItemStar = ({jumlah}) => {
    return(
      <View style={{flexDirection:'row'}}>
        {starData[jumlah-1].map((item, index)=>{
            return (
                <Image key={index} source={IconStarOutline} style={{width: 20, height: 20}} />
            )
        })}
      </View>
    );
  }

  handleValidation = () => {
    if(jenis == 'organisasi'){
      console.log("di cek");
      if(fotoFigur && judul && phone && pengasuh && jumlahAnggota && alamatOrganisasi && lokasi && kategoriTokoh && afiliasi
        && dukungan && lingkup && nilai && deskripsi && analisis && rekomendasi){
        setIsContinue(true);
      }else{
        setIsContinue(false);
      }
    }else if(jenis == 'tokoh'){
      
      if(fotoFigur && judul && phone && organisasi && lokasi && kategoriTokoh && afiliasi
        && dukungan && lingkup && nilai && deskripsi && analisis && rekomendasi){
        setIsContinue(true);
      }else{
        setIsContinue(false);
      }
    }else{
      if(fotoFigur && judul && phone && pengasuh && jumlahAnggota && lokasi && kategoriTokoh && afiliasi
        && dukungan && lingkup && nilai && deskripsi && analisis && rekomendasi){
        setIsContinue(true);
      }else{
        setIsContinue(false);
      }
    }
  }

  useEffect(()=>{
    if(phone){
      phoneValidation(phone);
    }else{
      setPhoneNotEmpty(false);
    }
  }, [phone]);

  useEffect(()=>{
    if(deskripsi.length > 550){
      setIsDeskripsi(false);
    }else{
      setIsDeskripsi(true);
    }
  }, [deskripsi])

  useEffect(()=>{
    if(analisis.length > 550){
      setIsAnalisis(false);
    }else{
      setIsAnalisis(true);
    }
  }, [deskripsi])

  useEffect(()=> {
    handleValidation();
  }, [fotoFigur, judul, phone, pengasuh, jumlahAnggota, organisasi, lokasi, alamatOrganisasi, kategoriTokoh, afiliasi,
  dukungan, lingkup, nilai, deskripsi, analisis, rekomendasi]);
  return (
    <SafeAreaView style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet 
      isModalVisible={isModalTemanVisible}
      setModalVisible={setIsModalTemanVisible}
      title={`Tandai Simpatisan`}
      children={<SelectView jumlah={tagTeman.length} />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalNilaiVisible}
      setModalVisible={setModalNilaiVisible}
      title={`Nilai Klasifikasi`}
      children={<StarView data={starData} item={nilai} setItem={setNilai} setModalVisible={setModalNilaiVisible} />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalKategoriTokohVisible}
      setModalVisible={setModalKategoriTokohVisible}
      title={`Pilih Kategori`}
      children={<KategoriFigurChoice kategoriLain={kategoriLain} setKategoriLain={setKategoriLain} item={kategoriTokoh} setItem={setKategoriTokoh} 
      setModalVisible={setModalKategoriTokohVisible} id={idKategoriTokoh} setId={setIdKategoriTokoh} title={jenis}  />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalLokasiVisible}
      setModalVisible={setModalLokasiVisible}
      title={`Pilih Lokasi`}
      children={<FigurChoice item={lokasi} setItem={setLokasi} 
      setModalVisible={setModalLokasiVisible} id={idLokasi} setId={setIdLokasi}
       subject={"Lokasi"} title={jenis}  />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalAfiliasiVisible}
      setModalVisible={setModalAfiliasiVisible}
      title={`Pilih Afiliasi Pilpres 2019`}
      children={<FigurChoice item={afiliasi} setItem={setAfiliasi} 
      setModalVisible={setModalAfiliasiVisible} id={idAfiliasi} setId={setIdAfiliasi}
       subject={"Afiliasi"} title={jenis}  />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalDukunganVisible}
      setModalVisible={setModalDukunganVisible}
      title={`Pilih Dukungan Capres Saat Ini`}
      children={<FigurChoice item={dukungan} setItem={setDukungan} 
      setModalVisible={setModalDukunganVisible} id={idDukungan} setId={setIdDukungan}
       subject={"Dukungan"} title={jenis}  />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalLingkupVisible}
      setModalVisible={setModalLingkupVisible}
      title={`Pilih Lingkup Pengaruh`}
      children={<FigurChoice item={lingkup} setItem={setLingkup} 
      setModalVisible={setModalLingkupVisible} id={idLingkup} setId={setIdLingkup}
       subject={"Lingkup"} title={jenis}  />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalRekomendasiVisible}
      setModalVisible={setModalRekomendasiVisible}
      title={`Pilih Rekomendasi`}
      children={<FigurChoice item={rekomendasi} setItem={setRekomendasi} 
      setModalVisible={setModalRekomendasiVisible} id={idRekomendasi} setId={setIdRekomendasi}
       subject={"Rekomendasi"} title={jenis}  />}
      />
      <CustomBottomSheet children={<UbahPhotoModal />} 
        isModalVisible={isModalVisiblePhoto} setModalVisible={setIsModalVisiblePhoto} 
        title="Pilih Foto" />
      <HeaderWhite navigation={navigation} title={`Figur ${jenis}`} />
      <ScrollView nestedScrollEnabled={true} style={{padding: 20}}>
        {/** Unggah Foto */}
        <View style={styles.unggahFoto}>
          <View style={{height: 15}}></View>
          <View style={{flexDirection: 'row'}}>
              {fotoFigur == "" ? 
              <Pressable onPress={handleAddPhoto} style={styles.boxAddPhoto}><Ionicons name="add-circle-outline" color={Color.title}
              size={24} /></Pressable>  : 
              <Pressable onPress={handleAddPhoto}><Image style={{width: 100, height: 100, borderRadius: 8}} source={{uri: `data:image/png;base64,${fotoFigur}`}} /></Pressable>
              }
              <View style={{width: 20}}></View>
              <View style={{justifyContent: 'center'}}>
                  <Text style={{...FontConfig.titleThree, color: '#000000'}}>{`Upload foto ${jenis}`}</Text>
                  <View style={{height: 5}}></View>
                  <Text style={{...FontConfig.captionOne, color: Color.neutralZeroSeven}}>Pastikan foto yang kamu kirimkan terlihat jelas </Text>
                  
                  <View style={{height: 5}}></View>
              </View>
          </View>
        </View>
        <View style={{height: 30}}></View>
        <Text style={styles.textDetailLaporan}>{`Detail ${jenis}`}</Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 5}}>Nama</Text>
        <CustomInput value={judul} setValue={setJudul} placeholder={jenis == 'tokoh' ? `Masukkan nama lengkap/alias` : 
        jenis == `organisasi` ? `Masukkan nama organisasi` : jenis == 'komunitas' ? `Masukkan nama komunitas` : ``} />
        {jenis == 'tokoh' ? <Text style={styles.textMasukanDeskripsi}>{`Jika nama alias, harap sertakan keterangan “(Alias)”`}</Text> : <></>}
        <Text style={styles.titleFormInput}>Nomor Ponsel</Text>
        <TextInput value={phone} onChangeText={setPhone} onBlur={() => setPhoneIsFocused(false)} onFocus={() => setPhoneIsFocused(true)} 
        style={{...styles.phoneInput, borderColor: !isPhone? Color.danger : ((phoneIsFocused || phone)? Color.neutralZeroSeven : Color.lightBorder)}} 
        keyboardType='number-pad' placeholder='08' placeholderTextColor={Color.disable} />
        {phoneNotEmpty?(isPhone? <></> : <FormErrorMessage text="Nomor ponsel yang dimasukkan tidak valid." />): 
        <Text style={styles.textMasukanDeskripsi}>Masukan nomor yang dapat dihubungi</Text>}
        {jenis != "tokoh" ? <><View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 5}}>{`Pimpinan/Pengasuh ${jenis[0].toUpperCase()+jenis.slice(1)}`}</Text>
        <CustomInput value={pengasuh} setValue={setPengasuh} placeholder="Masukan nama pimpinan/pengasuh" /></> : <></>}
        <View style={{height: 10}}></View>
        {jenis != 'tokoh' ? <><Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 5}}>{`Jumlah Anggota`}</Text>
        <TextInput value={jumlahAnggota} onChangeText={setJumlahAnggota} placeholderTextColor={Color.disable}
        style={{...styles.phoneInput, borderColor: (jumlahAnggota)? Color.neutralZeroSeven : Color.lightBorder}} 
        keyboardType='number-pad' placeholder='Masukan jumlah anggota' />
        <View style={{height: 10}}></View></> : <></>}
        {jenis == 'tokoh' ? <><Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 5}}>Organisasi</Text>
        <CustomInput value={organisasi} setValue={setOrganisasi} placeholder="Masukkan nama organisasi" />
        <Text style={styles.textMasukanDeskripsi}>{`Jika tokoh tidak ikut organisasi, masukan “Tidak Ada”`}</Text></> : <></>}
        {jenis == 'organisasi' ? <><Text style={{...styles.titleFormInput, paddingBottom: 5}}>Alamat Organisasi</Text>
        <CustomTextArea value={alamatOrganisasi} setValue={setAlamatOrganisasi} placeholder="Masukkan alamat organisasi"
        width='100%' height={100} /></> : <></>}
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>{`Lokasi (Kota/Kabupaten)`}</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setModalLokasiVisible(true)} placeholder='Pilih' text={lokasi} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Kategori</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setModalKategoriTokohVisible(true)} placeholder='Pilih' text={kategoriLain != "" ? kategoriLain : kategoriTokoh} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Afiliasi Pilpres 2019</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setModalAfiliasiVisible(true)} placeholder='Pilih' text={afiliasi} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Dukungan Capres Saat Ini</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setModalDukunganVisible(true)} placeholder='Pilih' text={dukungan} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Lingkup Pengaruh</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setModalLingkupVisible(true)} placeholder='Pilih' text={lingkup} />
        <Text style={styles.textMasukanDeskripsi}>{`Pilih jangkauan pengaruh yang diberikan oleh tokoh`}</Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Nilai Klasifikasi</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setModalNilaiVisible(true)} placeholder='Pilih' text={nilai == "" ? '' : '  '} childLeft={nilai == '' ? <></> : <ItemStar jumlah={nilai} />} />
        <Text style={styles.textMasukanDeskripsi}>{`Berikan nilai untuk pengaruh yang diberikan`}</Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 5}}>{`Rekam Jejak Politik (5 tahun terakhir)`}</Text>
        <CustomTextArea inputNotWrong={isDeskripsi} value={deskripsi} setValue={setDeskripsi} placeholder="Tuliskan rekam jejak politik..."
        width='100%' height={100} />
        <Text style={{...styles.textMasukanDeskripsi, color: isDeskripsi ? Color.secondaryText : Color.danger}}>
          {`Masukan rekam jejak maksimal 550 karakter.`}
        </Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 5}}>{`Analisis`}</Text>
        <CustomTextArea inputNotWrong={isAnalisis} value={analisis} setValue={setAnalisis} placeholder="Tuliskan pandangan..."
        width='100%' height={100} />
        <Text style={{...styles.textMasukanDeskripsi, color: isAnalisis ? Color.secondaryText : Color.danger}}>
          {`Masukan pandangan maksimal 550 karakter.`}
        </Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Rekomendasi</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setModalRekomendasiVisible(true)} placeholder='Pilih' text={rekomendasi} />
        <View style={{height: 10}}></View>
        <View style={{height: 30}}></View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}>
        <CustomButton
            onPress={()=>setShowAlertYakinKirim(true)} 
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
        <AwesomeAlert
          show={showAlertYakinKirim}
          showProgress={false}
          title="Yakin ingin kirim?"
          message="Data yang sudah terkirim tidak dapat diubah kembali ya, jadi pastikan data sudah sesuai."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Ya, Kirim"
          cancelText="Batal"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, borderRadius: 26, width: '50%', height: '80%',  alignItems: 'center'}}
          cancelButtonStyle={{width: '40%', borderWidth:1, borderColor: Color.lightBorder, height: '80%', borderRadius: 26, alignItems: 'center', backgroundColor: Color.neutralZeroOne}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          cancelButtonTextStyle={{...FontConfig.buttonThree, color: Color.neutralTen}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertYakinKirim(false);
            handleLanjutkan();
          }}
          onCancelPressed={()=>{
            setShowAlertYakinKirim(false);
          }}
        />
    </SafeAreaView>
  )
}

export default BuatFigurScreen

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
  textModal: {
    ...FontConfig.bodyOne,
    color: Color.primaryMain
  },
  titleFormInput:{
    color: Color.secondaryText,
    ...FontConfig.bodyTwo,
    marginTop: 10,
    marginBottom: 1
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
  phoneInput: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    ...FontConfig.bodyOne,
    color: Color.primaryText
}
})