import request, {getHeaders} from 'utils/request';
import {CLIENT_EXHIBITION_URL} from "./config";

const Api = {
    getExhibitionList: async (action) => {
        //TODO Remove this shit 001
        const url = action.user_id ? '/api/Exhibition/list' + '?user_id=' + action.user_id
            :
            '/api/Exhibition/list'
        return request(
            {
                url: url,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
    getExhibitionDetails: async (action) => {
        const {id} = action;
        return request(
            {
                url: `/api/Exhibition?id=${id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
    addExhibition: async (action) => {
        return request(
            {
                url: CLIENT_EXHIBITION_URL,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify(action.data)
                }
            }
        );
    },
    updateExhibition: async (action) => {
        const {id, data} = action;
        return request(
            {
                url: `${CLIENT_EXHIBITION_URL}/${id}/`,
                options: {
                    method: "UPDATE",
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                }
            }
        );
    },
    deleteExhibition: async (action) => {
        return request(
            {
                url: `${CLIENT_EXHIBITION_URL}/${action.id}/`,
                options: {
                    method: "DELETE",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;