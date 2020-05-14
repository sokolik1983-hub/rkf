import {number} from "yup";
const apiLitterStatusesEndpoint = '/api/requests/CommonRequest/statuses';

const validationSchema = {
    id: number(),
};

const updateSchema = {
    id: number(),
};

const config = {
    validationSchema, updateSchema,
    url: '/api/requests/litter_request/LitterDeclarantRequest/header',
    get: '/api/requests/LitterRequest',
    onSuccess: {
        create: (values, setRedirect, clubAlias) => values && values.id && setRedirect(`/${clubAlias}/documents/litter/${values.id}/declarant/form`),
    },
    options: {
        statuses: {
            url: apiLitterStatusesEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id),
        },
    },
    initialValues: {
        declarants: []
    }
}

export default config; 
