import request, {getHeaders} from 'utils/request';
export const EXHIBITION_PRICE = '/api/exhibitions/Price';

const Api = {
    addExhibitionPrice: async (action) => {
        return request(
            {
                url: EXHIBITION_PRICE,
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