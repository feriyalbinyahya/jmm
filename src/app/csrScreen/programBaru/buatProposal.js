import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import CustomInput from '../../../components/customInput'
import CustomTextArea from '../../../components/customTextArea'
import CustomButton from '../../../components/customButton';
import DocumentPicker from 'react-native-document-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts'

const BuatProposalScreen = ({navigation}) => {
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [namaFile, setNamaFile] = useState("");
    const [hapusDoc, setHapusDoc] = useState(false);
    const [filePdf, setFilePdf] = useState("");
    const [showAlertYakinKirim, setShowAlertYakinKirim] = useState(false);
    const [showAlertFileBig, setShowAlertFileBig] = useState(false);

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

    const handleLanjutkan = () => {
        navigation.navigate("ProposalTerkirim")
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite navigation={navigation} title={`Kirim Proposal`} />
      <ScrollView style={{padding: 20}}>
        <Text style={{...FontConfig.buttonZeroTwo, color: Color.hitam}}>Tentang Proposal</Text>
        <View style={{paddingVertical: 10}}>
            <Text style={{...FontConfig.button5, color: Color.neutral70, marginVertical: 5}}>Judul</Text>
            <CustomInput value={judul} setValue={setJudul} placeholder={`Tulus judul disini...`} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.button5, color: Color.neutral70, marginVertical: 5}}>Deskripsi</Text>
            <CustomTextArea width='100%' height={200} value={deskripsi} setValue={setDeskripsi} placeholder={`Tulis deskripsi disini...`} />
            <Text style={{textAlign: 'right', marginVertical: 7, ...FontConfig.bodyTwo,
                 color: Color.disable}}>{`${deskripsi.length} / 550`}</Text>
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
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}>
            <CustomButton
                onPress={()=>setShowAlertYakinKirim(true)} 
                fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                width='100%' height={40} text="Kirim"
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
          show={showAlertYakinKirim}
          showProgress={false}
          title="Yakin ingin kirim?"
          message="Proposal yang dikirim tidak dapat diubah, jadi pastikan anda yakin jika ingin kirim proposal."
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
            handleLanjutkan();
          }}
          onCancelPressed={()=>{
            setShowAlertYakinKirim(false);
          }}
        />
    </SafeAreaView>
  )
}

export default BuatProposalScreen

const styles = StyleSheet.create({
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '10%',
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
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
        width: '100%',
        paddingHorizontal: 20,
    },
})