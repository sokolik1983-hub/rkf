import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";


const FormInput = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        type,
        optional,
        maxLength,
        passwordField,
        hint,
        value,
        onlyNumbers,
        cutValue,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && (hint || maxLength);
    const errorId = showValidationMessage ? `${id}_error` : '';

    const allowMaxLength = str => str.slice(0, cutValue);

    const allowOnlyNumbers = str => {
        let newStr = str.replace(/\D/g, '');
        if(maxLength) newStr = newStr.slice(0, maxLength);

        return newStr;
    };

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
            <div className="k-form-field-wrap">
                <Input
                    valid={valid}
                    type={type}
                    id={id}
                    value={onlyNumbers ? allowOnlyNumbers(value) : cutValue ? allowMaxLength(value) : value}
                    disabled={disabled}
                    ariaDescribedBy={`${errorId}`}
                    {...others}
                />
                {showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
                {showHint &&
                    <Hint ariaDescribedBy={`${errorId}`}>
                        {hint ?
                            hint :
                            passwordField ? `От 6 до 20 символов` : `Макс. кол-во символов: ${maxLength}`
                        }
                    </Hint>
                }
            </div>
        </FieldWrapper>
    );
};

export default React.memo(FormInput);