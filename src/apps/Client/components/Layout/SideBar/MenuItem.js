import React from 'react'
import {NavLink} from 'react-router-dom'
import classnames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classnames.bind(styles)
const MenuItem = ({icon, title, url}) =>
    <div style={{backgroundImage: `url(${icon})`}} className={cx('item')}>
        <NavLink to={url}>{title}</NavLink>
    </div>;
export default MenuItem;