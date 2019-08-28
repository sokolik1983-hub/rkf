import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import classnames from 'classnames'
import './styles.scss'

const openedIcon = '/static/icons/chevron-down.svg';
const closedIcon = '/static/icons/chevron-up.svg';


export default function DropDown({
    opened = false,
    innerComponent,
    className,
    children,
}) {
    const [isOpened, setOpened] = useState(opened);
    const handlerStyles = () => ({ backgroundImage: `url(${isOpened ? closedIcon : openedIcon})` });
    const closeDropDown = () => setOpened(false);
    const toggleDropDown = (e) => e.target.tagName.toUpperCase() !== 'A' ?
        setOpened(!isOpened)
        :
        void 0;

    return (
        <OutsideClickHandler onOutsideClick={closeDropDown}>
            <div onClick={toggleDropDown}
                className={classnames("drop-down", { [className]: className })}>
                {innerComponent}

                <div
                    style={handlerStyles()}

                    className={
                        classnames(
                            "drop-down__handler",
                            { "drop-down__handler--visible": isOpened }
                        )
                    }
                />

                <div
                    className={
                        classnames(
                            "drop-down__items",
                            { "drop-down__items--visible": isOpened }
                        )
                    }>
                    {children}
                </div>
            </div>
        </OutsideClickHandler>
    )
}