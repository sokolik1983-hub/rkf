import React from 'react';
import { Form, FormField } from 'components/Form';
import { connect } from 'formik';
import config, { fields } from './config';
import './styles.scss';

const IndividualRegistration = () => <Form {...config} className="IndividualRegistration">
    {fields.map((f, key) => <FormField key={key} type={f.type} label={f.label} name={f.name} placeholder={f.placeholder} />)}
    <button type="submit">Зарегистрироваться</button>
</Form>;

export default connect(IndividualRegistration);