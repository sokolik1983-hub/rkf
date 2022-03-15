import React from "react";
import {FormField, FormGroup} from "../../../../../../components/Form";
import {clubBankInfoFormConfig} from "../../config";

const {fields} = clubBankInfoFormConfig;

const RenderFields = () => (
    <FormGroup>
        <FormField {...fields.comment}/>
    </FormGroup>
);

export default React.memo(RenderFields);