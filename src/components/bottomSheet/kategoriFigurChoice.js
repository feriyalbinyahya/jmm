import { StyleSheet, Text, View, FlatList, Pressable, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';
import FigurServices from '../../services/figur';
import RegistrationService from '../../services/registration';
import SearchBar from '../searchBar';
import CustomInput from '../customInput';

const KategoriFigurChoice = ({item, setItem, kategoriLain, setKategoriLain, setModalVisible, id, setId, title}) => {
    const [onSelect, setOnSelect] = useState(item);
    const [idSelect, setIdSelect] = useState(id);
    const [dataChoice, setDataChoice] = useState([]);
    const [lainnya, setLainnya]= useState(kategoriLain);
    const [isLain, setIsLain] = useState(kategoriLain != "" ? true : false);
    

      handleSelected = (item, id) => {
        if(item == "Lain-lain"){
            setIsLain(true);
        }else{
            setIsLain(false);
        }
        setOnSelect(item);
        setIdSelect(id);
        
      }

      handlePilih = () => {
        if(onSelect == "Lain-lain"){
            setKategoriLain(lainnya);
        }else{
            setKategoriLain("");
        }
        if(onSelect != ''){
            setItem(onSelect);
            setId(idSelect);
            setModalVisible(false);
        }

      }

      const Item = ({text, id}) => (
        <Pressable onPress={()=> {handleSelected(text, id);}}>
            <View style={text === onSelect? styles.selected : styles.unSelected}>
                <View>
                    <Text style={styles.title}>{text}</Text>
                    <View style={{height: 5}}></View>
                    
                </View>
                {text=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
                : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
            </View>
        </Pressable>
      );

      const getDataKategoriTokoh = () => {
        FigurServices.getKategoriTokoh(title)
        .then(res=>{
          setDataChoice(res.data.data);
        }).catch(err=>{
          console.log(err.response);
        })
      
      }
    
      useEffect(()=>{
        getDataKategoriTokoh();
      }, [])
  return (
    <View>
      <FlatList
      style={{maxHeight: 400}}
      data={ dataChoice}
      renderItem={({item}) => {
        if(title == "tokoh"){
            return <Item text={item.nama_tokoh_kategori} id={item.id_profil_tokoh_kategori}/>
        }else if(title == "organisasi"){
            return <Item text={item.nama_organisasi_kategori} id={item.id_profil_organisasi_kategori}/>
        }else{
            return <Item text={item.nama_komunitas_kategori} id={item.id_profil_komunitas_kategori}/>
        }
        }
        }
       />
       {isLain ? 
        <View style={{backgroundColor: Color.redOne}}><TextInput style={{backgroundColor: Color.neutralZeroOne, borderColor: Color.lightBorder,
        borderWidth: 0.5, borderRadius: 5, width: 250, height: 45, marginHorizontal: 8, ...FontConfig.bodyOne,
        color: Color.primaryText,}} 
        value={lainnya} onChangeText={setLainnya}
        placeholderTextColor={Color.disable} 
        placeholder='Masukkan kategori lainnya' />
        <View style={{height: 5}}></View>
        </View> : <></>}
       <View style={{marginTop: 5}}>
            <CustomButton disabled={isLain ? lainnya == "" : false} onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
        </View>
    </View>
  )
}

export default KategoriFigurChoice

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