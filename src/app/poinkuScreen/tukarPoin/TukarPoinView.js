import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontConfig } from '../../../theme'
import IconVoucher from '../../../assets/images/icon/icon_voucher.png'
import IconLock from '../../../assets/images/icon/icon_lock.png'
import IconPoin from '../../../assets/images/icon/icon_poin.png'
import { Box } from 'native-base'
import { rankPoin } from '../../../utils/const'
import VoucherServices from '../../../services/voucher'

const TukarPoinView = ({route}) => {
  const {navigation, infoPoin} = route.params;
  const [dataVoucher, setDataVoucher] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const getDataVoucher = () =>{
    VoucherServices.getAllVoucher()
    .then(res=>{
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err.response);
    })
  }

  useEffect(()=>{
    getDataVoucher();
  }, [])

  const VoucherItem = ({judul, kategori, poin}) => {
    return (
      <Box shadow={2} style={{paddingHorizontal: 10, paddingVertical: 15, backgroundColor: Color.neutralZeroOne,
      borderRadius: 8}}>
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
          <Pressable onPress={()=>navigation.navigate("DetailTukarPoin")} style={{borderRadius: 24, alignSelf: 'baseline', borderWidth: 1,
        borderColor: Color.primaryMain, paddingHorizontal: 8, paddingVertical: 2}}>
            <Text style={{...FontConfig.captionTwo, color: Color.primaryMain}}>Tukarkan</Text>
          </Pressable>
        </View>
      </Box>
    )
  }

  const titleLock = "Yah, Penukaran poinku masih terkunci";
  const descLock = "Yuk Sat Set ajak kawanmu, selesaikan misi, dan isi survei agar naik ke bronze untuk nikmatin reward yang tersedia.";
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, padding: 20}}>
      <Text style={{...FontConfig.titleThree, color: Color.title}}>Voucher Tersedia</Text>
      <View style={{height: 10}}></View>
      {infoPoin.badge != rankPoin.no_member ?<VoucherItem judul={`Saldo OVO 1.500`} kategori={`E-Wallet`} poin={100} /> :
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