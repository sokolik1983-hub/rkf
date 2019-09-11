import React, { Fragment, useContext } from 'react';
import { FormField, FormGroup } from 'components/Form';
import { clubClubContactsConfig } from 'apps/ClubContacts/config';
import { ContactTypeContext } from 'apps/ClubContacts/context';
const { fields } = clubClubContactsConfig;
export function RenderFields({ disabled, contact_type_id }) {
    const { contactType } = useContext(ContactTypeContext);
    return (
        <Fragment>
            <FormGroup inline>
                <FormField
                    disabled
                    name="contact_type_id"
                    type={'hidden'}
                    value={contact_type_id}
                />
                <FormField
                    disabled={disabled}
                    {...fields.value}
                    label={contactType.label}
                />
                <FormField disabled={disabled} {...fields.description} />
            </FormGroup>
        </Fragment>
    );
}
