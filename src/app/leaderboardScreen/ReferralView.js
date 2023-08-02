import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import LeaderboardContainer from '../../components/leaderboardContainer.js'
import LeaderboardServices from '../../services/leaderboard/index.js';

const ReferralView = () => {
    const [dataLaporan, setDataLaporan] = useState([]);
    const [selfRankLaporan, setSelfRankLaporan] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getDataLeaderboard = () => {
        setIsLoading(true);
        LeaderboardServices.getLeaderboard("referral")
        .then(res=>{
            setDataLaporan(res.data.data[0].leaderBoard);
            setSelfRankLaporan({self_rank_laporan: res.data.data[0].self_rank, total_poin: res.data.data[0].total_poin});
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getDataLeaderboard();
    },[])
    
    const myRank = {
        id: '1',
        nama: 'Aldrin',
        poin: 60,
    }
  return (
    <>{!isLoading ? <LeaderboardContainer data={dataLaporan} myRank={selfRankLaporan} /> : <View><Text>hai</Text></View>}</>
  )
}

export default ReferralView

const styles = StyleSheet.create({})