import { FlatList, Pressable, StyleSheet, Text, View, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderRed from '../../components/header/headerRed'
import CustomButton from '../../components/customButton'
import SearchBar from '../../components/searchBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageServices from '../../services/getImage'
import SimpatisanServices from '../../services/simpatisan'
import IconNoData from '../../assets/images/warning/nodata.png'

import CustomBottomSheet from '../../components/bottomSheet'
import FilterSimpatisan from '../../components/filterSimpatisan'
import IconScanWhite from '../../assets/images/icon/icon_scan_monokrom.png';
import { useFocusEffect } from '@react-navigation/native'
import Skeleton from '../../components/skeleton'
import HeaderSurface from '../../components/header/headerSurface'

const ListSimpatisan = ({navigation}) => {
    const title = "Daftar Kawanmu";
    const subtitle = "Tambahkan data kawanmu dengan klik tombol tambah kawan atau tombol scan QR code dipojok kanan atas.";
    const [search, setSearch] = useState("");
    const [dataSimpatisan, setDataSimpatisan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [provinsi, setProvinsi] = useState("");
    const [kota, setKota] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isModalVisible, setModalVisible] = useState(false);


    const SimpatisanItem = ({image, nama, kota, provinsi, id}) => {
      const [dataImage, setDataImage] = useState("");
      const [isLoading, setIsLoading] = useState(false);

      const getDataImage = () =>{
        setIsLoading(true);
        ImageServices.getImage("simpatisan", image)
        .then(res=>{
          setDataImage(res.data.data);
          setIsLoading(false);
        })
        .catch(err=>{
          console.log(err);
        })
      }

      useEffect(()=>{
        getDataImage();
      }, [])

      
      return(
        <Pressable onPress={()=>navigation.navigate("DetailSimpatisan", {id: id})} style={styles.laporanItem}>
          {!isLoading ? <Image style={styles.imageLaporan} source={{uri: `data:image/png;base64,${dataImage}`}} /> : 
          <Skeleton width={40} height={40} style={{borderRadius: 100}} />
          }
          <View style={{width: 10}}></View>
          <View>
            <Text style={{...FontConfig.titleThree, color: Color.title}}>{nama}</Text>
            <Text style={{...FontConfig.captionTwo, color: Color.secondaryText}}>{`${kota}, ${provinsi}`}</Text>
          </View>
        </Pressable>
      );
    }

    const IconScan = () =>{
      return (
        <Pressable onPress={()=>navigation.navigate("ReferalSimpatisan")}>
          <Image source={IconScanWhite} style={{width: 36, height: 36}} />
        </Pressable>
      )
    }

    const getDataSimpatisan = (page) => {
      if(dataSimpatisan.length ==0 ) setIsLoading(true);
        SimpatisanServices.getAllSimpatisan(page, provinsi, kota, search)
        .then(res=>{
          console.log(res.data.data.data);
          setDataSimpatisan([...dataSimpatisan, ...res.data.data.data]);
          setTotalPages(res.data.data.totalPages);
          setIsLoading(false);
        })
        .catch(err=> {
          console.log(err.response.data);
        })
    }

    const getDataSimpatisanOnRefresh = (page, provinsi, kota, search) => {
      setIsLoading(true);
      SimpatisanServices.getAllSimpatisan(page, provinsi, kota, search)
      .then(res=>{
        console.log(res.data.data.data);
        setDataSimpatisan(res.data.data.data);
        setTotalPages(res.data.data.totalPages);
        setIsLoading(false);
      })
      .catch(err=> {
        console.log(err.response.data);
      })
  }

    const loadMoreItem = () => {
      if(currentPage < parseInt(totalPages)){
        setCurrentPage(currentPage + 1);
      }
    }

    const onRefresh =  () => {
      setRefreshing(true);
      getDataSimpatisanOnRefresh( 1, provinsi != "" ? provinsi : "", kota != "" ? kota : "", search);
      setRefreshing(false);
    }

    const renderLoader = () => {
      return(
        <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color={Color.graySix} />
        </View>
      );
    }
    
    const handleFilter = () =>{
      setModalVisible(true);
    }

    const onPressFilter = (provinsi, kota) => {
      setDataSimpatisan([]);
      setCurrentPage(1);
      setProvinsi(provinsi)
      setKota(kota);
      setModalVisible(false);
    }

    const onPressResetFilter = () => {
      setDataSimpatisan([]);
      setProvinsi("");
      setKota("");
      setModalVisible(false);
    }

    useFocusEffect(
      React.useCallback(() => {
        setCurrentPage(1);
        setDataSimpatisan([]);
        getDataSimpatisan(1);
      }, [])
    );

    useEffect(()=>{
      getDataSimpatisanOnRefresh( 1, provinsi != "" ? provinsi : "", kota != "" ? kota : "", search );
    }, [search])

    useEffect(()=>{
      getDataSimpatisan(currentPage);
    },[currentPage, provinsi,kota])

  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
        <CustomBottomSheet children={<FilterSimpatisan data_kota={kota} data_provinsi={provinsi} onPressFilter={onPressFilter} onPressResetFilter={onPressResetFilter} />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
        title="Filter" />
        <HeaderSurface navigation={navigation} rightChild={<IconScan />} />
        <View style={styles.boxHeader}>
            <Text style={styles.textTitleHeader}>{title}</Text>
            <View style={{height:5}}></View>
            <Text style={styles.textSubtitleHeader}>{subtitle}</Text>
            <View style={{height:10}}></View>
        </View>
        <View style={{position: 'absolute', bottom: 40, right: 20, zIndex: 1}}>
          <Pressable onPress={()=>navigation.navigate("TambahkanSimpatisan")} style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1,
          borderColor: Color.neutralZeroSix, backgroundColor: Color.primaryMain, borderRadius: 32, 
          alignItems: 'center', height: 46}}>
              <Ionicons name="add-outline" size={20} color={Color.neutralZeroOne} />
              <View style={{width: 4}}></View>
              <Text style={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}}>Tambah Kawan</Text>
          </Pressable>
        </View>
        <SearchBar text="nama konstituen disini.." search={search} 
        setSearch={setSearch} width='100%' deletedtrue />
        {!isLoading ? <>
          <View style={styles.container}>
              <View style={styles.rowFilter}>
                  <Text style={styles.textRiwayat}>Riwayat Pendataan</Text>
                  <Pressable
                  onPress={handleFilter}
                  style={{...styles.buttonFilter, backgroundColor: provinsi != 0 ? Color.grayFour : Color.neutralZeroOne}}>
                      <Text style={{...FontConfig.bodyThree, color: Color.primaryText}}>Filter</Text>
                      <View style={{width: 3}}></View>
                      <Ionicons name="filter" color={Color.title} size={14} />
                  </Pressable>
              </View>
          </View>
          {/** laporan list */}
          {dataSimpatisan.length != 0 ? <FlatList
          data={dataSimpatisan}
          ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
          style={{height: '48%'}}
          renderItem={({item}) => <SimpatisanItem id={item.uniq_code} image={item.foto} nama={item.nama} 
          kota={item.kabkot} provinsi={item.provinsi} />
          }
          /> : 
          <View style={{height: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={IconNoData} style={styles.imageNoData} />
            <Text style={{...FontConfig.titleTwo, color: "#000000", marginTop: 10}}>Tidak ada riwayat</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, marginVertical: 10}}>Yuk segera buat data simpatisan.</Text>
          </View>
          }</> :
          <View style={{flex: 1, marginTop: '40%'}}><ActivityIndicator size="large" color={Color.graySix} /></View>} 
    </View>
  )
}

export default ListSimpatisan

const styles = StyleSheet.create({
    boxHeader: {
        padding: 20,
        backgroundColor: Color.neutralZeroOne,
        width: '100%'
    },
    textTitleHeader: {
        ...FontConfig.titleOne,
        color: Color.neutralTen
    },
    textSubtitleHeader: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroSeven
    },
    container: {
        paddingHorizontal: 20,
        flex: 1
    },
    rowFilter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textRiwayat: {
      ...FontConfig.captionFour,
      color: Color.title
    },
    buttonFilter: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 32,
      borderColor: Color.neutralZeroSix,
      paddingHorizontal: 10,
      paddingVertical: 5
    },
    imageNoData : {
        width:120,
        height: 88
    },
    laporanItem: {
      flexDirection: 'row',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#EDEDED'
    },
    imageLaporan: {
      width: 40,
      height: 40,
      borderRadius: 100
    },
})