import { StyleSheet, Text, View, Pressable, Image, FlatList, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../../theme'
import iconArrowLeft from '../../../assets/images/icon/icon_arrow_left.png'
import CustomInput from '../../../components/customInput'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../components/customButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTemporary, setTemporary } from '../../../redux/registration'
import SearchBar from '../../../components/searchBar'
import LaporanServices from '../../../services/laporan'

const PilihTagPage = ({route, navigation}) => {
  const { title, item, onGoBack, jenisLaporan ,id_tag } = route.params;
  const [query, setQuery] = useState('');
  const [onSelect, setOnSelect] = useState(item);
  const [idSelect, setIdSelect]= useState(id_tag);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTag, setDataTag] = useState([]);
  const id = useSelector((state)=>{
    return state.laporan.jenisLaporan.id;
  })

  {/**ambil dari store data tag kegiatan sesuai kan sama jenis laporan */}
  const data = [
    {
      laporan: 'Alat Pegara Kampanye',
      data: [
        {
          id: '1',
          tag: 'Spanduk'
        },
        {
          id: '2',
          tag: 'Billboard'
        }
      ]
    }
  ];

  handleSelected = (item, id) => {
    if(onSelect == item){
      setOnSelect('');
      setIdSelect(0);
    }else{
      setOnSelect(item);
      setIdSelect(id);
    }
  }

  handlePilih = () => {
    onGoBack(onSelect, idSelect);
    navigation.goBack();
  }

  const getDataTag = () => {
    setIsLoading(true);
    LaporanServices.getTagLaporan(id)
    .then(res=>{
      setDataTag(res.data.data);
      setIsLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getDataTag();
  },[])



  const Item = ({text, id}) => (
    <Pressable onPress={()=> {handleSelected(text, id);}}>
        <View style={text === onSelect? styles.selected : styles.unSelected}>
            <Text style={styles.title}>{text}</Text>
            {text=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
            : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
        </View>
    </Pressable>
  );
  return (
    <View style={styles.dropDownPage}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
        <View style={{alignItems: 'center', flex:1}}><Text style={styles.textTitle}>{`Pilih `+title}</Text></View>
      </View>
      <View style={{height: '80%'}}>
        {!isLoading ?
            dataTag.map((jenis, index) => {
                return (
                    <View key={index}>
                        <Text style={{padding: 10, ...FontConfig.titleThree, color: Color.secondaryText}}>{jenis.nama_sub_jenis_laporan}</Text>
                        <FlatList
                        data={jenis.data}
                        renderItem={({item}) => <Item text={item.nama} id={item.id_laporan_tag}/>}
                        keyExtractor={item => item.id_laporan_tag}
                        />
                    </View>
                );
            }) : <ActivityIndicator size="large" color={Color.graySix} style={{marginTop: 150}} />
        }
      </View>
      <View style={styles.boxPilih}>
          <CustomButton onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
      </View>
    </View>
  )
}

export default PilihTagPage

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