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

getAllAcara = async (page, filter, search) => {
    let headersToken = await getHeaders();
    return Request.get(`/acara?size=5&page=${page}&filter=${filter}&search=${search}`, {headers: headersToken});
}

getAcaraHomepage = async () => {
    let headersToken = await getHeaders();
    return Request.get(`acara/homepage`, {headers: headersToken});
}

getKategori = async () => {
    let headersToken = await getHeaders();
    return Request.get(`acara/kategori`, {headers: headersToken})
}

batalAcara = async (id) => {
    let headersToken = await getHeaders();
    return Request.post(`acara/batal/${id}`, {}, {headers: headersToken})
}

daftarAcara = async (id) => {
    let headersToken = await getHeaders();
    return Request.post(`acara/daftar/${id}`, {}, {headers: headersToken})
}

const AcaraServices = {
    getAllAcara,
    getAcaraHomepage,
    getKategori,
    batalAcara,
    daftarAcara
}
  
  export default AcaraServices;