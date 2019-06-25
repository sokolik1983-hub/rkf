import React from 'react'
import MenuItem from './MenuItem'


const SideBar = ({items}) => items ?
    items.map((item, index) => <MenuItem key={index} {...item}/>)
    :
    null;
export default SideBar