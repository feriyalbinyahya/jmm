import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderWhite from '../../components/header/headerWhite'
import CardProgram from '../../components/cardProgram'
import { Color, FontConfig } from '../../theme'

const CSRScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite title={`CSR`} navigation={navigation} />
      <View style={{height: 20}}></View>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20}}>
        <Text style={{...FontConfig.button3, color: Color.hitam}}>Daftar Program</Text>
      </View>
      <ScrollView style={{padding: 20}}>
        <CardProgram berita={`Lorem ipsum dolor sit amet, consecte adipiscing elit`} tanggal={`2023-09-20T09:36:00.000Z`} id={`5b51428c-5c38-410e-9663-4fd59dd7301a`} image={``} navigation={navigation}/>
        <CardProgram berita={`Lorem ipsum dolor sit amet, consecte adipiscing elit`} baru={false} tanggal={`2023-09-20T09:36:00.000Z`} id={`5b51428c-5c38-410e-9663-4fd59dd7301a`} image={``} navigation={navigation}/>
        <CardProgram berita={`Lorem ipsum dolor sit amet, consecte adipiscing elit`} baru={false} tanggal={`2023-09-20T09:36:00.000Z`} id={`5b51428c-5c38-410e-9663-4fd59dd7301a`} image={``} navigation={navigation}/>
        <View style={{height: 20}}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CSRScreen

const styles = StyleSheet.create({})