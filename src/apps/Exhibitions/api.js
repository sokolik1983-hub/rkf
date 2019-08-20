
import request, {getHeaders} from "../../utils/request";

export const EXHIBITIONS_API = '/api/Exhibitions/Exhibition/list';


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
                url: `/api/Exhibitions?id=${action.id}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;