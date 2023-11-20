import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderWhiteNoBorder from '../../components/header/headerWhiteNoBorder'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PoinkuView from './PoinkuView';
import LeaderboardView from './LeaderboardView';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();
const PoinkuScreen = ({navigation, route}) => {
    const [dataLeaderborad, setDataLeaderboard] = useState([]);
    const [dataPoinku, setDataPoinku] = useState([]);
    const [selfRankLaporan, setSelfRankLaporan] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const {infoPoin} = route.params;
    const namaOrganisasi = useSelector((state)=>{
        return state.credential.namaOrganisasi;
    })
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhiteNoBorder subtitle={namaOrganisasi} title="Poinku" navigation={navigation} />
      { !isLoading ? <View style={styles.container}>
            <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: styles.textTabLabel,
                tabBarActiveTintColor: Color.primaryMain,
                tabBarInactiveTintColor: '#000000',
                tabBarIndicatorStyle: {backgroundColor: Color.primaryMain},
            }}
            >
                <Tab.Screen  name="Poinku" component={PoinkuView} initialParams={{navigation: navigation,
                infoPoin: infoPoin}} />
                <Tab.Screen name="Leaderboard" component={LeaderboardView} initialParams={{navigation: navigation}}/>
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