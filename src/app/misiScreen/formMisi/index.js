import { StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderWhite from '../../../components/header/headerWhite'
import IconSatu from '../../../assets/images/icon/icon_satu.png';
import IconDua from '../../../assets/images/icon/icon_dua.png';
import IconTiga from '../../../assets/images/icon/icon_tiga.png';
import { Color, FontConfig } from '../../../theme';
import CustomInput from '../../../components/customInput';
import CustomTextArea from '../../../components/customTextArea';
import CustomButton from '../../../components/customButton';
import DocumentPicker from 'react-native-document-picker'
import Utils from '../../../utils/Utils';
import AwesomeAlert from 'react-native-awesome-alerts';
import ChildrenButton from '../../../components/customButtonChildren';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { deleteTemen, setTeman } from '../../../redux/misi';
import DropDownButton from '../../../components/buttonDropdown';
import CustomBottomSheet from '../../../components/bottomSheet';
import SelectView from '../../../components/bottomSheet/select';
import MisiServices from '../../../services/misi';
import {AspectRatio,} from 'native-base'

const FormMisiScreen = ({navigation, route}) => {
  const {id, judul_kegiatan, konsep_kegiatan, laporan_kegiatan, media, nama_foto, nama_file, link, 
    perkiraan_partisipan, tandai_kawan, nama_teman} = route.params;
  const [judul, setJudul] = useState(judul_kegiatan);
  const [konsep, setKonsep] = useState(konsep_kegiatan);
  const [filePdf, setFilePdf] = useState([]);
  const [fotoBukti, setFotoBukti] = useState([]);
  const [fotoBuffer, setFotoBuffer] = useState([]);
  const [namaFotoBuffer, setNamaFotoBuffer] = useState([]);
  const [hapusFoto, setHapusFoto] = useState([]);
  const [hapusDoc, setHapusDoc] = useState(false);
  const [foto, setFoto] = useState(media);
  const [namaFoto, setNamaFoto] = useState(nama_foto);
  const [namaFile, setNamaFile] = useState(nama_file);
  const [showAlertFileBig, setShowAlertFileBig] = useState(false);
  const [showAlertPhotoBig, setShowAlertPhotoBig] = useState(false);
  const [showAlertLimitFoto, setShowAlertLimitFoto] = useState(false);
  const [listTautan, setListTautan] = useState(link);
  const [tautan, setTautan] = useState("");
  const [isInputActive, setInputActive] = useState(true);
  const [perkiraanPartisipan, setPerkiraanPartisipan] = useState(perkiraan_partisipan);
  const [isModalTemanVisible, setIsModalTemanVisible] = useState(false);
  const [isModalFotoVisible, setIsModalFotoVisible] = useState(false);
  const [tagTeman, setTagTeman] = useState(tandai_kawan);
  const [tagNamaTeman, setTagNamaTeman] = useState(nama_teman);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertSuccessSave, setShowAlertSuccessSave] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [showAlertYakinKirim, setShowAlertYakinKirim] = useState(false);

  const dispatch = useDispatch();

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

  const handlePilihDariFotoDocument = async () => {
    let namafoto = [];
    let fotobukti = [];
    let fotoUri = [];
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        readContent: true,
        allowMultiSelection: true,
      });
      console.log(results);
      if(results.length + fotoBukti.length > 5){
        setShowAlertLimitFoto(true);
      }else{
        for(var i=0; i<results.length; i++){
          if(results[i].size <= 2000000){
            namafoto.push(results[i].name);
            //let fotoBase64 = await Utils.readFileBase64(results[i].uri);
            let fotoAtribut = {
              uri: results[i].uri,
              type: results[i].type,
              name: results[i].name,
            };
            fotobukti.push(fotoAtribut);
            fotoUri.push(results[i].uri)
            
          }else{
            setShowAlertPhotoBig(true);
          }
        }
      }
      setNamaFoto([...namaFoto, ...namafoto]);
      setFotoBukti([...fotoBukti, ...fotobukti]);
      setFoto([...foto, ...fotoUri]);
      
          
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

  const handleRemovePhotoButton = (index) => {
    setNamaFoto(photos => photos.filter((s,i)=>(i != index)));
    setFotoBukti(photos => photos.filter((s,i)=>(i != index)));
    setHapusFoto([...hapusFoto, namaFoto[index]]);
  }

  const handleRemoveLinkButton = (index) => {
    setListTautan(link => link.filter((s,i)=>(i != index)));
  }

  const handleAddTautan = () => {
    setListTautan([...listTautan, tautan]);
    setTautan("");
    setInputActive(false);
  }

  const saveTemanLaporan = () =>{
    dispatch(
      setTeman({teman: tagTeman, namaTeman: tagNamaTeman, setNamaTeman: setTagNamaTeman, setTeman: setTagTeman})
    );
  }

  const deleteDataTeman = () =>{
    dispatch(
      deleteTemen()
    );
  }

  const handleBukaFoto = async(index) => {
    console.log(foto);
    const fotoTerpilih = foto[index];
    if(fotoTerpilih.includes("base64")){
      setPreviewPhoto(fotoTerpilih.split(",")[1]);
      setIsModalFotoVisible(true);
    }else{
      let photoSource = await Utils.readFileBase64(fotoTerpilih);
      setPreviewPhoto(photoSource);
      setIsModalFotoVisible(true);
    }

  }

  const handleBukaFile = async(index) => {
    if(nama_file !=""){
      navigation.navigate("LaporanView", {namaFile: nama_file, filepath: ""});
    }else{
      navigation.navigate("LaporanView", {namaFile: "", filepath: filePdf.uri});
    }

  }

  const FotoView = ({image}) => {
    return(
      <View style={{height: 250, justifyContent: 'center'}}>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image source={{uri: `data:image/png;base64,${image}`} } />
        </AspectRatio>
      </View>
    );
  }

  const handleKirim = (type) => {
    setIsLoading(true);
    const formdata = new FormData();
    fotoBukti.forEach((file, index) => {
      formdata.append('foto', {
          uri: file.uri,
          type: file.type,
          name: file.name // For instance: foto_0.jpg
      });
    });
    //const base64Data = fotoBase64[i].base64_information.split(',')[1];  // Remove the prefix (e.g. "data:image/jpeg;base64,")
    //const buffer = Buffer.from(base64Data, 'base64');
    //fotoBuffer.push(buffer);
    console.log("gaada isi" + filePdf);
    
    hapusFoto.forEach((item, index)=>{
      formdata.append('hapus_foto[]', item);
    })
    formdata.append('judul_kegiatan', judul);
    formdata.append('konsep_kegiatan', konsep);
    formdata.append('laporan_kegiatan', filePdf);
    formdata.append('hapus_doc', hapusDoc);
    listTautan.forEach((item, index)=>{
      formdata.append('tautan[]', item);
    });
    formdata.append('perkiraan_partisipan', perkiraanPartisipan);
    tagTeman.forEach((item, index)=>{
      formdata.append('tandai_kawan[]', item);
    });


    MisiServices.addMisi(id, formdata, type)
    .then(res=>{
      console.log(res);
      if(res.data.message == "Misi Terkirim!"){
        setShowAlertSuccess(true);
      }else if(res.data.message == "Berhasil menyimpan misi laporan anda."){
        setShowAlertSuccessSave(true);
      }else{
        setMessageError(res.data.message);
        setShowAlert(true);
      }
      setIsLoading(false);
    })
    .catch(err=>{
      console.log(err.response);
      setMessageError(err.response.data.message);
      setShowAlert(true);
      setIsLoading(false);
    })
  }

  useEffect(()=> {
    console.log("simpan");
    saveTemanLaporan();
  }, [tagTeman])

  useEffect(()=>{
    if( judul && konsep && namaFoto.length !=0 && listTautan.length !=0){
      setIsContinue(true);
    }else{
      setIsContinue(false);
    }
  }, [konsep, judul, fotoBukti, listTautan])


  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet 
      isModalVisible={isModalTemanVisible}
      setModalVisible={setIsModalTemanVisible}
      onClose={()=>{
        setIsModalTemanVisible(!isModalTemanVisible);
      }}
      title={`Tandai Kawan`}
      children={<SelectView isModalVisible={isModalTemanVisible} setIsModalVisible={setIsModalTemanVisible} type="misi" jumlah={tagTeman.length} />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalFotoVisible}
      setModalVisible={setIsModalFotoVisible}
      title={'Preview photo'}
      children={<FotoView image={previewPhoto} />}
      />
      <HeaderWhite title="" navigation={navigation} />
      <ScrollView>
        {/** tentang kegiatan */}
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 28, height: 28}} source={IconSatu} />
            <View style={{width: '90%', paddingHorizontal: 20}}>
              <Text style={styles.textTitle}>Tentang Kegiatan</Text>
              <Text style={styles.textSubjectForm}>Judul Kegiatan</Text>
              <CustomInput inputNotWrong={true} value={judul} setValue={setJudul} placeholder="Tulis judul kegiatan" />
              <Text style={styles.textSubjectForm}>Konsep Kegiatan</Text>
              <CustomTextArea width='100%' inputNotWrong={true} value={konsep} setValue={setKonsep} 
              placeholder="Tulis konsep kegiatan disini" />
              <Text style={styles.textSubjectForm}>{`Laporan Kegiatan (Opsional)`}</Text>
              <View style={{flexDirection: 'row', borderColor: Color.lightBorder, borderWidth: 1,
            borderRadius: 4, justifyContent: 'space-between'}}>
                <View style={{paddingHorizontal: 10, paddingVertical: 5, maxWidth: '70%'}}>
                  {!namaFile ? <Text style={{...FontConfig.bodyOne, color: Color.neutralZeroSix}}>Belum ada file terpilih</Text> : 
                  <Text numberOfLines={2} style={{...FontConfig.bodyOne, color: Color.primaryMain}}>{namaFile}</Text>
                  }
                </View>
                {!namaFile ? <CustomButton onPress={handlePilihDariFileDocument} marginVertical={0} text="Unggah" height={60} width='30%'  borderRadius={2} backgroundColor={Color.primaryMain}
                fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}} /> : 
                <CustomButton onPress={handleHapusDocument} marginVertical={0} text="Hapus" height={60} width='30%'  borderRadius={2} backgroundColor={Color.danger}
                fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}} />
                }
              </View>
              <View style={{height: 5}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.secondaryText}}>Hanya menerima format pdf dan ukuran file maksimal 10mb</Text>
              {namaFile ? <Pressable onPress={handleBukaFile} style={{marginTop: 10, flexDirection: 'row', alignItems: 'center',
            backgroundColor: Color.purple, alignSelf: 'baseline', paddingHorizontal: 15, paddingVertical: 5,
            borderRadius: 26, }}>
                <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroOne}}>Lihat file</Text>
                <View style={{width: 5}}></View>
                <Ionicons name="eye-outline" color={Color.neutralZeroOne} size={18} />
              </Pressable> : <></>}
            </View>
          </View>
        </View>
        {/** bukti kegiatan */}
        <View style={{backgroundColor: Color.neutralZeroTwo, borderWidth: 1,
        borderColor: Color.neutralZeroTwo}}></View>
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 28, height: 28}} source={IconDua} />
            <View style={{width: '90%', paddingHorizontal: 20}}>
              <Text style={styles.textTitle}>Bukti Kegiatan</Text>
              <Text style={styles.textSubjectForm}>Foto</Text>
              <ChildrenButton disabled={namaFoto.length >= 5} onPress={handlePilihDariFotoDocument} width='60%' height={44} borderRadius={26} borderColor={Color.neutralZeroFive} children={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="cloud-upload-outline" color={namaFoto.length >= 5? Color.disable : '#000000'} size={18} />
                  <Text style={namaFoto.length >= 5? {...FontConfig.buttonZeroTwo, color: Color.disable, marginHorizontal: 5} : {...FontConfig.buttonZeroTwo, color: Color.neutralTen, marginHorizontal: 5}}>Unggah Foto</Text>
                </View>
              } />
              <View style={{height: 5}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.secondaryText, textAlign: 'justify'}}>Hanya menerima format jpeg dengan ukuran file maksimal 2mb, dan maximal 5 foto</Text>
              {namaFoto.map((item, index)=>{
                return(
                  <View key={index} style={{flexDirection: 'row', paddingVertical: 2, paddingHorizontal: 4, marginVertical: 2,  backgroundColor: Color.grayTwo, justifyContent: 'space-between', 
                  alignItems: 'center'}}>
                    <Pressable onPress={()=>handleBukaFoto(index)} style={{flexDirection: 'row'}}>
                      <Ionicons name="attach-outline" color={Color.secondaryText} size={20} />
                      <Text style={{...FontConfig.bodyTwo, width: '90%', color: Color.primaryMain, marginHorizontal: 3}}>{item}</Text>
                    </Pressable>
                    <Pressable onPress={()=> handleRemovePhotoButton(index)}><Ionicons name="close-outline" color={Color.secondaryText} size={22} /></Pressable>
                  </View>
                );
              })}
              <Text style={styles.textSubjectForm}>Tautan</Text>
              {listTautan.map((item, index)=> {
                return (
                  <View key={index} style={{flexDirection: 'row',  paddingVertical: 2, paddingHorizontal: 4, marginVertical: 2,  backgroundColor: Color.grayTwo, justifyContent: 'space-between', 
                  alignItems: 'center'}}>
                    <View style={{flexDirection: 'row',}}>
                      <Ionicons name="link-outline" color={Color.secondaryText} size={20} />
                      <Text style={{...FontConfig.bodyTwo, width: '90%', color: Color.primaryMain, marginHorizontal: 5}}>{item}</Text>
                    </View>
                    <Pressable onPress={()=> handleRemoveLinkButton(index)}><Ionicons name="close-outline" color={Color.secondaryText} size={22} /></Pressable>
                  </View>
                );
              })}
              <View style={{height: 5}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.secondaryText, marginVertical: 3}}>Masukan tautan media sosial sebagai bukti</Text>
              <View style={{height: 5}}></View>
              <CustomTextArea value={tautan} setValue={setTautan} placeholder="Tautan sosial media" width='100%' />
              <View style={{height: 5}}></View>
              <CustomButton onPress={handleAddTautan} text="Tambah" fontStyles={{...FontConfig.buttonZeroTwo,
              color: Color.primaryMain}} borderWidth={1} height={40} />
            </View>
          </View>
        </View>
        {/** partisipan kegiatan */}
        <View style={{backgroundColor: Color.neutralZeroTwo, borderWidth: 1,
        borderColor: Color.neutralZeroTwo}}></View>
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 28, height: 28}} source={IconTiga} />
            <View style={{width: '90%', paddingHorizontal: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center',}}><Text style={styles.textTitle}>Partisipan</Text>
              <Text style={{...FontConfig.buttonThree, color: Color.neutralZeroSeven, marginHorizontal: 4}}>{`(Opsional)`}</Text>
              </View>
              <View style={{height: 10}}></View>
              <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Perkiraan Partisipan</Text>
              <TextInput value={perkiraanPartisipan} onChangeText={setPerkiraanPartisipan} onBlur={() => setPhoneIsFocused(false)} onFocus={() => setPhoneIsFocused(true)} 
              style={{...styles.phoneInput, borderColor: (phoneIsFocused || perkiraanPartisipan)? Color.neutralZeroSeven : Color.lightBorder}} 
              keyboardType='number-pad' placeholder='Masukkan jumlah partisipan' placeholderTextColor={Color.disable} />
              <View style={{height: 10}}></View>
              <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Tandai Kawan</Text>
              <DropDownButton onPress={()=>setIsModalTemanVisible(true)} placeholder='Pilih Kawan' text={tagTeman.length != 0 ? tagTeman.length > 1 ? `${tagNamaTeman[0]}, dan ${tagTeman.length-1} Lainnya` : tagNamaTeman[0] : ""} />
              <View style={{height: 10}}></View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonSimpan}>
          <CustomButton
              onPress={()=>handleKirim("simpan")} 
              borderColor={Color.neutralZeroFive}
              borderWidth={1}
              fontStyles={{...FontConfig.buttonOne, color: Color.primaryMain}}
              width='100%' height={44} text="Simpan"
              backgroundColor={Color.neutralZeroOne}
              />
          </View>
          <View style={{width: 20}}></View>
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
          show={showAlertFileBig}
          showProgress={false}
          title="Tidak dapat mengunggah file"
          message="Ukuran file yang Anda unggah lebih dari 10mb"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyTwo, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertFileBig(false);
          }}
        />
        <AwesomeAlert
          show={showAlertPhotoBig}
          showProgress={false}
          title="Tidak dapat mengunggah foto"
          message="Ukuran foto yang Anda unggah lebih dari 2mb"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyTwo, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertPhotoBig(false);
          }}
        />
        <AwesomeAlert
          show={showAlertLimitFoto}
          showProgress={false}
          title="Tidak dapat mengunggah foto"
          message="Hanya dapat mengunggah foto maksimal 5"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyTwo, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertLimitFoto(false);
          }}
        />
        <AwesomeAlert
          show={showAlertSuccess}
          showProgress={false}
          title="Sukses mengirim misi"
          message="Misi berhasil terkirim!"
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
            navigation.pop();
          }}
        />
        <AwesomeAlert
          show={showAlertSuccessSave}
          showProgress={false}
          title="Sukses menyimpan misi"
          message="Misi berhasil tersimpan. Segera kirim misi mu ya!"
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
            setShowAlertSuccessSave(false);
            navigation.pop();
            navigation.pop();
          }}
        />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Gagal mengirim misi"
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
          cancelButtonTextStyle={{...FontConfig.buttonThree, color: Color.primaryMain}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertYakinKirim(false);
            handleKirim("kirim");
          }}
          onCancelPressed={()=>{
            setShowAlertYakinKirim(false);
          }}
        />
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

export default FormMisiScreen

const styles = StyleSheet.create({
  textTitle:{
    ...FontConfig.titleThree,
    color: '#000000',
  },
  textSubjectForm: {
    ...FontConfig.bodyTwo,
    color: Color.secondaryText,
    marginTop: 10,
    marginBottom: 2
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
bottomSection: {
  backgroundColor: Color.neutralZeroOne,
  height: '12%',
  flexDirection: 'row',
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
  width: '40%',
},
buttonSimpan: {
  borderRadius: 20, 
  width: '40%',
},
})