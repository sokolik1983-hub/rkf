import React, {useState} from 'react'
import searchIcon from './Icon.svg'
import {searchDefaultPlaceholder} from 'apps/Exhibitions/config'
import './index.scss'

export default function ExhibitionsSearch({placeholder = searchDefaultPlaceholder}) {
    const [value, setValue] = useState('');
    const onChange = (e) => setValue(e.target.value);

    return (
        <div className="ExhibitionsSearch__input">
            <img src={searchIcon} alt=''/>
            <input placeholder={placeholder}
                   name="search"
                   onChange={onChange}
                   value={value}
            />
        </div>
    )
}
