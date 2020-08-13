import { number, string } from "yup";
import { reqText, numbersOnly } from "../../config.js";

const endpointGetFederations = '/api/clubs/Federation';

const validationSchema = distinction => ({...{
    id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    veterinary_contract_document_id: number().required(reqText).typeError(reqText),
    pedigree_number: numbersOnly().required(reqText),
    dog_name: string().required(reqText),
    payment_document_id: number().required(reqText).typeError(reqText),
    payment_date: string().required(reqText),
    payment_number: string().required(reqText),
    payment_name: string().required(reqText),
    inn: string(),
    comment: string()
}, ...(distinction === 'patella' ? {} : {roentgenogram_document_id: number().required(reqText).typeError(reqText)})});

const updateSchema = validationSchema;

const config = (distinction, profileType) => ({
    validationSchema: validationSchema(distinction),
    updateSchema: updateSchema(distinction),
    distinction, profileType,
    onSuccess: {
        next: (values, setRedirect, alias) => {window.alert('Заявка отправлена на рассмотрение');setRedirect(profileType === 'kennel' ? `/kennel/${alias}/documents/` : `/${alias}/documents/`);}
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        stampCodes: {
            url: id => (profileType === 'kennel' ? '/api/nurseries/nurserystampcode/nursery?id=' : '/api/clubs/ClubStampCode/club?id=') + id,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default)).map(m => ({value: m.stamp_code_id, label:m.stamp_code}))
        },
        declarants: {
            url: profileType === 'kennel' ? '/api/nurseries/nurserydeclarant/nursery_declarants' :'/api/clubs/Declarant/club_declarants',
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        }
    },
    url: `/api/requests/dog_health_check_request/${profileType === 'kennel' ? 'kennel' : ''}doghealthcheck${distinction}request`,
    get: `/api/requests/dog_health_check_request/${profileType === 'kennel' ? 'kennel' : ''}doghealthcheck${distinction}request`,
    responsibleLink: alias => profileType === 'kennel' ? `/kennel/${alias}/documents/responsible/form` : `/${alias}/documents/responsible/form`,
    initialValues: {
        federation_id: '',
        declarant_id: '',
        veterinary_contract_document_id: '',
        roentgenogram_document_id: '',
        pedigree_number: '',
        dog_name: '',
        payment_document_id: '',
        payment_date: '',
        payment_number: '',
        payment_name: '',
        inn: '',
        comment: ''
    }
})

export default config; 
