import classnames from "classnames";
import React from "react";
import './styles.scss'


export const Dots = ({inline = true, className, children}) =>
    <div className={
        classnames(
            "dots",
            {"dots--inline": inline},
            {[className]: className},
        )
    }>
        {children}
    </div>;

export default function Dot({onClick, index, current}) {
    const onDotClick = () => {
        onClick(index)
    };
    return (
        <div
            onClick={onDotClick}
            className={
                classnames("dot", {"dot--active": index === current})
            }
        />
    )
}
