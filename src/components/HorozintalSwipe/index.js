import React, {useEffect, useState, createRef} from "react";
import "./index.scss";

const HorizontalSwipe = ({id, className, children}) => {
    const [elem, setElem] = useState(null);
    const [left, setLeft] = useState(0);
    const [startX, setStartX] = useState(0);
    const scrollRef = createRef();
    const [scrollState, setScrollState] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0,
    });

    const onMouseDown = e => {
        setScrollState({
            ...scrollState,
            isScrolling: true,
            clientX: e.clientX
        })
        setStartX(Math.round(e.clientX))
    };

    const onMouseUp = () => setScrollState({ ...scrollState, isScrolling: false });

    const calculateOffset = (x) => {
        const maxOffset = elem.clientWidth - elem.scrollWidth - 16; //16 - padding-left: 16px;
        const offset = x - startX + left;
        const leftOffset = offset < 0 ? offset > maxOffset ? offset : maxOffset : 0;
        elem.style.transform = `translate(${leftOffset}px, 0)`;
        setLeft(leftOffset);
    };

    const onMouseMove = e => {
        if (scrollState.isScrolling) {
            const x = Math.round(e.clientX);
            calculateOffset(x)
        }
    };

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
            calculateOffset(x)
        }
    };

    return (
        <div
            id={id}
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className={`horizontal-swipe${className ? ' ' + className : ''}`}
            onTouchStart={e => setStartX(Math.round(e.touches[0].clientX))}
            onTouchMove={onTouchMove}
        >
            {children}
        </div>
    )
};

export default React.memo(HorizontalSwipe);