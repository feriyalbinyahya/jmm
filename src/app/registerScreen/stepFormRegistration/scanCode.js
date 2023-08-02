import { StyleSheet, Text, View, Pressable, Image, Linking, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import iconArrowLeft from '../../../assets/images/icon/icon_arrow_left.png'
import { Color, FontConfig } from '../../../theme'
import {Svg, Rect, Defs, Mask} from 'react-native-svg'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanKodeReferralScreen = ({navigation, setValue}) => {

    const CameraFrame = () => {
        return(
            <Svg height='100%' width='100%'>
                <Defs>
                    <Mask
                    id="mask"
                    x="0"
                    y="0"
                    height="100%"
                    width="100%"
                    >
                        <Rect height='100%' width='100%' fill='#fff' />

                        <Rect x='18%' y='20%' height='250' width='250' fill='black'  />
                        
                    </Mask>
                </Defs>
                <Rect width='100%' height='100%' fill='rgba(0, 0, 0, 0.7)' mask='url(#mask)' />
                {/** frame border */}
                <Rect x='18%' y='20%' height='250' width='250' stroke={Color.click}
                        strokeWidth={5} mask='url(#mask)' />
            </Svg>
        )
    }

    onSuccess = e => {
        setValue(e.data);
        //Linking.openURL(e.data).catch(err =>
          //console.error('An error occured', err)
        //);
        navigation.goBack();
      };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Image style={styles.iconArrowLeft} source={iconArrowLeft} /></Pressable>
        <View style={{alignItems: 'center', flex:1}}><Text style={styles.textDaftar}>Scan Referral</Text></View>
      </View>
      {/** QR Section */}
      <View style={styles.scanSection}>
        <QRCodeScanner
            cameraStyle={{marginTop: 70}}
            onRead={({data})=>alert(data)}
            flashMode={RNCamera.Constants.FlashMode.auto}
            bottomViewStyle={{height:0}}
        />
        <CameraFrame />
      </View>
    </View>
  )
}

export default ScanKodeReferralScreen

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: Color.grayOne,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#F0F0F0',

    },
    iconArrowLeft: {
        width: 24,
        height: 24
    },
    textDaftar: {
        ...FontConfig.titleOne,
        color: Color.title,
        marginLeft: -40
    },

})