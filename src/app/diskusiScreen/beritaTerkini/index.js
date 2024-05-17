import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AllBeritaContainer from '../../../components/berita/allBerita'
import ImageExample from '../../../assets/images/example/laporan.png'

const DiskusiScreen = ({navigation}) => {
  return (
    <AllBeritaContainer navigation={navigation} title="Diskusi" />
  )
}

export default DiskusiScreen

const styles = StyleSheet.create({})