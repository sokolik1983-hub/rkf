import React, {memo} from "react";
import Card from "../../../../../components/Card";
import {FormField} from "../../../../../components/Form";
import {SubmitButton} from "../../../../../components/Form";
import {editFormFields} from "../config";


const BankSection = ({errors}) => {
    const {bank_comment} = editFormFields;

    return (
        <Card className="nbc-edit__bank-section">
            <h3>Банковская информация</h3>
            <FormField {...bank_comment} />
            <SubmitButton>Сохранить</SubmitButton>
            {errors && !!Object.keys(errors).length &&
                <div className="nbc-edit__is-valid">Не все необходимые поля заполнены</div>
            }
        </Card>
    );
};

export default memo(BankSection);