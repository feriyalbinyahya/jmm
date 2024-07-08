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

const RiwayatLaporan = ({route}) => {
    const {navigation} = route.params;
    const idJenisLaporan = 1;
    const [isLoading, setIsLoading] = useState(false);
    const key = ["Semua", "Menunggu konfirmasi", "Diterima", "Ditolak"];
    const [currentPage, setCurrentPage] = useState(1);
    const [choosenTag, setChoosenTag] = useState("");
    const [idChoosenTag, setIdChoosenTag] = useState(0);
    const [choosenSortBy, setChoosenSortBy] = useState('terbaru');
    const [number, setNumber] = useState([0, 0, 0, 0]);
    const [menus, setMenus] = useState([`Semua (0)`, `Menunggu konfirmasi (0)`, `Diterima (0)`,
    `Ditolak (0)`]);
    const [selectedMenu, setSelectedMenu] = useState("Semua");
    const [dataLaporan, setDataLaporan] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const sortBy = ["Terbaru", "Terlama"];
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    
    const LaporanItem = ({image, judul, kategori, tanggal, status, id}) => {
      const [dataImage, setDataImage] = useState("");
      const [isLoading, setIsLoading] = useState(false);

      const getDataImage = () =>{
        setIsLoading(true);
        ImageServices.getImage("laporan", image)
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
        <Pressable onPress={()=>navigation.navigate("DetailLaporan", {id: id})} style={styles.laporanItem}>
          {!isLoading ? <Image style={styles.imageLaporan} source={{uri: `data:image/png;base64,${dataImage}`}} /> : 
          <Skeleton width={100} height={56} style={{borderRadius: 5}} />
          }
          <View style={{width: 10}}></View>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '77%'}}>
              <Text style={{...FontConfig.captionUpperOne, color: Color.graySeven}}>
                {kategori.toUpperCase()}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '70%'}}>
                <View style={{height: 5, width: 5, borderRadius: 5, 
                  backgroundColor: status == 'Menunggu Konfirmasi' ? Color.goldSix : status == 'Diterima' ? Color.successMain : Color.error}}></View>
                <View style={{width: 5}}></View>
                <Text style={{...FontConfig.captionOne, color: Color.primaryText}}>{status}</Text>
              </View>
            </View>
            <View style={{height: 5}}></View>
            <View style={{width: '55%'}}><Text style={styles.textJudulLaporan} numberOfLines={2}>{judul}</Text></View>
            <View style={{height: 3}}></View>
            <Text style={styles.textTanggalLaporan}>{tanggal}</Text>
          </View>
        </Pressable>
      );
    }

    const getLaporanData = (id, page, sortby, tag, status) => {
      if(dataLaporan.length ==0 ) setIsLoading(true);
      LaporanServices.getListLaporan(id, page, sortby, tag, status)
      .then(res=> {
        console.log(res.data.data);
        setDataLaporan([...dataLaporan, ...res.data.data.data]);
        setTotalPages(res.data.data.totalPages);
        setIsLoading(false);
      })
      .catch(err=> {
        console.log(err);
      })
    }

    const getStatusDataLaporan = (id) => {
      LaporanServices.getStatusLaporan(id)
      .then(res=>{
        setMenus([`Semua (${res.data.data.total_semua})`, 
        `Menunggu konfirmasi (${res.data.data.total_diproses})`, 
        `Diterima (${res.data.data.total_diterima})`,
        `Ditolak (${res.data.data.total_ditolak})`]);
      })
      .catch(err=>{
        console.log(err);
      })
    }

    const onPressMenu = (status) => {
      setDataLaporan([]);
      setCurrentPage(1);
      setSelectedMenu(status);
    }

    const onPressFilter = (onSelectKategori, onSelectSortBy, idOnSelectKategori) => {
      setDataLaporan([]);
      setCurrentPage(1);
      setChoosenTag(onSelectKategori);
      setChoosenSortBy(onSelectSortBy);
      setIdChoosenTag(idOnSelectKategori);
      setModalVisible(false);
    }

    const onPressResetFilter = () => {
      setChoosenTag("");
      setChoosenSortBy("terbaru");
      setIdChoosenTag(0);
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
          console.log("refresh data laporan");
          getLaporanData(idJenisLaporan, currentPage, choosenSortBy,  idChoosenTag != 0 ? idChoosenTag : "", selectedMenu);
        }
        }, [])
    );

    useEffect(()=>{
      console.log("masuk use effect ganti page sama ganti status")
      getLaporanData(idJenisLaporan, currentPage, choosenSortBy,  idChoosenTag != 0 ? idChoosenTag : "", selectedMenu);
    }, [currentPage, selectedMenu])

    useFocusEffect(
      React.useCallback(() => {
        console.log("status get")
        getStatusDataLaporan(idJenisLaporan);
      }, [])
    );

    const getLaporanDataOnRefresh = (id, page, sortby, tag, status) => {
      if(dataLaporan.length ==0 ) setIsLoading(true);
      LaporanServices.getListLaporan(id, page, sortby, tag, status)
      .then(res=> {
        setDataLaporan(res.data.data.data);
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
      setDataLaporan([]);
      getLaporanDataOnRefresh(idJenisLaporan, 1, choosenSortBy,  idChoosenTag != 0 ? idChoosenTag : "", selectedMenu);
      setRefreshing(false);
    }

    useEffect(()=>{
      getLaporanData(idJenisLaporan, currentPage, choosenSortBy,  idChoosenTag != 0 ? idChoosenTag : "", selectedMenu);
    }, [choosenTag, choosenSortBy])
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      {!isLoading ? <View style={styles.container}>

        <View style={styles.rowFilter}>
          <Text style={styles.textRiwayat}>Riwayat Laporan</Text>
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
        style={{height: '78%'}}
        renderItem={({item}) => <LaporanItem image={item.cover_laporan[0]} judul={item.judul} 
        kategori={item.tag} status={item.status} tanggal={item.waktu_dibuat} id={item.id_laporan} />
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
        padding: 20,
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
      paddingVertical: 20
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
      width: '85%'
    },
    textTanggalLaporan: {
      ...FontConfig.captionUpperOne,
      color: Color.graySeven
    },
})