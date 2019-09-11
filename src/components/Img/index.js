import React from 'react';
import classnames from 'classnames';
import './Img.scss';

function Img({ className, alt, ...restProps }) {
    return (
        <img
            className={classnames('Img', { [className]: className })}
            alt={alt}
            {...restProps}
        />
    );
}
Img.defaultProps = {
    alt: ''
};
export default Img;
