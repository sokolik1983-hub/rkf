import request, {getHeaders} from 'utils/request';

const Api = {
    getNews: async (action) => {
        const {clubId} = action;
        return request(
            {
                url: `/api/News/List?club=${clubId}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;