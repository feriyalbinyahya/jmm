import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'
import IconMisi from '../../assets/images/icon/icon_misi.png';
import { Box } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';

const CardWhite = ({ judul, status, expired_date, kategori, id, navigation, publish_date, is_important, deskripsi}) => {
  return (
    <Box shadow={0} style={styles.cardContainer}>
        <View style={{borderRadius: 6, height: '100%', backgroundColor: Color.neutralZeroOne}}>
            <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between',}}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{width: 40, height: 40}} source={IconMisi} />
                    <View style={{width: 15}}></View>
                    <View style={{width: '80%'}}>
                        <Text style={{...FontConfig.captionUpperOne, color: Color.primaryMain}}>MISI</Text>
                        <View style={{height: 5}}></View>
                        <Text numberOfLines={2} style={{...FontConfig.titleThree, color: Color.neutralTen, width: '80%'}}>{judul}</Text>
                        <View style={{height: 5}}></View>
                        <View style={{paddingHorizontal: 10, paddingVertical: 2, borderWidth: 1,
                        borderRadius: 12, alignSelf: 'baseline', marginBottom: 5}}>
                            <Text style={{...FontConfig.captionOne, color: Color.primaryMain}}>{kategori}</Text>
                        </View>
                        <Text style={{...FontConfig.captionOne, color: Color.neutralZeroSeven}}>Batas waktu:</Text>
                        <Text style={{...FontConfig.titleFive, color: Color.danger}}>{expired_date}</Text>
                    </View>
                </View>
                <View style={{width: 14}}></View>
            </View>
            <View style={{alignItems: 'flex-end', paddingHorizontal: 10, paddingBottom: 10}}>
                <Pressable onPress={()=>navigation.navigate("StartMisi", {id: id, judul: judul, deskripsi: deskripsi ,
                    startDate: publish_date, deadlineDate: expired_date, is_important: is_important, kategori: kategori})}>
                    <Text style={{...FontConfig.buttonZeroTwo, color:Color.primaryMain}}>{status == "Misi Aktif" ? `Mulai Misi`
                        : status == "Belum Selesai" ? `Lanjutkan Misi` : `Lihat Misi`}</Text>
                </Pressable>
            </View>
        </View>
    </Box>
  )
}

export default CardWhite

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        marginVertical: 5,
        borderRadius: 6,
        backgroundColor: Color.neutralZeroOne,
        
    },
})