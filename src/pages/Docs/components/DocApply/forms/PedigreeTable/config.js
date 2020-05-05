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
    options: {
        declarants: {
            url: '/api/requests/pedigree_request/PedigreeRequestHeader',
            mapping: data => data.declarants
        }
    },
    initialValues: {
        declarants: []
    }
}

export default config; 
