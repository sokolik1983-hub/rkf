import React from "react";
import {FormField, FormGroup} from "../../../../../../components/Form";
import {clubLegalInfoFormConfig} from "../../config";

const {fields} = clubLegalInfoFormConfig;

const RenderFields = () => (
    <>
        <FormGroup inline>
            <FormField disabled {...fields.name}/>
        </FormGroup>
        <FormGroup inline>
            <FormField disabled {...fields.owner_position}/>
            <FormField disabled {...fields.owner_name}/>
        </FormGroup>
        <FormGroup inline>
            <FormField disabled {...fields.inn}/>
            <FormField disabled {...fields.kpp}/>
        </FormGroup>
        <FormGroup inline>
            <FormField disabled {...fields.ogrn}/>
            <FormField disabled {...fields.okpo}/>
        </FormGroup>
        <FormGroup inline>
            <FormField disabled {...fields.registration_date}/>
        </FormGroup>
        <FormGroup inline>
            <FormField disabled {...fields.address}/>
        </FormGroup>
    </>
);

export default React.memo(RenderFields);