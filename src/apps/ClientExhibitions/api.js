import request, {getHeaders} from 'utils/request';
import {fakeRequest} from "utils/fakeRequest";
import {SERVER} from "appConfig";
import {CLIENT_EXHIBITION_URL} from "./config";


const Api = {
    getExhibitionList: async (action) => {
        const {exhibition_id} = action;
        return request(
            {
                url: `${SERVER}/api/exhibition/schedule/?exhibition_id=${exhibition_id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                    mode: 'cors',
                }
            }
        );
    },
    addExhibition: async (action) => {
        return request(
            {
                url: SERVER + CLIENT_EXHIBITION_URL,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    mode: 'cors',
                    body: JSON.stringify(action.data)
                }
            }
        );
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