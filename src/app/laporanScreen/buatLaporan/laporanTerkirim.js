import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import ImageSuccess from '../../../assets/images/laporan_terkirim.png'
import { Color, FontConfig } from '../../../theme'
import CustomButton from '../../../components/customButton'

const LaporanTerkirimScreen = ({navigation}) => {
    const handleLanjutkan = () => {
        navigation.pop();
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
        <View style={styles.topSection}>
            <Image source={ImageSuccess} style={styles.imageSuccess} />
            <Text style={styles.textLaporanBerhasil}>Laporan berhasil terkirim!</Text>
            <Text style={styles.textYuk}>Yuk, lebih sering buat laporan untuk proposal CSR.</Text>
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}><CustomButton onPress={handleLanjutkan} text="Selesai" fontStyles={{...FontConfig.buttonOne,
            color: Color.neutralZeroOne}} backgroundColor={Color.primaryMain} height={44}  /></View>
        </View>
    </View>
  )
}

export default LaporanTerkirimScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Color.neutralZeroOne,
    },
    topSection: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%'
    },
    imageSuccess: {
        width: 232,
        height: 170
    },
    textLaporanBerhasil: {
        ...FontConfig.titleTwo,
        color: '#000000',
        marginVertical: 10
    },
    textYuk: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroSeven,
        textAlign: 'center',
        width: '80%'
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 10
    },
    buttonContinue: {
        borderRadius: 20, 
        width: '80%',
    },
})