import { StyleSheet, Text, View, Pressable, Image, FlatList, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Color, FontConfig } from '../../theme'
import iconArrowLeft from '../../assets/images/icon/icon_arrow_left.png'
import ImageWarning from '../../assets/images/warning/map.png'
import CustomInput from '../../components/customInput'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/customButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { deleteTemporary, setTemporary } from '../../redux/registration'
import ListPilihan from '../../components/listPilihan.js'
import RegistrationService from '../../services/registration'
import SearchBar from '../../components/searchBar'
import { setDataProvinsi } from '../../redux/daerah'

const DropDownPage = ({route, navigation}) => {
  const { title, item, onGoBack, id, properti } = route.params;
  const [query, setQuery] = useState('');
  const [onSelect, setOnSelect] = useState(item);
  const [idSelect, setIdSelect] = useState(id);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

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
    onGoBack(onSelect, idSelect);
    navigation.goBack();
  }

  const Item = ({text, id}) => (
    <Pressable onPress={()=> {handleSelected(text, id);}}>
        <View style={text === onSelect? styles.selected : styles.unSelected}>
            <Text style={styles.title}>{text}</Text>
            {text=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
            : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
        </View>
    </Pressable>
  );
  

  const searchFilterPekerjaan = (text) => {
    if(text){
      const newData = data.filter((item) => {
        const itemData = item.nama_pekerjaan ? item.nama_pekerjaan.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }else{
      setFilteredData(data);
      setSearch(text);
    }
  }

  const searchFilterProvinsi = (text) => {
    if(text){
      const newData = data.filter((item) => {
        const itemData = item.nama_provinsi ? item.nama_provinsi.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }else{
      setFilteredData(data);
      setSearch(text);
    }
  }

  const searchFilterKota = (text) => {
    if(text){
      const newData = data.filter((item) => {
        const itemData = item.nama_kabkot ? item.nama_kabkot.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }else{
      setFilteredData(data);
      setSearch(text);
    }
  }

  const searchFilterKecamatan = (text) => {
    if(text){
      const newData = data.filter((item) => {
        const itemData = item.nama_kecamatan ? item.nama_kecamatan.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }else{
      setFilteredData(data);
      setSearch(text);
    }
  }

  const searchFilterKelurahan = (text) => {
    if(text){
      const newData = data.filter((item) => {
        const itemData = item.nama_kelurahan ? item.nama_kelurahan.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }else{
      setFilteredData(data);
      setSearch(text);
    }
  }

  const saveDataProvinsi = (dataProvinsi) => {
    dispatch(
      setDataProvinsi({dataProvinsi: dataProvinsi})
    );
  }

  getAllData = () => {
    if(title == 'Pekerjaan'){
      RegistrationService.getAllPekerjaan()
      .then(res => {
          setFilteredData(res.data.data);
          setData(res.data.data);
      })
      .catch(error=>console.log(error));
    }else if(title == 'Provinsi'){
      RegistrationService.getAllProvinsi()
      .then(res=> {
        setFilteredData(res.data.data);
        setData(res.data.data);
        saveDataProvinsi(res.data.data);
      })
      .catch(error=>console.log(error));
    }else if(title == 'Kota'){
      RegistrationService.getAllKota(properti)
      .then(res=> {
        setFilteredData(res.data.data);
        setData(res.data.data);
      })
      .catch(error=>console.log(error));
    }else if(title == 'Kecamatan'){
      RegistrationService.getAllKecamatan(properti)
      .then(res=> {
        setFilteredData(res.data.data);
        setData(res.data.data);
      })
      .catch(error=>console.log(error));
    }else if(title == 'Kelurahan'){
      RegistrationService.getAllKelurahan(properti)
      .then(res=> {
        setFilteredData(res.data.data);
        setData(res.data.data);
      })
      .catch(error=>console.log(error));
    }
  }

  useEffect(()=> {
    getAllData();
  }, []);

  return (
    <View style={styles.dropDownPage}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
        <View style={{alignItems: 'center', flex:1}}><Text style={styles.textTitle}>{`Pilih `+title}</Text></View>
      </View>
        { data.length == 0?
        <View style={{height: '80%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.primaryMain} /></View> :
          <>
            {(()=> {
              switch(title){
                case 'Pekerjaan':
                    return (<View style={{height: '80%'}}>
                      <SearchBar text={title} search={search} setSearch={searchFilterPekerjaan} />
                    {filteredData.length != 0 ?<FlatList
                    data={filteredData}
                    renderItem={({item}) => <Item text={item.nama_pekerjaan} id={item.id_pekerjaan}/>}
                    keyExtractor={item => item.id_pekerjaan}
                    /> : 
                    <View style={{alignItems: 'center', height: '70%', justifyContent: 'center'}}>
                      <Image source={ImageWarning} style={{width: 120, height: 88}} />
                      <View style={{height: 10}}></View>
                      <Text style={{...FontConfig.bodyTwo, color: Color.title}}>Maaf pekerjaan yang kamu cari tidak tersedia.</Text>
                  </View>
                    }</View>)
                case 'Provinsi':
                    return (<View style={{height: '80%'}}>
                    <SearchBar text={title} search={search} setSearch={searchFilterProvinsi} />
                  {filteredData.length != 0 ?<FlatList
                  data={filteredData}
                  renderItem={({item}) => <Item text={item.nama_provinsi} id={item.id_provinsi}/>}
                  keyExtractor={item => item.id_provinsi}
                  /> : 
                  <View style={{alignItems: 'center', height: '70%', justifyContent: 'center'}}>
                      <Image source={ImageWarning} style={{width: 120, height: 88}} />
                      <View style={{height: 10}}></View>
                      <Text style={{...FontConfig.bodyTwo, color: Color.title}}>Maaf provinsi yang kamu cari tidak tersedia.</Text>
                  </View>
                  }</View>)
                case 'Kota':
                    return (<View style={{height: '80%'}}>
                    <SearchBar text={title} search={search} setSearch={searchFilterKota} />
                  {filteredData.length != 0 ? <FlatList
                  data={filteredData}
                  renderItem={({item}) => <Item text={item.nama_kabkot} id={item.id_kabkot}/>}
                  keyExtractor={item => item.id_kabkot}
                  /> : 
                  <View style={{alignItems: 'center', height: '70%', justifyContent: 'center'}}>
                      <Image source={ImageWarning} style={{width: 120, height: 88}} />
                      <View style={{height: 10}}></View>
                      <Text style={{...FontConfig.bodyTwo, color: Color.title}}>Maaf kota yang kamu cari tidak tersedia.</Text>
                  </View>
                  }</View>)
                case 'Kecamatan':
                    return (<View style={{height: '80%'}}>
                    <SearchBar text={title} search={search} setSearch={searchFilterKecamatan} />
                  {filteredData.length != 0 ?<FlatList
                  data={filteredData}
                  renderItem={({item}) => <Item text={item.nama_kecamatan} id={item.id_kecamatan}/>}
                  keyExtractor={item => item.id_kecamatan}
                  /> : 
                  <View style={{alignItems: 'center', height: '70%', justifyContent: 'center'}}>
                      <Image source={ImageWarning} style={{width: 120, height: 88}} />
                      <View style={{height: 10}}></View>
                      <Text style={{...FontConfig.bodyTwo, color: Color.title}}>Maaf kecamatan yang kamu cari tidak tersedia.</Text>
                  </View>
                  }</View>)
                case 'Kelurahan':
                    return (<View style={{height: '80%'}}>
                    <SearchBar text={title} search={search} setSearch={searchFilterKelurahan} />
                  {filteredData.length != 0 ? <FlatList
                  data={filteredData}
                  renderItem={({item}) => <Item text={item.nama_kelurahan} id={item.id_kelurahan}/>}
                  keyExtractor={item => item.id_kelurahan}
                  /> : 
                  <View style={{alignItems: 'center', height: '70%', justifyContent: 'center'}}>
                      <Image source={ImageWarning} style={{width: 120, height: 88}} />
                      <View style={{height: 10}}></View>
                      <Text style={{...FontConfig.bodyTwo, color: Color.title}}>Maaf kelurahan yang kamu cari tidak tersedia.</Text>
                  </View>
                  }</View>)
                default:
                    return null
              }
            })()}
          </>
        }
      <View style={styles.boxPilih}>
          <CustomButton onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
      </View>
    </View>
  )
}

export default DropDownPage

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
  searchBar: {
    
  },
  textTitle: {
    ...FontConfig.titleOne,
    color: Color.title,
    marginLeft: -40
  },
  unSelected: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selected: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Color.neutralZeroThree
  },
  title: {
    color: Color.title,
    ...FontConfig.bodyOne
  },
  textPilih : {
    ...FontConfig.buttonOne, 
    color: 'white'},
});