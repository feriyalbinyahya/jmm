import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Skeleton from '../skeleton'

const BeritaDaerahSkeleton = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Skeleton width={74} height={74} style={{borderRadius: 6}} />
      <View style={{width: 10}}></View>
      <View style={{justifyContent: 'space-around'}}>
        <Skeleton width={200} height={15} style={{borderRadius: 6}} />
        <Skeleton width={200} height={25} style={{borderRadius: 6}} />
        <Skeleton width={200} height={15} style={{borderRadius: 6}} />
      </View>
    </View>
  )
}

export default BeritaDaerahSkeleton

const styles = StyleSheet.create({})