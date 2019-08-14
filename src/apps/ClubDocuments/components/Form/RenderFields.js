import React, {Fragment} from "react";
import {FormField, FormGroup, SubmitButton, FormControls} from "components/Form";
import {clubClubDocumentsConfig} from 'apps/ClubDocuments/config'

const {fields} = clubClubDocumentsConfig;
export const RenderFields = ({isUpdate}) =>
    <Fragment>
        <FormGroup inline>
            <FormField
                {...fields.name}
            />
            <FormField
                {...fields.url}
            />
            <FormControls>
                <SubmitButton>{isUpdate ? 'Обновить' : 'Добавить'}</SubmitButton>
            </FormControls>
        </FormGroup>

    </Fragment>;
