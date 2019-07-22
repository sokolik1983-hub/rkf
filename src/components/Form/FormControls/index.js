import React from 'react'
import classnames from 'classnames'
import './styles.scss'

export default function FormControls({children, className, inline, style}) {
    return (
        <div
            style={style}
            className={classnames(
                'FormControls',
                {'FormControls--inline': inline},
                {[className]: className},
            )}
        >
            {children}
        </div>);
}