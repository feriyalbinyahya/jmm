import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import SuccessImage from '../../../assets/images/simpatisan_terkirim.png'
import CustomButton from '../../../components/customButton'
import { Color, FontConfig } from '../../../theme'

const DataSimpatisanTerkirim = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne,}}>
        <View style={{flex: 1, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: 170, height: 170}} source={SuccessImage} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.titleTwo, color: '#000000', textAlign: 'center'}}>Data berhasil terkirim!</Text>
            <View style={{height: 5}}></View>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, textAlign: 'center'}}>Yuk, lebih sering mendata kawan untuk tingkatkan poinmu.</Text>
            <View style={{height: 20}}></View>
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}>
                <CustomButton width='100%' height={45} text="Selesai"
                backgroundColor={Color.primaryMain}
                onPress={()=>{
                    navigation.pop();
                    navigation.pop();
                }}
                fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}}
                />
            </View>
        </View>
    </View>
  )
}

export default DataSimpatisanTerkirim

const styles = StyleSheet.create({
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
        width: '90%',
      },
})