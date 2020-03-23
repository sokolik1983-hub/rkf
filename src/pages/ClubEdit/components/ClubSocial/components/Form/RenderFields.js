import React from "react";
import {FormField, FormGroup, SubmitButton, FormControls} from "../../../../../../components/Form";
import { clubClubSocialConfig } from "../../config";


const {fields} = clubClubSocialConfig;

const RenderFields = ({isUpdate}) => (
    <>
        <FormGroup inline>
            <FormField {...fields.site} isUrl={true}/>
            <FormField {...fields.description}/>
            <FormControls>
                <SubmitButton>{isUpdate ? 'Обновить' : 'Добавить'}</SubmitButton>
            </FormControls>
        </FormGroup>
    </>
);

export default React.memo(RenderFields);