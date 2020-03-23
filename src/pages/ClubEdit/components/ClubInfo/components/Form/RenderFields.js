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
        <FormGroup>
            <FormField {...fields.name}/>
            <FormField {...fields.description}/>
        </FormGroup>
        <h4>Фактический адрес клуба</h4>
        <FormField {...fields.city_id}/>
        <FormField {...fields.address}/>
        <FormField {...fields.site} onBlur={e => checkUrl(e, formik)}/>
    </>
);

export default connect(React.memo(RenderFields));