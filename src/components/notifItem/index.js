import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { height } from '../../assets/constants'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../utils/Utils';

const NotifItem = ({item, setTerpilih, terpilih, allChecked=false, setAllChecked, onPressNotif, navigation}) => {
    const [checked, setChecked] = useState(false);
    const [pressIn, setPressIn] = useState(false);
    const [more, setMore] = useState(false);
    const [isMore, setIsMore] = useState(false);
    const deviceTimeZone = moment.tz.guess(true);
    const [convertedDate, setConvertedDate] = useState("");

    // Make moment of right now, using the device timezone
    const today = moment().tz(deviceTimeZone);

    // Get the UTC offset in hours
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
    useEffect(()=>{
        const convertedToLocalTime = formatTimeByOffset(
            item.tanggal,
            currentTimeZoneOffsetInHours,
          );
        setConvertedDate(convertedToLocalTime);
    },[])
    checkedNotif = () => {
        setAllChecked(false);
        setTerpilih(terpilih-1);
    }

    unCheckedNotif = () => {
        setTerpilih(terpilih+1);
    }

    handleLongPress = () => {
        if(checked){
            checkedNotif();
        }else{
            unCheckedNotif();
        }
        setChecked(!checked);
    }

    handlePressNotif = () => {
        onPressNotif(item);
    }

    const handleTextLayout = (event) => {
        if(event.nativeEvent.lines.length > 3){
            setMore(true);
        }
    }

    useEffect(()=> {
        if(allChecked){
            setChecked(true);
        }else if(terpilih == 0){
            setChecked(false);
        }
    }, [allChecked])

    useEffect(()=> {
        if(terpilih == 0){
            setChecked(false);
        }
    }, [terpilih])

    return(
        <Pressable
           onPress={terpilih > 0 ? handleLongPress : handlePressNotif}
            style={{...styles.notifContainer, 
            backgroundColor: checked && terpilih > 0 ? Color.redOne : Color.neutralZeroOne}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{width: terpilih > 0 ? '90%' : '100%'}}>
                    <Text style={styles.textTitle}>{item.judul}</Text>
                    <View style={{height: 8}}></View>
                    <View style={styles.boxType}>
                        <Text style={styles.textType}>{item.kategori}</Text>
                    </View>
                    <View style={{height: 8}}></View>
                    {item.kategori != "Pengumuman" || isMore ? <Text style={styles.textDeskripsi}>{item.deskripsi}</Text> : 
                    <><Text onTextLayout={handleTextLayout} numberOfLines={3} style={styles.textDeskripsi}>{item.deskripsi}</Text>
                    {more ? <View style={{alignItems: 'flex-end'}}><Text onPress={handlePressNotif}
                        style={styles.textMore}>Lihat Selengkapnya</Text></View> : <></>}
                    </>
                    }
                    <View style={{height: 3}}></View>
                    <Text style={styles.textTanggal}>{convertedDate}</Text>
                    <View style={{height: 10}}></View>
                </View>
                {terpilih > 0 ? <View>
                    {!checked ? <Ionicons name={"radio-button-off"}
                     size={24} color={Color.neutralZeroFive}
                     /> : 
                     <Ionicons name={"checkmark-circle"} size={24} color={Color.primaryMain}/>
                    }
                </View> : <></>}
            </View>
            
        </Pressable>
    );
}

export default NotifItem

const styles = StyleSheet.create({
    notifContainer: {
        paddingHorizontal: 20,
        paddingTop: 15,
        borderColor: Color.lightBorder,
        borderBottomWidth: 1,
    },
    boxType: {
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderColor: Color.primaryMain,
        borderWidth: 1,
        alignSelf: 'baseline',
        alignItems: 'center',
        borderRadius: 24
    },
    textTitle: {
        ...FontConfig.titleThree,
        color: '#000000'
    },
    textType: {
        ...FontConfig.captionOne,
        color: Color.primaryMain,
    },
    textDeskripsi: {
        ...FontConfig.bodyThree,
        color: '#000000',
    },
    textMore: {
        ...FontConfig.bodyThree,
        color: Color.blue,
        marginVertical: 5
    },
    textTanggal: {
        ...FontConfig.bodyThree,
        color: Color.neutralColorGrayEight,
    },
})