import request, {getHeaders} from 'utils/request';

const Api = {
    getNews: async (action) => {
        const {clubId} = action;
        return request(
            {
                url: `/api/ClubArticle/list?profileId=${clubId}`,
                options: {
                    method: "GET",
                    headers: getHeaders(),
                }
            }
        );
    },
};

export default Api;