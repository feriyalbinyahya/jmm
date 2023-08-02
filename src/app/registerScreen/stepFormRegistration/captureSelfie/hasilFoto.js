import { StyleSheet, Text, View, Button, Pressable, Linking, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import HeaderRegistration from '../../../../components/headerRegistration'
import { Color, FontConfig } from '../../../../theme'
import CustomButton from '../../../../components/customButton'
import Utils from '../../../../utils/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { setFotoProfileRegistration } from '../../../../redux/registration'

const HasilFotoScreen = ({navigation, route}) => {
    const dispatch = useDispatch();
    const { imageSource } = route.params;
    const [imageBase64, setImageBase64] = useState('');

    handleLanjutkan = async() => {
      const dataImage = await Utils.readFileBase64(`file://${imageSource}`);
      //const dataImage = `file://${imageSource}`;
      //saveFotoProfileRegistration(dataImage);
      navigation.navigate("KodeReferralRegister", {photo: dataImage});
    }
    const saveFotoProfileRegistration = (image) => {
      dispatch(
        setFotoProfileRegistration({fotoProfile: image})
      );
    }
  return (
    <View style={styles.hasilFotoPage}>
      <HeaderRegistration navigation={navigation} numberStep={3} />
      <View style={styles.section}>
        <Text style={styles.textIsiData}>Hasil Foto</Text>
        <View style={{height: 30}}></View>
        <Image source={{uri: `file://${imageSource}`}} style={styles.imageSelfie}/> 
      </View>
      <View style={styles.bottomSection}>
        <CustomButton 
        borderColor={Color.primaryMain}
        borderWidth={1}
        text='Ambil Ulang' 
        fontStyles={{...FontConfig.buttonOne, color:Color.primaryMain}} 
        width='40%'
        height={50}
        onPress={()=>{
          navigation.navigate('AmbilFotoRegister', {path: 'HasilFotoRegister', type: 'holes'});
        }}
        />
        <View style={{width: '10%'}}></View>
        <CustomButton 
        text='Lanjut'
        onPress={handleLanjutkan} 
        fontStyles={{...FontConfig.buttonOne, color:Color.neutralZeroOne}}
        backgroundColor={Color.primaryMain} 
        borderColor={Color.primaryMain}
        width='40%'
        height={50}
        />
      </View>
    </View>
  )
}

export default HasilFotoScreen

const styles = StyleSheet.create({
    hasilFotoPage: {
        backgroundColor: Color.neutralZeroOne,
        height: '100%',
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: '71%',
        alignItems: 'center'
    },
    textIsiData: {
        ...FontConfig.titleOne,
        color: Color.grayThirteen,
    },
    imageSelfie: {
        width: 293,
        height: 285,
        borderRadius: 150
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '14%',
        paddingHorizontal: 20,
        flexDirection: 'row',
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
})