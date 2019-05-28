import request, {getHeaders} from 'utils/request';
import {fakeRequest} from "utils/fakeRequest";
import {mockScheduleData} from './mockGetSchedule'
import {SERVER} from "appConfig";
import {DAY_URL, DAY_ITEM_URL} from "./config";

import {getRandomInt} from 'utils/index'

const Api = {
    getSchedule: async () => {
        return fakeRequest(mockScheduleData)
    },
    addDay: async (action) => {
        const day = {id: getRandomInt(), items: [], ...action.data.date};
        return fakeRequest(day)
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

        return fakeRequest({id: getRandomInt(), ...action.data})
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