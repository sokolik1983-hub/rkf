import React, {Fragment} from "react";
import {FormField, FormGroup, SubmitButton, FormControls} from "components/Form";
import {clubClubContactsConfig} from 'apps/ClubContacts/config'

const {fields} = clubClubContactsConfig;
export const RenderFields = ({isUpdate}) =>
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
            <FormControls>
                <SubmitButton>{isUpdate ? 'Обновить' : 'Добавить'}</SubmitButton>
            </FormControls>
        </FormGroup>

    </Fragment>;
