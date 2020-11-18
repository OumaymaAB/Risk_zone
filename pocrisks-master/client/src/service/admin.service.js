import axios  from "axios";
import { API_HOST } from "../util/config";

export const getUsers = () => {
    return axios.get(`${API_HOST}crud`);
}