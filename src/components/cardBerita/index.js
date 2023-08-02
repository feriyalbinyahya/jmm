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
            <Text style={styles.textTopik}>{topik.toUpperCase()}</Text>
            <Text numberOfLines={3} style={styles.textBerita}>{berita}</Text>
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
        padding: 10,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne
        
    },
    image:{
        width: 140,
        height: 100,
        aspectRatio: 7/5,
        borderRadius: 4,
        overflow: 'hidden'
    },
    textTopik: {
        ...FontConfig.captionOne,
        color: Color.primaryMain,
        marginTop: 20
    },
    textBerita: {
        ...FontConfig.titleThree,
        color: '#000000',
        marginVertical: 3,
        
    },
    textTanggal: {
        ...FontConfig.captionOne,
        color: Color.secondaryText,
        marginVertical: 3
    },
})