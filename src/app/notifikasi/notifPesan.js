import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable, RefreshControl, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { height } from '../../assets/constants'
import { Color, FontConfig } from '../../theme';
import NotifItem from '../../components/notifItem';
import NotifikasiServices from '../../services/notifikasi';
import IconEmpty from '../../assets/images/warning/empty2.png'

const NotifikasiPesan = ({terpilih, setTerpilih, allChecked=false, setAllChecked, setJumlah, onPressNotif}) => {
    const [dataPesan, setDataPesan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const renderLoader = () => {
        return(
          <View style={styles.loaderStyle}>
              <ActivityIndicator size="small" color={Color.graySeven} />
          </View>
        );
    }

    const getPesanDataOnRefresh = (page) => {
        if(dataPesan.length ==0 ) setIsLoading(true);
        NotifikasiServices.getNotifikasi("pesan", page)
        .then(res=> {
          setDataPesan(res.data.data.data);
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
        setDataPesan([]);
        setRefreshing(true);
        getPesanDataOnRefresh(1);
        setRefreshing(false);
    }

    const getDataPesan = () => {
        if(dataPesan.length ==0 ) setIsLoading(true);
        NotifikasiServices.getNotifikasi("pesan", currentPage)
        .then(res=>{
            console.log(res.data.data.data);
            setDataPesan([...dataPesan, ...res.data.data.data]);
            setJumlah(res.data.data.totalItems);
            setTotalPages(res.data.data.totalPages);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
            setIsLoading(false);
        })
    }

    const loadMoreItem = () => {
        if(currentPage < parseInt(totalPages)){
          setCurrentPage(currentPage + 1);
        }
    }

    useEffect(()=>{
        getDataPesan();
    },[currentPage])

  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        {!isLoading ? dataPesan.length != 0 ?<FlatList
            data={dataPesan}
            ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
            onEndReached={loadMoreItem}
            refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
            onEndReachedThreshold={0} 
            renderItem={({item}) => <NotifItem onPressNotif={onPressNotif} setAllChecked={setAllChecked} allChecked={allChecked} item={item} terpilih={terpilih} setTerpilih={setTerpilih} />}
            //ListFooterComponent={renderLoader}
            style={styles.flatlistStyle}
        /> : 
        <View style={{alignItems: 'center', paddingVertical: '50%'}}>
            <Image style={{width: 120, height: 88}} source={IconEmpty} />
            <View style={{height: 20}}></View>
            <Text style={{...FontConfig.titleTwo, color: Color.title}}>Yah, Belum ada pesan nih</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText}}>Jika ada pesan akan tertampil disini</Text>
        </View>
         : 
        <View style={{height: '60%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.neutralTen} /></View>
        }
    </View>
  )
}

export default NotifikasiPesan

const styles = StyleSheet.create({
    flatlistStyle: {
        height: height/1.5,
    },
    notifContainer: {
        padding: 20,
        borderColor: Color.lightBorder,
        borderWidth: 0.5,
        backgroundColor: Color.grayTwo
    },
    boxType: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: Color.redOne,
        borderColor: Color.primaryMain,
        borderWidth: 1,
        alignSelf: 'baseline',
        alignItems: 'center'
    },
    textTitle: {
        ...FontConfig.titleThree,
        color: '#000000'
    },
    textType: {
        ...FontConfig.captionOne,
        color: Color.primaryMain
    },
    textDeskripsi: {
        ...FontConfig.bodyThree,
        color: Color.primaryText
    },
    loaderStyle: {
        marginVertical: 8
    }
})