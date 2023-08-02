import { FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../searchBar'
import LaporanServices from '../../services/laporan';
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const SelectView = ({setFirstname}) => {
    const dataTeman = useSelector(state => {
        return state.laporan.tagTeman;
    });
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dataKawan, setDataKawan] = useState([]);



    const ItemKawan = ({nama, id}) => {
        let isSelected = dataTeman.teman.includes(id);

        const handleClick = () => {
            if(isSelected){
                let temp = dataTeman.teman.filter((elem)=> elem != id);
                let tempNama = dataTeman.namaTeman.filter((elem)=> elem != nama);
                dataTeman.setTeman(temp);
                dataTeman.setNamaTeman(tempNama);
            }else{
                dataTeman.setTeman([...dataTeman.teman, id]);
                dataTeman.setNamaTeman([...dataTeman.namaTeman, nama]);
            }
        }


        return(
            <Pressable onPress={handleClick} style={{flexDirection: 'row', alignItems: 'center'
            ,paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'space-between'}}>
                <View>
                    <Text style={{...FontConfig.bodyOne, color: Color.title}}>{nama}</Text>
                </View>
                {isSelected ? <Ionicons name="checkbox" color={Color.primaryMain} size={22} /> 
                        : <View style={styles.checkboxOff}></View>}

            </Pressable>
        )
    }

    const getDataKawan = () => {
        setIsLoading(true);
        LaporanServices.getKawan(search)
        .then(res=>{
            console.log(res.data.data);
            setDataKawan(res.data.data);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response.message);
        })
    }

    useEffect(()=>{
        getDataKawan();
    },[])

  return (
    <View>
      <SearchBar text="" search={search} setSearch={setSearch} width='100%' />
      {!isLoading ? 
      <FlatList
      data={dataKawan}
      renderItem={({item})=><ItemKawan nama={item.nama} id={item.uniq_code} />}
       /> 
       : <View style={{flex: 1, marginTop: '10%'}}><ActivityIndicator size="large" color={Color.graySix} /></View>}
    </View>
  )
}

export default SelectView

const styles = StyleSheet.create({
    checkboxOff: {
        borderWidth: 1.5,
        borderColor: Color.secondaryText,
        width: 16,
        height: 16,
        backgroundColor: Color.neutralZeroOne,
        marginHorizontal: 3
    },
})