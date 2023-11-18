import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../../theme'
import IconVoucher from '../../../assets/images/icon/icon_voucher.png'
import IconPoin from '../../../assets/images/icon/icon_poin.png'
import { Box } from 'native-base'

const TukarPoinView = ({navigation}) => {

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
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, padding: 20}}>
      <Text style={{...FontConfig.titleThree, color: Color.title}}>Voucher Tersedia</Text>
      <View style={{height: 10}}></View>
      <VoucherItem judul={`Saldo OVO 1.500`} kategori={`E-Wallet`} poin={100} />
    </View>
  )
}

export default TukarPoinView

const styles = StyleSheet.create({})