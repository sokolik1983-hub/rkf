import React, { useState, forwardRef } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import classnames from 'classnames';
import './styles.scss';

const Dropdown = forwardRef(
    ({ innerComponent, position, children, className, closeOnClick }, ref) => {
        const [isOpened, setOpened] = useState(false);
        const closeDropdown = () => setOpened(false);
        const toggleDropdown = () => setOpened(!isOpened);

        return (
            <OutsideClickHandler ref={ref} onOutsideClick={closeDropdown}>
                <div
                    className={classnames(
                        'Dropdown',
                        { [className]: className },
                        position
                    )}
                >
                    <div
                        className={
                            isOpened
                                ? 'Dropdown__button--visible'
                                : 'Dropdown__button'
                        }
                        onClick={toggleDropdown}
                    >
                        {innerComponent}
                    </div>
                    <div
                        className={
                            isOpened
                                ? 'Dropdown__content--visible'
                                : 'Dropdown__content'
                        }
                    >
                        {closeOnClick ? (
                            <div onClick={closeDropdown}>{children}</div>
                        ) : (
                            children
                        )}
                    </div>
                </div>
            </OutsideClickHandler>
        );
    }
);

export default Dropdown;
