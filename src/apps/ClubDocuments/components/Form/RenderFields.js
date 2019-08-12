import React, {Fragment} from "react";
import {FormField, FormGroup, SubmitButton, FormControls} from "components/Form";
import {clubClubDocumentsConfig} from 'apps/ClubDocuments/config'

const {fields} = clubClubDocumentsConfig;
export const RenderFields = () =>
    <Fragment>
        <FormGroup inline>
            <FormField
                {...fields.name}
            />
            <FormField
                {...fields.url}
            />
        </FormGroup>
        <FormControls>
            <SubmitButton>Добавить</SubmitButton>
        </FormControls>
    </Fragment>;
