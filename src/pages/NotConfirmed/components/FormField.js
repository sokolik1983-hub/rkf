import React from 'react';

const FormField = ({ type, label, name, value, title, pattern, required, fields, onInputChange, props, disabled }) => {
    const fieldComment = name + '_comment';
    const isValidField = name + '_valid';
    return (
        <div className="FormField">
            <h4>{label}</h4>
            {
                fields[isValidField]
                    ? <span>{value}</span>
                    : <>
                        <input
                            type={type || 'text'}
                            name={name}
                            onBlur={onInputChange}
                            required={!!required}
                            title={title || ''}
                            defaultValue={value || ''}
                            pattern={pattern ? pattern : undefined}
                            disabled={disabled}
                            {...props}
                        />
                        <div className="FormField__comment">{fields[fieldComment]}</div>
                    </>
            }
        </div>
    )
};

export default FormField;