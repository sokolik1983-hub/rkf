import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import classnames from 'classnames'
import './styles.scss'

export default function Dropdown({ innerComponent, position, children, className }) {
    const [isOpened, setOpened] = useState(false);
    const closeDropdown = () => setOpened(false);
    const toggleDropdown = () => setOpened(!isOpened);

    return (
        <OutsideClickHandler onOutsideClick={closeDropdown}>
            <div className={classnames("Dropdown", { [className]: className }, position)}>
                <div class={isOpened ? 'Dropdown__button--visible' : 'Dropdown__button'} onClick={toggleDropdown}>
                    {innerComponent}
                </div>
                <div className={isOpened ? 'Dropdown__content--visible' : 'Dropdown__content'}>
                    {children}
                </div>
            </div>
        </OutsideClickHandler >
    )
}