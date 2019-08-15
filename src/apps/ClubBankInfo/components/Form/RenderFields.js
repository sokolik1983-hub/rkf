import React from 'react'
import {FormControls, FormField, FormGroup, SubmitButton,} from 'components/Form'
import {clubBankInfoFormConfig} from 'apps/ClubBankInfo/config'

const {fields} = clubBankInfoFormConfig;

export default function RenderFields() {
    return (
        <React.Fragment>
            <FormGroup>
                <FormField
                    {...fields.rs_number}
                />
                <FormField
                    {...fields.bank_name}
                />
            </FormGroup>

            <FormControls>
                <SubmitButton type="submit"
                              className="btn-simple btn-lg">Обновить</SubmitButton>
            </FormControls>
        </React.Fragment>
    )
}
