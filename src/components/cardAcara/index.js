import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Shadow } from 'react-native-shadow-2';
import { Color, FontConfig } from '../../theme';
import { Box } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../utils/Utils';

const CardAcara = ({image, topik, tanggal, berita, id, navigation, data_acara}) => {
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
        <LinearGradient style={{borderRadius: 6, height: '100%', borderColor: Color.purple}} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FFFFFF', Color.purpleSurface]}>
            <Pressable style={{height: '100%'}} onPress={()=>navigation.navigate("DetailAcara", {id:id, dataAcara:data_acara})}>
                <Image style={styles.image} source={{uri: `data:image/png;base64,${image}`}}/>
                <View style={{height: 5}}></View>
                <Text style={styles.textTopik}>{topik.toUpperCase()}</Text>
                <Text numberOfLines={2} style={styles.textBerita}>{berita}</Text>
                <Text style={styles.textTanggal}>{convertedDate}</Text>
            </Pressable>
        </LinearGradient>
    </Box>
  )
}

export default CardAcara

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne
        
    },
    image:{
        aspectRatio: 16/9,
        borderRadius: 4,
        overflow: 'hidden'
    },
    textTopik: {
        ...FontConfig.captionUpperOne,
        color: Color.purple,
        marginHorizontal: 10,
        marginTop: 5,
    },
    textBerita: {
        ...FontConfig.titleThree,
        color: Color.hitam,
        paddingHorizontal: 12,
    },
    textTanggal: {
        ...FontConfig.captionOne,
        color: Color.hitam,
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