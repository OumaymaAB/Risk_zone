import axios  from "axios";
import { API_HOST } from "../util/config";

export const getGeoData = () => {
    
    return axios.get(API_HOST);
}