import React from 'react'
import {FormControls, FormField, FormGroup, SubmitButton,} from 'components/Form'
import {clubBankInfoFormConfig} from 'apps/ClubBankInfo/config'

const {fields} = clubBankInfoFormConfig;

const RenderFields = () =>
    <React.Fragment>
        <FormGroup>
            <FormField
                {...fields.name}
            />
            <FormField
                {...fields.owner_name}
            />
            <FormField
                {...fields.address}
            />
            <FormField
                {...fields.inn}
            />
            <FormField
                {...fields.kpp}
            />
            <FormField
                {...fields.ogrn}
            />
            <FormField
                {...fields.okpo}
            />
            <FormField
                {...fields.registration_number}
            />
            <FormField
                {...fields.registration_date}
            />
            <FormField
                {...fields.is_public}
            />
        </FormGroup>


        <FormControls>
            <SubmitButton type="submit"
                          className="btn-simple btn-lg">Обновить</SubmitButton>
        </FormControls>
    </React.Fragment>;

const RenderFieldsReal = () =>
    <React.Fragment>
        <FormGroup>
            <FormField
                name="clubBankInfo_id"
                value={16}
                type="hidden"
            />
            <FormField
                {...fields.name}
            />
            <FormField
                {...fields.description}
            />
        </FormGroup>
        <FormField
            {...fields.address}
        />
        <FormField
            {...fields.site}
        />

        <FormControls>
            <SubmitButton type="submit"
                          className="btn-simple btn-lg">Обновить</SubmitButton>
        </FormControls>
    </React.Fragment>;

export default RenderFields