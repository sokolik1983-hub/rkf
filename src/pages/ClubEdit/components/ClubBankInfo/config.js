export const defaultReduxKey = 'club_bank';
export const endpointUrl = '/api/clubs/Bank';


export const clubBankInfoFormConfig = {
    action: endpointUrl,
    method: 'PUT',
    fields: {
        comment: {
            name: 'comment',
            label: 'Основная банковская информация',
            fieldType: 'textarea',
        },
    },
};