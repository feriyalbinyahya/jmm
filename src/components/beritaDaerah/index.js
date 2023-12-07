import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontConfig } from '../../theme'
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../utils/Utils';

const BeritaDaerah = ({data, navigation}) => {
    const deviceTimeZone = RNLocalize.getTimeZone();
    const [convertedDate, setConvertedDate] = useState("");

    // Make moment of right now, using the device timezone
    const today = moment().tz(deviceTimeZone);

    // Get the UTC offset in hours
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
  return (
    <View>
        {data.map((item, index)=>{
            var convertedToLocalTime = formatTimeByOffset(
                item.tanggal,
                currentTimeZoneOffsetInHours,
              );
            return (
                <Pressable onPress={()=>navigation.navigate("BeritaDetail", {id:item.id_berita})} key={index} style={{paddingVertical: 10, flexDirection: 'row', borderBottomWidth: 1,
                borderBottomColor: '#F0F0F0'}}>
                    <Image style={{width: 74, height: 74, borderRadius: 6}} source={{uri: `data:image/png;base64,${item.cover_berita}`}} />
                    <View style={{width: 10}}></View>
                    <View style={{justifyContent: 'space-around', paddingVertical: 5, width: '80%'}}>
                        <Text style={{...FontConfig.captionOne, color: Color.neutralColorGrayEight}}>
                            {item.kategori.toUpperCase()}</Text>
                        <Text style={{...FontConfig.titleThree, color: '#000000', width: '100%', marginVertical: 5}}>
                        {item.judul}</Text>
                        <Text style={{...FontConfig.captionOne, color: Color.secondaryText}}>
                        {convertedToLocalTime}</Text>
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