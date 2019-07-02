import React from 'react'
import {BtnPus} from 'components/Svg'
import {
    SubmitButton,
    FormGroup,
    FormField,
} from 'components/Form'
import {firstStepForm} from 'apps/ClientExhibitions/config'
const {fields}=firstStepForm;
export const FormButton = ({isUpdate}) => isUpdate ?
    <SubmitButton type="submit"
                  className="btn-simple btn-lg">Обновить</SubmitButton> :
    <SubmitButton leftIcon={<BtnPus/>} type="submit"
                  className="btn-simple btn-lg">Добавить</SubmitButton>;

const RenderFields = ({disabled, isUpdate}) =>
    <>
        <FormField
            disabled={disabled}
            {...fields.name}
        />
        <FormField
            disabled={disabled}
            {...fields.description}
        />

        <FormGroup inline>
            <FormField
                disabled={disabled}
                {...fields.rank_type}
            />

            <FormField
                disabled={disabled}
                {...fields.dignity_types}
            />
        </FormGroup>
        <FormGroup inline>
            <FormField
                disabled={disabled}
                {...fields.class_types}
            />
            <FormField
                disabled={disabled}
                {...fields.breed_types}
            />
        </FormGroup>
        <FormGroup inline>
            <FormField
                disabled={disabled}
                {...fields.referees_id}
            />
        </FormGroup>
        <FormField
            disabled={disabled}
            {...fields.city_id}
        />
        <FormField
            disabled={disabled}
            {...fields.address}
        />
    </>;


export default RenderFields