import React from "react";
import {FormField, FormGroup} from "../../../../../../components/Form";
import {clubClubDocumentsConfig} from "../../config";

const {fields} = clubClubDocumentsConfig;


const RenderFields = ({isUpdate}) => (
    <FormGroup inline>
        <FormField {...fields.url} isUrl={true}/>
        <FormField {...fields.name}/>
    </FormGroup>
);

export default React.memo(RenderFields);