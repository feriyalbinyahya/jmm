import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontConfig } from '../../theme'
import LinearGradient from 'react-native-linear-gradient'
import { colorBadge, rankPoin } from '../../utils/const'
import BadgeNoMember from '../../assets/images/icon/badge_nomember.png';
import BadgeBronze from '../../assets/images/icon/badge_bronze.png';
import BadgeSilver from '../../assets/images/icon/badge_silver.png';
import BadgeGold from '../../assets/images/icon/badge_gold.png';
import BadgePlatinum from '../../assets/images/icon/badge_platinum.png';
import BadgeDiamond from '../../assets/images/icon/badge_diamond.png';
import IconPoin from '../../assets/images/icon/icon_poin.png';
import IconPoinWhite from '../../assets/images/icon/icon_poin_white.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomBottomSheet from '../../components/bottomSheet'
import BenefitBadge from './benefitBadge'

const PoinkuView = ({route}) => {
    const maxPoin = 500;
    const {navigation, infoPoin} = route.params;
    const [isModalVisible, setModalVisible] = useState(false);

    const RankPoin = ({image, rank}) =>{
        return(
            <View style={{flexDirection: 'row', alignSelf: 'baseline', alignItems: 'center',
            paddingHorizontal: 10, paddingVertical: 3, backgroundColor: '#404040', borderRadius: 34}}>
                <Image style={{width: 13.65, height: 14}} source={image} />
                <Text style={{...FontConfig.buttonZero, marginTop: 2, color: Color.neutralZeroOne, marginHorizontal: 3}}>{rank}</Text>
            </View>
        )
    }
  return (
    <View style={{backgroundColor:  Color.neutralZeroOne, flex: 1,
    paddingVertical: 20}}>
        <CustomBottomSheet children={<BenefitBadge />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
        title="" />
        <View style={{paddingHorizontal: 20}}>
            <LinearGradient style={{borderRadius: 8, padding: 15}} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={infoPoin.badge == rankPoin.no_member ? 
            colorBadge.no_member : infoPoin.badge == rankPoin.bronze ? colorBadge.bronze : infoPoin.badge == rankPoin.silver ?
        colorBadge.silver : infoPoin.badge == rankPoin.gold ? colorBadge.gold : infoPoin.badge == rankPoin.platinum ? colorBadge.platinum :
        colorBadge.diamond}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{...FontConfig.captionZero, color:Color.primaryMain}}>Poin Bulan ini</Text>
                        <Text style={{...FontConfig.buttonThree, color:Color.primaryMain}}>{infoPoin.poin_bulanan}</Text>
                    </View>
                    {infoPoin.badge == rankPoin.no_member ? <RankPoin image={BadgeNoMember} rank="Member" /> : 
                    infoPoin.badge == rankPoin.bronze ? <RankPoin image={BadgeBronze} rank="Bronze" /> : 
                    infoPoin.badge == rankPoin.silver ? <RankPoin image={BadgeSilver} rank ="Silver" /> :
                    infoPoin.badge == rankPoin.gold ? <RankPoin image={BadgeGold} rank="Gold" /> : 
                    infoPoin.badge == rankPoin.platinum ? <RankPoin image={BadgePlatinum} rank="Platinum" />:
                    infoPoin.badge == rankPoin.diamond ? <RankPoin image={BadgeDiamond} rank="Diamond" /> : <></>}
                </View>
                <View style={{height: 10}}></View>
                <View style={{flexDirection: 'row',}}>
                    <Image style={{width: 13.65, height: 14}} source={infoPoin.badge == rankPoin.no_member ? BadgeNoMember : 
                    infoPoin.badge == rankPoin.bronze ? BadgeBronze : 
                    infoPoin.badge == rankPoin.silver ? BadgeSilver :
                    infoPoin.badge == rankPoin.gold ? BadgeGold : 
                    infoPoin.badge == rankPoin.platinum ? BadgePlatinum:
                    BadgeDiamond} />
                    <View style={styles.progressBar}>
                        <View style={{...styles.progressMain, flex: infoPoin.poin_bulanan}}></View>
                        <View style={{...styles.progressRest, flex: maxPoin-infoPoin.poin_bulanan}}></View>
                    </View>
                    {infoPoin.badge != rankPoin.diamond ? <Image style={{width: 13.65, height: 14}} source={infoPoin.badge == rankPoin.no_member ? BadgeBronze : 
                    infoPoin.badge == rankPoin.bronze ? BadgeSilver : 
                    infoPoin.badge == rankPoin.silver ? BadgeGold :
                    infoPoin.badge == rankPoin.gold ? BadgePlatinum : BadgeDiamond} /> : <></>}
                </View>
                <Text style={{...FontConfig.captionZero, color: Color.primaryMain,
                width: '95%', marginVertical: 8}}>{infoPoin.badge != rankPoin.diamond ? `${maxPoin - infoPoin.poin_bulanan} Poin lagi untuk nikmatin benefit ${infoPoin.badge == rankPoin.no_member ? "Bronze" :
                infoPoin.badge == rankPoin.bronze ? "Silver" : infoPoin.badge==rankPoin.silver ? "Gold" : infoPoin.badge==rankPoin.gold ? "Platinum" :
                "Diamond"} di bulan berikutnya. Yuk sat set kumpulin sebelum ganti bulan !` : `Selamat kamu mencapai badge Diamond, Tetap Pertahankan poin ini agar tetap nimatin benefitnya dibulan depan !`}</Text>
                <View style={{height: 10}}></View>
                <View style={{backgroundColor: Color.neutralZeroOne, borderRadius: 4,
                padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={{...FontConfig.captionTwo, color: Color.primaryMain}}>Total Poinku</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{width: 12, height: 12}} source={IconPoin} />
                            <Text style={{...FontConfig.buttonThree, color: Color.warning,
                            marginTop: 2, marginHorizontal: 4}}>{`${infoPoin.poin_total} Poin`}</Text>
                        </View>
                    </View>
                    <Pressable onPress={()=>navigation.navigate("TukarPoin", {infoPoin: infoPoin})} style={{flexDirection: 'row', alignItems: 'center',
                backgroundColor: Color.primaryMain, borderRadius: 32, paddingHorizontal: 18, height: 35}}>
                        <Text style={{...FontConfig.buttonZero, color: Color.neutralZeroOne}}>Tukarkan Poinku</Text>
                        <View style={{width: 5}}></View>
                        <Ionicons name="gift-outline" size={15} color={Color.neutralZeroOne}  />
                    </Pressable>
                </View>
            </LinearGradient>
            <View style={{height: 15}}></View>
            <Pressable onPress={()=>setModalVisible(true)} style={{borderWidth: 1, borderColor: Color.primaryMain,
            borderRadius: 32, alignItems: 'center', paddingVertical: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{...FontConfig.buttonThree, color: Color.primaryMain,
                    marginTop: 2}}>Lihat Benefit Badge</Text>
                    <View style={{width: 4}}></View>
                    <Ionicons name="chevron-forward-outline" size={18} color={Color.primaryMain}  />
                </View>
            </Pressable>
        </View>
        <View style={{height: 15}}></View>
        <Pressable onPress={()=>navigation.navigate("TukarPoin", {infoPoin: infoPoin, screen: 'Riwayat Penukaran'})}  style={{flexDirection: 'row', paddingHorizontal: 20,
        paddingVertical: 15, alignItems: 'center', 
        justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F5F5F5'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="gift-outline" color={Color.primaryMain} size={18} />
                <View style={{width: 10}}></View>
                <Text style={{...FontConfig.buttonOne, color: Color.primaryMain, marginTop: 2}}>Riwayat Penukaran Poin</Text>
            </View>
            <Ionicons name="chevron-forward-outline" color={Color.primaryMain} size={18} />
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("RiwayatPengumpulanPoin")}  style={{flexDirection: 'row', paddingHorizontal: 20,
        paddingVertical: 15, alignItems: 'center', 
        justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F5F5F5'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={IconPoinWhite} style={{height: 18, width: 18}} />
                <View style={{width: 10}}></View>
                <Text style={{...FontConfig.buttonOne, color: Color.primaryMain, marginTop: 2}}>Riwayat Pengumpulan Poin</Text>
            </View>
            <Ionicons name="chevron-forward-outline" color={Color.primaryMain} size={18} />
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("PertanyaanPoin")}  style={{flexDirection: 'row', paddingHorizontal: 20,
        paddingVertical: 15, alignItems: 'center', 
        justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F5F5F5'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="help-outline" color={Color.primaryMain} size={18} />
                <View style={{width: 10}}></View>
                <Text style={{...FontConfig.buttonOne, color: Color.primaryMain, marginTop: 2}}>Punya Pertanyaan ?</Text>
            </View>
            <Ionicons name="chevron-forward-outline" color={Color.primaryMain} size={18} />
        </Pressable>
    </View>
  )
}

export default PoinkuView

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        width: '90%',
        marginTop: 3,
        backgroundColor: Color.neutralZeroFour,
    },
    progressMain: {
        backgroundColor: Color.warning,
        height: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    progressRest: {
        backgroundColor: Color.neutralZeroFour,
        height: 8,
    },
})