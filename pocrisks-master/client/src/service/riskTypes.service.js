import axios  from "axios";
import { API_HOST } from "../util/config";

export const getTypes = () => {
    return axios.get(`${API_HOST}types`);
}