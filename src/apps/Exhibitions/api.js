
import request, {getHeaders} from "../../utils/request";

export const EXHIBITIONS_API = '/api/Exhibition/list';


const Api = {
    fetchExhibitions: async () => {
        return request(
            {
                url: EXHIBITIONS_API,
                options: {
                    headers: getHeaders()
                }
            }
        );
    },
    getDetails: async (action) => {
        return request(
            {
                url: `/api/Exhibition?id=${action.id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;