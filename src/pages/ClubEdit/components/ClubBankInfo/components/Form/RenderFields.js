import React from "react";
import {FormField, FormGroup} from "../../../../../../components/Form";
import {clubBankInfoFormConfig} from "../../config";

const {fields} = clubBankInfoFormConfig;

const RenderFields = () => (
    <FormGroup>
        <FormField {...fields.rs_number}/>
        <FormField {...fields.bank_name}/>
    </FormGroup>
);

export default React.memo(RenderFields);