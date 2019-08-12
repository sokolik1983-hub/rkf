import React, {Fragment} from "react";
import {FormField, FormGroup, SubmitButton, FormControls} from "components/Form";
import {clubClubContactsConfig} from 'apps/ClubContacts/config'

const {fields} = clubClubContactsConfig;
export const RenderFields = () =>
    <Fragment>
        <FormGroup inline>
            <FormField
                {...fields.description}
            />
            <FormField
                {...fields.contact_type_id}
            />
            <FormField
                {...fields.value}
            />
        </FormGroup>
        <FormControls>
            <SubmitButton>Добавить</SubmitButton>
        </FormControls>
    </Fragment>;
