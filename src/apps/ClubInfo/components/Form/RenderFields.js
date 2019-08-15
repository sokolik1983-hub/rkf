import React from 'react'
import {FormControls, FormField, FormGroup, SubmitButton,} from 'components/Form'
import {clubInfoFormConfig} from 'apps/ClubInfo/config'

const {fields} = clubInfoFormConfig;

const RenderFields = () =>
    <React.Fragment>
        <FormGroup>
            <FormField
                {...fields.name}
            />
            <FormField
                {...fields.description}
            />
        </FormGroup>
         <FormField
            {...fields.city_id}
        />
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