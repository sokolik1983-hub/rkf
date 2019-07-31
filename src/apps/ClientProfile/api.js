import request, {getHeaders} from 'utils/request';

const Api = {
    getProfile: async (action) => {
        return request(
            {
                url: `/api/Club/full`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;