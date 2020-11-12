import React from "react";
import {FieldWrapper} from "@progress/kendo-react-form";
import {TextArea} from "@progress/kendo-react-inputs";
import {Label, Error, Hint} from "@progress/kendo-react-labels";


const FormTextArea = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        hint,
        disabled,
        optional,
        visited,
        modified,
        value,
        maxLength = 5000,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
            <TextArea
                style={{height: 115, resize: 'vertical'}}
                valid={valid}
                id={id}
                disabled={disabled}
                ariaDescribedBy={`${hintId} ${errorId}`}
                value={value.slice(0, maxLength)}
                {...others}
            />
            {!showHint && !showValidationMessage &&
                <div className="k-form-hint k-text-end">
                    {`осталось ${maxLength - value.slice(0, maxLength).length} знаков`}
                </div>
            }
            {showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export default React.memo(FormTextArea);