import { useSelector } from 'react-redux';
import Request from '../Request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SecondRequest from '../SecondRequest';

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

getLaporanJenis = async () => {
    let headersToken = await getHeaders();
    return Request.get(`laporan/jenis`, {headers: headersToken});
}

getListLaporan = async (id, page, sortby) => {
    console.log(`app/laporan/list/${id}?sort_by=${sortby}&page=${page}&size=5`);
    let headersToken = await getHeaders();
    return SecondRequest.get(`app/laporan/list/${id}?sort_by=${sortby}&page=${page}&size=5`, {headers: headersToken});
}

getTagLaporan = async (id) => {
    let headersToken = await getHeaders();
    return Request.post(`laporan/tag/${id}`, {}, {headers: headersToken});
}

getStatusLaporan = async (id) => {
    let headersToken = await getHeaders();
    return Request.post(`laporan/count-status/${id}`, {}, {headers: headersToken});
}

getTahapan = async ()=> {
    let headersToken = await getHeaders();
    return SecondRequest.get(`list-tahapan`, {headers: headersToken});
}

getDetail = async (id)=> {
    let headersToken = await getHeaders();
    return SecondRequest.get(`app/laporan/detail/${id}`, {headers: headersToken});
}

addLaporan = async (data) => {
    let headersToken = await getHeaders();
    return Request.post(`laporan/tambah`, data, {headers: headersToken});
}

createLaporan = async (id, data) => {
    let headersToken = await getHeaders();
    return SecondRequest.post(`app/laporan/create/${id}`, data, {headers: headersToken});
}

updateLaporan = async (id, data) => {
    let headersToken = await getHeaders();
    return SecondRequest.put(`app/laporan/update/${id}`, data, {headers: headersToken});
}

deleteLaporan = async (id) => {
    let headersToken = await getHeaders();
    return SecondRequest.delete(`app/laporan/delete/${id}`, {headers: headersToken});
}

getKawan = async (search)=> {
    let headersToken = await getHeaders();
    return Request.get(`laporan/list/simpatisan?search=${search}`, {headers: headersToken});
}

const LaporanServices = {
    getLaporanJenis,
    getListLaporan,
    getTagLaporan,
    getStatusLaporan,
    getTahapan,
    addLaporan,
    getKawan,
    getDetail,
    createLaporan,
    updateLaporan,
    deleteLaporan
  };
  
  export default LaporanServices;