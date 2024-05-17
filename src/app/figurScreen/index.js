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
import IconScanWhite from '../../assets/images/icon/icon_scan_white.png';
import { useFocusEffect } from '@react-navigation/native'
import Skeleton from '../../components/skeleton'
import UserAvatar from 'react-native-avatar-generator';
import ScrollMenuButton from '../../components/scrollMenu'
import FigurServices from '../../services/figur'
import ItemChoice from '../../components/bottomSheet/itemChoice'
import JenisFigurChoice from '../../components/bottomSheet/jenisFigurChoice'
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../utils/Utils';

const ListFigur = ({navigation}) => {
    const title = "Figur";
    const subtitle = "Laporkan Tokoh, Organisasi, atau Komunitas yang berpengaruh disekitarmu.";
    const [search, setSearch] = useState("");
    const [dataSimpatisan, setDataSimpatisan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [provinsi, setProvinsi] = useState("");
    const [kota, setKota] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalJenisVisible, setModalJenisVisible] = useState(false);

    const key = ["Tokoh", "Organisasi", "Komunitas"];
    const [number, setNumber] = useState([0, 0, 0, 0]);
    const [menus, setMenus] = useState([`Tokoh (0)`, `Organisasi (0)`, `Komunitas (0)`]);
    const [selectedMenu, setSelectedMenu] = useState("Tokoh");
    const [dataLaporan, setDataLaporan] = useState([]);
    const sortBy = ["Terbaru", "Terlama"];
    const dataJenis = [{id: '1', name: 'Tokoh'},
    {id: '2', name: 'Organisasi'},
    {id: '3', name: 'Komunitas'}
  ]


    const SimpatisanItem = ({image, nama, tanggal, id, jenisFigur}) => {
      const [dataImage, setDataImage] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const deviceTimeZone = RNLocalize.getTimeZone();
      const [convertedDate, setConvertedDate] = useState("");

      // Make moment of right now, using the device timezone
      const today = moment().tz(deviceTimeZone);

      // Get the UTC offset in hours
      const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
      useEffect(()=>{
          const convertedToLocalTime = formatTimeByOffset(
              tanggal,
              currentTimeZoneOffsetInHours,
            );
          setConvertedDate(convertedToLocalTime);
      },[])

      const getDataImage = () =>{
        setIsLoading(true);
        ImageServices.getImage("figur", image)
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
        <Pressable onPress={()=>navigation.navigate("DetailFigur", {id: id, jenis: jenisFigur})} style={styles.laporanItem}>
          {!isLoading ? 
          dataImage != "" ? <Image style={styles.imageLaporan} source={{uri: `data:image/png;base64,${dataImage}`}} /> :
          <UserAvatar
              size={40}
              fontWeight="bold"
              color="#FFFFFF"
              backgroundColor={Color.neutralZeroFour}
              firstName={nama.split(" ")[0]}
              lastName={nama.split(" ")[1]}
          />
          : 
          <Skeleton width={40} height={40} style={{borderRadius: 100}} />
          }
          <View style={{width: 10}}></View>
          <View>
            <Text style={{...FontConfig.titleThree, color: Color.title}}>{nama}</Text>
            <Text style={{...FontConfig.captionTwo, color: Color.secondaryText}}>{`${convertedDate}`}</Text>
          </View>
        </Pressable>
      );
    }

    const IconScan = () =>{
      return (
        <Pressable onPress={()=>navigation.navigate("ReferalSimpatisan")} style={{paddingHorizontal: 10, backgroundColor: Color.primaryMain, borderRadius: 32}}>
          <Image source={IconScanWhite} style={{width: 24, height: 24}} />
        </Pressable>
      )
    }

    const getDataSimpatisan = (page, kategori) => {
      if(dataSimpatisan.length ==0 ) setIsLoading(true);
        FigurServices.getDataFigur(page, kategori)
        .then(res=>{
          console.log(res.data.data);
          setDataSimpatisan([...dataSimpatisan, ...res.data.data.data]);
          setTotalPages(res.data.data.totalPages);
          setIsLoading(false);
        })
        .catch(err=> {
          console.log(err.response);
        })
    }

    const getDataSimpatisanOnRefresh = (page, kategori) => {
      setIsLoading(true);
      FigurServices.getDataFigur(page, kategori)
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

  const getCounterFigur = () => {
    let tokoh = 0;
    let komunitas = 0;
    let organisasi = 0;
    FigurServices.getCounterFigur()
    .then(res=>{
      tokoh = res.data.data.tokoh;
      komunitas = res.data.data.komunitas;
      organisasi = res.data.data.organisasi;
      setMenus([`Tokoh (${tokoh})`, `Organisasi (${organisasi})`, `Komunitas (${komunitas})`]);
      console.log(res.data.data);
    }).catch(err=>{
      console.log(err.response);
    })

  }

    const loadMoreItem = () => {
      if(currentPage < parseInt(totalPages)){
        setCurrentPage(currentPage + 1);
      }
    }

    const onRefresh =  () => {
      setRefreshing(true);
      setCurrentPage(1);
      setDataSimpatisan([]);
      getCounterFigur();
      getDataSimpatisanOnRefresh(1, selectedMenu.toLowerCase());
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

    const onPressMenu = (status) => {
      setDataSimpatisan([]);
      setCurrentPage(1);
      setSelectedMenu(status);
    }

    useEffect(()=> {
      getCounterFigur();
        if(dataLaporan.length != 0){
          console.log("refresh data laporan");
          getDataSimpatisan(currentPage, selectedMenu.toLowerCase());
        }
    }, [])

    useEffect(()=>{
      getDataSimpatisan(currentPage, selectedMenu.toLowerCase());
    },[currentPage, selectedMenu])

  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
        <CustomBottomSheet children={<FilterSimpatisan data_kota={kota} data_provinsi={provinsi} onPressFilter={onPressFilter} onPressResetFilter={onPressResetFilter} />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
        title="Filter" />
        <CustomBottomSheet children={<JenisFigurChoice setModalVisible={setModalJenisVisible} data={dataJenis} navigation={navigation} />} 
        isModalVisible={isModalJenisVisible} setModalVisible={setModalJenisVisible} 
        title="Pilih Profil" />
        <HeaderRed navigation={navigation} />
        <View style={styles.boxHeader}>
            <Text style={styles.textTitleHeader}>{title}</Text>
            <View style={{height:5}}></View>
            <Text style={styles.textSubtitleHeader}>{subtitle}</Text>
            <View style={{height:10}}></View>
            <CustomButton text="Tambahkan" 
            backgroundColor={Color.neutralZeroOne} width='100%'
            height={44}
            onPress={()=>{
              setModalJenisVisible(true);
            }}
            fontStyles={{...FontConfig.buttonOne, color: Color.primaryMain}} 
            />
        </View>
        <View style={{paddingHorizontal: 10, paddingTop: 20}}><ScrollMenuButton onPressMenu={onPressMenu} keyMenu={key} data={menus} value={selectedMenu} setValue={setSelectedMenu} /></View>
        {!isLoading ? <>
          <View style={styles.container}>
              <View style={styles.rowFilter}>
                  <Text style={styles.textRiwayat}>Riwayat Laporan</Text>
                  {/*<Pressable
                  onPress={handleFilter}
                  style={{...styles.buttonFilter, backgroundColor: provinsi != 0 ? Color.redOne : Color.neutralZeroOne}}>
                      <Text style={{...FontConfig.bodyThree, color: Color.primaryText}}>Filter</Text>
                      <View style={{width: 3}}></View>
                      <Ionicons name="filter" color={Color.title} size={14} />
                  </Pressable> */}
              </View>
          </View>
          {/** laporan list */}
          {dataSimpatisan.length != 0 ? <FlatList
          data={dataSimpatisan}
          ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
          style={{height: '50%'}}
          renderItem={({item}) => <SimpatisanItem id={item.id} jenisFigur={item.jenis_figur} image={item.foto} nama={item.nama} 
          tanggal={item.created_at} />
          }
          /> : 
          <View style={{height: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={IconNoData} style={styles.imageNoData} />
            <Text style={{...FontConfig.titleTwo, color: "#000000", marginTop: 10}}>Tidak ada riwayat</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, marginVertical: 10}}>Yuk segera data simpatisan.</Text>
          </View>
          }</> :
          <View style={{flex: 1, marginTop: '40%'}}><ActivityIndicator size="large" color={Color.graySix} /></View>} 
    </View>
  )
}

export default ListFigur

const styles = StyleSheet.create({
    boxHeader: {
        padding: 20,
        backgroundColor: Color.primaryMain,
        width: '100%'
    },
    textTitleHeader: {
        ...FontConfig.titleOne,
        color: Color.neutralZeroOne
    },
    textSubtitleHeader: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroOne
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20
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