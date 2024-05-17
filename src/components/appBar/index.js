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

    console.log(token);
  return (
    <View>
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Image style={styles.logo} source={Logo} />
                <View style={{width: 8}}></View>
                <Text style={styles.textTitle}>Hai, {nama}</Text>
                <View style={{width:10}}></View>
            </View>
            <View style={styles.rightSection}>
                {/**<Pressable onPress={handleNotifikasi}><Ionicons name="notifications-outline" color={Color.hitam} size={22} /></Pressable>*/}
                <View style={{width:10}}></View>
                <Pressable style={styles.rightSection} onPress={handleProfile}>
                    
                    <Image style={styles.imageOrganisasi} source={{uri: `data:image/png;base64, ${fotoProfil}`}} />
                </Pressable>
                <View style={{width:16}}></View>
            </View>
        </View>
        {
            isReferal == 1 ? 
            <View style={{height: 20}}></View> : <></>
        }
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
        backgroundColor: Color.neutralZeroOne,
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
        width:28,
        height: 28,
        borderRadius: 20
    },
    logo: {
        width: 33,
        height: 33,
        borderRadius: 100
    },
    textTitle: {
        ...FontConfig.titleThree,
        color: Color.hitam
    },
})