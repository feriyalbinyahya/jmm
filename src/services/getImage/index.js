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

getImage = async (type, nama_foto) => {
    let headersToken = await getHeaders();
    return Request.get(`get-image?tipe=${type}&nama_foto=${nama_foto}`, {headers: headersToken});
}


const ImageServices = {
    getImage,
  };
  
  export default ImageServices;