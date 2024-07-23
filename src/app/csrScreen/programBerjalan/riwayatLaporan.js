import { StyleSheet, Text, View, Pressable, FlatList, Image, ActivityIndicator, RefreshControl,} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../../theme'
import CustomButton from '../../../components/customButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomBottomSheet from '../../../components/bottomSheet'
import LaporanServices from '../../../services/laporan';
import ImageExample from '../../../assets/images/example/laporan.png'
import { useFocusEffect } from '@react-navigation/native';
import ImageServices from '../../../services/getImage'
import Skeleton from '../../../components/skeleton';
import FilterLaporan from '../../../components/filterLaporan';
import IconNoData from '../../../assets/images/warning/nodata.png'
import HeaderSurface from '../../../components/header/headerSurface';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../../utils/Utils';

const RiwayatLaporan = ({route}) => {
    const {navigation, idProgram} = route.params;
    const idJenisLaporan = 1;
    const [isLoading, setIsLoading] = useState(false);
    const key = ["Semua", "Menunggu konfirmasi", "Diterima", "Ditolak"];
    const [currentPage, setCurrentPage] = useState(1);
    const [choosenTag, setChoosenTag] = useState("");
    const [idChoosenTag, setIdChoosenTag] = useState(0);
    const [choosenSortBy, setChoosenSortBy] = useState('Terbaru');
    const [number, setNumber] = useState([0, 0, 0, 0]);
    const [menus, setMenus] = useState([`Semua (0)`, `Menunggu konfirmasi (0)`, `Diterima (0)`,
    `Ditolak (0)`]);
    const [selectedMenu, setSelectedMenu] = useState("Semua");
    const [dataLaporan, setDataLaporan] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const sortBy = ["Terbaru", "Terlama"];
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    
    const LaporanItem = ({judul, kategori, tanggal, status, id}) => {
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
      
      return(
        <Pressable onPress={()=>navigation.navigate("DetailLaporan", {id: id})} style={styles.laporanItem}>
          <View style={{width: 10}}></View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{height: 5, width: 5, borderRadius: 5, 
                backgroundColor: status == 'Menunggu Persetujuan' ? Color.goldSix : status == 'Diterima' ? Color.successMain : Color.error}}></View>
              <View style={{width: 5}}></View>
              <Text style={{...FontConfig.captionZero, color: Color.primaryText}}>{status}</Text>
            </View>

            <View style={{height: 5}}></View>
            <View style={{width: '95%'}}><Text style={styles.textJudulLaporan} numberOfLines={2}>{judul}</Text></View>
            <View style={{height: 3}}></View>

            <View style={{flexDirection: 'row', width: '77%'}}>
              <Ionicons name="list-outline" color={Color.title} size={14} />
              <Text style={{...FontConfig.captionUpperOne, paddingHorizontal: 3, color: kategori == "Laporan Kegiatan" ? '#4644D4' :
                Color.warning
              }}>
                {kategori.split(" ")[1].toUpperCase()}</Text>
              <View style={{height: '70%', paddingHorizontal:1, marginLeft:2, alignSelf: 'center', borderLeftWidth: 1, width: 1, borderLeftColor: Color.lightBorder}}></View>
              <Text style={styles.textTanggalLaporan}>{convertedDate}</Text>
            </View>
          </View>
        </Pressable>
      );
    }

    const getLaporanData = (page, sortby) => {
      if(dataLaporan.length ==0 ) setIsLoading(true);
      LaporanServices.getListLaporan(idProgram, page, sortby)
      .then(res=> {
        setDataLaporan([...dataLaporan, ...res.data.data.data]);
        setTotalPages(res.data.data.totalPages);
        setTotalItems(res.data.data.totalItems);
        setIsLoading(false);
      })
      .catch(err=> {
        console.log(err.response);
      })
    }


    const onPressFilter = ( onSelectSortBy) => {
      if(onSelectSortBy == choosenSortBy){
        
      }else{
        setDataLaporan([]);
        setCurrentPage(1);
        setChoosenSortBy(onSelectSortBy);
      }
      setModalVisible(false);
    }

    const onPressResetFilter = () => {
      setChoosenSortBy("Terbaru");
      setModalVisible(false);
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

    useFocusEffect(
      React.useCallback(() => {
        if(dataLaporan.length != 0){
          getLaporanData(currentPage, choosenSortBy == "Terlama" ? 'asc' : 'desc');
        }
        }, [])
    );

    useEffect(()=>{
      getLaporanData(currentPage, choosenSortBy == "Terlama" ? 'asc' : 'desc');
    }, [currentPage])

    const getLaporanDataOnRefresh = (page, sortby) => {
      if(dataLaporan.length ==0 ) setIsLoading(true);
      LaporanServices.getListLaporan(idProgram, page, sortby)
      .then(res=> {
        setDataLaporan(res.data.data.data);
        setTotalPages(res.data.data.totalPages);
        setTotalItems(res.data.data.totalItems);
        setIsLoading(false);
      })
      .catch(err=> {
        console.log(err);
      })
    }

    const onRefresh =  () => {
      setRefreshing(true);
      setCurrentPage(1);
      setDataLaporan([]);
      getLaporanDataOnRefresh(1, choosenSortBy == "Terlama" ? 'asc' : 'desc');
      setRefreshing(false);
    }

    useEffect(()=>{
      getLaporanData(currentPage, choosenSortBy == "Terlama" ? 'asc' : 'desc');
    }, [choosenSortBy])
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet children={<FilterLaporan sortby={sortBy} choosenSortBy={choosenSortBy} 
      onPressFilter={onPressFilter} onPressResetFilter={onPressResetFilter} />} 
      isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
      title="Filter" />
      {!isLoading ? <View style={styles.container}>

        <View style={styles.rowFilter}>
          <Text style={styles.textRiwayat}>{`Daftar Laporan (${totalItems})`}</Text>
          <Pressable onPress={()=>setModalVisible(true)} 
          style={{...styles.buttonFilter, backgroundColor: idChoosenTag != 0 ? Color.grayFour : Color.neutralZeroOne}}>
            <Text style={{...FontConfig.bodyThree, color: Color.primaryText}}>Filter</Text>
            <View style={{width: 3}}></View>
            <Ionicons name="filter" color={Color.title} size={14} />
          </Pressable>
        </View>

        {/** laporan list */}
        {dataLaporan.length != 0 ? <FlatList
        data={dataLaporan}
        ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        style={{height: '100%'}}
        renderItem={({item}) => <LaporanItem judul={item.judul} 
        kategori={item.tipe_laporan} status={item.status_laporan} tanggal={item.tanggal_dibuat} id={item.id_csr_laporan} />
        }
        /> : 
        <View style={{height: '83%', alignItems: 'center', justifyContent: 'center'}}>
          <Image source={IconNoData} style={styles.imageNoData} />
          <Text style={{...FontConfig.titleTwo, color: "#000000", marginTop: 10}}>Tidak ada laporan</Text>
          <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, marginVertical: 10}}>Yuk segera buat laporanmu.</Text>
        </View>
        }
      </View> : <View style={{flex: 1, marginTop: '40%'}}><ActivityIndicator size="large" color={Color.graySix} /></View>}
    </View>
  )
}

export default RiwayatLaporan

const styles = StyleSheet.create({
    boxHeader: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        width: '100%'
    },
    textTitleHeader: {
        ...FontConfig.titleOne,
        color: Color.primaryMain
    },
    textSubtitleHeader: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroSeven
    },
    container: {
        paddingVertical: 20,
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: Color.neutralZeroOne
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
    laporanItem: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1, 
      borderBottomColor: Color.lightBorder
    },
    imageLaporan: {
      width: 100,
      height: 56,
      borderRadius: 3
    },
    imageNoData : {
      width:120,
      height: 88
    },
    textJudulLaporan: {
      ...FontConfig.titleThree,
      color: Color.title,
      width: '100%'
    },
    textTanggalLaporan: {
      ...FontConfig.captionUpperOne,
      color: Color.graySeven,
      paddingHorizontal: 3
    },
})