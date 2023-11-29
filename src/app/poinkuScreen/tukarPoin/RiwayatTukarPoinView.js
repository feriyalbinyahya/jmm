import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontConfig } from '../../../theme'
import IconVoucher from '../../../assets/images/icon/icon_voucher.png'
import IconVoucherGrey from '../../../assets/images/icon/icon_voucher_grey.png'
import IconPoin from '../../../assets/images/icon/icon_poin.png'
import { Box } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import VoucherServices from '../../../services/voucher'
import { useFocusEffect } from '@react-navigation/native'

const RiwayatTukarPoinView = ({route}) => {
    const {navigation, infoPoin} = route.params;
    const [dataRiwayatVoucher, setDataRiwayatVoucher] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const getDataRiwayatVoucher = (page) =>{
      if(dataRiwayatVoucher.length ==0 ) setIsLoading(true);
      VoucherServices.getAllRiwayatVoucher(page)
      .then(res=>{
        console.log(res.data.data);
        setDataRiwayatVoucher([...dataRiwayatVoucher, ...res.data.data.data]);
        setTotalPages(res.data.data.totalPages);
        setIsLoading(false);
      })
      .catch(err=>{
        console.log(err.response);
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
  
    const getRiwayatVoucherDataOnRefresh = (page) => {
      setIsLoading(true);
      VoucherServices.getAllRiwayatVoucher(page)
      .then(res=> {
        setDataRiwayatVoucher(res.data.data.data);
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
      setDataRiwayatVoucher([]);
      getRiwayatVoucherDataOnRefresh(1);
      setRefreshing(false);
    }

  
    useEffect(()=>{
      getDataRiwayatVoucher(currentPage);
    }, [currentPage])

  const VoucherItem = ({judul, kategori, poin, id}) => {
    return (
      <Box shadow={0} style={{ backgroundColor: Color.neutralZeroOne,
      borderRadius: 8, marginVertical: 5}}>
        <LinearGradient style={{borderColor: Color.purple, paddingHorizontal: 10, paddingVertical: 15,}} start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#FFFFFF', Color.purpleSurface]}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Image source={IconVoucher} style={{width: 36, height: 36}} />
                <View style={{width: 10}}></View>
                <View>
                    <Text style={{...FontConfig.captionTwo, color: Color.purple}}>{kategori}</Text>
                    <Text style={{...FontConfig.titleThree, color: Color.neutralTen}}>{judul}</Text>
                </View>
            </View>
            <View style={{height: 15}}></View>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-end'}}>
                <Image source={IconPoin} style={{width: 13.99, height: 14}} />
                <View style={{width: 5}}></View>
                <Text style={{...FontConfig.titleFour, color: Color.warning}}>{`${poin} Poinku`}</Text>
                <View style={{width: 10}}></View>
                <Pressable onPress={()=>navigation.navigate("DetailTukarPoin", {id: id, poinku: infoPoin.poin_total, jenis: 'riwayat'})} style={{borderRadius: 24, alignSelf: 'baseline',
                 paddingHorizontal: 15, paddingVertical: 4, backgroundColor: Color.primaryMain}}>
                    <Text style={{...FontConfig.captionTwo, color: Color.neutralZeroOne}}>Lihat Detail</Text>
                </Pressable>
            </View>
        </LinearGradient>
      </Box>
    )
  }
  const titleLock = "Voucherku Tidak Ditemukan";
  const descLock = "Yuk Sat Set kumpulkan poin dan tukarkan dengan reward menarik.";
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, padding: 20}}>
      <Text style={{...FontConfig.titleThree, color: Color.title}}>Voucherku</Text>
      <View style={{height: 10}}></View>
      {!isLoading ? dataRiwayatVoucher.length != 0 ?
      <FlatList
      data={dataRiwayatVoucher}
      ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      style={{height: '78%'}}
      renderItem={({item})=>{
        return <VoucherItem id={item.id} judul={item.nama_voucher} kategori={item.nama_kategori} poin={item.harga_voucher} />
      }}
     /> 
       : 
        <View style={{alignItems: 'center', marginVertical: 20}}>
            <Image style={{width: 41, height: 41}} source={IconVoucherGrey} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.buttonOne, color: Color.neutralZeroSeven, textAlign: 'center'}}>{titleLock}</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, textAlign: 'center',
            width: '90%'}}>{descLock}</Text>
        </View>

        :
        <View style={{height: '100%', backgroundColor: Color.neutralZeroOne}}>
        <ActivityIndicator style={{marginTop: '50%'}} size="large" color={Color.primaryMain} />
        </View>
      }
    </View>
  )
}

export default RiwayatTukarPoinView

const styles = StyleSheet.create({})