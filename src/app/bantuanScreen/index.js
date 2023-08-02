import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderWhite from '../../components/header/headerWhite'
import CustomButton from '../../components/customButton'
import ChildrenButton from '../../components/customButtonChildren'

const BantuanScreen = ({navigation}) => {
    const titlePage = "Pertanyaan-pertanyaan yang sering diajukan";
    const subtitlePage = "Kunjungi halaman bantuan dan cari tahu lebih banyak tentang aplikasi Relawan dan bagaimana kami dapat membantu Anda. Jawaban untuk semua pertanyaan Anda ada di disini.";
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
        <HeaderWhite navigation={navigation} title="Bantuan" />
        <View style={{justifyContent: 'space-between', flex: 1}}>
            <View style={{padding: 20}}>
                <Text style={styles.textTitle}>{titlePage}</Text>
                <Text style={styles.textSubtitle}>{subtitlePage}</Text>
            </View>
            <View style={{padding: 20, alignItems: 'center'}}>
                <Text>Belum menemukan jawaban? Hubungi kami untuk lebih lanjut!</Text>
                <ChildrenButton />
            </View>
        </View>
    </View>
  )
}

export default BantuanScreen

const styles = StyleSheet.create({
    textTitle: {
        ...FontConfig.titleOne,
        color: Color.primaryText
    },
    textSubtitle: {
        ...FontConfig.bodyThree,
        color: Color.secondaryText,
        marginVertical: 10,
        width: '95%'
    }
})