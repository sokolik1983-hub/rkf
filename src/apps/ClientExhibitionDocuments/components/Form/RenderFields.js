import React from 'react'
import {BtnPus} from 'components/Svg'
import {
    SubmitButton,
    FormControls,
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
        <FormGroup inline>
            <FormField
                {...fields.title}
            />
            <FormField
                {...fields.link}
            />
        </FormGroup>
        <FormControls>
            <FormButton isUpdate={isUpdate}/>
        </FormControls>
    </>;


export default RenderFields