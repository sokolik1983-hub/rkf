import React from "react";
import {FieldWrapper} from "@progress/kendo-react-form";
import {NumericTextBox} from "@progress/kendo-react-inputs";
import {Label, Error, Hint} from "@progress/kendo-react-labels";


const FormNumericTextBox = fieldRenderProps => {
    const { validationMessage, touched, label, id, valid, disabled, hint, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
            <NumericTextBox
                ariaDescribedBy={`${hintId} ${errorId}`}
                valid={valid}
                id={id}
                disabled={disabled}
                {...others}
            />
            {showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export default React.memo(FormNumericTextBox);