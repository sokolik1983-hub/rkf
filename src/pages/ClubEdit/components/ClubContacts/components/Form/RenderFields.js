import React, { useContext } from "react";
import MaskedInput from "../../../../../../components/Form/Field/MaskedInput";
import { FormField, FormGroup } from "../../../../../../components/Form";
import { DEFAULT_PHONE_INPUT_MASK } from "../../../../../../appConfig";
import { clubClubContactsConfig } from "../../config";
import { ContactTypeContext } from "../../context";


const {fields} = clubClubContactsConfig;

const RenderFields = ({disabled, isMaskedTel}) => {
    const {contactType} = useContext(ContactTypeContext);

    return (
        <FormGroup inline>
            {isMaskedTel ?
                <MaskedInput
                    disabled={disabled}
                    {...fields.value}
                    label={contactType.label}
                    mask={DEFAULT_PHONE_INPUT_MASK}
                    type="tel"
                    placeholder="+7(___)___-__-__"
                    title="Формат номера: +7(999)999-99-99"
                /> :
                <FormField
                    disabled={disabled}
                    {...fields.value}
                    label={contactType.label}
                />
            }
            <FormField disabled={disabled} {...fields.description} />
        </FormGroup>
    )
};

export default React.memo(RenderFields);