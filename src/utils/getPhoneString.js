import {beautify} from "./phone";

export const getPhoneString = (main_phone, contactsList) => {
    let phonesStr = '';

    if (main_phone) phonesStr += `${main_phone.value}, `;

    if (contactsList && !!contactsList.length) {
        contactsList.filter(item => item.contact_type_id === 1).slice(1).map(contact => (
            phonesStr += `${beautify(contact.value)}, `
        ))
    };

    return phonesStr.substring(0, phonesStr.length - 2);
};