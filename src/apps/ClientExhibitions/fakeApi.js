import request, {getHeaders} from 'utils/request';
import {fakeRequest} from "utils/fakeRequest";
import {SERVER} from "appConfig";
import {CLIENT_EXHIBITION_URL} from "./config";
import {getRandomInt} from "utils/index";

import {exhibitions} from 'apps/Exhibitions/mock/exhibitions.list'


const Api = {
    getExhibitionList: async (action) => {
        return fakeRequest(exhibitions)
    },
    addExhibition: async (action) => {
        return fakeRequest({id:getRandomInt(), ...action.data})
    },
    updateExhibition: async (action) => {
        const {id, data} = action;
        return request(
            {
                url: `${SERVER + CLIENT_EXHIBITION_URL}/${id}/`,
                options: {
                    method: "UPDATE",
                    headers: getHeaders(),
                    mode: 'cors',
                    body: JSON.stringify(data)
                }
            }
        );
    },
    deleteExhibition: async (action) => {
        return request(
            {
                url: `${SERVER + CLIENT_EXHIBITION_URL}/${action.id}/`,
                options: {
                    method: "DELETE",
                    headers: getHeaders(),
                    mode: 'cors',
                }
            }
        );
    },
};

export default Api;