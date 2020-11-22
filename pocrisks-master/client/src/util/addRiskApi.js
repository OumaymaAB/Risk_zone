import axios from "axios";
import { API_HOST } from "../util/config";

const URL = API_HOST + "saveRisk";

const addRiskApi = {
  addRiskApi: function (data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(URL, data, config);
  },
};

export default addRiskApi;
