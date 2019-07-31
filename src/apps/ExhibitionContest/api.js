import request, {getHeaders} from "utils/request";
import {DATE_URL, EVENT_URL} from "./config";


const Api = {
    getContest: async (action) => {
        const {exhibition_id} = action;
        return request(
            {
                url: `/api/contest/Schedule?id=${exhibition_id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },

    deleteContestDate: async (action) => {
        return request(
            {
                url: `${DATE_URL}/${action.id}/`,
                options: {
                    method: "DELETE",
                    headers: getHeaders(),
                }
            }
        );
    },
    deleteContestEvent: async (action) => {
        return request(
            {
                url: `${EVENT_URL}?id=${action.id}`,
                options: {
                    method: "DELETE",
                    headers: getHeaders(),
                    //body: JSON.stringify({id: action.id})
                }
            }
        );
    },
};

export default Api;