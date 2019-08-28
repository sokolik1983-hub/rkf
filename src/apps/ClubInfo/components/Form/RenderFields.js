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
        <h4>Фактический адрес клуба</h4>
        <FormField
            {...fields.city_id}
        />
        <FormField
            {...fields.address}
        />
        <h4>Часы работы</h4>
        <FormGroup inline>
            <FormField
                {...fields.work_time_from}
            />
            <FormField
                {...fields.work_time_to}
            />
        </FormGroup>
        <FormField
            {...fields.site}
        />
        <FormControls>
            <SubmitButton type="submit"
                          className="btn-simple btn-lg">Обновить</SubmitButton>
        </FormControls>
    </React.Fragment>;

export default RenderFields