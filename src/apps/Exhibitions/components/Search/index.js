import React from 'react'
import searchIcon from './Icon.svg'
import {searchDefaultPlaceholder} from 'apps/Exhibitions/config'
import './index.scss'

const SearchField = ({placeholder = searchDefaultPlaceholder, onChange, value}) =>
    <div className="exhibitions-search__input">
        <img src={searchIcon} alt=''/><input placeholder={placeholder} name="search" onChange={onChange} value={value}/>
    </div>;

export default SearchField