import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AllBeritaContainer from '../../components/berita/allBerita'
import ImageExample from '../../assets/images/example/laporan.png'

const ListAcaraScreen = ({navigation}) => {
  return (
    <AllBeritaContainer navigation={navigation} title="Acara" />
  )
}

export default ListAcaraScreen

const styles = StyleSheet.create({})