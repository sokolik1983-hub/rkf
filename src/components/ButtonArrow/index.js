import React from 'react'
import classnames from 'classnames'
import './styles.scss'
import {Chevron} from './Chevron'

export const DIRECTIONS = {
    up: "up",
    right: "right",
    down: "down",
    left: "left",
};

export default function ButtonArrow({direction = "left", onClick, className, size = 30}) {
    const styles = {
        width: size,
        height: size
    };
    return <div
        role="button"
        style={styles}
        onClick={onClick}
        className={
            classnames(
                'btn-arrow',
                {'btn-arrow--up': direction === "up"},
                {'btn-arrow--right': direction === "right"},
                {'btn-arrow--down': direction === "down"},
                {'btn-arrow--left': direction === "left"},
                {[className]: className}
            )
        }
    ><Chevron size={size * .4}/></div>
}
