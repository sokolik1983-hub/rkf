import React, { Fragment } from "react";
import { FormField, FormGroup, SubmitButton, FormControls } from "components/Form";
import { clubClubSocialConfig } from 'apps/ClubSocial/config'

const { fields } = clubClubSocialConfig;
export const RenderFields = ({ isUpdate }) =>
    <Fragment>
        <FormGroup inline>
            <FormField
                {...fields.site}
                isUrl={true}
            />
            <FormField
                {...fields.description}
            />
            {/*<FormField
                {...fields.social_network_type_id}
            />*/}
            <FormControls>
                <SubmitButton>{isUpdate ? 'Обновить' : 'Добавить'}</SubmitButton>
            </FormControls>
        </FormGroup>
    </Fragment>;
