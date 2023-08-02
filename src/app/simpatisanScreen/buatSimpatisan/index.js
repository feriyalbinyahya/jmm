import { Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../../components/customInput';
import FormErrorMessage from '../../../components/alert/formErrorMessage';
import { SelectCountry } from 'react-native-element-dropdown';
import IconInstagram from '../../../assets/images/icon/icon_instagram.png';
import IconTiktok from '../../../assets/images/icon/icon_tiktok.png';
import IconTwitter from '../../../assets/images/icon/icon_twitter.png';
import IconFacebook from '../../../assets/images/icon/icon_facebook.png';
import CustomButton from '../../../components/customButton';
import CustomInputAddon from '../../../components/customInputAddon';
import RegistrationService from '../../../services/registration';
import CustomSelect from '../../../components/customSelect';
import CustomBottomSheet from '../../../components/bottomSheet';
import LaporanServices from '../../../services/laporan';
import CapresChoice from '../../../components/bottomSheet/CapresChoice';
import DropDownButton from '../../../components/buttonDropdown';
import CustomTextArea from '../../../components/customTextArea';
import ChildrenButton from '../../../components/customButtonChildren';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { setPhotos } from '../../../redux/simpatisan';
import SimpatisanServices from '../../../services/simpatisan';
import AwesomeAlert from 'react-native-awesome-alerts';

const TambahkanSimpatisan = ({navigation}) => {
    const [foto, setFoto] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneIsFocused, setPhoneIsFocused] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [isPhone, setIsPhone] = useState(true);
    const [phoneNotEmpty, setPhoneNotEmpty] = useState(true);
    const [instagram, setInstagram] = useState("");
    const [tiktok, setTiktok] = useState("");
    const [twitter, setTwitter] = useState("");
    const [facebook, setFacebook] = useState("");
    const [dataProvinsi, setDataProvinsi] = useState([]);
    const [dataKabkot, setDataKabkot] = useState([]);
    const [dataKecamatan, setDataKecamatan] = useState([]);
    const [provinsi, setProvinsi] = useState('');
    const [kota, setKota] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [capresData, setCapresData] = useState([]);
    const [capresLoading, setCapresLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisiblePhoto, setIsModalVisiblePhoto] = useState(false);
    const [capres, setCapres] = useState("");
    const [idCapres, setIdCapres] = useState(0);
    const [alasanSuka, setAlasanSuka] = useState("");
    const [isModalVisibleTidakSuka, setIsModalVisibleTidakSuka] = useState(false);
    const [capresTidakSuka, setCapresTidakSuka] = useState("");
    const [idCapresTidakSuka, setIdCapresTidakSuka] = useState(0);
    const [alasanTidakSuka, setAlasanTidakSuka] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    phoneValidation = (phone) => {
        const reg = /^[0]?[789]\d{8,11}$/;
        if (reg.test(phone) === false) {
          setIsPhone(false);
        }else{
          setIsPhone(true);
        }
    }

    const handleLanjutkan = () => {
      setIsLoading(true);
      SimpatisanServices.addSimpatisan({
        "nama": `${firstname} ${lastname}`,
        "foto": foto,
        "no_hp": phone,
        "domisili_prov": provinsi,
        "domisili_kabkot": kota,
        "domisili_kec": kecamatan,
        "sosmed_fb": facebook,
        "sosmed_tiktok": tiktok,
        "sosmed_twitter": twitter,
        "sosmed_instagram": instagram,
        "preferensi_capres": capres,
        "alasan_preferensi_capres": alasanSuka,
        "capres_tidak_suka": capresTidakSuka,
        "alasan_capres_tidak_suka": alasanTidakSuka
    })
      .then(res=> {
        console.log(res.data.message);
        if(res.data.message == "Pendaftaran simpatisan sukses."){
          setShowAlertSuccess(true);
        }else{
          setMessageError(res.data.message);
          setShowAlert(true);
        }
        setIsLoading(false);
      })
      .catch(err=> {
        setMessageError(err.response.data.message);
        setShowAlert(true);
        setIsLoading(false);
      })
    }

    const getDataProvinsi = () => {
      RegistrationService.getAllProvinsi()
      .then(res=> {
        setDataProvinsi(res.data.data);
      })
      .catch(err=> {
        console.log(err);
      })
    }

    const getDataKota = (properti) => {
      RegistrationService.getAllKota(properti)
      .then(res=> {
        setDataKabkot(res.data.data);
      })
      .catch(err=> {
        console.log(err);
      })
    }

    const getDataKecamatan = (properti) => {
      RegistrationService.getAllKecamatan(properti)
      .then(res=> {
        setDataKecamatan(res.data.data);
      })
      .catch(err=> {
        console.log(err);
      })
    }

    const handleTambahMediaSosial = () => {
      let value;
      if(mediaSosial == "1"){
        value = IconInstagram;
      }else if(mediaSosial == "2"){
        value = IconTiktok;
      }else if(mediaSosial == "3"){
        value = IconTwitter;
      }else{
        value = IconFacebook;
      }
      setListMediaSosial([...listMediaSosial, {id: mediaSosial, username: username, image: value}]);
    }


    const getCapresData = () =>{
      setCapresLoading(true);
      SimpatisanServices.getCapres()
      .then(res=>{
        setCapresData(res.data.data);
        setCapresLoading(false);
      })
      .catch(err=>{
        console.log(err);
      })
    }

    const savePhotoLaporan = () =>{
      dispatch(
        setPhotos({photo: foto, setPhoto: setFoto})
      );
    }

    useEffect(()=> {
      savePhotoLaporan();
    }, [foto])

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

  handleValidation = () => {
    if(firstname && lastname && phone && isPhone && (instagram || tiktok || facebook || twitter) && provinsi && 
    kota && kecamatan && capres && alasanSuka && capresTidakSuka && alasanTidakSuka){
      setIsContinue(true);
    }else{
      setIsContinue(false);
    }
  }

    handleAddPhoto = () => {
      setIsModalVisiblePhoto(true);
    }

    useEffect(()=>{
      getDataProvinsi();
      getCapresData();
    },[])

    useEffect(()=>{
      if(provinsi != '' && provinsi != 0){
        getDataKota(parseInt(provinsi));
      }
    }, [provinsi])

    useEffect(()=>{
      if(kota != '' && kota != 0){
        getDataKecamatan(parseInt(kota));
      }
    }, [kota])

    useEffect(()=>{
        if(phone){
          phoneValidation(phone);
        }
      }, [phone]);

    useEffect(()=> {
      handleValidation();
    }, [firstname, lastname, phone, instagram, tiktok, facebook, twitter, provinsi, kota, kecamatan,
    capres, alasanSuka, capresTidakSuka, alasanTidakSuka, foto]);
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet 
      isModalVisible={isModalVisible}
      setModalVisible={setIsModalVisible}
      title="Capres yang disuka"
      children={<CapresChoice data={capresData} item={capres} setItem={setCapres} idCapres={idCapres} setIdCapres={setIdCapres} setModalVisible={setIsModalVisible} />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalVisibleTidakSuka}
      setModalVisible={setIsModalVisibleTidakSuka}
      title="Capres yang tidak disuka"
      children={<CapresChoice data={capresData} item={capresTidakSuka} setItem={setCapresTidakSuka} idCapres={idCapresTidakSuka} setIdCapres={setIdCapresTidakSuka} setModalVisible={setIsModalVisibleTidakSuka} />}
      />
      <CustomBottomSheet children={<UbahPhotoModal />} 
        isModalVisible={isModalVisiblePhoto} setModalVisible={setIsModalVisiblePhoto} 
        title="Pilih Foto" />
      <HeaderWhite title="Tambah Kawan" navigation={navigation} />
      <ScrollView>
        {/** Unggah Foto */}
        <View style={styles.unggahFoto}>
          <View style={{flexDirection: 'row'}}>
              <Text style={{...FontConfig.titleThree, color: '#000000'}}>Unggah Foto</Text>
              <View style={{width: 5}}></View>
              <Text style={{...FontConfig.titleSemiBoldFour, color:Color.secondaryText}}>{`(Optional)`}</Text>
          </View>
          <View style={{height: 15}}></View>
          <View style={{flexDirection: 'row'}}>
              {foto == "" ? 
              <Pressable onPress={handleAddPhoto} style={styles.boxAddPhoto}><Ionicons name="add-circle-outline" color={Color.title}
              size={24} /></Pressable>  : 
              <Pressable onPress={handleAddPhoto}><Image style={{width: 100, height: 100, borderRadius: 8}} source={{uri: `data:image/png;base64,${foto}`}} /></Pressable>
              }
              <View style={{width: 20}}></View>
              <View style={{justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontSize: 6, color: Color.neutralZeroSeven}}>{'\u2B24'}</Text>
                      <View style={{width: 4}}></View>
                      <Text style={{...FontConfig.captionOne, color: Color.neutralZeroSeven}}>Pastikan foto yang digunakan terlihat jelas</Text>
                  </View>
                  <View style={{height: 5}}></View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontSize: 6, color: Color.neutralZeroSeven}}>{'\u2B24'}</Text>
                      <View style={{width: 4}}></View>
                      <Text style={{...FontConfig.captionOne, color: Color.neutralZeroSeven}}>Ukuran file maks. 10mb</Text>
                  </View>
              </View>
          </View>
        </View>

        {/** Data pribadi */}
        <View style={styles.dataPribadi}>
          <Text style={{...FontConfig.titleThree, color: '#000000'}}>Data Pribadi</Text>
          <View style={{flexDirection: 'row'}}>
                <View style={{width: '47%'}}>
                  <Text style={styles.titleFormInput}>Nama Depan</Text>
                  <CustomInput inputNotWrong={true} value={firstname} setValue={setFirstname} placeholder="Nama depan" />
                </View>
                <View style={{width: '5%'}}></View>
                <View style={{width: '47%'}}>
                  <Text style={styles.titleFormInput}>Nama Belakang</Text>
                  <CustomInput inputNotWrong={true} value={lastname} setValue={setLastname} placeholder="Nama belakang" />
                </View>
          </View>
          <Text style={styles.titleFormInput}>Nomor Ponsel</Text>
          <TextInput value={phone} onChangeText={setPhone} onBlur={() => setPhoneIsFocused(false)} onFocus={() => setPhoneIsFocused(true)} 
          style={{...styles.phoneInput, borderColor: !isPhone? Color.danger : ((phoneIsFocused || phone)? Color.neutralZeroSeven : Color.lightBorder)}} 
          keyboardType='number-pad' placeholder='08' placeholderTextColor={Color.disable} />
          {phoneNotEmpty?(isPhone? <></> : <FormErrorMessage text="Nomor ponsel yang dimasukkan tidak valid." />): 
          <FormErrorMessage text="Kolom wajib diisi." />}
        </View>

        {/** Media sosial */}
        <View style={styles.mediaSosial}>
          <Text style={{...FontConfig.titleThree, color: '#000000'}}>Media Sosial</Text>
          <View style={{height: 3}}></View>
          <Text style={{...FontConfig.captionOne, color: '#757575'}}>{`Paling tidak harap isi 1 (satu) media sosialmu.`}</Text>
          <View>
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Instagram</Text>
            <View style={{height: 5}}></View>
            <CustomInputAddon placeholder="Nama akun/username@" 
            value={instagram} setValue={setInstagram}
            leftChild={<Image source={IconInstagram} style={styles.iconStyle}
            />} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tiktok</Text>
            <View style={{height: 5}}></View>
            <CustomInputAddon placeholder="Nama akun/username@" 
            value={tiktok} setValue={setTiktok}
            leftChild={<Image source={IconTiktok} style={styles.iconStyle}
            />} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Twitter</Text>
            <View style={{height: 5}}></View>
            <CustomInputAddon placeholder="Nama akun/username@" 
            value={twitter} setValue={setTwitter}
            leftChild={<Image source={IconTwitter} style={styles.iconStyle}
            />} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Facebook</Text>
            <View style={{height: 5}}></View>
            <CustomInputAddon placeholder="Nama akun/username@" 
            value={facebook} setValue={setFacebook}
            leftChild={<Image source={IconFacebook} style={styles.iconStyle}
            />} />
          </View>
          <View style={{height: 5}}></View>
        </View>
        {/** Domisili */}
        <View style={styles.domisili}>
          <Text style={{...FontConfig.titleThree, color: '#000000'}}>Domisili</Text>
          <View style={{height: 8}}></View>
          <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Provinsi</Text>
          <View style={{height: 5}}></View>
          <CustomSelect value={provinsi} setValue={setProvinsi} data={dataProvinsi}
           title="Provinsi" labelField="nama_provinsi" valueField="id_provinsi" />
          <View style={{height: 10}}></View>
          {provinsi != "" ? 
          <>
          <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Kab/Kot</Text>
          <View style={{height: 5}}></View>
          <CustomSelect value={kota} setValue={setKota} data={dataKabkot}
          title="Kota/Kabupaten" labelField="nama_kabkot" valueField="id_kabkot" /></> : <></>
          }
          <View style={{height: 10}}></View>
          {kota != "" ? 
          <>
          <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Kecamatan</Text>
          <View style={{height: 5}}></View>
          <CustomSelect value={kecamatan} setValue={setKecamatan} data={dataKecamatan}
          title="Kecamatan" labelField="nama_kecamatan" valueField="id_kecamatan" /></> : <></>
          }
        </View>
        <View style={{height: 6, backgroundColor: '#EDEDED'}}></View>

        {/** Preferensi Capres */}
        <View style={styles.preferensiCapres}>
        <Text style={{...FontConfig.titleThree, color: '#000000'}}>Preferensi Capres</Text>
        <View style={{height: 8}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Capres yang disuka</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setIsModalVisible(true)} placeholder='Pilih' text={capres} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Alasan suka</Text>
        <View style={{height: 5}}></View>
        <CustomTextArea inputNotWrong={true} value={alasanSuka} setValue={setAlasanSuka}
          placeholder="Tulis alasanmu disini.." width='100%' />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Capres yang tidak disuka</Text>
        <View style={{height: 5}}></View>
        <DropDownButton onPress={()=>setIsModalVisibleTidakSuka(true)} placeholder='Pilih' text={capresTidakSuka} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Alasan Tidak suka</Text>
        <View style={{height: 5}}></View>
        <CustomTextArea inputNotWrong={true} value={alasanTidakSuka} setValue={setAlasanTidakSuka}
          placeholder="Tulis alasanmu disini.." width='100%' />
        <View style={{height: 10}}></View>
        </View>
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
          show={showAlert}
          showProgress={false}
          title="Gagal menambahkan kawan"
          message={messageError}
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
          show={showAlertSuccess}
          showProgress={false}
          title="Sukses menambahkan kawan"
          message="Kawan baru berhasil tersimpan"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Oke"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '40%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertSuccess(false);
            navigation.pop();
          }}
        />
        <AwesomeAlert
          show={isLoading}
          showProgress={true}
          progressColor={Color.graySeven}
          message="Loading"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
        />
    </View>
  )
}

export default TambahkanSimpatisan

const styles = StyleSheet.create({
    unggahFoto: {
        paddingHorizontal: 20,
        paddingTop: 20
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
    dataPribadi: {
        paddingHorizontal: 20,
        paddingTop: 20
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
    mediaSosial: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    dropdown: {
      margin: 0,
      height: 45,
      width: '100%',
      borderBottomColor: 'gray',
      borderColor: Color.neutralZeroSeven,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10
    },
    imageStyle: {
      width: 24,
      height: 24,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      marginLeft: 8,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    domisili: {
      padding: 20
    },
    preferensiCapres: {
      padding: 20
    },
    textModal: {
      ...FontConfig.bodyOne,
      color: Color.primaryMain
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
      width: '90%',
    },
})