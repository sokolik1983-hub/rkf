import {objectNotEmpty, varIsArray, varIsObject} from "utils/index";

const genInitialsFromFields = fields => {
    if (varIsArray(fields)) {
        return genInitialsFromArray(fields)
    }
    if (varIsObject) {
        return genInitialsFromObject(fields)
    }
    console.log('genInitialsFromFields invalid fields argument', fields)
    return {}
};

const genInitialsFromArray = fields => {
    const initials = {};
    fields.forEach(field => initials[field.name] = field.defaultValue !== undefined ?
        field.defaultValue
        :
        "");
    return initials;
};


const genInitialsFromObject = fields => {
    const initials = {};
    Object.keys(fields).forEach(key =>
        initials[key] = fields[key].defaultValue !== undefined ?
            fields[key].defaultValue
            :
            ""
    );
    return initials;
};

export const getFormInitialValues = ({formInitials, fields}) => formInitials ?
    formInitials
    :
    genInitialsFromFields(fields);


export const processRequestErrors = props => {
    const {requestErrors, setErrors, clearRequestErrors} = props;
    if (requestErrors && objectNotEmpty(requestErrors)) {
        clearRequestErrors();
        setErrors(requestErrors);
    }
};