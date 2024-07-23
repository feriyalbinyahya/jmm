import axios from "axios";
import { BASE_URL_CSR_API } from "../utils/environment";

const SecondRequest = axios.create({ baseURL: BASE_URL_CSR_API + '/v1/' });

export default SecondRequest