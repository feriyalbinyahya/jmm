import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderWhite from '../../components/header/headerWhite'
import CardProgram from '../../components/cardProgram'
import { Color, FontConfig } from '../../theme'
import ProgramServices from '../../services/program'
import ImageEmpty from '../../assets/images/warning/empty2.png'
import { useFocusEffect } from '@react-navigation/native'
import ScrollMenuButton from '../../components/scrollMenu'
import CustomBottomSheet from '../../components/bottomSheet'
import FilterLaporan from '../../components/filterLaporan'
import Ionicons from 'react-native-vector-icons/Ionicons';

const CSRScreen = ({navigation}) => {
  const key = ["Semua", "Sedang Berjalan", "Selesai"];
  const [listProgram, setListProgram] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading]  = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Sedang Berjalan");
  const [choosenSortBy, setChoosenSortBy] = useState("Terbaru");
  const [menus, setMenus] = useState(["Semua (0)", "Sedang Berjalan (0)", "Selesai (0)"])
  const [refreshing, setRefreshing] = React.useState(false);
  const sortBy = ["Terbaru", "Terlama"];
  const [isModalVisible, setModalVisible] = useState(false);

  const getListProgram = (page, status, sortby) => {
    if(listProgram.length == 0) setIsLoading(true);
    ProgramServices.getAllProgram(page, status, sortby)
    .then(res=>{
      console.log(res.data);
      setListProgram([...listProgram,  ...res.data.data.data]);
      setTotalPages(res.data.data.totalPages);
      setIsLoading(false);
    })
    .catch(err=>{
      console.log(err.response);
      setIsLoading(false);
    })
  }

  const getListProgramOnRefresh = (page, status, sortby) => {
    if(listProgram.length ==0 ) setIsLoading(true);
    ProgramServices.getAllProgram(page, status, sortby)
    .then(res=> {
      setListProgram(res.data.data.data);
      setTotalPages(res.data.data.totalPages);
      setIsLoading(false);
    })
    .catch(err=> {
      console.log(err);
    })
  }

  const onRefresh =  () => {
    setRefreshing(true);
    setCurrentPage(1);
    setListProgram([]);
    getListProgramOnRefresh(1, selectedMenu, choosenSortBy);
    setRefreshing(false);
  }

  const onPressMenu = (status) => {
    setListProgram([]);
    setCurrentPage(1);
    setSelectedMenu(status);
  }

  const getTotalProgram = () => {
    ProgramServices.getJumlahProgram()
    .then(res=>{
      console.log(res.data);
      setMenus([`Semua (${res.data.data.total})`, 
        `Sedang Berjalan (${res.data.data.sedang_berjalan})`, 
        `Selesai (${res.data.data.selesai})`]);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const loadMoreItem = () => {
    if(currentPage < parseInt(totalPages)){
      setCurrentPage(currentPage + 1);
    }
  }

  const renderLoader = () => {
    return(
      <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color={Color.graySix} />
      </View>
    );
  }

  const onPressFilter = ( onSelectSortBy) => {
    if(onSelectSortBy == choosenSortBy){
      
    }else{
      setListProgram([]);
      setCurrentPage(1);
      setChoosenSortBy(onSelectSortBy);
    }
    setModalVisible(false);
  }

  const onPressResetFilter = () => {
    setChoosenSortBy("Terbaru");
    setModalVisible(false);
  }
  

  useEffect(()=>{
    getTotalProgram();
  },[])

  useEffect(()=>{
      getListProgram(currentPage, selectedMenu, choosenSortBy == "Terlama" ? 'asc' : 'desc')
  },[currentPage, selectedMenu, choosenSortBy])

  return (
    <SafeAreaView style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet children={<FilterLaporan sortby={sortBy} choosenSortBy={choosenSortBy} 
      onPressFilter={onPressFilter} onPressResetFilter={onPressResetFilter} />} 
      isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
      title="Filter" />
      <HeaderWhite title={`CSR`} navigation={navigation} />
      <View style={{height: 20}}></View>
      <ScrollMenuButton onPressMenu={onPressMenu} keyMenu={key} data={menus} value={selectedMenu} setValue={setSelectedMenu} />
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20}}>
        <Text style={{...FontConfig.button3, color: Color.hitam}}>Daftar Program</Text>
        <Pressable onPress={()=>setModalVisible(true)} 
        style={{...styles.buttonFilter, backgroundColor: Color.neutralZeroOne}}>
          <Text style={{...FontConfig.bodyThree, color: Color.primaryMain}}>Urutkan</Text>
          <View style={{width: 3}}></View>
          <Ionicons name="filter" color={Color.primaryMain} size={14} />
        </Pressable>
      </View>
      

      {
        isLoading ? <ActivityIndicator style={{paddingVertical: 5, height: '75%'}} size="large" color={Color.graySix} /> :
        listProgram.length != 0 ?
        <FlatList
          style={{marginHorizontal: 20, paddingVertical: 5, height: '75%'}}
          data={listProgram}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
          ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          renderItem={({item}) => <CardProgram berita={item.judul} baru={false} tanggal={item.tanggal_dibuat} 
          id={item.id_csr_program} image={item.cover} navigation={navigation} />}
        /> 
        : 
        <View style={{alignItems: 'center', padding: 20, justifyContent: 'center', height: '75%'}}>
            <Image source={ImageEmpty} style={{width: 123, height: 90}} />
            <View style={{height: 15}}></View>
            <Text style={{...FontConfig.titleTwo, color: Color.title}}>Yah, belum ada daftar program</Text>
            <View style={{height: 5}}></View>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tunggu program terbaru ya.</Text>
        </View>
      }
      <View style={{height: 20}}></View>
    </SafeAreaView>
  )
}

export default CSRScreen

const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center'
  },
  buttonFilter: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 32,
    borderColor: Color.primaryMain,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
})