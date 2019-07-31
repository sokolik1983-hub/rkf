import request, {getHeaders} from 'utils/request';
import {endpointUrl} from './config'
const Api = {
    getClubInfo: async (action) => {
        return request(
            {
                url: `${endpointUrl}?id=${action.id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;