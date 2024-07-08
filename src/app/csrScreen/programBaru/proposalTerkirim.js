import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import ImageSuccess from '../../../assets/images/proposal_terkirim.png'
import { Color, FontConfig } from '../../../theme'
import CustomButton from '../../../components/customButton'

const ProposalTerkirimScreen = ({navigation}) => {
    const handleLanjutkan = () => {
        navigation.pop();
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
        <View style={styles.topSection}>
            <Image source={ImageSuccess} style={styles.imageSuccess} />
            <Text style={styles.textLaporanBerhasil}>Proposal berhasil terkirim!</Text>
            <Text style={styles.textYuk}>Yeay, terima kasih sudah kirim proposal. Proposalmu akan ditinjau, harap tunggu ya..</Text>
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}><CustomButton onPress={handleLanjutkan} text="Selesai" fontStyles={{...FontConfig.buttonOne,
            color: Color.neutralZeroOne}} backgroundColor={Color.primaryMain} height={40}  /></View>
        </View>
    </View>
  )
}

export default ProposalTerkirimScreen

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
        width: '90%'
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '10%',
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