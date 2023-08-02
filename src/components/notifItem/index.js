import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { height } from '../../assets/constants'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons'

const NotifItem = ({item, setTerpilih, terpilih, allChecked=false, setAllChecked}) => {
    const [checked, setChecked] = useState(false);
    const [pressIn, setPressIn] = useState(false);
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
            onLongPress={handleLongPress} style={{...styles.notifContainer, 
            backgroundColor: checked && terpilih > 0 ? Color.redOne : Color.grayTwo}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{width: terpilih > 0 ? '90%' : '100%'}}>
                    <Text style={styles.textTitle}>{item.title}</Text>
                    <View style={{height: 8}}></View>
                    <View style={styles.boxType}>
                        <Text style={styles.textType}>{item.type}</Text>
                    </View>
                    <View style={{height: 8}}></View>
                    <Text style={styles.textDeskripsi}>{item.deskripsi}</Text>
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
        padding: 20,
        borderColor: Color.lightBorder,
    },
    boxType: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: Color.redOne,
        borderColor: Color.primaryMain,
        borderWidth: 1,
        alignSelf: 'baseline',
        alignItems: 'center'
    },
    textTitle: {
        ...FontConfig.titleThree,
        color: '#000000'
    },
    textType: {
        ...FontConfig.captionOne,
        color: Color.primaryMain
    },
    textDeskripsi: {
        ...FontConfig.bodyThree,
        color: Color.primaryText,
    },
})