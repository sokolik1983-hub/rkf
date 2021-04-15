import React, {useEffect, useState, createRef, useRef} from "react";
import "./index.scss";

const HorizontalSwipe = ({id, className, children}) => {
    const [elem, setElem] = useState(null);
    const [left, setLeft] = useState(0);
    const [startX, setStartX] = useState(0);
    const [scrollState, setScrollState] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0,
    })

    const scrollRef = createRef();

    const onMouseDown = e => {
        setScrollState({
            ...scrollState,
            isScrolling: true,
            clientX: e.clientX
        });
    };

    const onMouseUp = () => {
        setScrollState({ ...scrollState, isScrolling: false });
    };

    const onMouseMove = e => {
        const { clientX, scrollX } = scrollState;
        // if(document.body.clientWidth < 960) {

            if (scrollState.isScrolling) {
                // if(scrollX > 10) setScrollState({ ...scrollState, isScrolling: true, scrollX: 0 });
                // if(scrollX < -200) setScrollState({ ...scrollState, isScrolling: true, scrollX: -100 });
                if(scrollX > 0 ) setScrollState({ ...scrollState, isScrolling: true, scrollX: 0 });
                if(document.body.clientWidth > 960 && scrollX < -100) {
                    console.log(scrollX)
                    console.log(document.body.clientWidth > 960)
                    setScrollState({ ...scrollState,  scrollX: 0 })
                } if (document.body.clientWidth < 960 && scrollX < -300) {
                    setScrollState({ ...scrollState,  scrollX: -250 })
                }

                scrollRef.current.scrollLeft = scrollX + e.clientX - clientX;
                scrollState.scrollX = scrollX + e.clientX - clientX;
                scrollState.clientX = e.clientX;

                elem.style.transform = `translate(${scrollState.scrollX}px, 0)`;

            }
        // }

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
            console.log(elem)
            const x = Math.round(e.touches[0].clientX);
            const maxOffset = elem.clientWidth - elem.scrollWidth - 16; //16 - padding-left: 16px;
            const offset = x - startX + left;
            const leftOffset = offset < 0 ? offset > maxOffset ? offset : maxOffset : 0;
            console.log("x", x)
            console.log("maxOffset", maxOffset)
            console.log("offset", offset)
            console.log("leftOffset", leftOffset)
            elem.style.transform = `translate(${leftOffset}px, 0)`;
            setLeft(leftOffset);
        }
    };

    return (
        <div id={id}
             ref={scrollRef}
             onMouseOver={() => setScrollState({ ...scrollState, isScrolling: false })}
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