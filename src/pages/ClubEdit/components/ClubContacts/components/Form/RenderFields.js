import React, { Fragment, useContext } from 'react';
import { FormField, FormGroup } from 'components/Form';
import { clubClubContactsConfig } from '../../config';
import { ContactTypeContext } from '../../context';
const { fields } = clubClubContactsConfig;
export function RenderFields({ disabled, contact_type_id, isMaskedTel }) {
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
                {
                    isMaskedTel
                        ? <FormField
                            disabled={disabled}
                            {...fields.value}
                            label={contactType.label}
                            type='tel'
                            placeholder="+7(999)999-99-99"
                            title='Формат номера: +7(999)999-99-99'
                        />

                        : <FormField
                            disabled={disabled}
                            {...fields.value}
                            label={contactType.label}
                        />
                }

                <FormField disabled={disabled} {...fields.description} />
            </FormGroup>
        </Fragment>
    );
}
