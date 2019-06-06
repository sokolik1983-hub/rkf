import request, {getHeaders} from "utils/request";
//import {fakeRequest} from "utils/fakeRequest";

export const REGISTER = '/api/Registration';

const Api = {

    registerUser: async (action) => {
        return request(
            {
                url: REGISTER,
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