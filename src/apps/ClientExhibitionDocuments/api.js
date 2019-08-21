import request, {getHeaders} from 'utils/request';

const Api = {
    getExhibitionDocuments: async (action) => {
        return request(
            {
                url: `/api/exhibitions/DocumentLink/list`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;