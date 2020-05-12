import request from "../utils/request";
import {getHeaders} from "../utils/request";
import {dictionariesInitialState} from "./config"


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
    }
};

export default Api;