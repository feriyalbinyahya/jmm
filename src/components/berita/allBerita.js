import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderWhite from '../header/headerWhite'
import SearchBar from '../searchBar'
import ScrollMenuButton from '../scrollMenu'
import IconLike from '../../assets/images/icon/icon_like.png'
import IconSeen from '../../assets/images/icon/icon_seen.png'
import IconComment from '../../assets/images/icon/icon_comment.png'
import IconCalendar from '../../assets/images/icon/icon_calendar.png'
import BeritaServices from '../../services/berita'
import ImageExample from '../../assets/images/example/laporan.png'
import { useSelector } from 'react-redux'
import IconBerita from '../../assets/images/icon/berita.png'
import { Button } from 'native-base'
import { width } from '../../assets/constants'
import ImageServices from '../../services/getImage'
import Skeleton from '../skeleton'
import ImageEmpty from '../../assets/images/warning/empty.png'

const AllBeritaContainer = ({navigation, title}) => {
  const [selectedMenuBerita, setSelectedMenuBerita] = useState("Terbaru");
  const [idSelectedMenu, setIdSelectedMenu] = useState(0);
  const [search, setSearch] = useState("");

  const [menus, setMenus] = useState([]);
  const [idMenu, setIdMenu] = useState([]);

  const [dataBerita, setDataBerita] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onPressMenu = (filter) => {
    setDataBerita([]);
    setCurrentPage(1);
    setIdSelectedMenu(filter);
  }

  handlePressBerita = (id) => {
    navigation.navigate("BeritaDetail", {id: id});
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setDataBerita([]);
    setCurrentPage(1);
    if(title == 'Berita Terkini'){
      getBeritaTerkiniOnRefresh()
    }else if(title == 'Berita Daerah'){
      getBeritaOrganisasiOnRefresh();
    }
    setRefreshing(false);
  }, [refreshing]);

  getBeritaTerkiniOnRefresh = () => {
    setIsLoading(true);
    BeritaServices.getAllTerkini(1, "terbaru", selectedMenuBerita == "Terbaru" ? "" : idSelectedMenu, search)
    .then(res=>{
      setTotalPages(res.data.data.totalPages);
      setDataBerita(res.data.data.data);
      setIsLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setIsLoading(false);
    })
  }

  getBeritaOrganisasiOnRefresh = () => {
    setIsLoading(true);
    BeritaServices.getAllOrganisasi(1, "terbaru", selectedMenuBerita == "Terbaru" ? "" : idSelectedMenu, search)
    .then(res=>{
      setTotalPages(res.data.data.totalPages);
      setDataBerita(res.data.data.data);
      setIsLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setIsLoading(false);
    })
  }


  getAllBeritaTerkini = () => {
    if(dataBerita.length == 0) setIsLoading(true);
    BeritaServices.getAllTerkini(currentPage, "terbaru", selectedMenuBerita == "Terbaru" ? "" : idSelectedMenu, search)
    .then(res=>{
      
      setTotalPages(res.data.data.totalPages);
      setDataBerita([...dataBerita, ...res.data.data.data]);
      setIsLoading(false);
    })
    .catch(err=>{
      console.log(err.response.data.message);
      setIsLoading(false);
    })
  }

  getAllBeritaOrganisasi = () => {
    if(dataBerita.length == 0) setIsLoading(true);
    BeritaServices.getAllOrganisasi(currentPage, "terbaru", selectedMenuBerita == "Terbaru" ? "" : idSelectedMenu, search)
    .then(res=>{
      setTotalPages(res.data.data.totalPages);
      console.log(res.data.data.data);
      setDataBerita([...dataBerita, ...res.data.data.data]);
      setIsLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setIsLoading(false);
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

  const getFilterTagBerita = (type) => {
    BeritaServices.getFilterBerita(type)
    .then(res=>{
      let temp = ["Terbaru"];
      for(var i=0; i<res.data.data.length; i++){
        temp.push(res.data.data[i].tag);
      }
      console.log(temp);
      setMenus(temp);
      
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const getKategoriBerita = (type) => {
    BeritaServices.getKategori(type)
    .then(res=>{
      let temp = ["Terbaru"];
      let tempId = [0];
      for(var i=0; i<res.data.data.length; i++){
        temp.push(res.data.data[i].kategori);
        tempId.push(res.data.data[i].id_berita_kategori);
      }
      setMenus(temp);
      setIdMenu(tempId);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const handleSearch = () => {
    if(title == 'Berita Terkini'){
      getBeritaTerkiniOnRefresh();
    }else if(title == 'Berita Daerah'){
      getBeritaOrganisasiOnRefresh();
    }
  }

  useEffect(()=> {
    if(title == 'Berita Terkini'){
      getAllBeritaTerkini();
    }else if(title == 'Berita Daerah'){
      getAllBeritaOrganisasi();
    }
  }, [currentPage, selectedMenuBerita])

  useEffect(()=>{
    if(title == 'Berita Terkini'){
      getKategoriBerita("terkini");
    }else if(title == 'Berita Daerah'){
      getKategoriBerita("organisasi");
    }
  }, [])

  useEffect(()=> {
    handleSearch();
  }, [search])

  const InfoLaporan =  ({text, icon}) => (
    <View style={styles.rowInfo}>
      <Image source={icon} style={styles.iconInfo} />
      <Text style={styles.textInfo}>{text}</Text>
    </View>
  );

  const LaporanItem = ({image, judul, kategori, tanggal, likes, comments, seen, onPress}) => {
    const [dataImage, setDataImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

      const getDataImage = () =>{
        setIsLoading(true);
        ImageServices.getImage("berita", image)
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
    <Pressable onPress={onPress} style={styles.laporanItem}>
      {!isLoading ? <Image style={styles.imageLaporan} source={{uri: `data:image/png;base64,${dataImage}`}} /> : 
      <Skeleton width={98} height={80} style={{borderRadius: 4}} />
      }
      <View style={{width: 10}}></View>
      <View style={{width: '80%'}}>
        <View>
          <Text style={{...FontConfig.captionUpperOne, color: Color.primaryMain}}>
            {kategori.toUpperCase()}</Text>
        </View>
        <View style={{height: 5}}></View>
        <Text style={styles.textJudulLaporan}>{judul}</Text>
        <View style={{height: 3}}></View>
        <View style={styles.infoBerita}>
          <InfoLaporan text={tanggal} icon={IconCalendar} />
          <InfoLaporan text={comments} icon={IconComment} />
          <InfoLaporan text={likes} icon={IconLike} />
          <InfoLaporan text={seen >= 1000 ? `${parseFloat(seen % 1000 == 0 ? seen/1000 : parseFloat(seen/1000).toFixed(1))}K` : seen} icon={IconSeen} />
        </View>
      </View>
    </Pressable>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite navigation={navigation} title={title} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
        <SearchBar width='100%' search={search} setSearch={setSearch} deleted={true} text="berita" />
        {/**<Button onPress={()=>{
          onPressMenu("");
          handleSearch();}} style={{marginRight: 20,
           height: '50%', backgroundColor: Color.primaryMain,
          width: 80, borderRadius: 20}}>Cari</Button> */}
      </View>
      <View style={styles.container}>
        <ScrollMenuButton onPressMenu={onPressMenu} keyMenu={idMenu} data={menus} value={selectedMenuBerita == "" ? "Terbaru" : selectedMenuBerita} setValue={setSelectedMenuBerita} />
      </View>
      {
        isLoading ? <ActivityIndicator style={{marginVertical: 100}} size="large" color={Color.graySix} /> :
        dataBerita.length != 0 ?
        <FlatList
          data={dataBerita}
          ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
          renderItem={({item}) => <LaporanItem onPress={()=>handlePressBerita(item.id_berita)} image={item.cover_berita} judul={item.judul} 
          kategori={item.kategori} likes={item.jumlah_like} tanggal={item.tanggal} comments={item.jumlah_komen} seen={item.jumlah_dilihat} />}
        /> : 
        <View style={{alignItems: 'center', padding: 20, justifyContent: 'center', height: '50%'}}>
            <Image source={ImageEmpty} style={{width: 123, height: 90}} />
            <View style={{height: 15}}></View>
            <Text style={{...FontConfig.titleTwo, color: Color.title}}>Yah, Pencarian tidak ditemukan</Text>
            <View style={{height: 5}}></View>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Pastikan kata yang kamu masukkan sesuai.</Text>
        </View>
      }
    </View>
  )
}

export default AllBeritaContainer

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  laporanItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: Color.lightBorder,
    borderBottomWidth: 0.5,
  },
  rowInfo: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center'
  },
  textInfo: {
    ...FontConfig.captionUpperOne,
    color: Color.graySeven,
    marginLeft: 3
  },
  imageLaporan: {
    width: 98,
    height: 80
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
  infoBerita: {
    flexDirection: 'row', 
  },
  iconInfo: {
    width: 12,
    height: 12
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center'
  }
  
})