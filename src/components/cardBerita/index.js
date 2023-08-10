import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2';
import { Color, FontConfig } from '../../theme';
import { Box } from 'native-base';

const CardBerita = ({image, topik, tanggal, berita, id, navigation}) => {
  return (
    <Box style={styles.cardContainer} shadow={3}>
        <Pressable onPress={()=>navigation.navigate("BeritaDetail", {id:id})}>
            <Image style={styles.image} source={{uri: `data:image/png;base64,${image}`}}/>
            <View style={styles.topik}><Text style={styles.textTopik}>{topik}</Text></View>
            <Text numberOfLines={2} style={styles.textBerita}>{berita}</Text>
            <Text style={styles.textTanggal}>{tanggal}</Text>
        </Pressable>
    </Box>
  )
}

export default CardBerita

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne
        
    },
    image:{
        aspectRatio: 4/3,
        borderRadius: 4,
        overflow: 'hidden'
    },
    textTopik: {
        ...FontConfig.captionOne,
        color: Color.neutralZeroOne,
    },
    textBerita: {
        ...FontConfig.titleThree,
        color: Color.neutralZeroOne,
        marginVertical: 3,
        position: 'absolute',
        bottom: '20%',
        paddingHorizontal: 10,
    },
    textTanggal: {
        ...FontConfig.captionOne,
        color: Color.neutralZeroOne,
        marginVertical: 3,
        position: 'absolute',
        bottom: '5%',
        paddingHorizontal: 10,
    },
    topik: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: Color.purple,
        position: 'absolute',
        bottom: '47%',
        marginHorizontal: 10,
        borderRadius: 24,
        justifyContent: 'center'
        
        
    }
})