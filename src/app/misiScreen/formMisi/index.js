import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
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

const FormMisiScreen = ({navigation}) => {
  const [judul, setJudul] = useState("");
  const [konsep, setKonsep] = useState("");
  const [filePdf, setFilePdf] = useState("");
  const [namaFile, setNamaFile] = useState("");
  const [showAlertFileBig, setShowAlertFileBig] = useState(false);
  const [showAlertPhotoBig, setShowAlertPhotoBig] = useState(false);

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

  const handleHapusDocument = () =>{
    setFilePdf("");
    setNamaFile("");
  }

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
              <Text style={styles.textSubjectForm}>Judul Kegiatan</Text>
              <CustomInput inputNotWrong={true} value={judul} setValue={setJudul} placeholder="Tulis judul kegiatan" />
              <Text style={styles.textSubjectForm}>Konsep Kegiatan</Text>
              <CustomTextArea width='100%' inputNotWrong={true} value={konsep} setValue={setKonsep} 
              placeholder="Tulis konsep kegiatan disini" />
              <Text style={styles.textSubjectForm}>{`Laporan Kegiatan (Opsional)`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  }
})