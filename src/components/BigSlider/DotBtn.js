import React from 'react'
import classnames from 'classnames'


export default function DotBtn({active, index, onClick, className}) {
    const handleClick = () => onClick(index);
    return <button
        onClick={handleClick}
        className={classnames(
            {[className]: className},
            {'active': active}
        )}
    />;
}