import { StyleSheet, Text, View, Image, Pressable, Linking } from 'react-native'
import React from 'react'
import ExampleProfile from '../../assets/images/example/exampleProfile.png'
import ExampleOrganisasi from '../../assets/images/example/exampleOrganisasi.png'
import { Color, FontConfig } from '../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux'
import Logo from '../../assets/images/LogoAplikasi.png';
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
                <View style={{height: 5}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', width: 100}}>
                    <Pressable onPress={()=>Linking.openURL("https://www.facebook.com/profile.php?id=100095385183978&mibextid=D4KYlr")}><Image source={LogoFacebook} style={{width: 24, height: 24}} /></Pressable>
                    <Pressable onPress={()=>Linking.openURL("https://instagram.com/gensatset?igshid=MzRlODBiNWFlZA==")}><Image source={LogoInstagram} style={{width: 24, height: 24}} /></Pressable>
                    <Pressable onPress={()=>Linking.openURL("https://www.tiktok.com/@gensatset?_t=8eDwzpEyhA9&_r=1")}><Image source={LogoTiktok} style={{width: 24, height: 24}} /></Pressable>
                </View>
            </View>
            <View style={styles.rightSection}>
                {/**<Pressable onPress={handleNotifikasi}><Ionicons name="notifications" color={Color.neutralZeroOne} size={22} /></Pressable>
                <View style={{width:10}}></View>**/}
                <Pressable style={styles.rightSection} onPress={handleProfile}>
                    <Text style={styles.textTitle}>Hai, {nama}</Text>
                    <View style={{width:10}}></View>
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
        paddingVertical: 25,
        alignItems: 'center',
        backgroundColor: Color.primaryMain,
    },
    leftSection: {
        alignItems: 'center'

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
        width: 109,
        height: 44
    },
    textTitle: {
        ...FontConfig.titleThree,
        color: Color.neutralZeroOne
    },
})