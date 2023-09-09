import Request from '../Request'

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


getAllPekerjaan = () => {
    return Request.get("user/daftar-pekerjaan", {headers: headers});
}

getInterest = async ()=> {
    return Request.get(`user/interest`, {headers: headers});
}

getAllProvinsi = () => {
    return Request.get("daerah/provinsi", {headers: headers});
}

getAllKota = (idProvinsi) => {
    return Request.get(`daerah/kabkot/${idProvinsi}`, {headers: headers});
}

getAllKecamatan = (idKota) => {
    return Request.get(`daerah/kecamatan/${idKota}`, {headers: headers});
}

getAllKelurahan = (idKecamatan) => {
    return Request.get(`daerah/kelurahan/${idKecamatan}`, {headers: headers});
}

getIdOrganisasi = (data) => {
    return Request.post("organisasi/kode-referal", data, {headers});
}

getOrganisasiByProvinsi = (data) => {
    return Request.post("organisasi/get-all-by-provinsi", data, {headers});
}

getDataOrganisasi = (idOrganisasi) => {
    return Request.post(`organisasi/details/${idOrganisasi}`, {headers});
}

getOtp = (data) => {
    return Request.post("user/generate-otp", data, {headers: headers});
}

registration = (data) => {
      console.log(data);
    return Request.post("user/registrasi", data, {timeout: 8000,});
}

verifyOtp = (data) => {
    return Request.post("user/verifikasi-otp", data, {headers: headers, timeout: 8000,});
}

checkUsername = (data) => {
    return Request.post("user/cek-username", data, {headers: headers});
}

checkPhone = (data) => {
    return Request.post("user/cek-no-hp", data, {headers: headers});
}

const RegistrationService = {
    getAllPekerjaan,
    getAllProvinsi,
    getAllKota,
    getAllKecamatan,
    getAllKelurahan,
    getOtp,
    getIdOrganisasi,
    getDataOrganisasi,
    getOrganisasiByProvinsi,
    registration,
    verifyOtp,
    checkUsername,
    checkPhone,
    getInterest
  };
  
  export default RegistrationService;
