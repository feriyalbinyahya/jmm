import { StyleSheet, Text, View, Image, Dimensions, Button, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderRed from '../../components/header/headerRed'
import ExampleImage from '../../assets/images/example/survei.png'
import CustomButton from '../../components/customButton'
import SurveiServices from '../../services/survei'

const StartSurveiScreen = ({navigation, route}) => {
  const judul = "Survei Kepuasan Kinerja Pak Ganjar tahun 2022";
  const [isLoading, setLoading] = useState(false);
  const [dataSurvey, setDataSurvey] = useState({});
  const {id} = route.params;

  const getSurveyDetail = () => {
    setLoading(true);
    SurveiServices.getSurveyDetail(id)
    .then(res=>{
      setDataSurvey(res.data.data[0]);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=> {
    getSurveyDetail();
  }, [])
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, justifyContent: 'space-between'}}>
      <View>
        <HeaderRed navigation={navigation} title="Survei" />
        <View style={styles.boxTitle}>
        {!isLoading ?<Text style={styles.textTitle}>{dataSurvey.judul}</Text>: <></>}
        </View>
        {!isLoading ? <View style={styles.container}>
          <Image style={styles.imageSurvei} source={{uri: `data:image/png;base64,${dataSurvey.cover_survey}`}} />
          <Text style={styles.textDeskripsi}>{dataSurvey.deskripsi}</Text>
        </View> : <ActivityIndicator size="large" style={{marginTop: 30}} color={Color.graySix} />}
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}><CustomButton 
        text="Mulai Isi Survei" backgroundColor={Color.primaryMain} 
        onPress={()=>navigation.navigate("ListPertanyaanSurvei", {judul: dataSurvey.judul, id: id, status_jawab: dataSurvey.status_jawab})}
        height={40} fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}} /></View>
      </View>
    </View>
  )
}

const width = Dimensions.get('window').width;

export default StartSurveiScreen

const styles = StyleSheet.create({
  textTitle: {
    ...FontConfig.titleOne,
    color: Color.neutralZeroOne,
  },
  boxTitle: {
    backgroundColor: Color.primaryMain,
    padding: 20,
    height: 200,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  imageSurvei: {
    height: width/1.85,
    width: '100%'
  },
  textDeskripsi: {
    ...FontConfig.bodyTwo,
    color: Color.primaryText,
    textAlign: 'justify',
    marginVertical: 10
  },
  container: {
    padding: 10,
    alignItems: 'center',
    marginTop: -100,
  },
  bottomSection: {
    backgroundColor: Color.neutralZeroOne,
    height: '10%',
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