import request, {getHeaders} from 'utils/request'
import {isDevEnv, debounce} from "./index";
import {SERVER} from 'appConfig'

export const VALIDATE_PHONE = isDevEnv() ? SERVER + '/api/Registration/checkphone' : '/api/Registration/checkphone';
export const VALIDATE_EMAIL = isDevEnv() ? SERVER + '/api/Registration/checkemail' : '/api/Registration/checkemail';


export const validationRequest = async ({url, name, value, setFieldError, setLoading}) => {
    setLoading(true);
    const response = await fetch(
        `${url}?${name}=${value}`,
        {headers: getHeaders()}
    );
    const result = await response.json();
    if (result.errors.length === 1) {
        setFieldError(name, result.errors[0].message)
    }
    setLoading(false);
};

export const validationTestAsync = async ({url, name, value}) => {
    const response = await fetch(
        `${url}?${name}=${value}`,
        {headers: getHeaders()}
    );
    const result = await response.json();
    return !(result.errors.length === 1)
};

export const debouncedValidationTestAsync = debounce(validationTestAsync, 30);
