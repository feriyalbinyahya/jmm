import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import ImageSuccess from '../../../assets/images/laporan_terkirim.png'
import { Color, FontConfig } from '../../../theme'

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
            <Text style={styles.textYuk}>Yuk, lebih sering buat laporan untuk tingkatkan poinmu.</Text>
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}><Button onPress={handleLanjutkan} color={Color.primaryMain} title="Selesai" /></View>
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
        width: 142,
        height: 171
    },
    textLaporanBerhasil: {
        ...FontConfig.titleOne,
        color: '#000000',
        marginVertical: 10
    },
    textYuk: {
        ...FontConfig.bodyTwo,
        color: '#7B7B7B',
        textAlign: 'center'
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