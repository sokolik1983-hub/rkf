//import request from 'utils/request';
import {fakeRequest} from "utils/fakeRequest";


export const LOGIN = '/api/auth/login/';

const fakeLoginData = {
    id: 1,
};

const Api = {
    loginUser: async (action) => {
        console.log(action);
        if (action.data.password.toString() === '123456') {
            return fakeRequest(fakeLoginData)
        }
        // return request(
        //     {
        //         url: EXHIBITIONS_API,
        //     }
        // );
        return fakeRequest(fakeLoginData, {
            password: ["Неверная комбинация Логин/Пароль"],
        })
    },
};

export default Api;