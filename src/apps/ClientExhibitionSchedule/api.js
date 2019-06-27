import request, {getHeaders} from 'utils/request';
import {DATE_URL, EVENT_URL} from "./config";


const Api = {
    getSchedule: async (action) => {
        const {exhibition_id} = action;
        return request(
            {
                url: `/api/Schedule/?id=${exhibition_id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },

    deleteScheduleDate: async (action) => {
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
    deleteScheduleEvent: async (action) => {
        return request(
            {
                url: `${EVENT_URL}`,
                options: {
                    method: "DELETE",
                    headers: getHeaders(),
                    body: JSON.stringify({id: action.id})
                }
            }
        );
    },
};

export default Api;