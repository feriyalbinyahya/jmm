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

getAllVoucher = async (page) => {
    let headersToken = await getHeaders();
    return Request.get(`voucher?size=5&page=${page}`, {headers: headersToken});
}

getDetailVoucher = async (id) => {
    let headersToken = await getHeaders();
    return Request.get(`voucher/${id}`, {headers: headersToken});
}

getDetailRiwayatVoucher = async (id) => {
    console.log(`voucher/riwayat/${id}`)
    let headersToken = await getHeaders();
    return Request.get(`voucher/riwayat/${id}`, {headers: headersToken});
}

redeemVoucher = async (id) => {
    let headersToken = await getHeaders();
    return Request.post(`voucher/${id}`, {}, {headers: headersToken});
}

getAllRiwayatVoucher = async (page) => {
    let headersToken = await getHeaders();
    return Request.get(`voucher/riwayat?size=5&page=${page}`, {headers: headersToken});
}

getAllRiwayatPengumpulan = async (page, fromDate, toDate, kategori) => {
    let headersToken = await getHeaders();
    console.log(`voucher/riwayat-pengumpulan?size=5&page=${page}&tanggal_dari=${fromDate}&tanggal_sampai=${toDate}&kategori_poin=${kategori}`)
    return Request.get(`voucher/riwayat-pengumpulan?size=5&page=${page}&tanggal_dari=${fromDate}&tanggal_sampai=${toDate}&kategori_poin=${kategori}`, {headers: headersToken});
}


const VoucherServices = {
    getAllVoucher,
    getDetailVoucher,
    redeemVoucher,
    getAllRiwayatVoucher,
    getAllRiwayatPengumpulan,
    getDetailRiwayatVoucher
}
  
  export default VoucherServices;