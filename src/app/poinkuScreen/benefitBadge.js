import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BadgeBronze from '../../assets/images/icon/badge_bronze.png';
import BadgeSilver from '../../assets/images/icon/badge_silver.png';
import BadgeGold from '../../assets/images/icon/badge_gold.png';
import BadgePlatinum from '../../assets/images/icon/badge_platinum.png';
import BadgeDiamond from '../../assets/images/icon/badge_diamond.png';
import { Color, FontConfig } from '../../theme';

const BenefitBadge = ({}) => {
    const [selectedBadge, setSelectedBadge] = useState("Bronze");
    const BADGE = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
    const ICON_BADGE = [BadgeBronze, BadgeSilver, BadgeGold, BadgePlatinum, BadgeDiamond];

    const handleSelectedBadge = (item) =>{
        setSelectedBadge(item);
    }
  return (
    <View>
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