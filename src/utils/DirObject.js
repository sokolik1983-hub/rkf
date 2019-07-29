import React from 'react'

export function DirObject({object, className}) {
    return object ?
        (
            <div className={className}>
                {
                    Object.keys(object).map(key =>
                        <div
                            key={key}
                            className={`${className}__${key}`}>
                            {key}: {object[key]}
                        </div>)
                }
            </div>
        ) : null;
}