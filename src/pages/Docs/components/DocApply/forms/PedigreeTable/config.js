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
    options: {},
    initialValues: {
        declarants: []
    }
}

export default config; 
