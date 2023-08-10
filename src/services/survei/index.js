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

getAllSurvei = async () => {
    let headersToken = await getHeaders();
    return Request.get(`survey`, {headers: headersToken});
}

getSurveyDetail = async (id) => {
    let headersToken = await getHeaders();
    return Request.get(`survey/${id}`, {headers: headersToken});
}

getPertanyaanSurvei = async(id)=> {
    let headersToken = await getHeaders();
    return Request.get(`survey/get-pertanyaan/${id}`, {headers: headersToken});
}

jawabSurvei = async (id, data) => {
    let headersToken = await getHeaders();
    return Request.post(`survey/jawab/${id}`, data, {headers: headersToken,});
}

const SurveiServices = {
    getAllSurvei,
    getSurveyDetail,
    getPertanyaanSurvei,
    jawabSurvei
  };
  
  export default SurveiServices;