import { StyleSheet, Text, View, Button, Pressable, Linking, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import HeaderRegistration from '../../../../components/headerRegistration'
import { Color, FontConfig } from '../../../../theme'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Svg, Rect, Defs, Mask} from 'react-native-svg'
import ButtonCamera from '../../../../assets/images/icon/button_camera.png'

const AmbilFotoScreen = ({navigation, route}) => {
    const camera = useRef(null);
    const devices = useCameraDevices();
    const devicesBack = useCameraDevices();
    const deviceFront = devices.front;
    const deviceBack = devicesBack.back;
    const [device, setDevice] = useState("front");
    const [showCamera, setShowCamera] = useState(false);
    const [imageSource, setImageSource] = useState('');
    const {path, type} = route.params;

    const firstHole = { x: 50, y: 150, width: 300, height: 300, borderRadius: 150 };
    const [holes, setHoles] = useState([firstHole]);

    getPermission = async() => {
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);
        if(permission === 'denied'){
            await Linking.openSettings();
        }
    }

    useEffect(()=> {
        getPermission();
        if(path == "UploadPhotoLaporan"){
            swapCamera();
        }
    }, []);

    const capturePhoto = async() => {
        if(camera.current !== null){
            const photo = await camera.current.takeSnapshot({quality: 50});
            setImageSource(photo.path);
            navigation.pop();
            navigation.navigate(path, {imageSource: photo.path});
        }
    }

    const swapCamera = () => {
        if(device == "front"){
            setDevice("back");
        }else{
            setDevice("front");
        }
    }

    if(deviceFront == null || deviceBack == null){
        return <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, 
        alignItems: 'center', justifyContent: 'center'}}>
            <Text>Camera not available</Text></View>
    }

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


  return (
    <>
        {showCamera? 
        <View style={{flex:1}}>
            <View style={{flex:1}}> 
                <Camera
                    ref={camera}
                    device={device== "front"? deviceFront : deviceBack}
                    isActive={showCamera}
                    style={StyleSheet.absoluteFill}
                    photo={true}
                />
            </View>
            <View style={styles.buttonSection}>
                <View style={{width: '44%'}}></View>
                <View style={styles.buttonCapturePhoto}>
                    <Pressable onPress={()=> capturePhoto()}>
                        <Image style={{width: 100, height: 100}} source={ButtonCamera} /></Pressable>
                </View>
                <View style={styles.buttonSwapCamera}>
                    <Pressable
                        style={styles.camButton}
                        onPress={()=> swapCamera()}>
                            <Ionicons name="sync" size={40} color={Color.primaryMain} />
                    </Pressable>
                </View>
            </View>
        </View> : 
        <View>
            <HeaderRegistration navigation={navigation} numberStep={5} />
            <View style={styles.section}>
                {imageSource !== null ?
                    <Image source={{uri: `file://${imageSource}`}} style={styles.image}/> 

                :null}
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.buttonContinue}><Button onPress={setShowCamera(true)} color={Color.primaryMain} title="Lanjutkan" /></View>
            </View>
        </View>
        }
    </>
  )
}

export default AmbilFotoScreen

const styles = StyleSheet.create({
    ambilSelfiePage: {
        backgroundColor: Color.neutralZeroOne,
        height: '100%',
    },
    buttonSection: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '12%',
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 10
    },
    buttonSwapCamera: {
        borderRadius: 20, 
        marginRight: 20
    },
    buttonSwapCamera: {
        borderRadius: 20, 
        paddingVertical: 20,
        paddingHorizontal: 60
    },
    buttonCapturePhoto: {
    },
    camButton : {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: Color.neutralZeroOne,
        color: Color.neutralZeroOne,
        borderBottomColor: 10
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 9 / 16
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: '73%'
    },
    textIsiData: {
        ...FontConfig.titleOne,
        color: Color.grayThirteen,
    },
    textLengkapi: {
        ...FontConfig.bodyTwo,
        color: Color.graySeven,
        marginTop: 5
    },
})