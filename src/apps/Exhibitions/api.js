import request from 'utils/request';
import {exhibitions} from 'apps/Exhibitions/mock/exhibitions.list'

export const EXHIBITIONS_API = '/api/v1/exhibitions/';

export const fakeRequest = (mockData, errors) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            errors
                ? reject({
                    error: errors
                })
                :
                resolve({data: mockData})
        );
    });
}

const Api = {
    fetchExhibitions: async () => {
        // return request(
        //     {
        //         url: EXHIBITIONS_API,
        //     }
        // );
        return fakeRequest(exhibitions)
    },
};

export default Api;