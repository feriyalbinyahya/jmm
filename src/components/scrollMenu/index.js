import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme';

const ScrollMenuButton = ({data, value, setValue, keyMenu, onPressMenu=()=>{}}) => {
  return (
    <ScrollView
    horizontal={true}
    pagingEnabled={false}
    showsHorizontalScrollIndicator={false}
    >
      {data?.map((item, index)=> {
        let topik = item;
        if(topik.includes(value)){
            return(
                <Pressable onPress={
                    ()=> {
                        
                    }} key={index} style={styles.menuSelected}>
                    <Text style={styles.textMenuSelected}>{topik}</Text>
                </Pressable>
            );
        }else{
            return(
                <Pressable onPress={()=> {
                    setValue(topik);
                    onPressMenu(keyMenu[index]);
                    }} key={index} style={styles.menuUnselected}>
                    <Text style={styles.textMenuUnselected}>{topik}</Text>
                </Pressable>
            );
        }
      })}
    </ScrollView>
  )
}

export default ScrollMenuButton

const styles = StyleSheet.create({
    menuSelected: {
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderColor: Color.primaryMain,
        backgroundColor: Color.primaryMain,
        borderWidth: 1,
        marginHorizontal: 5,
        height: 32,
        borderRadius: 32,
        justifyContent: 'center'
    },
    textMenuSelected: {
        color: Color.neutralZeroOne,
        ...FontConfig.bodyFour
    },
    menuUnselected: {
        paddingVertical: 3,
        height: 32,
        paddingHorizontal: 12,
        borderColor: Color.neutralZeroSix,
        borderWidth: 1,
        marginHorizontal: 5,
        borderRadius: 32,
        justifyContent: 'center'
    },
    textMenuUnselected: {
        color: Color.primaryText,
        ...FontConfig.bodyFour
    },
})