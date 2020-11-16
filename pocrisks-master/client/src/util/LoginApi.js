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
        .then( res => {
          console.log("result=" , res.data.status)
          if (res.data.status === 200 )
          {
              window.location.href="/admin/map"
              history.push("/admin/map")
          }
          else if(res.data.status === 201)
          {
              window.location.href="/client/map"
              history.push("/client/map")
          }
        })
        .catch(error => console.log("error ", values))

    }
}

export default LoginApi;
