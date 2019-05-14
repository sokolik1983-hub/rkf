import request, {getHeaders} from 'utils/request';
//import {fakeRequest} from "utils/fakeRequest";
import {SERVER} from "appConfig";



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