import {object, string} from "yup";

export const defaultReduxKey = 'legal_info';
export const endpointUrl = '/api/club/Legal';


export const clubBankInfoFormConfig = {
    formAction: endpointUrl,
    fields: {
        rs_number: {
            name: 'rs_number',
            label: 'rs_number'
        },
        bank_name: {
            name: 'name',
            label: 'name клуба',
        },
    },
    validationSchema: object().shape({
        //
    })
};