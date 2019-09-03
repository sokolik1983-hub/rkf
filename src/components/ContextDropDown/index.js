import React, {useEffect, useRef, useState} from 'react'
import OutsideClickHandler from "react-outside-click-handler";
import classnames from 'classnames'
import {useVisibility} from "shared/hooks";

import './styles.scss'


const BUTTON_CLASSNAME = "ContextDropDown__button";

function ContextDropDown({children, buttonStyles, contentStyles}) {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);
    const [position, setPosition] = useState({left: 0, top: 0});

    const buttonRef = useRef();

    const contentRef = useRef();

    useEffect(() => {
        const {
            clientHeight: buttonHeight,
            clientWidth: buttonWidth,
            offsetTop: buttonTop,
            offsetLeft: buttonLeft
        } = buttonRef.current;
        const {
            clientHeight: contentHeight,
            clientWidth: contentWidth,
        } = contentRef.current;

        // positioning
        const left = buttonLeft + (buttonWidth) - contentWidth;
        const top = buttonTop + buttonHeight * 2;

        setPosition({left, top});

    }, [buttonRef.current]);
    const onOutsideClick = (e) => {
        if (e.target.className !== BUTTON_CLASSNAME) {
            setInvisible()
        }
    };
    return (
        <React.Fragment>

            <button style={buttonStyles} ref={buttonRef} onClick={toggleVisibility} className={BUTTON_CLASSNAME}/>

            <OutsideClickHandler onOutsideClick={onOutsideClick}>
                <div ref={contentRef} style={{...position, ...contentStyles}}
                     className={
                         classnames(
                             "ContextDropDown__content",
                             {"ContextDropDown__content--visible": visibility}
                         )}
                >
                    {children}
                </div>
            </OutsideClickHandler>

        </React.Fragment>
    )
}

export default ContextDropDown