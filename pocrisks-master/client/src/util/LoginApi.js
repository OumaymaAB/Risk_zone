import { createBrowserHistory } from "history";
import axios from 'axios';
import { API_HOST } from "../util/config";

var history = createBrowserHistory();

const URL = API_HOST+"signin"

const LoginApi = {

    LoginApi: function(values){

        return axios.post(URL, {
          username: values.username,
          password: values.password,
        })
    }
}

export default LoginApi;
