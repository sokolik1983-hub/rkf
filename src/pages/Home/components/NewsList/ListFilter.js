import React, {memo, useState} from 'react';


const ListFilter = ({changeFilter}) => {
    const [activeType, setActiveType] = useState(null);

    const handleClick = e => {
        e.preventDefault();
        setActiveType(e.target.name);
        changeFilter(e.target.name);
    };
    const showAll = e => {
        e.preventDefault();
        setActiveType(null);
        changeFilter(null);
    }
    return (
        <div className="news-list__filter">
            <div className="ListFilter__wrap">
                <ul className="ListFilter">
                    <h3>Автор</h3>
                    <li className={activeType === null ? 'active' : ''}>
                        <a href="/" name="rkf_and_federations" onClick={showAll} className={activeType === null ? 'active' : ''}>Все</a>
                    </li>
                    <li className={activeType === 'rkf_and_federations' ? 'active' : ''}>
                        <a href="/" name="rkf_and_federations" onClick={handleClick} className={activeType === 'rkf_and_federations' ? 'active' : ''}>РКФ и Федерации</a>
                    </li>
                    <li className={activeType === 'clubs' ? 'active' : ''}>
                        <a href="/" name="clubs" onClick={handleClick} className={activeType === 'clubs' ? 'active' : ''}>Клубы</a>
                    </li>
                    <li className={activeType === 'nurseries' ? 'active' : ''}>
                        <a href="/" name="nurseries" onClick={handleClick} className={activeType === 'nurseries' ? 'active' : ''}>Питомники</a>
                    </li>
                    <li className={activeType === 'nbc' ? 'active' : ''}>
                        <a href="/" name="nbc" onClick={handleClick} className={activeType === 'nbc' ? 'active' : ''}>НКП</a>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default memo(ListFilter);
