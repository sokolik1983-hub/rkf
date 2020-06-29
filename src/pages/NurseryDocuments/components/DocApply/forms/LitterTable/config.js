import {number} from "yup";
const apiLitterStatusesEndpoint = '/api/requests/CommonRequest/status';

const validationSchema = {
    id: number(),
};

const updateSchema = {
    id: number(),
};

const config = {
    validationSchema, updateSchema,
    url: '/api/requests/litter_request/NurseryLitterDeclarantRequest/header',
    get: '/api/requests/NurseryLitterRequest',
    onSuccess: {
        create: (values, setRedirect, alias) => values && values.id && setRedirect(`/kennel/${alias}/documents/litter/${values.id}/declarant/form`),
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
