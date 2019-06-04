import React from 'react'

import './styles.scss'


const CommonSplitLayout = ({image = '/static/images/registration/banner.png', children}) =>
    <div className="split-layout">
        <div style={{backgroundImage: `url(${image})`}} className="split-layout__image"/>
        <div className="split-layout__content-wrap">
            <div className="split-layout__content">
                {children}
            </div>
        </div>
    </div>;

export default CommonSplitLayout;