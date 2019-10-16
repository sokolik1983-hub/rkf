import React from 'react'
import {FormControls, FormField, FormGroup, SubmitButton,} from 'components/Form'
import {clubLegalInfoFormConfig} from 'apps/ClubLegalInfo/config'

const {fields} = clubLegalInfoFormConfig;

export default function RenderFields() {
    return (
        <React.Fragment>
            <FormGroup inline>
                <FormField
                    {...fields.name}
                />
                <FormField
                    {...fields.owner_name}
                />
            </FormGroup>

            <FormGroup inline>
                <FormField disabled
                    {...fields.inn}
                />
                <FormField disabled
                    {...fields.kpp}
                />
            </FormGroup>
            <FormGroup inline>
                <FormField disabled
                    {...fields.ogrn}
                />
                <FormField disabled
                    {...fields.okpo}
                />
            </FormGroup>
            <FormGroup inline>
                <FormField
                    {...fields.registration_number}
                />
                <FormField
                    {...fields.registration_date}
                />
            </FormGroup>
            <FormGroup inline>
                <FormField
                    {...fields.address}
                />
            </FormGroup>
            {/*<FormField*/}
            {/*    {...fields.is_public}*/}
            {/*/>*/}


            {/*<FormControls>
                <SubmitButton type="submit"
                              className="btn-simple btn-lg">Обновить</SubmitButton>
            </FormControls>*/}
        </React.Fragment>
    )
}
