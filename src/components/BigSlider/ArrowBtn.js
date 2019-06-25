import React from 'react'
import classnames from 'classnames'


export default function Arrow({onClick, right}) {
    return <button
        onClick={onClick}
        className={classnames(
            'arrow',
            {'arrow--right': right},
            {'arrow--left': !right})
        }/>
}