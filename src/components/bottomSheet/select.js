import { FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../searchBar'
import LaporanServices from '../../services/laporan';
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import CustomButton from '../customButton';

const SelectView = ({setFirstname, jumlah, type="laporan", isModalVisible, setIsModalVisible}) => {
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
    const [teman, setTeman] = useState(dataTeman.teman);
    const [namaTeman, setNamaTeman] = useState(dataTeman.namaTeman);



    const ItemKawan = ({nama, id, domisili}) => {
        let isSelected = teman.includes(id);

        const handleClick = () => {
            console.log(dataTeman);
            if(isSelected){
                let temp = teman.filter((elem)=> elem != id);
                let tempNama = namaTeman.filter((elem)=> elem != nama);
                setTeman(temp);
                setNamaTeman(tempNama);
            }else{
                setTeman([...teman, id]);
                setNamaTeman([...namaTeman, nama]);
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

    const handlePilih = () => {
        dataTeman.setTeman(teman);
        dataTeman.setNamaTeman(namaTeman);
        setIsModalVisible(!isModalVisible);
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
      <Text style={{...FontConfig.buttonOne, color: Color.title, paddingHorizontal: 10, paddingTop: 10}}>{`Kawan ditandai (${teman.length})`}</Text>
      {!isLoading ? 
      <><FlatList
      scrollEnabled
      data={dataKawan}
      renderItem={({item})=><ItemKawan nama={item.nama} id={item.uniq_code} domisili={`${item.provinsi}, ${item.kabkot}`} />}
       /> 
        <View>
            {teman.length == 0 && dataTeman.teman.length != 0 ? <CustomButton onPress={handlePilih} backgroundColor={Color.danger} text="Hapus" height={44} 
            fontStyles={{...FontConfig.buttonOne, color: Color.putih}} /> : <CustomButton onPress={handlePilih} backgroundColor={Color.primaryMain} text="Pilih" height={44} 
            fontStyles={{...FontConfig.buttonOne, color: Color.putih}} />}
        </View></>
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