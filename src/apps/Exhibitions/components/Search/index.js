import React, { useState } from 'react'
import searchIcon from './Icon.svg'
import { searchDefaultPlaceholder, endpointExhibitionsList } from 'apps/Exhibitions/config'
import { connectExhibitionsSearch } from 'apps/Exhibitions/connectors';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import './index.scss'

function ExhibitionsSearch({ placeholder = searchDefaultPlaceholder, fetchSearchSuccess, fetchExhibitionsSuccess }) {
    const [value, setValue] = useState('');
    const onChange = (e) => setValue(e.target.value);
    const [url, setUrl] = useState(endpointExhibitionsList);
    const action = value ? fetchSearchSuccess : fetchExhibitionsSuccess
    // useResourceAndStoreToRedux(
    //     url,
    //     action
    // );

    const onCancel = () => {
        setUrl(endpointExhibitionsList);
        setValue('');
    }

    const handleKeyDown = (e) => {
        if (value && e.key === 'Enter') setUrl(`/api/exhibitions/Exhibition/search?ExhibitionName=${value}`);
    }

    return (
        <div className="ExhibitionsSearch" >
            <img src={searchIcon} alt="" />
            <input placeholder={placeholder}
                name="search"
                onChange={onChange}
                onKeyDown={handleKeyDown}
                value={value}
            />
            {
                url !== endpointExhibitionsList
                    ? <button onClick={onCancel} className="ExhibitionsSearch__cancel"></button>
                    : null
            }
        </div>
    )
}

export default connectExhibitionsSearch(ExhibitionsSearch);