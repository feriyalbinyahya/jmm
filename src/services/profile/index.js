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

getProfile = async () => {
    let headersToken = await getHeaders();
    return Request.get(`user/profile`, {headers: headersToken});
}

putFullnameUsername = async (data) => {
    let headersToken = await getHeaders();
    return Request.put(`user/nama-username/update`, data, {headers: headersToken,  timeout: 8000,});
}

putFotoProfil = async (data) => {
    let headersToken = await getHeaders();
    return Request.put(`user/foto/update`, data, {headers: headersToken,  timeout: 8000,});
}

putNoHp = async (data) => {
    let headersToken = await getHeaders();
    return Request.put(`user/hp/update`, data, {headers: headersToken,  timeout: 8000,});
}

putPassword = async (data) => {
    let headersToken = await getHeaders();
    return Request.put(`user/password/update`, data, {headers: headersToken,  timeout: 8000,});
}

refreshToken = async (data) => {
    let headersToken = await getHeaders();
    return Request.post(`user/refreshToken`, data, {headers: headersToken});
}

privacyPolicy = async () => {
    let headersToken = await getHeaders();
    return Request.post(`user/registrasi/policy`, {}, {headers: headersToken});
}

blockPerson = async (id) => {
    let headersToken = await getHeaders();
    return Request.post(`block/user/${id}`, {}, {headers: headersToken});
}

unblockPerson = async (id) => {
    let headersToken = await getHeaders();
    return Request.delete(`unblock/user/${id}`, {headers: headersToken});
}

getListBlokir = async () => {
    let headersToken = await getHeaders();
    return Request.get(`block/users`, {headers: headersToken});
}


const ProfileServices = {
    getProfile,
    putFullnameUsername,
    putFotoProfil,
    putNoHp,
    putPassword,
    refreshToken,
    privacyPolicy,
    blockPerson,
    unblockPerson,
    getListBlokir
  };
  
  export default ProfileServices;