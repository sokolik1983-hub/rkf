import React from 'react';
import { FormField, FormGroup } from 'components/Form';
import { clubInfoFormConfig } from 'apps/ClubInfo/config';
import { connect } from 'formik';

const { fields } = clubInfoFormConfig;

const regexp = RegExp('https?://.*');
const checkUrl = (e, formik) => {
    if (!regexp.test(e.target.value)) {
        alert('Адрес сайта должен начинаться с "http://" либо "https://"');
        formik.values.site = '';
    }
};

const RenderFields = ({ formik }) =>
    <>
        <FormGroup>
            <FormField
                {...fields.name}
            />
            <FormField
                {...fields.description}
            />
        </FormGroup>
        <h4>Фактический адрес клуба</h4>
        <FormField
            {...fields.city_id}
        />
        <FormField
            {...fields.address}
        />
        {/*<FormGroup inline>*/}
        {/*    <FormField*/}
        {/*        {...fields.work_time_from}*/}
        {/*    />*/}
        {/*    <FormField*/}
        {/*        {...fields.work_time_to}*/}
        {/*    />*/}
        {/*</FormGroup>*/}
        <FormField
            {...fields.site}
            onBlur={e => checkUrl(e, formik)}
        />
        {/*<FormControls>
            <SubmitButton type="submit" className="btn-simple btn-lg">Обновить</SubmitButton>
        </FormControls>*/}
    </>;


export default connect(RenderFields);