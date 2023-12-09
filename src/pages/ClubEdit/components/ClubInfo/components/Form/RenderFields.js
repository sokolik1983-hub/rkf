import React from 'react';
import {connect} from 'formik';
import {clubInfoFormConfig} from '../../config';
import {FormField, FormGroup} from '../../../../../../components/Form';


const {fields} = clubInfoFormConfig;

const regexp = RegExp('https?://.*');

const checkUrl = (e, formik) => {
    if (!regexp.test(e.target.value)) {
        alert('Адрес сайта должен начинаться с "http://" либо "https://"');
        formik.values.site = '';
    }
};

const RenderFields = ({formik, isFederation}) => (
    <div>
        {isFederation
            ? <FormGroup className="info">
                <FormField {...fields.nameFed}/>
                <FormField {...fields.descriptionFed}/>
                <FormField {...fields.site} onBlur={e => checkUrl(e, formik)}/>
            </FormGroup>
            : <FormGroup className="info">
                <FormField {...fields.name}/>
                <FormField {...fields.description}/>
                <FormField {...fields.site} onBlur={e => checkUrl(e, formik)}/>
            </FormGroup>
        }
        <FormGroup className="address">
            <FormField {...fields.city_id}/>
            <FormField {...fields.address}/>
        </FormGroup>
    </div>
);

export default connect(React.memo(RenderFields));