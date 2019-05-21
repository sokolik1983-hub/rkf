import React from 'react'
import classnames from 'classnames/bind'

import styles from './styles.module.scss';
const cx=classnames.bind(styles);


const CommonRegistrationLogin = ({image = '/static/images/registration/banner.png', children}) =>
    <div className={cx('layout')}>
        <div style={{backgroundImage:`url(${image})`}} className={cx('image')}/>
        <div className={cx('form')}>
            {children}
        </div>
    </div>;

export default CommonRegistrationLogin;