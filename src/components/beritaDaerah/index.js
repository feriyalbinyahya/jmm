import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'

const BeritaDaerah = ({data, navigation}) => {
  return (
    <View>
        {data.map((item, index)=>{
            return (
                <Pressable onPress={()=>navigation.navigate("BeritaDetail", {id:item.id_berita})} key={index} style={{paddingVertical: 10, flexDirection: 'row', borderBottomWidth: 1,
                borderBottomColor: '#F0F0F0'}}>
                    <Image style={{width: 74, height: 74, borderRadius: 6}} source={{uri: `data:image/png;base64,${item.cover_berita}`}} />
                    <View style={{width: 10}}></View>
                    <View style={{justifyContent: 'space-around', paddingVertical: 5}}>
                        <Text style={{...FontConfig.captionOne, color: Color.neutralColorGrayEight}}>
                            {item.kategori.toUpperCase()}</Text>
                        <Text style={{...FontConfig.titleThree, color: '#000000', width: '40%', marginVertical: 5}}>
                        {item.judul}</Text>
                        <Text style={{...FontConfig.captionOne, color: Color.secondaryText}}>
                        {item.tanggal}</Text>
                    </View>
                </Pressable>
            )
        })
        }
    </View>
  )
}

export default BeritaDaerah

const styles = StyleSheet.create({})