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

getPesan = async () => {
    let headersToken = await getHeaders();
    return Request.get(`notifikasi/pesan`, {headers: headersToken});
}

postToken = async (token, data) => {
    return Request.post(`user/fcmtoken`, data, {headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }});
}



const NotifikasiServices = {
    getPesan,
    postToken
  };
  
  export default NotifikasiServices;