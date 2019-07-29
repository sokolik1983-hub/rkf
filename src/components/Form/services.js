import {objectNotEmpty, varIsArray, varIsObject} from "utils/index";
import {withFormik} from "formik";
import {formikHandleSubmit} from './formikHandleSubmit'




const genInitialsFromFields = fields => {
    if (varIsArray(fields)) {
        return genInitialsFromArray(fields)
    }
    if (varIsObject) {
        return genInitialsFromObject(fields)
    }

    return {}
};

const genInitialsFromArray = fields => {
    const initials = {};
    fields.forEach(field => initials[field.name] = field.defaultValue !== undefined ?
        field.defaultValue
        :
        field.isMulti ? [] : "");
    return initials;
};


const genInitialsFromObject = fields => {
    const initials = {};
    Object.keys(fields).forEach(key =>
        initials[key] = fields[key].defaultValue !== undefined ?
            fields[key].defaultValue
            :
            fields[key].isMulti ? [] : ""
    );
    return initials;
};

export const getFormInitialValues = ({formInitials, fields}) => {
    return varIsObject(formInitials) ?
        formInitials
        :
        genInitialsFromFields(fields);
};


export const processRequestErrors = props => {
    const {requestErrors, setErrors, clearRequestErrors} = props;
    if (requestErrors && objectNotEmpty(requestErrors)) {
        clearRequestErrors();
        setErrors(requestErrors);
    }
};


const defaultWithFormikObject = {
    mapPropsToValues: props => getFormInitialValues({
        fields: props.fields,
        formInitials: props.formInitials
    }),
    validationSchema: props => props.validationSchema,
    handleSubmit: (values, {props, ...other}) => props.formSubmit(values, {...other}),
    displayName: props => props.displayName ? props.displayName : 'FormikFormEnhanced', // helps with React DevTools
};

export const defaultWithFormik = withFormik(
    defaultWithFormikObject
);

const defaultWithFormikEnhancedObject = {
    ...defaultWithFormikObject,
    handleSubmit: (values, {props, ...formik}) =>
        formikHandleSubmit({
            isUpdate: props.isUpdate,
            isMultipart: props.isMultipart,
            url: props.formAction, // POST Url
            data: props.transformValues ? props.transformValues(values) : values, // Form data
            successAction: props.onSuccess, // called with response JSON
            formik,
            storageVariableName: props.storageVariableName
        }),
};

export const defaultWithFormikEnhanced = withFormik(
    defaultWithFormikEnhancedObject
);
