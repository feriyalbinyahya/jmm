import { StyleSheet, Text, View, AnimationType, Platform , Dimensions, Pressable, Button, ScrollView, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import { Color, FontConfig } from '../../theme';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native/Libraries/PermissionsAndroid/PermissionsAndroid';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../utils/const';
import Geocoder from 'react-native-geocoding';
import HeaderWhite from '../../components/header/headerWhite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Marker } from 'react-native-maps'
import { hitungJarak } from '../../utils/gpsDistance';
import { coordinateDistance, checkInsideRadius, checkMultiInsideRadius, checkSingleRadiusWithMulti } from 'earth-coordinate-distance';
import YellowWarning from '../../components/warning/yellowWarning';
import { useSelector } from 'react-redux';
import Skeleton from '../../components/skeleton';
import { width } from '../../assets/constants';

const LokasiScreen = ({navigation}) => {
    const [mapRef, updateMapRef] = useState(null);
    const [onSelect, setOnSelect] = useState('');
    const {width, height} = Dimensions.get("window");
    const ASPECT_RATIO = width /height;
    const LATITUDE_DELTA = 0.004;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_POSITION = {
        latitude: -6.175392,
        longitude: 106.827153,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);

    const [choosenLatitude, setChoosenLatitude] = useState(0);
    const [choosenLongitude, setChoosenLongitude] = useState(0);
    const [address, setAddress] = useState('');
    const [addressIsLoading, setAddressIsLoading] = useState(false);
    const [isLocation, setIsLocation] = useState(true);
    Geocoder.init(GOOGLE_API_KEY);

    const location = useSelector(state => {
        return state.laporan.location;
    });

    handleSelected = (item) => {
        setOnSelect(item);
    }

    handleLanjutkan = () => {
        if(choosenLatitude && choosenLongitude != 0){
            location.setLokasi(address);
            location.setLat(`${choosenLatitude}`);
            location.setLong(`${choosenLongitude}`);
        }else{
            location.setLokasi(address);
            location.setLat(`${currentLatitude}`);
            location.setLong(`${currentLongitude}`);
        }
        navigation.goBack();
    }


    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location...');
        Geolocation.getCurrentPosition(
            (position) => {
                setLocationStatus('You are here');

                const currentLongitude = JSON.stringify(position.coords.longitude);

                const currentLatitude = JSON.stringify(position.coords.latitude);
                console.log(currentLatitude);
                getCurrentAddress(currentLatitude, currentLongitude);
                setCurrentLongitude(parseFloat(currentLongitude));
                setCurrentLatitude(parseFloat(currentLatitude));
            },
            (error) => {
                setLocationStatus(error.message);
            }
        );
    }

    const locationChange = (region) => {
        setAddressIsLoading(false);
        const format_region = {lat1: currentLatitude, lat2: region.latitude,
             lon1: currentLongitude, lon2: region.longitude};
        const option_one = {unit: 'meter',overrideEarthRadius: null}
        const jarak = coordinateDistance(format_region, option_one);
        setChoosenLatitude(region.latitude);
        setChoosenLongitude(region.longitude);
        
    }


    const setLocationStatus = (text) => {
        console.log(text);
    }

    const loadingAddress = () => {
        setAddressIsLoading(false);
    }

    const getCurrentAddress = (choosenLatitude, choosenLongitude) => {
        Geocoder.from(choosenLatitude, choosenLongitude)
		.then(json => {
        		var addressComponent = json.results[0].formatted_address;
                setAddress(addressComponent);
			    console.log(json.results[0]);
                console.log(choosenLatitude);
		})
		.catch(error => console.warn(error));
    }

    useEffect(()=> {
        getOneTimeLocation();
    }, []);

    useEffect(()=>{
        if(choosenLatitude !== 0 && choosenLongitude !== 0){
            getCurrentAddress(choosenLatitude, choosenLongitude);
        }
    }, [choosenLatitude])

    const Item = ({text, subtitle}) => (
        <Pressable onPress={()=> {handleSelected(text);}}>
            <View style={styles.selected}>
                <View>
                    <Text style={styles.title}>{text}</Text>
                    <Text>{subtitle}</Text>
                </View>
            </View>
        </Pressable>
      );

  return (
    <>
    {
    currentLatitude && currentLongitude != 0?
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        <HeaderWhite navigation={navigation} title="Lokasi" />
        <MapView style={styles.map} provider={PROVIDER_GOOGLE}
        showsUserLocation
        onRegionChange={loadingAddress}
        onRegionChangeComplete={locationChange}
        initialRegion={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }}
        >
            <Circle
                center={{
                    latitude: currentLatitude,
                    longitude: currentLongitude
                }}
                radius={150}
                strokeColor={Color.primaryMain}
             />
        </MapView>
        <View style={{position: 'absolute', left: width/2.17, top: height/3}}>
            <Ionicons name="location" size={22} color={Color.primaryMain} /></View>
        <View style={styles.container}>
            <View>
                <Text style={styles.textPilih}>Pilih Lokasi</Text>
                <ScrollView style={{height: 115}}>
                    <Text style={styles.textLokasiSaatIni}>Lokasi yang dipilih</Text>
                    <View style={{height: 5}}></View>
                    {(addressIsLoading || address == '') ?
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Skeleton width={width/1.2} height={40} style={{borderRadius: 5}} />
                        </View>:
                        <Item text={address} subtitle='' />
                    }
                </ScrollView>
                {isLocation? <></> : <YellowWarning text="Jarak antara lokasi yang ingin dipilih dengan lokasi Anda saat ini
                tidak boleh lebih dari 150 meter " />}
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.buttonContinue}><Button onPress={handleLanjutkan} disabled={!isLocation} color={Color.primaryMain} title="Lanjutkan" /></View>
            </View>
        </View>   
    </View> :
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        <HeaderWhite navigation={navigation} title="Lokasi" />
        <View style={{flex: 1, justifyContent: "center"}}><ActivityIndicator size="large" color={Color.primaryMain} /></View>
    </View>
    }
    </>
  )
}

export default LokasiScreen

const styles = StyleSheet.create({
    container: {
       borderTopLeftRadius: 15,
       borderTopRightRadius: 15,
       backgroundColor: Color.neutralZeroOne,
       width: '100%',
       height: '42%',
       marginTop: -5,
       justifyContent: 'space-between'
    },
    map: {
        height: '50%',
        width: '100%'
    },
    searchContainer: {
        width: '90%',
        height: 150,
        backgroundColor: Color.neutralZeroOne,
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8
    },
    input: {
        borderColor: Color.lightBorder,
        borderWidth: 1
    },
    textPilih: {
        ...FontConfig.titleTwo,
        color: '#000000',
        padding: 20
    },
    unSelected: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        paddingHorizontal:20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.neutralZeroThree
    },
    title: {
        ...FontConfig.titleThree,
        color: Color.title
    },
    textLokasiSaatIni: {
        ...FontConfig.titleThree,
        color: '#000000',
        paddingHorizontal: 20
    },
    buttonContinue: {
        borderRadius: 20, 
        width: '80%',
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: 70,
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