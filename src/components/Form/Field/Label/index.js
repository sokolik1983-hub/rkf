import React from 'react'

function Label({label, htmlFor}) {
    return label ?
        <label
            htmlFor={htmlFor}
            dangerouslySetInnerHTML={{__html: label}}/>
        : null;
}

export default React.memo(Label);