import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React from 'react'
import HeaderWhite from '../../components/header/headerWhite'
import { Color, FontConfig } from '../../theme'
import { Box } from 'native-base'
import IconMisi from '../../assets/images/icon/icon_misi.png';
import IconMisiPenting from '../../assets/images/icon/icon_misi_penting.png';
import IconPin from '../../assets/images/icon/icon_pin.png'

const ListMisiScreen = ({navigation}) => {
    const data = [
        {
            is_important: true,
            judul: "Buat Konten Dengan Tema dilarang Golput",
            expired_date: "Sen, 12 Juli 2023  23:00:00"
        },
        {
            is_important: false,
            judul: "Buat Kegiatan Edukasi",
            expired_date: "Sen, 12 Juli 2023  23:00:00"
        },
        {
            is_important: false,
            judul: "Buat Podcast",
            expired_date: "Sen, 12 Juli 2023  23:00:00"
        }
    ];

    const MisiItem = ({is_important, judul, expired_date}) => {
        return (
            <Box shadow={3} style={!is_important ? styles.cardContainer : styles.cardContainerPenting}>
                <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{width: 40, height: 40}} source={is_important ? IconMisiPenting : IconMisi} />
                        <View style={{width: 15}}></View>
                        <View style={{width: '70%'}}>
                            <Text style={{...FontConfig.captionUpperOne, color: Color.primaryMain}}>MISI</Text>
                            <View style={{height: 5}}></View>
                            <Text style={{...FontConfig.titleThree, color: Color.neutralTen}}>{judul}</Text>
                            <View style={{height: 5}}></View>
                            <Text style={{...FontConfig.captionOne, color: Color.neutralZeroSeven}}>Batas waktu:</Text>
                            <Text style={{...FontConfig.titleThree, color: Color.danger}}>{expired_date}</Text>
                        </View>
                    </View>
                    {is_important ? <Image style={{width: 14, height: 14}} source={IconPin} /> : 
                    <View style={{width: 14}}></View>}
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <Pressable onPress={()=>navigation.navigate("StartMisi")}>
                        <Text style={{...FontConfig.buttonZeroTwo, color:Color.primaryMain}}>Mulai Misi</Text>
                    </Pressable>
                </View>
            </Box>
        )
    }
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        <HeaderWhite navigation={navigation} title="Misi-mu" />
        <FlatList 
        data={data}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item})=><MisiItem is_important={item.is_important} expired_date={item.expired_date}
        judul={item.judul} />}
        />
    </View>
  )
}

export default ListMisiScreen

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne,
        alignSelf: 'baseline',
        padding: 10,
    },
    cardContainerPenting: {
        marginHorizontal: 8,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: Color.neutralZeroOne,
        alignSelf: 'baseline',
        padding: 10,
        borderWidth: 1,
        borderColor: Color.purple
    },
})