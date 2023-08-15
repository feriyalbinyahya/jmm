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
import { setTeman } from '../../../redux/misi';
import DropDownButton from '../../../components/buttonDropdown';

const FormMisiScreen = ({navigation}) => {
  const [judul, setJudul] = useState("");
  const [konsep, setKonsep] = useState("");
  const [filePdf, setFilePdf] = useState("");
  const [fotoBukti, setFotoBukti] = useState([]);
  const [namaFoto, setNamaFoto] = useState([]);
  const [namaFile, setNamaFile] = useState("");
  const [showAlertFileBig, setShowAlertFileBig] = useState(false);
  const [showAlertPhotoBig, setShowAlertPhotoBig] = useState(false);
  const [listTautan, setListTautan] = useState([]);
  const [tautan, setTautan] = useState("");
  const [isInputActive, setInputActive] = useState(true);
  const [perkiraanPartisipan, setPerkiraanPartisipan] = useState("");
  const [isModalTemanVisible, setIsModalTemanVisible] = useState(false);
  const [tagTeman, setTagTeman] = useState([]);
  const [tagNamaTeman, setTagNamaTeman] = useState([]);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const [isContinue, setIsContinue] = useState(false);

  const dispatch = useDispatch();

  const handlePilihDariFileDocument = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        readContent: true
      });
      if(results.size <= 10000000){
        setNamaFile(results.name);
        let filePdfBase64 = await Utils.readFileBase64(results.uri);
        setFilePdf(filePdfBase64);
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
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        readContent: true
      });
      if(results.size <= 2000000){
        setNamaFoto([...namaFoto, results.name]);
        let fotoBase64 = await Utils.readFileBase64(results.uri);
        setFotoBukti([...fotoBukti, fotoBase64]);
      }else{
        setShowAlertPhotoBig(true);
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
  }

  const handleRemovePhotoButton = (index) => {
    setNamaFoto(photos => photos.filter((s,i)=>(i != index)));
    setFotoBukti(photos => photos.filter((s,i)=>(i != index)));
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

  const handleSimpan = () => {

  }

  const handleKirim = () => {

  }

  useEffect(()=> {
    saveTemanLaporan();
  }, [tagTeman])


  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite title="" navigation={navigation} />
      <ScrollView>
        {/** tentang kegiatan */}
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 26, height: 26}} source={IconSatu} />
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
            </View>
          </View>
        </View>
        {/** bukti kegiatan */}
        <View style={{backgroundColor: Color.neutralZeroTwo, borderWidth: 1,
        borderColor: Color.neutralZeroTwo}}></View>
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 26, height: 26}} source={IconDua} />
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
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="attach-outline" color={Color.secondaryText} size={20} />
                      <Text style={{...FontConfig.bodyTwo, width: '90%', color: Color.primaryMain, marginHorizontal: 3}}>{item}</Text>
                    </View>
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
            <Image style={{width: 26, height: 26}} source={IconTiga} />
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
              <DropDownButton placeholder='Pilih Kawan' text={tagTeman.length != 0 ? tagTeman.length > 1 ? `${tagNamaTeman[0]}, dan ${tagTeman.length-1} Lainnya` : tagNamaTeman[0] : ""} />
              <View style={{height: 10}}></View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonSimpan}>
          <CustomButton
              onPress={handleSimpan} 
              borderColor={Color.neutralZeroFive}
              borderWidth={1}
              fontStyles={{...FontConfig.buttonOne, color: Color.primaryMain}}
              width='100%' height={44} text="Simpan"
              disabled={isContinue}
              backgroundColor={Color.neutralZeroOne}
              />
          </View>
          <View style={{width: 20}}></View>
        <View style={styles.buttonContinue}>
        <CustomButton
            onPress={handleKirim} 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            width='100%' height={44} text="Kirim"
            disabled={isContinue}
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
          show={showAlertFileBig}
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