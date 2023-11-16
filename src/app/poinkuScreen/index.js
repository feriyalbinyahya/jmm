import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderWhiteNoBorder from '../../components/header/headerWhiteNoBorder'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PoinkuView from './PoinkuView';

const Tab = createMaterialTopTabNavigator();
const PoinkuScreen = ({navigation}) => {
    const [dataLeaderborad, setDataLeaderboard] = useState([]);
    const [dataPoinku, setDataPoinku] = useState([]);
    const [selfRankLaporan, setSelfRankLaporan] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhiteNoBorder title="Poinku" navigation={navigation} />
      { !isLoading ? <View style={styles.container}>
            <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: styles.textTabLabel,
                tabBarActiveTintColor: Color.primaryMain,
                tabBarInactiveTintColor: '#000000',
                tabBarIndicatorStyle: {backgroundColor: Color.primaryMain},
            }}
            >
                <Tab.Screen  name="Poinku" component={PoinkuView} />
                <Tab.Screen name="Leaderboard" component={PoinkuView} />
            </Tab.Navigator>
        </View> : <ActivityIndicator size="large" color={Color.graySix} style={{marginTop: 150}} />}
    </View>
  )
}

export default PoinkuScreen

const styles = StyleSheet.create({
    container: {
        height: '80%',
        flex: 1
    },
    textTabLabel: {
        ...FontConfig.buttonZeroTwo
    }
})