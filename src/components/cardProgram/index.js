import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Shadow } from 'react-native-shadow-2';
import { Color, FontConfig } from '../../theme';
import { Box } from 'native-base';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../utils/Utils';

const CardProgram = ({image, tanggal, berita, id, navigation, baru=true}) => {
    const deviceTimeZone = RNLocalize.getTimeZone();
    const [convertedDate, setConvertedDate] = useState("");

    // Make moment of right now, using the device timezone
    const today = moment().tz(deviceTimeZone);

    // Get the UTC offset in hours
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
    useEffect(()=>{
        const convertedToLocalTime = formatTimeByOffset(
            tanggal,
            currentTimeZoneOffsetInHours,
          );
        setConvertedDate(convertedToLocalTime);
    },[])
  return (
    <Box style={styles.cardContainer} shadow={1}>
        <Pressable onPress={()=>navigation.navigate(baru ? "ProgramBaru" : "ProgramBerjalan", {id:id})}>
            <Image style={styles.image} source={{uri: `data:image/png;base64,${image}`}}/>
            <View style={{height: 3}}></View>
            <Text numberOfLines={2} style={styles.textBerita}>{berita}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.textBatasWaktu}>{`Batas Waktu    :`}</Text>
                <Text style={styles.textTanggal}>{convertedDate}</Text>
            </View>
            <View style={{height: 5}}></View>
        </Pressable>
    </Box>
  )
}

export default CardProgram

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne
        
    },
    image:{
        aspectRatio: 16/9,
        borderRadius: 4,
        overflow: 'hidden'
    },
    textTopik: {
        ...FontConfig.captionOne,
        color: Color.neutralZeroOne,
    },
    textBerita: {
        ...FontConfig.button5,
        color: Color.hitam,
        marginVertical: 3,
        paddingHorizontal: 12,
    },
    textTanggal: {
        ...FontConfig.captionOne,
        color: Color.danger,
        marginVertical: 3,
        paddingHorizontal: 10,
    },
    textBatasWaktu: {
        ...FontConfig.captionOne,
        color: '#757575',
        marginVertical: 3,
        paddingHorizontal: 10,
    },
    topik: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: Color.purple,
        position: 'absolute',
        top: '50%',
        marginHorizontal: 10,
        borderRadius: 24,
        justifyContent: 'center'
        
        
    }
})