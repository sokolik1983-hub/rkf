import request from 'utils/request';


export const DEMO_API = '/api/demo/';



const Api = {
    loginUser: async () => {
        return request(
            {
                url: DEMO_API,
            }
        );
    },
};

export default Api;