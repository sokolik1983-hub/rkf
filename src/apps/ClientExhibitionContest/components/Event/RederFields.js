import React from 'react'
import {BtnPus} from 'components/Svg'
import {
    SubmitButton,
    FormGroup,
    FormField,
} from 'components/Form'

const FormButton = ({isUpdate}) => isUpdate ?
    <SubmitButton type="submit"
                  className="btn-simple btn-lg">Обновить</SubmitButton> :
    <SubmitButton leftIcon={<BtnPus/>} type="submit"
                  className="btn-simple btn-lg">Добавить</SubmitButton>;

const RenderFields = ({fields, isUpdate}) =>
    <>
        <FormField
                style={{flex: 2}}
                {...fields.name}
            />
        <FormGroup inline>
            <FormField
                style={{flex: 2}}
                {...fields.type}
            />
            <FormField
                style={{flex: 2}}
                {...fields.breeds_id}
            />
        </FormGroup>
        <FormGroup inline>
            <FormField
                className={'start'}
                {...fields.time_start}
            />
            <FormField
                {...fields.time_end}
            />
        </FormGroup>

        <div className="form-controls">
            <FormButton isUpdate={isUpdate}/>
        </div>
    </>;

export default RenderFields