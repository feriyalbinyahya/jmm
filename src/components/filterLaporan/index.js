import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';
import { useSelector } from 'react-redux';
import LaporanServices from '../../services/laporan';

const FilterLaporan = ({idChoosenTag, setIdChoosenTag, sortby, choosenTag, choosenSortBy, onPressFilter, onPressResetFilter}) => {
    const [onSelectKategori, setOnSelectKategori] = useState(choosenTag);
    const [idOnSelectKategori, setIdOnSelectKategori] = useState(0);
    const [onSelectSortBy, setOnSelectSortBy] = useState(choosenSortBy);
    const [dataTag, setDataTag] = useState([]);
    const [dataTagLoading, setDataTagLoading] = useState(false);
    const id = useSelector((state)=>{
      return state.laporan.jenisLaporan.id;
    })

    handleKategoriSelected = (item) => {
        setOnSelectKategori(item.nama);
        setIdOnSelectKategori(item.id_laporan_tag)
    }
    handleSortBySelected = (item) => {
        setOnSelectSortBy(item);
    }

    const getDataTag = () => {
        setDataTagLoading(true);
        LaporanServices.getTagLaporan(id)
        .then(res=>{
            console.log(res.data.data);
            let temp = [];
            for (var i=0; i<res.data.data.length; i++){
                for(var j=0; j<res.data.data[i].data.length; j++){
                    temp.push(res.data.data[i].data[j]);
                }
            }
            setDataTag(temp);
            setDataTagLoading(false);
        })
        .catch(err=>{
          console.log(err);
        })
      }
    
      useEffect(()=>{
        getDataTag();
      },[])
  return (
    <>{!dataTagLoading ? <View style={styles.container}>
      <Text style={styles.textTag}>Tampilkan Sesuai</Text>
      {
        sortby.map((item)=> {
            return (
                <Pressable key={item} onPress={()=> {handleSortBySelected(item);}}>
                    <View style={item === onSelectSortBy? styles.selected : styles.unSelected}>
                        <Text style={styles.title}>{item}</Text>
                        {item === onSelectSortBy? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
                        : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
                    </View>
                </Pressable>
            )
        })
      }
      <View style={{height:15}}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <CustomButton onPress={onPressResetFilter} text="Reset" backgroundColor={Color.neutralZeroOne} fontStyles={styles.textReset}
        borderColor={Color.primaryMain} height={44} width='40%' borderWidth={1} />
        <CustomButton onPress={() => onPressFilter(onSelectSortBy)} text="Terapkan" backgroundColor={Color.primaryMain} fontStyles={styles.textTerapkan}
        height={44} width='40%'/>
      </View>
    </View> : <View style={{alignItems: 'center', justifyContent: 'center', height: 350}}><ActivityIndicator size="large" color={Color.grayEight} /></View>}</>
  )
}

export default FilterLaporan

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    checkboxOff: {
        borderWidth: 1,
        borderColor: Color.secondaryText,
        width: 16,
        height: 16,
        backgroundColor: Color.neutralZeroOne,
        marginHorizontal: 3
    },
    textTag: {
        ...FontConfig.titleFour,
        color: '#000000'
    },
    textKategori: {
        ...FontConfig.bodyTwo,
        color: '#000000'
    },
    textTerapkan: {
        ...FontConfig.buttonOne,
        color: Color.neutralZeroOne
    },
    textReset: {
        ...FontConfig.buttonOne,
        color: Color.primaryMain
    },
    unSelected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55
    },
    selected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55
    },
    title: {
        ...FontConfig.bodyTwo,
        color: '#000000'
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
})