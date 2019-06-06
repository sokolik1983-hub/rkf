import request, {getHeaders} from 'utils/request';
//import {fakeRequest} from "utils/fakeRequest";
//import {mockScheduleData} from './mockGetSchedule'
import {DAY_URL, DAY_ITEM_URL} from "./config";


const Api = {
    getSchedule: async (action) => {
        const {exhibition_id} = action;
        return request(
            {
                url: `/api/exhibition/Shedule/?id=${exhibition_id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
    addDay: async (action) => {
        return request(
            {
                url: DAY_URL,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify(action.data)
                }
            }
        );
    },
    updateDay: async (action) => {
        const {id, data} = action;
        return request(
            {
                url: `${DAY_URL}/${id}/`,
                options: {
                    method: "UPDATE",
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                }
            }
        );
    },
    deleteDay: async (action) => {
        return request(
            {
                url: `${DAY_URL}/${action.id}/`,
                options: {
                    method: "DELETE",
                    headers: getHeaders(),
                }
            }
        );
    },
    // DayItem
    addDayItem: async (action) => {
        return request(
            {
                url: DAY_ITEM_URL,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify(action.data)
                }
            }
        );
    },
    updateDayItem: async (action) => {
        const {id, data} = action;
        return request(
            {
                url: `${DAY_ITEM_URL}/${id}/`,
                options: {
                    method: "UPDATE",
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                }
            }
        );
    },
    deleteDayItem: async (action) => {
        return request(
            {
                url: `${DAY_ITEM_URL}/${action.id}/`,
                options: {
                    method: "DELETE",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;