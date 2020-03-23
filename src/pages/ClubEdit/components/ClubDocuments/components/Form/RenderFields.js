import React from "react";
import {FormField, FormGroup, SubmitButton, FormControls} from "../../../../../../components/Form";
import {clubClubDocumentsConfig} from "../../config";

const {fields} = clubClubDocumentsConfig;


const RenderFields = ({isUpdate}) => (
    <FormGroup inline>
        <FormField {...fields.url} isUrl={true}/>
        <FormField {...fields.name}/>
        <FormControls>
            <SubmitButton>{isUpdate ? 'Обновить' : 'Добавить'}</SubmitButton>
        </FormControls>
    </FormGroup>
);

export default React.memo(RenderFields);