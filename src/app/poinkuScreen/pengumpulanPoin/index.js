import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhiteNoBorder from '../../../components/header/headerWhiteNoBorder'
import CustomBottomSheet from '../../../components/bottomSheet'
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconSurvei from '../../../assets/images/icon/icon_survei.png';
import IconMisi from '../../../assets/images/icon/icon_misi_penting.png';
import IconKawan from '../../../assets/images/icon/icon_kawan.png';
import IconRiwayat from '../../../assets/images/icon/icon_riwayat.png';

const RiwayatPengumpulanPoinScreen = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const kategori = "Misi";
    const namaKategori = "PENYELESAIAN MISI";
    const poin = "100";
    const judul = "Survei Kepuasan Kinerja Ganjar Pranowo 2022";
    const tanggal = "Jum, 21 Jul 2023";
    const [dataRiwayat, setDataRiwayat] = useState([]);
    const FilterPengumpulanPoin = ({}) => {
        return(
            <View>

            </View>
        )
    }

    const PengumpulanPoinItem = ({kategori, namaKategori, judul, tanggal, poin}) => {
        return(
            <View style={{flexDirection: 'row', backgroundColor: Color.neutralZeroTwo,
            borderRadius: 8, paddingHorizontal: 10, paddingVertical: 16, marginVertical: 5}}>
                <Image style={{width: 40, height: 40}} source={kategori == "Misi" ? IconMisi : kategori == "Survei" ? IconSurvei : IconKawan} />
                <View style={{width: 5}}></View>
                <View style={{width: '85%'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{...FontConfig.captionUpperOne, color: kategori == "Misi" ? Color.purple : 
                    kategori == "Survei" ? Color.blue : Color.pink}}>{namaKategori}</Text>
                        <Text style={{...FontConfig.titleFive, color: Color.warning}}>{`+ ${poin} Poin`}</Text>
                    </View>
                    <Text style={{...FontConfig.titleFour, color: Color.neutralTen, marginVertical: 3}}>{judul}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="calendar-outline" size={18} color={Color.neutralZeroSeven} />
                        <View style={{width: 3}}></View>
                        <Text style={{...FontConfig.captionTwo, marginTop: 2, color: Color.neutralTen}}>{tanggal}</Text>
                    </View>
                </View>
            </View>
        )
    }
    const titleLock = "Kamu belum memiliki riwayat";
    const descLock = "Yuk Sat Set ajak kawanmu, selesaikan misi, dan isi survei agar dapat poin";
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet children={<FilterPengumpulanPoin />} 
      isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
      title="Filter" />
      <HeaderWhiteNoBorder navigation={navigation} title={`Pengumpulan Poin`} />
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{...FontConfig.titleThree, color: Color.title}}>Riwayat Pengumpulan Poin</Text>
            {dataRiwayat != 0 ? <Pressable onPress={()=>setModalVisible(true)} 
            style={{...styles.buttonFilter, backgroundColor:  Color.neutralZeroOne}}>
                <Text style={{...FontConfig.bodyThree, color: Color.neutralTen}}>Filter</Text>
                <View style={{width: 3}}></View>
                <Ionicons name="filter" color={Color.neutralTen} size={14} />
            </Pressable> : <></>}
        </View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        {dataRiwayat!= 0 ? <><PengumpulanPoinItem judul={judul} namaKategori={namaKategori} poin={poin} tanggal={tanggal} kategori={kategori} />
        <PengumpulanPoinItem judul={judul} namaKategori={namaKategori} poin={poin} tanggal={tanggal} kategori={`Survei`} />
        <PengumpulanPoinItem judul={judul} namaKategori={namaKategori} poin={poin} tanggal={tanggal} kategori={`Kawan`} /></> :
        <View style={{alignItems: 'center', marginVertical: 20}}>
            <Image style={{width: 40, height: 40}} source={IconRiwayat} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.buttonOne, color: Color.neutralZeroSeven, textAlign: 'center'}}>{titleLock}</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, textAlign: 'center',
        width: '90%'}}>{descLock}</Text>
        </View>
        } 
      </View>
    </View>
  )
}

export default RiwayatPengumpulanPoinScreen

const styles = StyleSheet.create({
    buttonFilter: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 32,
        borderColor: Color.neutralZeroSix,
        paddingHorizontal: 10,
        paddingVertical: 5
      },
})