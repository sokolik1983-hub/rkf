import {number,string,boolean} from "yup";
import {reqText, numbersOnly} from "../../config.js";

const validationSchema = {
    id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    stamp_code: string().required(reqText).matches(/^[A-Z]{3}$/, {message:'Введите 3 латинские буквы'}),
    stamp_number: numbersOnly().required(reqText),
    personal_data_document_id: number().required(reqText).typeError(reqText),
    copy_pedigree_document_id: number().required(reqText).typeError(reqText),
    payment_document_id: number().required(reqText).typeError(reqText),
    payment_date: string().required(reqText),
    payment_number: string().required(reqText),
    payment_name: string().required(reqText),
    inn: string(),
    comment: string()
};

const updateSchema = validationSchema;

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        next: (values, setRedirect, alias) => {window.alert('Заявка отправлена на рассмотрение');setRedirect(`/${alias}/documents/`);}
    },
    options: {
        federations: {
            url: '/api/nurseries/nursery/nursery_federation',
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        stampCodes: {
            url: nurseryId => '/api/nurseries/nurserystampcode/nursery?id=' + nurseryId,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default)).map(m => ({value: m.stamp_code_id, label:m.stamp_code}))
        },
        declarants: {
            url: '/api/nurseries/nurserydeclarant/nursery_declarants',
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        }
    },
    url: '/api/requests/replace_pedigree_request/kennelreplacepedigreedeclaranterrorrequest',
    get: '/api/requests/replace_pedigree_request/kennelreplacepedigreedeclaranterrorrequest',
    initialValues: {
        federation_id: '',
        declarant_id: '',
        personal_data_document_id: '',
        copy_pedigree_document_id: '',
        payment_document_id: '',
        payment_date: '',
        payment_number: '',
        payment_name: '',
        inn: '',
        comment: ''
    }
}

export default config; 
