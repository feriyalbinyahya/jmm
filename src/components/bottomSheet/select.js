import { FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../searchBar'
import LaporanServices from '../../services/laporan';
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const SelectView = ({setFirstname, jumlah, type="laporan"}) => {
    const dataTeman = useSelector(state => {
        if (type == "laporan"){
            return state.laporan.tagTeman;
        }else{
            return state.misi.tagTeman;
        }
    });
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dataKawan, setDataKawan] = useState([]);



    const ItemKawan = ({nama, id, domisili}) => {
        let isSelected = dataTeman.teman.includes(id);

        const handleClick = () => {
            console.log(dataTeman);
            if(isSelected){
                let temp = dataTeman.teman.filter((elem)=> elem != id);
                let tempNama = dataTeman.namaTeman.filter((elem)=> elem != nama);
                dataTeman.setTeman(temp);
                dataTeman.setNamaTeman(tempNama);
            }else{
                console.log(dataTeman.teman);
                dataTeman.setTeman([...dataTeman.teman, id]);
                dataTeman.setNamaTeman([...dataTeman.namaTeman, nama]);
            }
        }


        return(
            <Pressable onPress={handleClick} style={{flexDirection: 'row', alignItems: 'center'
            ,paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between'}}>
                <View>
                    <Text style={{...FontConfig.bodyOne, color: Color.title}}>{nama}</Text>
                    <Text style={{...FontConfig.captionTwo, color: Color.neutralZeroSix}}>{domisili}</Text>
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

    const getDataKawanOnRefresh = () => {
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

    const handleSearch = () => {
        getDataKawanOnRefresh();
      }

    useEffect(()=>{
        getDataKawan();
    },[])

    useEffect(()=> {
        handleSearch();
      }, [search])

  return (
    <View style={{maxHeight: 500,}}>
      <SearchBar text="" search={search} setSearch={setSearch} width='100%' padding={10} />
      <Text style={{...FontConfig.buttonOne, color: Color.title, paddingHorizontal: 10, paddingTop: 10}}>{`Kawan ditandai (${jumlah})`}</Text>
      {!isLoading ? 
      <FlatList
      scrollEnabled
      data={dataKawan}
      renderItem={({item})=><ItemKawan nama={item.nama} id={item.uniq_code} domisili={`${item.provinsi}, ${item.kabkot}`} />}
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