import { useSelector } from 'react-redux';
import Request from '../Request';
import AsyncStorage from '@react-native-async-storage/async-storage';

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const getToken = async() => {
    return await AsyncStorage.getItem('token');
}

const getHeaders = async() => {
    let token = await getToken();
    return {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

getLeaderboard = async (type) => {
    let headersToken = await getHeaders();
    return Request.get(`user/leaderboard?type=${type}`, {headers: headersToken, timeout: 8000,});
}

getLeaderboardNew = async (filter) => {
    let headersToken = await getHeaders();
    return Request.get(`user/leaderboard/jumlah/poin?filter=${filter}`, {headers: headersToken, timeout: 8000,});
}




const LeaderboardServices = {
    getLeaderboard,
    getLeaderboardNew,
  };
  
  export default LeaderboardServices;