import { useSelector } from 'react-redux';
import SecondRequest from '../SecondRequest';
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

getAllProgram = async (page, status, sortby) => {
    console.log(`app/program/list?search&start_tanggal_dibuat&end_tanggal_dibuat&tanggal_proposal_csr_mulai&tanggal_proposal_csr_berakhir&tanggal_program_csr_mulai&tanggal_program_csr_berakhir&status_csr=${status}&page=${page}&size=5&sort_by=${sortby}`)
    let headersToken = await getHeaders();
    return SecondRequest.get(`app/program/list?search&start_tanggal_dibuat&end_tanggal_dibuat&tanggal_proposal_csr_mulai&tanggal_proposal_csr_berakhir&tanggal_program_csr_mulai&tanggal_program_csr_berakhir&status_csr=${status}&page=${page}&size=5&sort_by=${sortby}`, {headers: headersToken});
}

getProgramHomepage = async () => {
    let headersToken = await getHeaders();
    return SecondRequest.get(`app/program/list?search&start_tanggal_dibuat&end_tanggal_dibuat&tanggal_proposal_csr_mulai&tanggal_proposal_csr_berakhir&tanggal_program_csr_mulai&tanggal_program_csr_berakhir&status_csr&page=1&size=3&sort_by=desc`, {headers: headersToken});
}

getProgramDetail = async (id) => {
    let headersToken = await getHeaders();
    return SecondRequest.get(`app/program/detail/${id}`, {headers: headersToken});
}

getJumlahProgram = async() =>{
    let headersToken = await getHeaders();
    return SecondRequest.get(`app/program/total`, {headers: headersToken});
}

getPertanyaanSurvei = async(id)=> {
    let headersToken = await getHeaders();
    return SecondRequest.get(`survey/get-pertanyaan/${id}`, {headers: headersToken});
}

jawabSurvei = async (id, data) => {
    let headersToken = await getHeaders();
    return SecondRequest.post(`survey/jawab/${id}`, data, {headers: headersToken,});
}

const ProgramServices = {
    getAllProgram,
    getProgramDetail,
    getPertanyaanSurvei,
    jawabSurvei,
    getProgramHomepage,
    getJumlahProgram
  };
  
  export default ProgramServices;