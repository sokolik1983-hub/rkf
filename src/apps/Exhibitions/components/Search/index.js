import React, { useContext, useState } from 'react';
import searchIcon from './Icon.svg';
import { connectExhibitionsSearch } from 'apps/Exhibitions/connectors';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import {
    endpointExhibitionsList,
    searchDefaultPlaceholder
} from 'apps/Exhibitions/config';
import './index.scss';

function ExhibitionsSearch({ placeholder = searchDefaultPlaceholder }) {
    const [searchValue, setSearchValue] = useState('');
    const { setUrl, url } = useContext(ExhibitionsFilterContext);
    const [urlBeforeSearch, setUrlBeforeSearch] = useState(url);
    const onChange = e => setSearchValue(e.target.value);

    const onCancel = () => {
        setSearchValue('');
        setUrl(urlBeforeSearch);
    };

    const handleKeyDown = e => {
        if (searchValue && e.key === 'Enter') {
            setUrlBeforeSearch(url);
            setUrl(
                `/api/exhibitions/Exhibition/search?ExhibitionName=${searchValue}`
            );
        }
    };

    return (
        <div className="ExhibitionsSearch">
            <img src={searchIcon} alt="" />
            <input
                placeholder={placeholder}
                name="search"
                onChange={onChange}
                onKeyDown={handleKeyDown}
                value={searchValue}
            />
            {searchValue !== endpointExhibitionsList ? (
                <button
                    onClick={onCancel}
                    className="ExhibitionsSearch__cancel"
                />
            ) : null}
        </div>
    );
}

export default connectExhibitionsSearch(ExhibitionsSearch);
