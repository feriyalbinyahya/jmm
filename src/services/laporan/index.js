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

getLaporanJenis = async () => {
    let headersToken = await getHeaders();
    return Request.get(`laporan/jenis`, {headers: headersToken});
}

getListLaporan = async (id, page, sortby, tag, status) => {
    let headersToken = await getHeaders();
    let uri = ""
    if (status == "Semua"){
        uri = `laporan/${id}?size=5&page=${page}&sort=${sortby}&filter=${tag}&status=`;
    }else{
        uri = `laporan/${id}?size=5&page=${page}&sort=${sortby}&filter=${tag}&status=${status}`;
    }
    return Request.post(uri, {}, {headers: headersToken});
}

getTagLaporan = async (id) => {
    let headersToken = await getHeaders();
    return Request.post(`laporan/tag/${id}`, {}, {headers: headersToken});
}

getStatusLaporan = async (id) => {
    let headersToken = await getHeaders();
    return Request.post(`laporan/count-status/${id}`, {}, {headers: headersToken});
}

getCapres = async ()=> {
    let headersToken = await getHeaders();
    return Request.get(`laporan/daftar-capres`, {headers: headersToken});
}

getDetail = async (id)=> {
    let headersToken = await getHeaders();
    return Request.get(`laporan/detail/${id}`, {headers: headersToken});
}

addLaporan = async (data) => {
    let headersToken = await getHeaders();
    return Request.post(`laporan/tambah`, data, {headers: headersToken,  timeout: 8000,});
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
    getCapres,
    addLaporan,
    getKawan,
    getDetail
  };
  
  export default LaporanServices;