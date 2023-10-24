import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderRed from '../../components/header/headerRed'
import { Color, FontConfig } from '../../theme'
import { useSelector } from 'react-redux'
import ProfileServices from '../../services/profile'
import SimpatisanServices from '../../services/simpatisan'
import LinearGradient from 'react-native-linear-gradient';
import IconArrowLeft from '../../assets/images/icon/button_left.png';
import QRCode from 'react-native-qrcode-svg';
import IconCopy from '../../assets/images/icon/icon_copy.png'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'
import IconShare from '../../assets/images/icon/icon_share.png';
import Share from 'react-native-share';
import Skeleton from '../../components/skeleton'

const ReferalSimpatisan = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);

    const fotoProfil = useSelector((state)=>{
        return state.credential.fotoProfil;
    })
    const nama = useSelector((state)=>{
        return state.credential.fullname;
    })

    const [referal, setReferal] = useState("");
    const [tautan, setTautan] = useState("");

    const getReferalData = () =>{
        setIsLoading(true);
        ProfileServices.getProfile()
        .then(res=>{
            SimpatisanServices.getReferalSimpatisan(res.data.data[0].kode_referal)
            .then(res=>{
                setReferal(res.data.data[0].kode_referral);
                setTautan(`https://gensatset.org/register?refCode=${res.data.data[0].kode_referral}`)
                setIsLoading(false);
            })
            .catch(err=>{
                console.log(err.response.data);
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    handleCopyReferral = () => {
        Clipboard.setString(tautan);
        Snackbar.show({
            text: 'Tautan telah disalin',
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    const handleShare = () => {
        const options = {
            message: `Data kan dirimu sebagai kawan pada Gen Sat Set!`,
            url: tautan
        }

        Share.open(options)
        .then(res=> console.log(res))
        .catch(err=>console.log(err));
    }

    useEffect(()=>{
        getReferalData();
    },[])
  return (
    <LinearGradient style={{backgroundColor: Color.primaryMain,flex:1}} start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#000000', '#000000']}>
      <View style={{padding: 20}}>
        <Pressable onPress={()=>navigation.goBack()}><Image source={IconArrowLeft} style={{width: 36, height: 36}} /></Pressable>
      </View>
      {!isLoading ? <View style={{alignItems: 'center',}}>
        <View style={{height: 20}}></View>
        <Text style={{...FontConfig.headingTwo, color: Color.neutralZeroOne}}>Berikan ke Kawanmu</Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.neutralZeroOne, width: '80%', textAlign: 'center'}}>Berikan QR Code atau salin tautan dibawah agar kawanmu bisa mendatakan dirinya</Text>
        <View style={{height: 30}}></View>
        <View style={styles.boxReferal}>
            <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EDEDED', paddingBottom: 10}}>
                <View style={{width: 20}}></View>
                <Image style={{width: 51, height: 51, borderRadius: 50}} source={{uri: `data:image/png;base64,${fotoProfil}`}} />
                <View style={{width: 20}}></View>
                <View>
                    <Text style={{...FontConfig.titleOne, color: Color.primaryMain}}>{referal}</Text>
                    <Text style={{...FontConfig.titleThree, color: Color.primaryText}}>{nama}</Text>
                </View>
            </View>
            <View style={{height: 25}}></View>
            {tautan != "" ? <View style={{alignItems: 'center', padding: 20}}>
                <QRCode
                size={180}
                value={tautan}
                />
            </View> : <Skeleton style={{borderRadius: 8}} width={100} height={100} />}
            <View style={{height: 25}}></View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{alignItems: 'center'}}><Pressable onPress={handleCopyReferral} style={styles.buttonCopy}>
                    <Image style={styles.iconCopy} source={IconCopy} /></Pressable>
                    <View style={{height: 5}}></View>
                    <Text style={{...FontConfig.bodyThree, color: Color.neutralColorGrayNine}}>Salin Tautan</Text>
                </View>
                <View style={{width: 20}}></View>
                <View style={{alignItems: 'center'}}><Pressable onPress={handleShare} style={styles.buttonCopy}>
                    <Image style={styles.iconCopy} source={IconShare} /></Pressable>
                    <View style={{height: 5}}></View>
                    <Text style={{...FontConfig.bodyThree, color: Color.neutralColorGrayNine}}>Bagikan</Text>
                </View>
            </View>
        </View>
      </View> : <View style={{flex: 1, marginTop: '40%'}}><ActivityIndicator size="large" color={Color.graySix} /></View>}
    </LinearGradient>
  )
}

export default ReferalSimpatisan

const styles = StyleSheet.create({
    boxReferal: {
        paddingVertical: 20,
        backgroundColor: Color.neutralZeroOne,
        width: '80%',
        borderRadius: 12
    },
    buttonCopy: {
        borderWidth: 1,
        borderColor: Color.neutralZeroSix,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    iconCopy: {
        width: 18,
        height: 18
    },
})