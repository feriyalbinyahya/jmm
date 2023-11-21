import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderWhiteNoBorder from '../../../components/header/headerWhiteNoBorder'
import { Color, FontConfig } from '../../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { questionAnswerPoin } from '../../../utils/const';

const PertanyaanPoinScreen = ({navigation}) => {

    const SlideQuestionAnswer = ({pertanyaan, jawaban}) => {
        const [isOpen, setIsOpen] = useState(false);

        const handlePress = () =>{
            setIsOpen(!isOpen);
        } 
        return(
            <Pressable onPress={handlePress} style={{borderBottomWidth: 1, borderBottomColor: Color.neutralZeroThree,
            paddingHorizontal: 20, paddingVertical: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between'}}>
                    <Text style={{...FontConfig.titleFour, color: Color.neutralColorGrayNine}}>{pertanyaan}</Text>
                    <Ionicons name={isOpen ? `chevron-up-outline` : `chevron-down-outline`} size={18} color={Color.neutralColorGrayNine}  />
                </View>
                {
                    isOpen ? 
                    <View>
                        <View style={{height: 8}}></View>
                        <Text style={{...FontConfig.bodySix, color: Color.neutralColorGrayNine,
                        textAlign: 'justify'}}>
                            {jawaban}
                        </Text>
                    </View>
                : <></>}
            </Pressable>
        )
    }

  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhiteNoBorder navigation={navigation} title={`Punya Pertanyaan ?`} />
      <Text style={{...FontConfig.titleThree, color: Color.title, paddingHorizontal: 20,
    paddingVertical: 10}}>Punya Pertanyaan ?</Text>
      {
        questionAnswerPoin.map((item, index)=>{
            return(
                <SlideQuestionAnswer key={index} pertanyaan={item.pertanyaan} jawaban={item.jawaban} />
            )
        })
      }
    </View>
  )
}

export default PertanyaanPoinScreen

const styles = StyleSheet.create({})