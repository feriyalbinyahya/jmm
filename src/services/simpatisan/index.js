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

getAllSimpatisan = async (page, provinsi, kota, search) => {
    let headersToken = await getHeaders();
    return Request.get(`simpatisan/all?size=5&page=${page}&provinsi=${provinsi}&kabkot=${kota}&search=${search}`, {headers: headersToken,});
}

getDetailSimpatisan = async (id) => {
    let headersToken = await getHeaders();
    return Request.get(`simpatisan/${id}`, {headers: headersToken,});
}

addSimpatisan = async (data) => {
    let headersToken = await getHeaders();
    return Request.post(`simpatisan/daftar`, data, {headers: headersToken,});
}

updateSimpatisan = async (id, data) => {
    let headersToken = await getHeaders();
    return Request.put(`simpatisan/${id}`, data, {headers: headersToken,});
}

getReferalSimpatisan = async (referal) => {
    let headersToken = await getHeaders();
    return Request.get(`user/ref/${referal}`, {headers: headersToken,});
}

getCapres = async ()=> {
    let headersToken = await getHeaders();
    return Request.get(`daftar/capres`, {headers: headersToken});
}

const SimpatisanServices = {
    addSimpatisan,
    getAllSimpatisan,
    getDetailSimpatisan,
    updateSimpatisan,
    getReferalSimpatisan,
    getCapres
  };
  
  export default SimpatisanServices;