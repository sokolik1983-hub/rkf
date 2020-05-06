import {number} from "yup";

const validationSchema = {
    id: number(),
};

const updateSchema = {
    id: number(),
};

const config = {
    validationSchema, updateSchema,
    url: '/api/requests/pedigree_request/PedigreeDeclarantRequest/header',
    get: '/api/requests/PedigreeRequest',
    onSuccess: {
        create: (values, setRedirect, clubAlias) => values && values.id && setRedirect(`/${clubAlias}/documents/pedigree/${values.id}/declarant/form`),
    },
    options: {},
    initialValues: {
        declarants: []
    }
}

export default config; 
