import React from 'react'
import classnames from 'classnames'
import './index.scss'

const Container = ({children, className, pad = false, content = false}) =>
    <div style={{padding: pad ? '0 48px' : null}}
         className={
             classnames(
                 'container',
                 {'container--content': content},
                 {[className]: className}
             )
         }
    >
        {children}
    </div>;

export default Container;