import axios from 'axios';
import { API_HOST } from "../util/config";

const URL = API_HOST+"saveRisk"

const addRiskApi = {

    addRiskApi: function(values){

        return axios.post(URL, {
          lt: values.lt,
          lg: values.lg,
          description: values.risk
        })
        .then( res => {
          console.log("result=" , res.data)
        })
        .catch(error => console.log("error ", values))

    }
}

export default addRiskApi;
