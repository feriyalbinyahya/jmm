import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontConfig } from '../../../theme'
import IconVoucher from '../../../assets/images/icon/icon_voucher.png'
import IconLock from '../../../assets/images/icon/icon_lock.png'
import IconPoin from '../../../assets/images/icon/icon_poin.png'
import { Box } from 'native-base'
import { rankPoin } from '../../../utils/const'
import VoucherServices from '../../../services/voucher'
import { useFocusEffect } from '@react-navigation/native'
import IconVoucherGrey from '../../../assets/images/icon/icon_voucher_grey.png'

const TukarPoinView = ({route}) => {
  const {navigation, infoPoin} = route.params;
  const [dataVoucher, setDataVoucher] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [infoPoinku, setInfoPoinku] = useState(infoPoin.poin_total)

  const getDataVoucher = (page) =>{
    if(dataVoucher.length ==0 ) setIsLoading(true);
    VoucherServices.getAllVoucher(page)
    .then(res=>{
      console.log(res.data.data);
      setDataVoucher([...dataVoucher, ...res.data.data.data.data_voucher]);
      setInfoPoinku(res.data.data.data.poin_saat_ini);
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

  const getVoucherDataOnRefresh = (page) => {
    setIsLoading(true);
    VoucherServices.getAllVoucher(page)
    .then(res=> {
      console.log(res.data.data);
      setDataVoucher(res.data.data.data.data_voucher);
      setInfoPoinku(res.data.data.data.poin_saat_ini);
      setTotalPages(res.data.data.totalPages);
      setIsLoading(false);
    })
    .catch(err=> {
      console.log(err);
    })
  }

  const onRefresh =  () => {
    console.log('referes');
    setRefreshing(true);
    setCurrentPage(1);
    setDataVoucher([]);
    getVoucherDataOnRefresh(1);
    setRefreshing(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log("here we go")
      if(dataVoucher.length != 0){
        setCurrentPage(1);
        setDataVoucher([]);
        getVoucherDataOnRefresh(1);
      }
      }, [])
  );

  useEffect(()=>{
    getDataVoucher(currentPage);
  }, [currentPage])

  const VoucherItem = ({judul, kategori, poin, id}) => {
    return (
      <Box shadow={0} style={{paddingHorizontal: 10, paddingVertical: 15, backgroundColor: Color.neutralZeroOne,
      borderRadius: 8, marginVertical: 5}}>
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
          <View style={{width: 8}}></View>
          <Pressable onPress={()=>navigation.navigate("DetailTukarPoin", {id: id, poinku: infoPoinku, jenis: 'tukar'})} style={{borderRadius: 24, alignSelf: 'baseline', borderWidth: 1,
        borderColor: Color.primaryMain, paddingHorizontal: 8, paddingVertical: 2}}>
            <Text style={{...FontConfig.captionTwo, color: Color.primaryMain}}>Tukarkan</Text>
          </Pressable>
        </View>
      </Box>
    )
  }

  const titleLock = "Yah, belum bisa tukarkan poinmu";
  const descLock = "Tunggu sampai voucher tersedia ya.";
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, padding: 20}}>
      <Text style={{...FontConfig.titleThree, color: Color.title}}>Voucher Tersedia</Text>
      <View style={{height: 10}}></View>
      {infoPoin.badge != rankPoin.no_member ? !isLoading ? dataVoucher.length != 0 ?
      <FlatList
        data={dataVoucher}
        ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        style={{height: '78%'}}
        renderItem={({item})=>{
          return <VoucherItem id={item.id_voucher} judul={item.nama_voucher} kategori={item.nama_kategori} poin={item.harga_voucher} />
        }}
       /> : 
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
      :
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Image style={{width: 41, height: 41}} source={IconLock} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.buttonOne, color: Color.neutralZeroSeven, textAlign: 'center'}}>{titleLock}</Text>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, textAlign: 'center',
      width: '90%'}}>{descLock}</Text>
      </View>
      }
    </View>
  )
}

export default TukarPoinView

const styles = StyleSheet.create({})