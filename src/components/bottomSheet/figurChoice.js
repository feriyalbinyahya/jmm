import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';
import FigurServices from '../../services/figur';
import RegistrationService from '../../services/registration';
import SearchBar from '../searchBar';

const FigurChoice = ({item, setItem, setModalVisible, id, setId, subject, title}) => {
    const [onSelect, setOnSelect] = useState(item);
    const [idSelect, setIdSelect] = useState(id);
    const [dataChoice, setDataChoice] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    

      handleSelected = (item, id) => {
        setOnSelect(item);
        setIdSelect(id);
      }

      handlePilih = () => {
        if(onSelect != ''){
            setItem(onSelect);
            setId(idSelect);
            setModalVisible(false);
        }
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

      const getDataKategoriTokoh = () => {
        FigurServices.getKategoriTokoh()
        .then(res=>{
          setDataChoice(res.data.data);
        }).catch(err=>{
          console.log(err.response);
        })
      
      }

      const getDataAfiliasi = () => {
        FigurServices.getAfiliasi()
        .then(res=>{
          setDataChoice(res.data.data);
        }).catch(err=>{
          console.log(err.response);
        })
      
      }
      const getDataDukungan = () => {
        FigurServices.getDukungan()
        .then(res=>{
          setDataChoice(res.data.data);
        }).catch(err=>{
          console.log(err.response);
        })
      
      }

      const getDataLingkup = () => {
        FigurServices.getLingkup()
        .then(res=>{
          console.log(res.data.data);
          setDataChoice(res.data.data);
        }).catch(err=>{
          console.log(err.response);
        })
      
      }

      const getDataRekomendasi = () => {
        FigurServices.getRekomendasi()
        .then(res=>{
          setDataChoice(res.data.data);
        }).catch(err=>{
          console.log(err.response);
        })
      
      }

      const getDataLokasi = () => {
        FigurServices.getDataKabkot()
        .then(res=>{
          console.log(res.data.data);
          setFilteredData(res.data.data);
          setDataChoice(res.data.data);
        }).catch(err=>{
          console.log(err.response);
        })
      
      }

      const searchFilterKota = (text) => {
        if(text){
          const newData = dataChoice.filter((item) => {
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
    
      useEffect(()=>{
        if(subject == "Kategori"){
            getDataKategoriTokoh();
        }else if(subject == "Afiliasi"){
            getDataAfiliasi();
        }else if(subject == "Dukungan"){
            getDataDukungan();
        }else if(subject == "Lingkup"){
            getDataLingkup();
        }else if(subject == "Rekomendasi"){
            getDataRekomendasi();
        }else if(subject =="Lokasi"){
            getDataLokasi();
        }
      }, [])
  return (
    <View>
      {subject == "Lokasi" ? <SearchBar width='100%' search={search} padding={10} setSearch={searchFilterKota} deleted={true} text="kabupaten/kota" /> : 
      <></>}
      <FlatList
      style={{maxHeight: 400}}
      data={subject =="Lokasi" ? filteredData : dataChoice}
      renderItem={({item}) => {
        if(subject == "Kategori"){
            return <Item text={item.nama_tokoh_kategori} id={item.id_profil_tokoh_kategori}/>
        }else if(subject == "Afiliasi"){
            return <Item text={item.nama_afiliasi} id={item.id_afiliasi_pilpres_2019}/>
        }else if(subject == "Dukungan"){
            return <Item text={item.nama_dukungan} id={item.id_kecenderungan_dukungan}/>
        }else if(subject == "Lingkup"){
          console.log("jenis" ,title);
          if((title == "tokoh" && item.dipake_tokoh == 1) || (title == "organisasi" && item.dipake_organisasi == 1) ||
          (title == "komunitas" && item.dipake_komunitas == 1)){
            return <Item text={item.pengaruh} id={item.id_pengaruh}/>
          }
        }else if(subject == "Rekomendasi"){
            return <Item text={item.rekomendasi} id={item.id_rekomendasi}/>
        }else if(subject == "Lokasi"){
            return <Item text={item.nama_kabkot} id={item.id_kabkot}/>
        }else{
            return <></>
        }
        }
        }
       />
       <View style={{marginTop: 5}}>
            <CustomButton onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
        </View>
    </View>
  )
}

export default FigurChoice

const styles = StyleSheet.create({
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
        backgroundColor: Color.redOne
    },
    title: {
        ...FontConfig.bodyOne,
        color: Color.title
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
});