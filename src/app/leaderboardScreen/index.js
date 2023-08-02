import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderWhite from '../../components/header/headerWhite'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LaporanView from './LaporanView';
import ReferralView from './ReferralView';
import SurveyView from './SurveyView';
import { Color, FontConfig } from '../../theme';
import LeaderboardServices from '../../services/leaderboard';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const LeaderboardScreen = ({navigation}) => {
    const [dataLaporan, setDataLaporan] = useState([]);
    const [dataReferal, setDataReferal] = useState([]);
    const [dataSurvey, setDataSurvey] = useState([]);
    const [selfRankLaporan, setSelfRankLaporan] = useState(0);
    const [selfRankReferal, setSelfRankReferal] = useState(0);
    const [selfRankSurvey, setSelfRankSurvey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const namaOrganisasi = useSelector((state)=>{
        return state.credential.namaOrganisasi;
    })

    const getDataLeaderboard = () => {
        setIsLoading(true);
        LeaderboardServices.getLeaderboard()
        .then(res=>{
            setDataLaporan(res.data.data.laporan);
            setDataLaporan(res.data.data.referal);
            setDataLaporan(res.data.data.survey);
            setSelfRankLaporan(res.data.data.self_rank_laporan);
            setSelfRankReferal(res.data.data.self_rank_referal);
            setSelfRankSurvey(res.data.data.self_rank_survey);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getDataLeaderboard();
    },[])
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
        <HeaderWhite navigation={navigation} title="Leader Board" subtitle={namaOrganisasi} />
        <View style={{height: 20}}></View>
        { !isLoading ? <View style={styles.container}>
            <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: styles.textTabLabel,
                tabBarActiveTintColor: Color.primaryMain,
                tabBarInactiveTintColor: '#000000',
                tabBarIndicatorStyle: {backgroundColor: Color.primaryMain},
            }}
            >
                <Tab.Screen  name="Laporan" component={LaporanView} initialParams={{data: dataLaporan, selfRank: selfRankLaporan}} />
                <Tab.Screen name="Referral" component={ReferralView} initialParams={{data: dataReferal, selfRank: selfRankReferal}} />
                <Tab.Screen name="Survey" component={SurveyView} initialParams={{data: dataSurvey, selfRank: selfRankSurvey}} />
            </Tab.Navigator>
        </View> : <ActivityIndicator size="large" color={Color.graySix} style={{marginTop: 150}} />}
    </View>
  )
}

export default LeaderboardScreen

const styles = StyleSheet.create({
    container: {
        height: '80%',
        flex: 1
    },
    textTabLabel: {
        ...FontConfig.buttonZeroTwo
    }
})