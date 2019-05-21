import React, {Fragment} from 'react'
import FormField from "components/Form/Field";
import FormGroup from "components/Form/FormGroup";

import {
    registrationFormPhysicalPerson,
    registrationFormLegalEntity,
} from 'apps/Registration/config'
export const PhysicalPerson = ({fields}) =>
    <Fragment>
        {/*<FormField*/}
        {/*    {...registrationFormPhysicalPerson.registration_type}*/}
        {/*/>*/}
        <FormGroup inline>
            <FormField
                {...registrationFormPhysicalPerson.fields.first_name}
            />
            <FormField
                {...registrationFormPhysicalPerson.fields.second_name}
            />
        </FormGroup>
        <FormGroup inline>
            <FormField
                {...registrationFormPhysicalPerson.fields.email}
            />
            <FormField
                {...registrationFormPhysicalPerson.fields.password}
            />
        </FormGroup>
        <FormGroup inline>
            <FormField
                {...registrationFormPhysicalPerson.fields.phone_number}
            />
            <FormField
                {...registrationFormPhysicalPerson.fields.submit_phone_code}
            />
        </FormGroup>
    </Fragment>;

export const LegalEntity = ({registrationType}) =>
    <Fragment>
        <FormField
            type="hidden"
            name="registration_type"
            value={registrationType}
        />
        <FormGroup inline>
            <FormField
                {...registrationFormLegalEntity.fields.company_name}
            />
            <FormField
                {...registrationFormLegalEntity.fields.company_type}
            />
        </FormGroup>
        <FormGroup inline>
            <FormField
                {...registrationFormLegalEntity.fields.email}
            />
            <FormField
                {...registrationFormLegalEntity.fields.password}
            />
        </FormGroup>
        <FormGroup inline>
            <FormField
                {...registrationFormLegalEntity.fields.phone_number}
            />
            <FormField
                {...registrationFormLegalEntity.fields.submit_phone_code}
            />
        </FormGroup>
    </Fragment>;