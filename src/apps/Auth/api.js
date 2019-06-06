import request, {getHeaders} from 'utils/request';
export const LOGIN = '/api/Authentication';

const Api = {
    loginUser: async (action) => {
        return request(
            {
                url: LOGIN,
                options: {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify(action.data)
                }
            }
        );
    },
};

export default Api;