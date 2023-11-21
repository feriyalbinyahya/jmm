import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BadgeBronze from '../../assets/images/icon/badge_bronze.png';
import BadgeSilver from '../../assets/images/icon/badge_silver.png';
import BadgeGold from '../../assets/images/icon/badge_gold.png';
import BadgePlatinum from '../../assets/images/icon/badge_platinum.png';
import BadgeDiamond from '../../assets/images/icon/badge_diamond.png';
import { Color, FontConfig } from '../../theme';
import { benefitBadge, rankPoin } from '../../utils/const';

const BenefitBadge = ({}) => {
    const [selectedBadge, setSelectedBadge] = useState("Bronze");
    const BADGE = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
    const ICON_BADGE = [BadgeBronze, BadgeSilver, BadgeGold, BadgePlatinum, BadgeDiamond];
    const [benefit, setBenefit] = useState(benefitBadge.bronze);

    const handleSelectedBadge = (item) =>{
        setSelectedBadge(item);
        if(item == rankPoin.bronze){
            setBenefit(benefitBadge.bronze);
        }else if(item == rankPoin.silver){
            setBenefit(benefitBadge.silver);
        }else if(item == rankPoin.gold){
            setBenefit(benefitBadge.gold);
        }else if(item == rankPoin.platinum){
            setBenefit(benefitBadge.platinum);
        }else if(item == rankPoin.diamond){
            setBenefit(benefitBadge.diamond);
        }
    }
  return (
    <View style={{height: '40%'}}>
        <View style={{alignItems: 'center'}}><ScrollView horizontal={true}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}>
            {
                BADGE.map((item, index)=>{
                    return(
                        <Pressable onPress={()=>{handleSelectedBadge(item);}} key={index} style={item == selectedBadge ? styles.selectedMenu : styles.unselectedMenu}>
                            <Image source={ICON_BADGE[index]} style={{width: 23.4, height: 24}} />
                            <View style={{height: 6}}></View>
                            <Text style={item == selectedBadge? styles.textSelected : styles.textUnselected}>{item}</Text>
                        </Pressable>
                    )
                })
            }
        </ScrollView></View>
        <View style={{height: 20}}></View>
        <Text style={{...FontConfig.headingThree, color: '#0A0A0A', textAlign: 'center', marginVertical: 8}}>{`Benefit ${selectedBadge}`}</Text>
        <View style={{paddingHorizontal: 20}}>
            {
                benefit.map((item, index)=>{
                    return(
                        <View key={index} style={{flexDirection: 'row',marginVertical: 5}}>
                            <Text style={{fontSize: 8, color: Color.hitam}}>{'\u2B24'}</Text>
                            <Text style={{...FontConfig.bodyFour, color: Color.hitam, marginLeft: 4}}>{item}</Text>
                        </View>
                    )
                })
            }
        </View>
    </View>
  )
}

export default BenefitBadge

const styles = StyleSheet.create({
    selectedMenu: {
        paddingVertical: 10,
        width: 70,
        marginHorizontal: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    unselectedMenu: {
        paddingVertical: 10,
        width: 70,
        alignItems: 'center',
        marginHorizontal: 1,
    },
    textSelected: {
        ...FontConfig.buttonThree,
        color: Color.title,
    },
    textUnselected: {
        ...FontConfig.bodySix, color: Color.title
    }
})