//import request from 'utils/request';
import {fakeRequest} from 'utils/fakeRequest'

//export const DEMO_API = '/api/demo/';


const Api = {
    // fetchHomePage: async () => {
    //     return request(
    //         {
    //             url: DEMO_API,
    //         }
    //     );
    // },
    registerUser: async () => fakeRequest({})
};

export default Api;