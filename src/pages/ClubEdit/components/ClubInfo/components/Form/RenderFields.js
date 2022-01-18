import React from "react";
import {connect} from "formik";
import {FormField, FormGroup} from "../../../../../../components/Form";
import {clubInfoFormConfig} from "../../config";


const {fields} = clubInfoFormConfig;

const regexp = RegExp('https?://.*');

const checkUrl = (e, formik) => {
    if (!regexp.test(e.target.value)) {
        alert('Адрес сайта должен начинаться с "http://" либо "https://"');
        formik.values.site = '';
    }
};

const RenderFields = ({formik}) => (
    <>
        <FormGroup className='info'>
            <FormField {...fields.name}/>
            <FormField {...fields.description}/>
            <FormField {...fields.site} onBlur={e => checkUrl(e, formik)}/>
        </FormGroup>
        <FormGroup className='address'>
            <FormField {...fields.city_id}/>
            <FormField {...fields.address}/>
        </FormGroup>

    </>
);

export default connect(React.memo(RenderFields));