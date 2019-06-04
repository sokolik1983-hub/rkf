import React from 'react'
import './styles.scss'

const Window = ({children, image, style, onClose}) =>
    <div className="window__holder">
        <div className="window__wrap">
            <div style={style} className="window">
                {image ? <div style={{backgroundImage: `url(${image}`}} className="window__image"/> : null}
                <div className="window__content">
                    {children}
                </div>
                <div onClick={onClose} className='window__close'/>
            </div>
        </div>
    </div>;

export default Window;