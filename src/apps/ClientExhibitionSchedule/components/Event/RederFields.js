import React from 'react'
import {BtnPus} from 'components/Svg'
import {
    SubmitButton,
    FormGroup,
    FormField,
} from 'components/Form'

const FormButton = ({isUpdate}) => isUpdate ?
    <SubmitButton  type="submit"
                  className="btn-simple btn-lg">Обновить</SubmitButton> :
    <SubmitButton leftIcon={<BtnPus/>} type="submit"
                  className="btn-simple btn-lg">Добавить</SubmitButton>;

const RenderFields = ({fields, isUpdate}) =>
    <FormGroup inline>
        <FormField
            className={'start'}
            {...fields.time_start}
        />
        <FormField
            {...fields.time_end}
        />
        <FormField
            style={{flex: 2}}
            {...fields.name}
        />
        <div className="form-controls">
            <FormButton isUpdate={isUpdate}/>
        </div>
    </FormGroup>
;

export default RenderFields