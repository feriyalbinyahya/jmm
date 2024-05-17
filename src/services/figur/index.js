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

getKategoriTokoh = async (jenis) => {
    let headersToken = await getHeaders();
    return Request.get(`kategori-${jenis}`, {headers: headersToken,});
}

getAfiliasi = async () => {
    let headersToken = await getHeaders();
    return Request.get(`afiliasi`, {headers: headersToken,});
}
getDukungan = async () => {
    let headersToken = await getHeaders();
    return Request.get(`dukungan-capres`, {headers: headersToken,});
}
getLingkup = async () => {
    let headersToken = await getHeaders();
    return Request.get(`lingkup-pengaruh`, {headers: headersToken,});
}

getRekomendasi = async () => {
    let headersToken = await getHeaders();
    return Request.get(`rekomendasi`, {headers: headersToken,});
}

getDataFigur = async (page, kategori) => {
    let headersToken = await getHeaders();
    return Request.get(`figur/${kategori}?size=5&page=${page}`, {headers: headersToken,});
}

getDataKabkot = async () => {
    let headersToken = await getHeaders();
    return Request.get(`kabkot?id_provinsi=`, {headers: headersToken,});
}

getCounterFigur = async () => {
    let headersToken = await getHeaders();
    return Request.get(`figur-counter`, {headers: headersToken,});
}

addFigur = async (data, jenis) => {
    let headersToken = await getHeaders();
    return Request.post(`figur?jenis_tokoh=${jenis}`, data, {headers: headersToken,});
}

getDetailFigur = async (id, jenis) => {
    let headersToken = await getHeaders();
    return Request.get(`figur/detail/${id}?jenis_tokoh=${jenis}`, {headers: headersToken,});
}


const FigurServices = {
    getKategoriTokoh,
    getAfiliasi,
    getDukungan,
    getLingkup,
    getRekomendasi,
    getDataFigur,
    getDataKabkot,
    getCounterFigur,
    addFigur,
    getDetailFigur
  };
  
  export default FigurServices;