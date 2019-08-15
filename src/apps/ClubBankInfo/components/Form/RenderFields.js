import React from 'react'
import {FormControls, FormField, FormGroup, SubmitButton,} from 'components/Form'
import {clubBankInfoFormConfig} from 'apps/ClubBankInfo/config'

const {fields} = clubBankInfoFormConfig;

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
                <FormField
                    {...fields.address}
                />
            </FormGroup>
            <FormGroup inline>
                <FormField
                    {...fields.inn}
                />
                <FormField
                    {...fields.kpp}
                />
            </FormGroup>
            <FormGroup inline>
                <FormField
                    {...fields.ogrn}
                />
                <FormField
                    {...fields.okpo}
                />
            </FormGroup>
            <FormField
                {...fields.registration_number}
            />
            <FormField
                {...fields.registration_date}
            />
            <FormField
                {...fields.is_public}
            />


            <FormControls>
                <SubmitButton type="submit"
                              className="btn-simple btn-lg">Обновить</SubmitButton>
            </FormControls>
        </React.Fragment>
    )
}
