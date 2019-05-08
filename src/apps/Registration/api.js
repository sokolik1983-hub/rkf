import request, {getHeaders} from "utils/request";
import {fakeRequest} from "utils/fakeRequest";

const SERVER = 'http://192.168.1.228:50003';

export const REGISTER = '/api/Registration';

const Api = {

    registerUser: async (action) => {
        return request(
            {
                url: SERVER + REGISTER,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    mode: 'cors',
                    body: JSON.stringify(action.data)
                }
            }
        );

        //return fakeRequest(null, {email:"error"})
    },
};

export default Api;