import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontConfig } from '../../../theme'
import IconVoucher from '../../../assets/images/icon/icon_voucher.png'
import IconVoucherGrey from '../../../assets/images/icon/icon_voucher_grey.png'
import IconPoin from '../../../assets/images/icon/icon_poin.png'
import { Box } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

const RiwayatTukarPoinView = ({route}) => {
    const {navigation, infoPoin} = route.params;
    const [dataRiwayat, setDataRiwayat] = useState([]);

  const VoucherItem = ({judul, kategori, poin}) => {
    return (
      <Box shadow={2} style={{ backgroundColor: Color.neutralZeroOne,
      borderRadius: 8}}>
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
                <Pressable onPress={()=>navigation.navigate("DetailTukarPoin")} style={{borderRadius: 24, alignSelf: 'baseline',
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
      {dataRiwayat != 0 ? <VoucherItem judul={`Saldo OVO 1.500`} kategori={`E-Wallet`} poin={100} /> : 
        <View style={{alignItems: 'center', marginVertical: 20}}>
            <Image style={{width: 41, height: 41}} source={IconVoucherGrey} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.buttonOne, color: Color.neutralZeroSeven, textAlign: 'center'}}>{titleLock}</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, textAlign: 'center',
            width: '90%'}}>{descLock}</Text>
        </View>
      }
    </View>
  )
}

export default RiwayatTukarPoinView

const styles = StyleSheet.create({})