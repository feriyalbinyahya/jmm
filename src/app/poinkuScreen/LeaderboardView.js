import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import LeaderboardServices from '../../services/leaderboard';
import LeaderboardContainer from '../../components/leaderboardContainer.js';


const LeaderboardView = () => {
    const [dataLaporan, setDataLaporan] = useState([]);
    const [selfRankLaporan, setSelfRankLaporan] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getDataLeaderboard = () => {
        setIsLoading(true);
        LeaderboardServices.getLeaderboardNew("organisasi")
        .then(res=>{
            console.log(res.data.data);
            setDataLaporan(res.data.data.leaderBoard);
            setSelfRankLaporan({self_rank_laporan: res.data.data.self_rank, total_poin: res.data.data.total_poin});
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
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
    <>{!isLoading ? <LeaderboardContainer data={dataLaporan} myRank={selfRankLaporan} /> : <View></View>}</>
  )
}

export default LeaderboardView

const styles = StyleSheet.create({})