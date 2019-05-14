import request, {getHeaders} from "utils/request";
//import {fakeRequest} from "utils/fakeRequest";
import {SERVER} from "appConfig";

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