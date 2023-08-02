import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import BottomSheet from "react-native-easy-bottomsheet";
import { FontConfig } from '../../theme';

const CustomBottomSheet = ({isModalVisible, setModalVisible, title, children}) => {
  return (
    <BottomSheet
        bottomSheetTitle={title}
        bottomSheetIconColor="#0A2463"
        bottomSheetStyle={styles.container}
        bottomSheetTitleStyle={styles.textTitle}
        onRequestClose={() => setModalVisible(!isModalVisible)}
        bottomSheetVisible={isModalVisible}
    >
        {children}
    </BottomSheet>
  )
}

export default CustomBottomSheet

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        maxHeight: "100%",
        minHeight: "15%",
    },
    textTitle: {
        ...FontConfig.titleTwo
    }
})