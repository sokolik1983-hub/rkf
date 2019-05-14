import request, {getHeaders} from 'utils/request'
import {SERVER} from 'appConfig'

export const VALIDATE_PHONE = SERVER + '/api/Registration/checkphone';
export const VALIDATE_EMAIL = SERVER + '/api/Registration/checkemail';


export const validationRequest = async ({url, name, value, setFieldError}) => {
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append(name, value)
    return await request(
        {
            url: urlWithParams,
            options: {
                headers: getHeaders(),
                mode: 'cors',
            }
        })
        .catch(e => {
            if (e.responseStatus === 409) {
                setFieldError(name, e.response.error)
            }
        });
};