import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'

const TentangOrganisasi = () => {
    const grupOrganisasi = 'Masyarakat Sehat Jawa Barat';
    const namaOrganisasi = 'Masyarakat Sehat Jawa Barat';
    const alamat = 'Jl Merdeka No. 1, Kel. Kampung Baru, Kec. Tembelang, Kota Malang, Prov. Jawa Timur';
    const tingkat = 'Kelurahan';
    const wilayah = 'Kel. Kampung baru, Ds. Kampung Durian, Ds. Kampung Pojok, Ds. Jati Wates';

    const Item = ({title, content}) =>{
        return(
            <View style={{marginVertical:5}}>
                <Text style={{color: Color.neutral70, ...FontConfig.body5}}>{title}</Text>
                <View style={{height: 3}}></View>
                <Text style={{color: Color.neutral100, ...FontConfig.bodyFour}}>{content}</Text>
            </View>
        )
    }
  return (
    <View style={{height: '60%'}}>
      <ScrollView style={{backgroundColor: Color.neutralZeroOne, padding: 10}}>
        <Item title={`Grup Organisasi`} content={grupOrganisasi} />
        <Item title={`Nama Organisasi`} content={namaOrganisasi} />
        <Item title={`Alamat`} content={alamat} />
        <Item title={`Tingkat`} content={tingkat} />
        <Item title={`Wilayah`} content={wilayah} />
        <View style={{height: 20}}></View>
      </ScrollView>
    </View>
  )
}

export default TentangOrganisasi

const styles = StyleSheet.create({})