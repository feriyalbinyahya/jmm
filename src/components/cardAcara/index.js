import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2';
import { Color, FontConfig } from '../../theme';
import { Box } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const CardAcara = ({image, topik, tanggal, berita, id, navigation, data_acara}) => {
  return (
    <Box style={styles.cardContainer} shadow={0}>
        <LinearGradient style={{borderRadius: 6, height: '100%', borderColor: Color.purple}} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FFFFFF', Color.purpleSurface]}>
            <Pressable style={{height: '100%'}} onPress={()=>navigation.navigate("DetailAcara", {id:id, dataAcara:data_acara})}>
                <Image style={styles.image} source={{uri: `data:image/png;base64,${image}`}}/>
                <View style={{height: 5}}></View>
                <Text style={styles.textTopik}>{topik.toUpperCase()}</Text>
                <Text numberOfLines={2} style={styles.textBerita}>{berita}</Text>
                <Text style={styles.textTanggal}>{tanggal}</Text>
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
        color: Color.primaryMain,
        paddingHorizontal: 12,
    },
    textTanggal: {
        ...FontConfig.captionOne,
        color: Color.primaryMain,
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