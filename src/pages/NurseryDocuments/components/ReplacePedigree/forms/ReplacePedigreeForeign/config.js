import { number, string } from "yup";
import { reqText } from "../../config.js";
import Common from "../../commonFields.js";

const endpointGetFederations = '/api/clubs/Federation';

const validationSchema = {
    id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    personal_data_document_id: number().required(reqText).typeError(reqText),
    copy_foreign_pedigree_document_id: number().required(reqText).typeError(reqText),
    application_verk_statement_document_id: number().required(reqText).typeError(reqText),
    ...Common.validation,
    breed_id: number().required(reqText).typeError(reqText),
    dog_name: string().required(reqText),
    owner_name: string().required(reqText),
    stamp_code: string().when('chip_number', {
        is: value => !value,
        then: string().matches(/^[a-zA-Z]{3}$/, { message: 'Введите 3 латинские буквы' }).required(reqText)
    }),
    stamp_number: string().when('chip_number', {
        is: value => !value,
        then: string().matches(/^[0-9.-]*$/, { message: 'Можно использовать только цифры' }).required(reqText)
    }),
    chip_number: number().typeError('Можно использовать только цифры').test(function (value) {
        const { path, parent, createError } = this;
        const { stamp_code, stamp_number, } = parent;
        if (!stamp_code && !stamp_number && !value) return createError({ path, message: reqText });
        return true;
    })
};

const updateSchema = validationSchema;

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        next: (values, setRedirect, alias) => { window.alert('Заявка отправлена на рассмотрение'); setRedirect(`/kennel/${alias}/documents/`); }
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a, b) => a.id - b.id).map(m => ({ value: m.id, label: m.short_name }))
        },
        declarants: {
            url: '/api/nurseries/nurserydeclarant/nursery_declarants',
            mapping: data => data.sort((a, b) => Number(b.is_default) - Number(a.is_default))
        },
        breeds: {
            url: '/api/dog/Breed',
            mapping: data => data.filter(f => typeof f.id === 'number' && f.id !== 1).map(m => ({ value: m.id, label: m.name })),
        },
        ...Common.options
    },
    url: '/api/requests/replace_pedigree_request/nurseryreplacepedigreeforeignrequest',
    get: '/api/requests/replace_pedigree_request/nurseryreplacepedigreeforeignrequest',
    initialValues: {
        federation_id: '',
        declarant_id: '',
        personal_data_document_id: '',
        copy_foreign_pedigree_document_id: '',
        application_verk_statement_document_id: '',
        ...Common.initial,
        breed_id: '',
        dog_name: '',
        owner_name: '',
        stamp_code: '',
        stamp_number: '',
        chip_number: ''
    }
}

export default config; 
