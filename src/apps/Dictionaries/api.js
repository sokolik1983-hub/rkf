import request from 'utils/request';
import {dictionariesInitialState} from "./config"
import {getHeaders} from "utils/request";

export const DEMO_API = '/api/demo/';


const Api = {
    getDict: async (action) => {
        return request(
            {
                url: dictionariesInitialState[action.dictName].url,
                options: {
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;