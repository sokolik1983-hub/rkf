//import request from 'utils/request';
import {exhibitions} from 'apps/Exhibitions/mock/exhibitions.list'
import {fakeRequest} from 'utils/fakeRequest'

//export const EXHIBITIONS_API = '/api/v1/exhibitions/';


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