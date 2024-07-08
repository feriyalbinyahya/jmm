import { StyleSheet, Text, View, Image, Pressable, Linking } from 'react-native'
import React from 'react'
import ExampleProfile from '../../assets/images/example/exampleProfile.png'
import ExampleOrganisasi from '../../assets/images/example/exampleOrganisasi.png'
import { Color, FontConfig } from '../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux'
import Logo from '../../assets/images/logo_blue.png';
import LogoFacebook from '../../assets/images/icon/icon_facebook_monokrom.png';
import LogoTiktok from '../../assets/images/icon/icon_tiktok_monokrom.png';
import LogoInstagram from '../../assets/images/icon/icon_instagram_monokrom.png';
import ChildrenButton from '../customButtonChildren'
import WaveBackground from '../../assets/images/appbar_wave.png';

const AppBarRelawan = ({navigation, isReferal}) => {
    const imageOrganisasi = "";
    const imageProfile = "";

    const namaOrganisasi = useSelector((state)=>{
        return state.credential.namaOrganisasi;
    })

    const fotoOrganisasi = useSelector((state)=>{
        return state.credential.fotoOrganisasi;
    })

    const nama = useSelector((state)=>{
        return (state.credential.fullname).split(" ")[0];
    })

    const fotoProfil = useSelector((state)=>{
        return (state.credential.fotoProfil);
    })

    const token = useSelector((state)=>{
        return state.credential.token;
    })

    handleProfile = () => {
        navigation.navigate("Profile");
    }

    handleNotifikasi = () => {
        navigation.navigate("Notifikasi");
    }

    handleProgram = () => {
        navigation.navigate("ListCSR");
    }

    console.log(token);
  return (
    <View style={{backgroundColor: Color.secondaryMain, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Image style={styles.logo} source={Logo} />
                <View style={{width: 8}}></View>
                <View style={{width:10}}></View>
            </View>
            <View style={styles.rightSection}>
                <View style={{width:10}}></View>
                <Pressable style={styles.rightSection} onPress={handleProfile}>
                    
                    <Image style={styles.imageOrganisasi} source={{uri: `data:image/png;base64, ${fotoProfil}`}} />
                </Pressable>
                <View style={{width:16}}></View>
            </View>
        </View>
        <View style={{height: 5}}></View>
        <Text style={styles.textTitle}>Hai, {nama}</Text>
        <View style={{height: 10}}></View>
        <View style={{paddingHorizontal: 20, marginHorizontal: 20, marginVertical: 10, paddingVertical: 10,
            backgroundColor: Color.neutralZeroOne, borderRadius: 8, zIndex: 3}}>
            <Text style={{...FontConfig.buttonZeroTwo, color: Color.primaryMain,
                textAlign: 'center'
            }}>Buat Laporan untuk Program CSR</Text>
            <ChildrenButton disabled={false} onPress={handleProgram} backgroundColor={Color.palette6} borderRadius={100} borderColor={Color.border} children={<View style={{flexDirection: 'row',
        alignItems: 'center'}}>
                <Ionicons name="add-circle-outline" size={18} color={Color.neutralZeroOne} />
                <Text style={{...FontConfig.button5, color: Color.primaryMain, marginLeft: 5}}>Lihat Semua Program</Text>
            </View>} />
        </View>
        <View style={{height: 10}}></View>
        <Image source={WaveBackground} style={{position: 'absolute', zIndex: 2, 
        width: '100%', height: 157, bottom: 5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} />
    </View>
  )
}

export default AppBarRelawan

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: Color.secondaryMain,
        zIndex: 1
    },
    leftSection: {
        alignItems: 'center',
        flexDirection: 'row'

    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    imageOrganisasi: {
        width:32,
        height: 32,
        borderRadius: 20
    },
    logo: {
        width: 33,
        height: 33,
    },
    textTitle: {
        ...FontConfig.buttonZeroTwo,
        color: Color.neutralZeroOne,
        paddingHorizontal: 20,
        paddingTop: 10
    },
})