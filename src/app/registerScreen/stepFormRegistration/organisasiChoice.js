import { StyleSheet, Text, View, Pressable, Image, FlatList, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Color, FontConfig } from '../../../theme'
import iconArrowLeft from '../../../assets/images/icon/icon_arrow_left.png'
import ImageMap from '../../../assets/images/warning/map.png'
import CustomInput from '../../../components/customInput'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../components/customButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTemporary, setTemporary } from '../../../redux/registration'
import ScrollMenuButton from '../../../components/scrollMenu'
import RegistrationService from '../../../services/registration'

const OrganisasiChoiceScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [onSelect, setOnSelect] = useState('');
  const [idSelect, setIdSelect] = useState('');
  const [loading, setLoading] = useState(false);

  const currentProvinsi = useSelector((state)=> {
    return state.authRegistration.alamat.namaProvinsi;
  });

  const menuProvinsi = useSelector((state)=> {
    let dataProvinsi = state.daerah.dataProvinsi;
    let current = "";
    let temp = [];
    for (let i = 0; i < dataProvinsi.length; i++) {
      if(dataProvinsi[i].nama_provinsi == currentProvinsi){
        current = dataProvinsi[i].nama_provinsi;
      }else{
        temp.push(dataProvinsi[i].nama_provinsi);
      }
    }
    temp.unshift(current);
    return temp;
  });

  const idProvinsi = useSelector((state)=> {
    let dataProvinsi = state.daerah.dataProvinsi;
    let current = "";
    let temp = [];
    for (let i = 0; i < dataProvinsi.length; i++) {
      if(dataProvinsi[i].nama_provinsi == currentProvinsi){
        current = dataProvinsi[i].id_provinsi;
      }else{
        temp.push(dataProvinsi[i].id_provinsi);
      }
    }
    temp.unshift(current);
    return temp;
  });


  const [selectedMenuProvinsi, setSelectedMenuProvinsi] = useState(currentProvinsi);

  const [dataOrganisasi, setDataOrganisasi] = useState([]);
  handleSelected = (item, id) => {
    if(onSelect == item){
      setOnSelect('');
      setIdSelect('');
    }else{
      setOnSelect(item);
      setIdSelect(id);
    }
  }

  handlePilih = () => {
    navigation.navigate("OrganisasiTerpilihRegister", {idOrganisasi: idSelect, kodeReferalDigunakan: ''});
  }


  const Item = ({title, text, id}) => (
    <Pressable onPress={()=> {handleSelected(title, id);}}>
        <View style={title === onSelect? styles.selected : styles.unSelected}>
            <View style={{width: '80%'}}>
              <Text style={styles.textTitleOrganisasi}>{title}</Text>
              <Text style={styles.textAddress}>{text}</Text>
            </View>
            {title=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
            : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
        </View>
    </Pressable>
  );

  getDataOrganisasiByProvinsi = (id) => {
    setLoading(true);
    RegistrationService.getOrganisasiByProvinsi({"id_provinsi": id})
    .then(res=> {
      console.log(res.data.data);
      setDataOrganisasi(res.data.data);
      setLoading(false);
    })
    .catch(err=> {
      console.log(err);
    });
  }

  useEffect(()=> {
    getDataOrganisasiByProvinsi(idProvinsi[0]);
  },[]);
  return (
    <View style={styles.dropDownPage}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
        <View style={{alignItems: 'center', flex:1}}><Text style={styles.textTitle}>Pilih Organisasi</Text></View>
      </View>
      <View style={styles.boxSearchBar}>
        <View style={styles.searchBar}><CustomInput placeholder={`Cari Organisasi`} childLeft={<Ionicons color={Color.secondaryText} style={{padding:10}} name="search" size={22} />} /></View>
      </View>
      <View style={{height: 12}}></View>
      <ScrollMenuButton onPressMenu={getDataOrganisasiByProvinsi} keyMenu={idProvinsi} data={menuProvinsi} value={selectedMenuProvinsi} setValue={setSelectedMenuProvinsi} />
      <Text style={styles.textInfo}>Organisasi terdekat dari kotamu :</Text>
      <View style={{height: '55%'}}>
        {loading ? <ActivityIndicator style={{marginVertical: 100}} size="large" color={Color.graySix} /> :
          dataOrganisasi.length != 0 ?
          <FlatList
          data={dataOrganisasi}
          renderItem={({item}) => <Item title={item.nama_organisasi} text={item.alamat} id={item.id}/>}
          keyExtractor={item => item.id}
          /> : 
          <View style={{alignItems: 'center'}}>
            <Image source={ImageMap} style={styles.map} />
            <Text style={styles.textMaafBelum}>{`Maaf belum ada organisasi di ${selectedMenuProvinsi} .`}</Text>
            <View style={{height: 5}}></View>
            <Pressable><Text style={styles.linkMintaBantuan}>Minta Bantuan?</Text></Pressable>
          </View>
        }
      </View>
      <View style={styles.boxPilih}>
          <CustomButton disabled={!onSelect} onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
      </View>
    </View>
  )
}

export default OrganisasiChoiceScreen

const styles = StyleSheet.create({
  boxSearchBar: {
    padding: 20,
    borderColor: Color.lightBorder,
    borderWidth: 1,
  },
  boxPilih: {
      backgroundColor: Color.neutralZeroOne,
      padding: 20,
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
  dropDownPage: {
    backgroundColor: Color.neutralZeroOne,
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: Color.grayOne,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#F0F0F0',
  },
  iconArrowLeft: {
    width: 24,
    height: 24
  },
  linkMintaBantuan: {
    ...FontConfig.linkOne,
    color: Color.primaryMain,
    textDecorationLine: 'underline'
  },
  map: {
    width: 87.46,
    height: 81.4,
    margin: 15
  },
  searchBar: {
    
  },
  textMaafBelum: {
    ...FontConfig.bodyTwo,
    color: Color.primaryText
  },
  textTitle: {
    ...FontConfig.titleOne,
    color: Color.title,
    marginLeft: -40,
    
  },
  textInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...FontConfig.bodyThree,
    color: Color.secondaryText
  },
  unSelected: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selected: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Color.redOne
  },
  textTitleOrganisasi: {
    ...FontConfig.titleFour,
    color: Color.title
  },
  textAddress: {
    color: Color.grayEight,
    ...FontConfig.bodyThree,
    marginTop: 5
  },
  textPilih : {
    ...FontConfig.buttonOne, 
    color: 'white'},
});