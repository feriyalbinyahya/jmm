import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import LoadingJson from '../../assets/splash/loadingGray.json'
import Logo from '../../assets/images/logo_splash.png'
import { width } from '../../assets/constants'
import { Color } from '../../theme'

const SplashScreen = ({setIsLoading}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: Color.neutralZeroOne}}>
        <Image style={styles.logo} source={Logo}  />
        <LottieView 
        source={LoadingJson}
        autoPlay
        style={[
            {
            transform: [{scale: 0.2}],
            },
        ]}
        loop={false}
        resizeMode='cover'
        onAnimationFinish={()=>setIsLoading(false)}
        />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    logo: {
        width: 78,
        height: 78,
        marginTop: '55%'
    }
})