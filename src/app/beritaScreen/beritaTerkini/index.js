import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AllBeritaContainer from '../../../components/berita/allBerita'
import ImageExample from '../../../assets/images/example/laporan.png'

const BeritaTerkiniScreen = ({navigation}) => {
  return (
    <AllBeritaContainer navigation={navigation} title="Berita Terkini" />
  )
}

export default BeritaTerkiniScreen

const styles = StyleSheet.create({})