import React, {useEffect, useState} from "react";
import "./index.scss";


const HorizontalSwipe = ({id, className, children}) => {
    const [elem, setElem] = useState(null);
    const [left, setLeft] = useState(0);
    const [startX, setStartX] = useState(0);

    useEffect(() => {
        setElem(document.getElementById(id));
    }, []);

    useEffect(() => {
        if(elem) {
            window.addEventListener("resize", () => {
                if(elem.scrollWidth <= elem.clientWidth) {
                    elem.style.transform = 'none';
                }
            });

            return window.removeEventListener("resize", () => {
                if(elem.scrollWidth <= elem.clientWidth) {
                    elem.style.transform = 'none';
                }
            });
        }
    }, [elem]);

    const onTouchMove = e => {
        if(elem.scrollWidth > elem.clientWidth) {
            const x = Math.round(e.touches[0].clientX);
            const maxOffset = elem.clientWidth - elem.scrollWidth - 16; //16 - padding-left: 16px;
            const offset = x - startX + left;
            const leftOffset = offset < 0 ? offset > maxOffset ? offset : maxOffset : 0;

            elem.style.transform = `translate(${leftOffset}px, 0)`;
            setLeft(leftOffset);
        }
    };

    return (
        <div id={id}
             className={`horizontal-swipe${className ? ' ' + className : ''}`}
             onTouchStart={e => setStartX(Math.round(e.touches[0].clientX))}
             onTouchMove={onTouchMove}
        >
            {children}
        </div>
    )
};

export default React.memo(HorizontalSwipe);