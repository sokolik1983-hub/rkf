import request, {getHeaders} from 'utils/request';

const Api = {
    getNews: async (action) => {
        return request(
            {
                url: `/api/ClubArticle/list`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;