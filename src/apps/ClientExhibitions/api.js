import request, {getHeaders} from 'utils/request';
import {CLIENT_EXHIBITION_URL} from "./config";

const Api = {
    getExhibitionList: async (action) => {
        return request(
            {
                url: '/api/Exhibitions/Exhibition/list',
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
                url: `/api/Exhibitions/Exhibition/${id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
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