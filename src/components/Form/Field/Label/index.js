import React from 'react'

const Label = ({field}) => field.label ?
    <label
        htmlFor={field.name}
        dangerouslySetInnerHTML={{__html: field.label}}/>
    : null;
export default Label;