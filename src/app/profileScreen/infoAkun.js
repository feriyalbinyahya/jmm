import { Pressable, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import HeaderWhite from '../../components/header/headerWhite'
import { Color, FontConfig } from '../../theme';
import IconEdit from '../../assets/images/icon/icon_edit.png'

const InfoAkunScreen = ({navigation, route}) => {
    const {phone, password} = route.params;
    const account = [phone, password];
    const subjectAccount = [
        {text: "Nomor Ponsel", editPath: "UbahAkunProfile"}, 
        {text:"Kata Sandi", editPath:"KodeOTPRegister"}
    ];
  return (
    <SafeAreaView style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        <HeaderWhite navigation={navigation} title={`Info Akun`} />
        <View style={{height: 10}}></View>
        <View style={{paddingHorizontal: 20}}>
            {subjectAccount.map((item, index) => {
                return(
                    <View key={index} style={styles.editInfoAkun}>
                        <View style={styles.rowSection}>
                            <Text style={styles.textSubject}>{item.text}</Text>
                            <Text style={styles.textData}>{account[index]}</Text>
                        </View>
                        {item.text == "Kata Sandi" ? <Pressable onPress={()=> {
                        navigation.navigate(item.editPath, 
                        {phone: phone, onPress: "ubahakun"});
                        }}>
                        <Image style={styles.iconEdit} source={IconEdit} /></Pressable> : <></>}
                    </View>
                );
            })}
        </View>
    </SafeAreaView>
  )
}

export default InfoAkunScreen

const styles = StyleSheet.create({
    textSubject: {
        ...FontConfig.body5,
        color: Color.neutral70,
        width: '35%'
    },
    textData: {
        ...FontConfig.buttonFour,
        color: Color.title,
        marginLeft: 10,
        marginTop: 3
    },
    iconEdit: {
        width: 16,
        height: 16
    },
    editInfoAkun: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowSection: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        width: '85%'
    },
})