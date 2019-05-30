import request, {getHeaders} from 'utils/request';
import {fakeRequest} from "utils/fakeRequest";
import {mockScheduleData} from './mockGetSchedule'
import {SERVER} from "appConfig";
import {DAY_URL, DAY_ITEM_URL} from "./config";


const Api = {
    getSchedule: async (action) => {
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
    addDay: async (action) => {
        return request(
            {
                url: SERVER + DAY_URL,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    mode: 'cors',
                    body: JSON.stringify(action.data)
                }
            }
        );
    },
    updateDay: async (action) => {
        const {id, data} = action;
        return request(
            {
                url: `${SERVER + DAY_URL}/${id}/`,
                options: {
                    method: "UPDATE",
                    headers: getHeaders(),
                    mode: 'cors',
                    body: JSON.stringify(data)
                }
            }
        );
    },
    deleteDay: async (action) => {
        return request(
            {
                url: `${SERVER + DAY_URL}/${action.id}/`,
                options: {
                    method: "DELETE",
                    headers: getHeaders(),
                    mode: 'cors',
                }
            }
        );
    },
    // DayItem
    addDayItem: async (action) => {
        return request(
            {
                url: SERVER + DAY_ITEM_URL,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    mode: 'cors',
                    body: JSON.stringify(action.data)
                }
            }
        );
    },
    updateDayItem: async (action) => {
        const {id, data} = action;
        return request(
            {
                url: `${SERVER + DAY_ITEM_URL}/${id}/`,
                options: {
                    method: "UPDATE",
                    headers: getHeaders(),
                    mode: 'cors',
                    body: JSON.stringify(data)
                }
            }
        );
    },
    deleteDayItem: async (action) => {
        return request(
            {
                url: `${SERVER + DAY_ITEM_URL}/${action.id}/`,
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