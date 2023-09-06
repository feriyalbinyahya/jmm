import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderRegistration from '../../../components/headerRegistration'
import { Color, FontConfig } from '../../../theme'
import CustomInput from '../../../components/customInput'
import DropDownButton from '../../../components/buttonDropdown'
import CustomBottomSheet from '../../../components/bottomSheet'
import GenderChoice from '../../../components/bottomSheet/genderChoice'
import DatePicker from 'react-native-modern-datepicker';
import { useDispatch, useSelector } from 'react-redux'
import { deleteTemporary, setDataDiriRegistration } from '../../../redux/registration'
import { store } from '../../../redux/store'
import moment from 'moment'
import RegistrationService from '../../../services/registration'
import AwesomeAlert from 'react-native-awesome-alerts';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../../components/customButton'
import CustomTextArea from '../../../components/customTextArea'
import IconInstagram from '../../../assets/images/icon/icon_instagram.png';
import IconTiktok from '../../../assets/images/icon/icon_tiktok.png';
import IconTwitter from '../../../assets/images/icon/icon_twitter.png';
import IconFacebook from '../../../assets/images/icon/icon_facebook.png';
import CustomInputAddon from '../../../components/customInputAddon'
import InterestChoice from '../../../components/bottomSheet/InterestChoice'



const DataDiriScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isFirstname, setIsFirstname] = useState(true);
  const [isLastname, setIsLastname] = useState(true);
  const [username, setUsername] = useState('');
  const [job, setJob] = useState('');
  const [idJob, setIdJob] = useState(0);
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [usernameExist, setUsernameExist] = useState(false);
  const [bio, setBio] = useState("");
  const [isBio, setIsBio] = useState(true); 
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [isModalKomunitasVisible, setIsModalKomunitasVisible] = useState(false);
  const [komunitas, setKomunitas] = useState("");
  const [isModalInterestVisible, setIsModalInterestVisible] = useState(false);
  const [interest, setInterest] = useState("");
  const [interestData, setInterestData] = useState([]);
  const [interestLoading, setInterestLoading] = useState(false);
  const [idInterest, setIdInterest] = useState("");



  const setOldJob = (data, id) => {
    setJob(data);
    setIdJob(id);
  }

  handleJobButton = () => {
    navigation.navigate('DropDown', {title: 'Pekerjaan', item: job, onGoBack: setOldJob, id: idJob, properti: ''});
  }

  handleGenderButton = () => {
    setModalVisible(true);
  }

  handleDateButton = () => {
    setIsCalendarVisible(!isCalendarVisible);
  }

  handleValidation = () => {
    if(firstname && lastname && job && gender && dateOfBirth && (instagram || tiktok || facebook || twitter) && bio && interest){
      setIsContinue(true);
    }else{
      setIsContinue(false);
    }
  }

  const getInterestData = () =>{
    setInterestLoading(true);
    RegistrationService.getInterest()
    .then(res=>{
      console.log(res.data.data);
      setInterestData(res.data.data);
      setInterestLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const saveDataDiriRegistration = () => {
    console.log({fullname: `${firstname} ${lastname}`, username: username, job: idJob, bio: bio, gender: gender, dateOfBirth: dateOfBirth})
    dispatch(
      setDataDiriRegistration({fullname:`${firstname} ${lastname}`, username: username, job: idJob, bio: bio, interest: [parseInt(idInterest)], 
      facebook: facebook, instagram: instagram, tiktok: tiktok, twitter: twitter, gender: gender, dateOfBirth: dateOfBirth})
    );
  }

  handleLanjutkan = () => {
    if(username){
      RegistrationService.checkUsername({"username": username})
      .then(res=>{
        console.log(res.data.message);
        if(res.data.message == "Username belum dipakai."){
          saveDataDiriRegistration();
          navigation.navigate("AlamatLengkapRegister");
        }else{
          setUsernameExist(true);
        }
      })
    }else{
      saveDataDiriRegistration();
      navigation.navigate("AlamatLengkapRegister");
    }
  }

  useEffect(()=>{
    getInterestData();
  }, [])

  useEffect(()=> {
    handleValidation();
  }, [dateOfBirth, job, gender, firstname, lastname, bio, instagram, tiktok, facebook, twitter, interest]);

  const handleDateChange = (event, data) => {
    setIsCalendarVisible(!isCalendarVisible);
    const currentDate = new Date(data);
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth()+1;
    let date = currentDate.getDate();
    if(month < 10){
      month = `0${currentDate.getMonth()+1}`;
    }

    if (date < 10){
      date = `0${currentDate.getDate()}`
    }
    console.log(`${year}/${month}/${date}`);
    setDateOfBirth(`${year}/${month}/${date}`);
  }

  useEffect(()=>{
    if(bio.length > 280){
      setIsBio(false);
    }else{
      setIsBio(true);
    }
  }, [bio])

  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet children={<GenderChoice gender={gender} setModalVisible={setModalVisible} setGender={setGender} />} 
      isModalVisible={isModalVisible} setModalVisible={setModalVisible} title="Pilih Jenis Kelamin" />
      <CustomBottomSheet children={<InterestChoice id={idInterest} setId={setIdInterest} data={interestData} item={interest} setModalVisible={setIsModalInterestVisible} setItem={setInterest} />} 
      isModalVisible={isModalInterestVisible} setModalVisible={setIsModalInterestVisible} title="Pilih Interest" />
      <HeaderRegistration navigation={navigation} numberStep={1} />
      <ScrollView>
        <View style={styles.topSection}>
          <Text style={styles.textIsiData}>Isi data diri</Text>
          <Text style={styles.textLengkapi}>Lengkapi data dirimu dan pastikan data yang dimasukkan sudah benar</Text>
          <View style={styles.boxForm}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '45%'}}>
                <Text style={styles.titleFormInput}>Nama Depan</Text>
                <CustomInput inputNotWrong={isFirstname} value={firstname} setValue={setFirstname} placeholder="Nama depan" />
              </View>
              <View style={{width: '5%'}}></View>
              <View style={{width: '45%'}}>
                <Text style={styles.titleFormInput}>Nama Belakang</Text>
                <CustomInput inputNotWrong={isLastname} value={lastname} setValue={setLastname} placeholder="Nama belakang" />
              </View>
            </View>
            <Text style={styles.titleFormInput}>{`Username (Optional)`}</Text>
            <CustomInput value={username} setValue={setUsername} placeholder="ex: bimakusuma" />
            <Text style={styles.titleFormInput}>Tentangmu</Text>
            <CustomTextArea value={bio} setValue={setBio} inputNotWrong={isBio} type='text' width='100%'
             placeholder="Tulis tentangmu dan komunitas yang kamu ikuti" />
             <Text style={{...styles.textMasukanDeskripsi, color: isBio ? Color.secondaryText : Color.danger}}>
              Maksimal 280 karakter.
            </Text>
            <Text style={styles.titleFormInput}>Pekerjaan</Text>
            <DropDownButton placeholder='Pilih pekerjaan' text={job} onPress={handleJobButton} />
            <Text style={styles.titleFormInput}>Jenis Kelamin</Text>
            <DropDownButton placeholder='Pilih' text={gender} onPress={handleGenderButton} />
            <Text style={styles.titleFormInput}>Tanggal Lahir</Text>
            <DropDownButton placeholder='yyyy/mm/dd' text={dateOfBirth.toString()} onPress={handleDateButton} />
            {/** isCalendarVisible? <DatePicker
              options={{
                backgroundColor: Color.grayOne,
                textHeaderColor: Color.grayTwelve,
                textDefaultColor: Color.grayTwelve,
                selectedTextColor: Color.grayOne,
                mainColor: Color.primaryMain,
                textSecondaryColor: Color.disable,
                borderColor: 'rgba(122, 146, 165, 0.1)',
              }}
              current="2000-07-13"
              selected={dateOfBirth}
              onDateChange={handleDateChange}
              mode="calendar"
              minuteInterval={30}
              style={styles.boxDate}
            /> : <></> */}
            {isCalendarVisible? <DateTimePicker maximumDate={new Date(2020, 10, 20)} 
            display="calendar" onChange={handleDateChange} value={new Date(2000, 10, 20)}
             /> : <></>}
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Interest</Text>
            <View style={{height: 5}}></View>
            <DropDownButton onPress={()=>setIsModalInterestVisible(true)} placeholder='Pilih interest kamu' text={interest} />
            
             {/**Media sosial */}
            <View style={styles.mediaSosial}>
              <Text style={{...FontConfig.titleThree, color: '#000000'}}>Media Sosial</Text>
              <View style={{height: 3}}></View>
              <Text style={{...FontConfig.captionOne, color: '#757575'}}>{`Paling tidak harap isi 1 (satu) media sosialmu.`}</Text>
              <View>
                <View style={{height: 10}}></View>
                <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Instagram</Text>
                <View style={{height: 5}}></View>
                <CustomInputAddon placeholder="Nama akun/username" 
                value={instagram} setValue={setInstagram}
                leftChild={<Image source={IconInstagram} style={styles.iconStyle}
                />} />
                <View style={{height: 10}}></View>
                <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tiktok</Text>
                <View style={{height: 5}}></View>
                <CustomInputAddon placeholder="Nama akun/username" 
                value={tiktok} setValue={setTiktok}
                leftChild={<Image source={IconTiktok} style={styles.iconStyle}
                />} />
                <View style={{height: 10}}></View>
                <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Twitter</Text>
                <View style={{height: 5}}></View>
                <CustomInputAddon placeholder="Nama akun/username" 
                value={twitter} setValue={setTwitter}
                leftChild={<Image source={IconTwitter} style={styles.iconStyle}
                />} />
                <View style={{height: 10}}></View>
                <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Facebook</Text>
                <View style={{height: 5}}></View>
                <CustomInputAddon placeholder="Nama akun/username" 
                value={facebook} setValue={setFacebook}
                leftChild={<Image source={IconFacebook} style={styles.iconStyle}
                />} />
              </View>
              <View style={{height: 5}}></View>
            </View>
          </View>
        </View>
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
          show={usernameExist}
          showProgress={false}
          title="Username sudah dipakai"
          message="Silakan masukkan username yang lain"
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
            setUsernameExist(false);
          }}
        />
    </View>
  )
}

export default DataDiriScreen

const styles = StyleSheet.create({
    boxForm: {
      marginTop: 10
    },
    buttonContinue: {
      borderRadius: 20, 
      width: '80%',
    },
    topSection: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFF'
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    mediaSosial: {
      paddingTop: 20
    },
    textIsiData: {
        ...FontConfig.titleOne,
        color: Color.grayThirteen,
    },
    textLengkapi: {
        ...FontConfig.bodyTwo,
        color: Color.graySeven,
        marginTop: 5
    },
    titleFormInput:{
      color: Color.secondaryText,
      ...FontConfig.bodyTwo,
      marginTop: 10,
      marginBottom: 1
    },
    textMasukanDeskripsi: {
      ...FontConfig.bodyThree,
      marginVertical: 5
    },
    boxDate: {
      borderRadius: 10 , 
      shadowOffset: {width: 2, height: 2},
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
})