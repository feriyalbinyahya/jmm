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

getAllTerkini = async (page, sort, filter, search, jenis_berita) => {
    let headersToken = await getHeaders();
    return Request.get(`berita/terkini?size=5&page=${page}&sort=${sort}&filter=${filter}&search=${search}&jenis_berita=${jenis_berita}`, {headers: headersToken});
}

getDetailBerita = async (id_berita) => {
    let headersToken = await getHeaders();
    return Request.get(`berita/detail/${id_berita}`, {headers: headersToken});
}

getAllOrganisasi = async (page, sort, filter, search) => {
    let headersToken = await getHeaders();
    return Request.get(`berita/organisasi?size=5&page=${page}&sort=${sort}&filter=${filter}&search=${search}`, {headers: headersToken});
}

getKomentarByBerita = async (id_berita, page) => {
    let headersToken = await getHeaders();
    return Request.get(`berita/komen/${id_berita}?size=10&page=${page}`, {headers: headersToken})
}

getFilterBerita = async(type) => {
    let headersToken = await getHeaders();
    return Request.get(`berita/semua/tag/${type}`, {headers: headersToken})
}

likeKomentar = async(id) => {
    let headersToken = await getHeaders();
    return Request.post(`berita/komen/${id}/like`, {}, {headers: headersToken})
}

likeBerita= async(id) => {
    let headersToken = await getHeaders();
    return Request.post(`berita/${id}/like-unlike`, {}, {headers: headersToken})
}

addKomentar = async(data, id) => {
    let headersToken = await getHeaders();
    return Request.post(`berita/${id}/komen`, data, {headers: headersToken})
}

balasKomentar = async(data, id) => {
    let headersToken = await getHeaders();
    return Request.post(`berita/komen/${id}/reply`, data, {headers: headersToken})
}

getBeritaHomepage = async (type) => {
    let headersToken = await getHeaders();
    return Request.get(`berita/homepage/${type}`, {headers: headersToken});
}

getBalasanByKomen = async (id_komen, page) => {
    let headersToken = await getHeaders();
    return Request.get(`berita/reply/${id_komen}?size=5&page=${page}`, {headers: headersToken})
}

getKategori = async (type) => {
    let headersToken = await getHeaders();
    return Request.get(`berita/semua/kategori/${type}`, {headers: headersToken})
}

const BeritaServices = {
    getAllTerkini,
    getAllOrganisasi,
    getDetailBerita,
    getKomentarByBerita,
    likeKomentar,
    likeBerita,
    addKomentar,
    balasKomentar,
    getFilterBerita,
    getBeritaHomepage,
    getBalasanByKomen,
    getKategori
  };
  
  export default BeritaServices;