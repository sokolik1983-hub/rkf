import React, {forwardRef, useState} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import {CSSTransition} from "react-transition-group";
import "./index.scss";


const RowControl = forwardRef(
    ({children}, ref) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="row-control">
                <div className="row-control__head" onClick={() => setIsOpen(!isOpen)}>
                    <span/><span/><span/>
                </div>
                {isOpen &&
                    <OutsideClickHandler ref={ref} onOutsideClick={() => setIsOpen(false)}>
                        <CSSTransition
                            in={isOpen}
                            timeout={350}
                            classNames="row-control__transition"
                            unmountOnExit
                        >
                            {children}
                        </CSSTransition>
                    </OutsideClickHandler>
                }
            </div>
        )
    }
);

export default React.memo(RowControl);