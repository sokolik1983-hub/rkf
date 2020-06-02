import {number} from "yup";
const apiPedigreeStatusesEndpoint = '/api/requests/NurseryPedigreeRequest/statuses';

const validationSchema = {
    id: number(),
};

const updateSchema = {
    id: number(),
};

const config = {
    validationSchema, updateSchema,
    url: '/api/requests/pedigree_request/NurseryPedigreeDeclarantRequest/header',
    get: '/api/requests/NurseryPedigreeRequest',
    onSuccess: {
        create: (values, setRedirect, nurseryAlias) => values && values.id && setRedirect(`/nursery/${nurseryAlias}/documents/pedigree/${values.id}/declarant/form`),
    },
    options: {
        statuses: {
            url: apiPedigreeStatusesEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id),
        },
    },
    initialValues: {
        declarants: []
    }
}

export default config; 
