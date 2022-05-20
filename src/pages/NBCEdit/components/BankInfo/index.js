import React from 'react';
import { connect } from 'formik';
import Card from '../../../../components/Card';
import { FormField } from '../../../../components/Form';
import SubmitButton from '../../../../components/Form/SubmitButton';

import './styles.scss';

const BankInfo = ({ bank_comment }) => {

    return <Card className="nursery-schedule">
        <h3>Банковская информация</h3>
        <FormField {...bank_comment} />
        <SubmitButton>Сохранить</SubmitButton>
    </Card>
};

export default connect(BankInfo);