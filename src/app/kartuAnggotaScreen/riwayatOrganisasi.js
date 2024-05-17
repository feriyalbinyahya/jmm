import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Color } from '../../theme'
import CheckPresent from '../../assets/images/icon/check_present.png'
import CheckPast from '../../assets/images/icon/check_past.png'
import Ionicons from 'react-native-vector-icons/Ionicons';

const RiwayatOrganisasi = () => {
    const RiwayatComponent = ({time, status, organisasi, date}) => {
        return(
            <View style={{flexDirection: 'row', marginVertical: 3}}>
                <Image source={time == "present" ? CheckPresent : CheckPast} 
                style={{width: 20, height: 43}} />
                <View>
                    <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                        <Text style={{...FontConfig.bodyFour, color: Color.neutral70}}>{`${status} - `}</Text>
                        <Text style={{...FontConfig.bodyFour, color: Color.neutral100, width: '90%'}}>{organisasi}</Text>
                    </View>
                    <View style={{height: 8}}></View>
                    <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                        <Ionicons name="calendar-outline" size={12} color={Color.primaryMain} />
                        <Text style={{...FontConfig.body5, color: Color.neutral70,
                        marginHorizontal: 3}}>{date}</Text>
                    </View>
                </View>
                
            </View>
        )
    }
  return (
    <View style={{backgroundColor: Color.neutralZeroOne, flex:1, padding: 10}}>
      {/**
        <View style={{height:20}}></View>
        <Text style={{...FontConfig.title3, color: Color.primaryText}}>Riwayat Keanggotaan</Text>
        <View style={{height:10}}></View>
        <RiwayatComponent time={"present"} status={status} organisasi={organisasi} date={date} />
        <RiwayatComponent time={"past"} status={status} organisasi={organisasi} date={date} />
        <RiwayatComponent time={"past"} status={status} organisasi={organisasi} date={date} /> */}
    </View>
  )
}

export default RiwayatOrganisasi

const styles = StyleSheet.create({})