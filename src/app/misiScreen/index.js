import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderWhite from '../../components/header/headerWhite'
import { Color, FontConfig } from '../../theme'
import { Box } from 'native-base'
import IconMisi from '../../assets/images/icon/icon_misi.png';
import IconMisiPenting from '../../assets/images/icon/icon_misi_penting.png';
import IconPin from '../../assets/images/icon/icon_pin.png'
import IconNoMisi from '../../assets/images/warning/nomisi.png'
import MisiServices from '../../services/misi'
import ScrollMenuButton from '../../components/scrollMenu'
import { useFocusEffect } from '@react-navigation/native'

const ListMisiScreen = ({navigation}) => {
    const [dataMisi, setDataMisi] = useState([]);
    const key = ["Misi Aktif", "Belum Selesai", "Terkirim", "Diterima", "Ditolak"];
    const [menus, setMenus] = useState([`Misi Aktif (0)`, `Belum Selesai (0)`, `Terkirim (0)`,
    `Diterima (0)`, `Ditolak (0)`]);
    const [selectedMenu, setSelectedMenu] = useState("Misi Aktif");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const getStatusDataMisi = () => {
        let misiaktif;
        let belumselesai;
        let terverifikasi;
        let ditolak;
        let terkirim;
        MisiServices.getStatusMisi()
        .then(res=>{
            console.log(res.data.data);
            for(var i=0; i<res.data.data.length; i++){
                if(res.data.data[i].status == "Belum Selesai"){
                    belumselesai = res.data.data[i].total;
                }else if(res.data.data[i].status == "Terkirim"){
                    terkirim = res.data.data[i].total;
                }else if(res.data.data[i].status == "Diterima"){
                    terverifikasi = res.data.data[i].total;
                }else if(res.data.data[i].status == "Ditolak"){
                    ditolak = res.data.data[i].total;
                }else{
                    misiaktif = res.data.data[i].total;
                }
            }
            setMenus([`Misi Aktif (${misiaktif})`, 
            `Belum Selesai (${belumselesai})`, 
            `Terkirim (${terkirim})`,
            `Diterima (${terverifikasi})`, `Ditolak (${ditolak})`]);
        })
        .catch(err=>{
          console.log(err);
        })
    }

    const MisiItem = ({is_important, judul, expired_date, id, deskripsi, publish_date, kategori, is_expired}) => {
        return (
            <Box shadow={3} style={!is_important ? styles.cardContainer : styles.cardContainerPenting}>
                <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{width: 40, height: 40}} source={is_important ? IconMisiPenting : IconMisi} />
                        <View style={{width: 15}}></View>
                        <View style={{width: '73%'}}>
                            <Text style={{...FontConfig.captionUpperOne, color: Color.primaryMain}}>MISI</Text>
                            <View style={{height: 5}}></View>
                            <Text style={{...FontConfig.titleThree, color: Color.neutralTen}}>{judul}</Text>
                            <View style={{height: 5}}></View>
                            <View style={{paddingHorizontal: 10, paddingVertical: 2, borderWidth: 1,
                            borderRadius: 12, alignSelf: 'baseline', marginBottom: 5}}>
                                <Text style={{...FontConfig.captionOne, color: Color.primaryMain}}>{kategori}</Text>
                            </View>
                            <Text style={{...FontConfig.captionOne, color: Color.neutralZeroSeven}}>Batas waktu:</Text>
                            {(selectedMenu == "Terkirim" || selectedMenu == "Diterima" || selectedMenu == "Ditolak") && is_expired ? 
                            <Text style={{...FontConfig.titleThree, color: Color.graySeven}}>{`${expired_date} (Telah Selesai)`}</Text> : 
                            <Text style={{...FontConfig.titleThree, color: Color.danger}}>{expired_date}</Text>
                            }
                        </View>
                    </View>
                    {is_important ? <Image style={{width: 14, height: 14}} source={IconPin} /> : 
                    <View style={{width: 14}}></View>}
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <Pressable onPress={()=>navigation.navigate("StartMisi", {id: id, judul: judul, deskripsi: deskripsi ,
                    startDate: publish_date, deadlineDate: expired_date, is_important: is_important, kategori: kategori})}>
                        <Text style={{...FontConfig.buttonZeroTwo, color:Color.primaryMain}}>{selectedMenu == "Misi Aktif" ? `Mulai Misi`
                        : selectedMenu == "Belum Selesai" ? `Lanjutkan Misi` : `Lihat Misi`}</Text>
                    </Pressable>
                </View>
                <View style={{height: 10}}></View>
            </Box>
        )
    }

    const onPressMenu = (status) => {
        setDataMisi([]);
        setCurrentPage(1);
        setSelectedMenu(status);
      }

    const getDataMisi = (status, page) => {
        if(dataMisi.length ==0 ) setIsLoading(true);
        MisiServices.getMisi(status, page)
        .then(res=>{
            console.log(res.data.data.data);
            setDataMisi([...dataMisi, ...res.data.data.data]);
            setTotalPages(res.data.data.totalPages);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response.message);
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

    const getMisiDataOnRefresh = (status, page) => {
        if(dataMisi.length ==0 ) setIsLoading(true);
        MisiServices.getMisi(status, page)
        .then(res=> {
          setDataMisi(res.data.data.data);
          setTotalPages(res.data.data.totalPages);
          setIsLoading(false);
        })
        .catch(err=> {
          console.log(err);
          setIsLoading(false);
        })
    }

    const onRefresh =  () => {
        setCurrentPage(1);
        setDataMisi([]);
        setRefreshing(true);
        getStatusDataMisi();
        getMisiDataOnRefresh(selectedMenu == "Misi Aktif"? "" : selectedMenu == "Belum Selesai" ? "1" : 
        selectedMenu == "Terkirim" ? "2" : selectedMenu == "Diterima" ? "3" : "4", 1);
        setRefreshing(false);
    }

    useFocusEffect(
        React.useCallback(() => {
          getStatusDataMisi();
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
          if(dataMisi.length != 0){
            getDataMisi(selectedMenu == "Misi Aktif"? "" : selectedMenu == "Belum Selesai" ? "1" : 
            selectedMenu == "Terkirim" ? "2" : selectedMenu == "Diterima" ? "3" : "4", currentPage);
          }
          }, [])
      );

    useEffect(()=>{
        getDataMisi(selectedMenu == "Misi Aktif"? "" : selectedMenu == "Belum Selesai" ? "1" : 
        selectedMenu == "Terkirim" ? "2" : selectedMenu == "Diterima" ? "3" : "4", currentPage);
    },[selectedMenu, currentPage])

  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        <HeaderWhite navigation={navigation} title="Misi-mu" />
        <View style={{padding: 10}}>
            <ScrollMenuButton onPressMenu={onPressMenu} keyMenu={key} data={menus} value={selectedMenu} setValue={setSelectedMenu} />
        </View>
        {!isLoading ? dataMisi.length != 0 ? <FlatList 
        data={dataMisi}
        ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item})=><MisiItem kategori={item.kategori[0].nama_kategori} is_important={item.tingkat_kepentingan == "Sangat Penting" ? true : false}
         expired_date={item.batas_waktu} publish_date={item.tanggal_publish} deskripsi={item.deskripsi}
        judul={item.judul} id={item.id_misi} is_expired={item.is_expired} />}
        /> : 
        <View style={{alignItems: 'center', height: '70%', justifyContent:'center'}}>
            <Image source={IconNoMisi} style={{width: 74, height: 54}} />
            <View style={{height: 15}}></View>
            <Text style={{...FontConfig.titleTwo, color: Color.hitam}}>{selectedMenu == " Misi Aktif" ?  `Belum ada misi yang Aktif` : `Belum ada misi yang ${selectedMenu}`}</Text>
            <View style={{height: 3}}></View>
            {selectedMenu == "Misi Aktif" ? <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Tunggu yaa, misi akan segera ditampilkan</Text> : 
            selectedMenu == "Belum Selesai" ? <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Yuk segera selesaikan misi pertamamu</Text> :
            selectedMenu == "Terkirim" ? <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Yuk segera buat dan kirim misimu</Text> :
            selectedMenu == "Diterima" ? <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Yuk, segera kirimkan atau perbaiki misimu</Text> : 
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Yeey, kamu tidak memiliki misi yang ditolak</Text>
            }
        </View> : 
        <View style={{height: '60%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.neutralTen} /></View>
        }
    </View>
  )
}

export default ListMisiScreen

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne,
        alignSelf: 'baseline',
        padding: 10,
    },
    cardContainerPenting: {
        marginHorizontal: 8,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne,
        alignSelf: 'baseline',
        padding: 10,
        borderWidth: 1,
        borderColor: Color.purple
    },
})