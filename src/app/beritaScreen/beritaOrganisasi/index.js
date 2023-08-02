import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AllBeritaContainer from '../../../components/berita/allBerita'

const BeritaOrganisasiScreen = ({navigation}) => {
  return (
    <AllBeritaContainer navigation={navigation} title="Berita Daerah" />
  )
}

export default BeritaOrganisasiScreen

const styles = StyleSheet.create({})