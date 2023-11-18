import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
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

const PoinkuView = ({navigation}) => {
    const poin = 150;
    const rank = "bronze";
    const maxPoin = 500;

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
        <View style={{paddingHorizontal: 20}}>
            <LinearGradient style={{borderRadius: 8, padding: 15}} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={rank == rankPoin.no_member ? 
            colorBadge.no_member : rank == rankPoin.bronze ? colorBadge.bronze : rank == rankPoin.silver ?
        colorBadge.silver : rank == rankPoin.gold ? colorBadge.gold : rank == rankPoin.platinum ? colorBadge.platinum :
        colorBadge.diamond}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{...FontConfig.captionZero, color:Color.primaryMain}}>Poin Bulan ini</Text>
                        <Text style={{...FontConfig.buttonThree, color:Color.primaryMain}}>{poin}</Text>
                    </View>
                    {rank == rankPoin.no_member ? <RankPoin image={BadgeNoMember} rank="Member" /> : 
                    rank == rankPoin.bronze ? <RankPoin image={BadgeBronze} rank="Bronze" /> : 
                    rank == rankPoin.silver ? <RankPoin image={BadgeSilver} rank ="Silver" /> :
                    rank == rankPoin.gold ? <RankPoin image={BadgeGold} rank="Gold" /> : 
                    rank == rankPoin.platinum ? <RankPoin image={BadgePlatinum} rank="Platinum" />:
                    rank == rankPoin.diamond ? <RankPoin image={BadgeDiamond} rank="Diamond" /> : <></>}
                </View>
                <View style={{height: 10}}></View>
                <View style={{flexDirection: 'row',}}>
                    <Image style={{width: 13.65, height: 14}} source={rank == rankPoin.no_member ? BadgeNoMember : 
                    rank == rankPoin.bronze ? BadgeBronze : 
                    rank == rankPoin.silver ? BadgeSilver :
                    rank == rankPoin.gold ? BadgeGold : 
                    rank == rankPoin.platinum ? BadgePlatinum:
                    BadgeDiamond} />
                    <View style={styles.progressBar}>
                        <View style={{...styles.progressMain, flex: poin}}></View>
                        <View style={{...styles.progressRest, flex: maxPoin-poin}}></View>
                    </View>
                    {rank != rankPoin.diamond ? <Image style={{width: 13.65, height: 14}} source={rank == rankPoin.no_member ? BadgeBronze : 
                    rank == rankPoin.bronze ? BadgeSilver : 
                    rank == rankPoin.silver ? BadgeGold :
                    rank == rankPoin.gold ? BadgePlatinum : BadgeDiamond} /> : <></>}
                </View>
                <Text style={{...FontConfig.captionZero, color: Color.primaryMain,
                width: '95%', marginVertical: 8}}>{rank != rankPoin.diamond ? `${maxPoin - poin} Poin lagi untuk nikmatin benefit ${rank == rankPoin.no_member ? "Bronze" :
                rank == rankPoin.bronze ? "Silver" : rank==rankPoin.silver ? "Gold" : rank==rankPoin.gold ? "Platinum" :
                "Diamond"} di bulan berikutnya. Yuk sat set kumpulin sebelum ganti bulan !` : `Selamat kamu mencapai badge Diamond, Tetap Pertahankan poin ini agar tetap nimatin benefitnya dibulan depan !`}</Text>
                <View style={{height: 10}}></View>
                <View style={{backgroundColor: Color.neutralZeroOne, borderRadius: 4,
                padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={{...FontConfig.captionTwo, color: Color.primaryMain}}>Total Poinku</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{width: 12, height: 12}} source={IconPoin} />
                            <Text style={{...FontConfig.buttonThree, color: Color.warning,
                            marginTop: 2, marginHorizontal: 4}}>{`${poin} Poin`}</Text>
                        </View>
                    </View>
                    <Pressable onPress={()=>navigation.navigate("TukarPoin")} style={{flexDirection: 'row', alignItems: 'center',
                backgroundColor: Color.primaryMain, borderRadius: 32, paddingHorizontal: 18, height: 35}}>
                        <Text style={{...FontConfig.buttonZero, color: Color.neutralZeroOne}}>Tukarkan Poinku</Text>
                        <View style={{width: 5}}></View>
                        <Ionicons name="gift-outline" size={15} color={Color.neutralZeroOne}  />
                    </Pressable>
                </View>
            </LinearGradient>
            <View style={{height: 15}}></View>
            <Pressable style={{borderWidth: 1, borderColor: Color.primaryMain,
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
        <Pressable onPress={()=>{}}  style={{flexDirection: 'row', paddingHorizontal: 20,
        paddingVertical: 15, alignItems: 'center', 
        justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F5F5F5'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="gift-outline" color={Color.primaryMain} size={18} />
                <View style={{width: 10}}></View>
                <Text style={{...FontConfig.buttonOne, color: Color.primaryMain, marginTop: 2}}>Riwayat Penukaran Poin</Text>
            </View>
            <Ionicons name="chevron-forward-outline" color={Color.primaryMain} size={18} />
        </Pressable>
        <Pressable onPress={()=>{}}  style={{flexDirection: 'row', paddingHorizontal: 20,
        paddingVertical: 15, alignItems: 'center', 
        justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F5F5F5'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={IconPoinWhite} style={{height: 18, width: 18}} />
                <View style={{width: 10}}></View>
                <Text style={{...FontConfig.buttonOne, color: Color.primaryMain, marginTop: 2}}>Riwayat Pengumpulan Poin</Text>
            </View>
            <Ionicons name="chevron-forward-outline" color={Color.primaryMain} size={18} />
        </Pressable>
        <Pressable onPress={()=>{}}  style={{flexDirection: 'row', paddingHorizontal: 20,
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