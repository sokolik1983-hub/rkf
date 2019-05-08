import request, {getHeaders} from 'utils/request';
//import {fakeRequest} from "utils/fakeRequest";

const SERVER = 'http://192.168.1.8:50003';

export const LOGIN = '/api/Authentication';


const Api = {
    loginUser: async (action) => {
        return request(
            {
                url: SERVER + LOGIN,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    mode: 'cors',
                    body: JSON.stringify(action.data)
                }
            }
        );
    },
};

export default Api;