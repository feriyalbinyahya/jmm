import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import React, {useState} from 'react'
import CardBerita from '../cardBerita';

const CustomCarousel = ({size, width, children, height}) => {
    const SIZE = size;
    const WIDTH = width;
    
  return (
    <ScrollView horizontal 
    showsHorizontalScrollIndicator={false} 
    style={{height: height}}
    bounces={false}
    snapToInterval={SIZE}
    decelerationRate='normal'
    >
      {children}
    </ScrollView>
  )
}

export default CustomCarousel

const styles = StyleSheet.create({

})