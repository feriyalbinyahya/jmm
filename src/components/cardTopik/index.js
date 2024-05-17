import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Shadow } from 'react-native-shadow-2';
import { Color, FontConfig } from '../../theme';
import { Box } from 'native-base';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../utils/Utils';
import IconComment from '../../assets/images/icon/icon_comment.png';

const CardTopik = ({ topik, tanggal, berita, id, navigation}) => {
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
    <Box style={styles.cardContainer} shadow={0}>
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.textTopik}>{topik.toUpperCase()}</Text>
                <Text style={styles.textTanggal}>{convertedDate}</Text>
            </View>
            <View style={{height: 3}}></View>
            <Text numberOfLines={2} style={styles.textBerita}>{berita}</Text>
        </View>
        <Pressable onPress={()=>navigation.navigate("BeritaDetail", {id:id})} style={{flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 20,
    borderRadius: 100, borderWidth:1, borderColor: Color.border, justifyContent: 'center'}}>
            <Image source={IconComment} style={{height: 20, width: 20}} />
            <Text style={{...FontConfig.buttonFour, color: Color.primaryMain,
            marginHorizontal: 5}}>Diskusi</Text>
        </Pressable>
    </Box>
  )
}

export default CardTopik

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        marginVertical: 5,
        padding: 20,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne,
        height: 170,
        justifyContent: 'space-between'
        
    },
    image:{
        aspectRatio: 16/9,
        borderRadius: 4,
        overflow: 'hidden'
    },
    textTopik: {
        ...FontConfig.captionUpperOne,
        color: Color.secondaryMain,
        width: '60%'
    },
    textBerita: {
        ...FontConfig.button5,
        color: Color.hitam,
        marginVertical: 3,
    },
    textTanggal: {
        ...FontConfig.body5,
        color: Color.neutral70,
        marginVertical: 3,
        marginHorizontal: 5
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