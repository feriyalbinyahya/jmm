import { StyleSheet, Text, View, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderRed from '../../components/header/headerRed'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextArea from '../../components/customTextArea';
import CustomButton from '../../components/customButton';
import SurveiServices from '../../services/survei';
import AwesomeAlert from 'react-native-awesome-alerts';
import GagalSurveiImage from '../../assets/images/gagalSurvei.png'

const ListPertanyaan = ({navigation, route}) => {
    const {judul, id, status_jawab} = route.params;
    const [pertanyaanData, setPertanyaanData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [jawabanData, setJawabanData] = useState([]);
    const [kirimIsPressed, setKirimIsPressed] = useState(false);
    const [kirimLoading, setIsKirimLoading] = useState(false);
    const [showPilihanGandaWrong, setShowPilihanGandaWrong] = useState(false);
    const [showJawabanSingkatWrong, setShowJawabanSingkatWrong] = useState(false);

    const getPertanyaanSurvei = () => {
      setIsLoading(true);
      SurveiServices.getPertanyaanSurvei(id)
      .then(res=>{
        console.log(res.data.data);
        let jawaban = [];
        setPertanyaanData(res.data.data);
        for(var i=0; i<res.data.data.length; i++){
          jawaban.push({"id_pertanyaan": res.data.data[i].id_pertanyaan, "jawaban": ''});
        }
        setJawabanData(jawaban);
        setIsLoading(false);
      })
      .catch(err=>{
        console.log(err.response);
      })
    }

    const Item = ({text, onSelect, setOnSelect}) => {
      return(
        <Pressable onPress={()=> {
          if(text != onSelect){
            setOnSelect(text);
          }else{
            setOnSelect('');
          }
          }}>
            <View style={text === onSelect? styles.selected : styles.unSelected}>
                {text=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
                : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
                <Text style={{...FontConfig.bodyOne, color: '#000000', marginHorizontal: 5}}>{text}</Text>
            </View>
        </Pressable>
    )};

    const PilihanGandaView = ({index, pertanyaan, listJawaban, jawaban, jawabanData, isRequired, id_pertanyaan, kirimIsPressed}) => {
        const [onSelect, setOnSelect] = useState(jawaban);

        useEffect(()=> {
          let temp = jawabanData;
          temp[index] = {"id_pertanyaan": id_pertanyaan, "jawaban": onSelect};
          setJawabanData(temp);
        }, [onSelect])
        return (
            <View style={{
                backgroundColor: Color.neutralZeroOne,
                borderWidth: 1,
                borderColor: Color.border,
                borderRadius: 6,
                padding: 10,
                marginHorizontal: 15,
                marginVertical: 5
            }}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...FontConfig.bodyOne, color: '#000000'}}>{pertanyaan}</Text>
                    {isRequired ? <Text style={{color: '#FF0000', marginHorizontal: 3}}>*</Text> : <></>}
                </View>
                {
                    listJawaban.map((item, index)=> {
                        return <Item key={index} text={item.jawaban} onSelect={onSelect} setOnSelect={setOnSelect} />
                    })
                }
            </View>
        )
    }

    const JawabanSingkatView = ({index, pertanyaan, listJawaban, jawabanData, jawabanA, isRequired, id_pertanyaan, kirimIsPressed}) => {
        const [jawaban, setJawaban] = useState(jawabanA);
        const [warning, setWarning] = useState(false);
        useEffect(()=> {
          if(jawaban.length > 300){
            setWarning(true);
          }else{
            setWarning(false);
          }
          let temp = jawabanData;
          temp[index] = {"id_pertanyaan": id_pertanyaan, "jawaban": jawaban};
          setJawabanData(temp);
        }, [jawaban])
        return (
            <View style={{
                backgroundColor: Color.neutralZeroOne,
                borderWidth: 1,
                borderColor: Color.border,
                borderRadius: 6,
                padding: 10,
                marginHorizontal: 15,
                marginVertical: 5
            }}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...FontConfig.bodyOne, color: '#000000'}}>{pertanyaan}</Text>
                    {isRequired ? <Text style={{color: '#FF0000', marginHorizontal: 3}}>*</Text> : <></>}
                </View>
                <View style={{height: 5}}></View>
                <CustomTextArea 
                value={jawaban} setValue={setJawaban} 
                placeholder="Tuliskan jawabanmu" 
                width='100%'
                />
                <Text style={{...FontConfig.bodyThree, color: jawaban.length > 300 ? Color.danger : Color.graySix, marginTop: 5}}>{`${jawaban.length}/300 karakter`}</Text>
                {warning ? <View style={{flexDirection: 'row', padding: 5, 
                backgroundColor: Color.redOne, borderColor: Color.error, borderWidth: 1, borderRadius: 2,
                marginTop: 5}}>
                  <Ionicons name="close-circle" color={Color.danger} size={20} />
                  <Text style={{...FontConfig.bodyTwo, color: Color.primaryText, marginLeft: 5}}>Karakter huruf melebihi 300!</Text>
                </View> : <></>}
            </View>
        )
    }

    const handleValidation = () =>{
      for(var i=0; i<pertanyaanData.length; i++){
        if(pertanyaanData[i].required && jawabanData[i].jawaban == ''){
          //alert isi kolom yang wajib diisi
          return false;
        }else if(pertanyaanData[i].id_survey_tipe_jawaban == 2 && jawabanData[i].jawaban.length > 300){
          setShowJawabanSingkatWrong(true);
          return false;
        }
      }
      return true;
    }

    const handleKirim = () => {
      
      if(handleValidation()){
        let dataSent = {
          "data_jawaban": jawabanData
        };
        setIsKirimLoading(true);
        SurveiServices.jawabSurvei(id, dataSent)
        .then(res=>{
          if(res.data.status == 'success'){
            setIsKirimLoading(false);
            navigation.navigate("SurveiTerkirim");
          }else{
            setIsKirimLoading(false);
          }
        })
        .catch(err=>{
          console.log(err.response);
        })
      }
    }

    useEffect(()=>{
      console.log(status_jawab);
      if(!status_jawab){
        getPertanyaanSurvei();
      }
    },[])


  return (
    <View style={{flex: 1}}>
      <HeaderRed navigation={navigation} title="" />
      <View style={styles.titleSection}>
        <Text style={styles.textTitle}>{judul}</Text>
      </View>
      
      {!status_jawab ? (!isLoading ? pertanyaanData.length != 0 ? <View style={{justifyContent: 'space-between', flex: 1}}><ScrollView contentContainerStyle={{justifyContent: 'space-between'}}>
        <View style={{height: 10}}></View>
        {
            pertanyaanData.map((item, index)=>{
                if(item.id_survey_tipe_jawaban == 1){
                    return <PilihanGandaView key={index} index={index} jawaban={jawabanData[index].jawaban} jawabanData={jawabanData} setJawabanData={setJawabanData} kirimIsPressed={kirimIsPressed} id_pertanyaan={item.id_pertanyaan} isRequired={item.required} pertanyaan={item.pertanyaan} listJawaban={item.list_jawaban} />
                }else if(item.id_survey_tipe_jawaban == 2){
                    return <JawabanSingkatView key={index} index={index} jawabanA={jawabanData[index].jawaban} jawabanData={jawabanData} setJawabanData={setJawabanData} kirimIsPressed={kirimIsPressed} id_pertanyaan={item.id_pertanyaan} isRequired={item.required} pertanyaan={item.pertanyaan} listJawaban={item.list_jawaban} />
                }else{
                    return <></>
                }
            })
        }
      </ScrollView>
      <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}><CustomButton 
            text="Kirim" backgroundColor={Color.primaryMain} 
            onPress={handleKirim}
            height={40} fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}} /></View>
      </View></View> : <></> : <ActivityIndicator size="large" color={Color.graySix} />) : 
      <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, alignItems: 'center',
      justifyContent: 'center', padding: 20
      }}>
        <Image style={{width: 188, height: 211}} source={GagalSurveiImage} />
        <View style={{height: 10}} ></View>
        <Text style={{...FontConfig.headingTwo, color: '#000000', textAlign: 'center'}}>Kamu sudah pernah mengisi survey ini</Text>
        <View style={{height: 10}} ></View>
        <CustomButton width='80%' height={45} text="Kembali ke Beranda"
        backgroundColor={Color.primaryMain}
        onPress={()=>{
          navigation.popToTop();
        }}
        fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}}
        />
      </View>
      }
      <AwesomeAlert
          show={kirimLoading}
          showProgress={true}
          progressColor={Color.graySeven}
          message="Loading"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
        />
        <AwesomeAlert
          show={showJawabanSingkatWrong}
          showProgress={false}
          title="Jawaban tidak sesuai"
          message="Jawaban yang anda masukkan pada kolom deskripsi melebihi karakter. Silakan coba lagi"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '40%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowJawabanSingkatWrong(false);
          }}
        />
    </View>
  )
}

export default ListPertanyaan

const styles = StyleSheet.create({
    titleSection: {
        backgroundColor: Color.primaryMain,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    textTitle: {
        ...FontConfig.titleOne,
        color: Color.neutralZeroOne
    },
    unSelected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',

        alignItems: 'center'
    },
    selected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',

        alignItems: 'center',
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: 60,
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
})