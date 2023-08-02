import Request from '../Request'

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


login = (data) => {
    return Request.post("user/login", data, {headers: headers, timeout: 8000,});
}

forgetPassword = (data) => {
    return Request.post("user/lupa-password", data, {headers: headers});
}

const LoginServices = {
    login,
    forgetPassword
  };
  
  export default LoginServices;
