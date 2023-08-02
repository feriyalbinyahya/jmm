import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import ListLaporanContainer from '../../components/laporan'
import FilterLaporan from '../../components/filterLaporan';
import ImageExample from '../../assets/images/example/laporan.png'
import { useSelector } from 'react-redux';
import LaporanServices from '../../services/laporan';

const LaporanScreen = ({navigation, route}) => {
    const laporanData = useSelector((state)=> {
      return state.laporan.jenisLaporan;
    })


  return (
    <ListLaporanContainer navigation={navigation} 
    idJenisLaporan={laporanData.id}
    title={laporanData.nama} 
    subtitle={laporanData.deskripsi} />
  )
}

export default LaporanScreen

const styles = StyleSheet.create({})