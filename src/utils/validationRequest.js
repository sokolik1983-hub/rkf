import request, {getHeaders} from 'utils/request'

export const VALIDATE_PHONE = '/api/Registration/checkphone';
export const VALIDATE_EMAIL = '/api/Registration/checkemail';


export const validationRequest = async ({url, name, value, setFieldError}) => {
    const urlWithParams = `${url}?${name}=${value}`;
    return await request(
        {
            url: urlWithParams,
            options: {
                headers: getHeaders(),
            }
        })
        .catch(e => {
            if (e.responseStatus === 409) {
                setFieldError(name, e.response.error)
            }
        });
};