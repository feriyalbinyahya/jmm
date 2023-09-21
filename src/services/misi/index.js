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

const getHeadersFormData = async() => {
    let token = await getToken();
    return {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }
}

getStatusMisi = async () => {
    let headersToken = await getHeaders();
    return Request.get(`misi/count`, {headers: headersToken});
}

addMisi = async (id, data, type) => {
    console.log(data);
    let headersToken = await getHeadersFormData();
    return Request.post(`misi/${id}?type=${type}`, data, {headers: headersToken,});
}

getMisi = async (status, page)=> {
    let headersToken = await getHeaders();
    return Request.get(`misi?status_misi=${status}&size=5&page=${page}`, {headers: headersToken});
}

getMisiHomepage = async ()=> {
    let headersToken = await getHeaders();
    return Request.get(`misi/homepage`, {headers: headersToken});
}

getMisiDetail = async (id)=> {
    console.log(id);
    let headersToken = await getHeaders();
    return Request.get(`misi/${id}`, {headers: headersToken});
}

getMisiNotif = async (id)=> {
    console.log(id);
    let headersToken = await getHeaders();
    return Request.get(`misi/new/${id}`, {headers: headersToken});
}

const MisiServices = {
    getMisi,
    addMisi,
    getMisiDetail,
    getMisiNotif,
    getStatusMisi,
    getMisiHomepage
  };
  
  export default MisiServices;