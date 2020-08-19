import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import history from "../../../../utils/history";


const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/search?s=${searchValue}`);
    };

    const setDisplay = (isClicked) => {
        if (isClicked) {
            ReactDOM.findDOMNode(".header__search").style.display = 'block';
        }
        ReactDOM.findDOMNode(".header__search").style.display = 'none';
    };

    useEffect(() => {
        window.addEventListener('click', () => setDisplay(isClicked));
        return () => window.removeEventListener('click', () => setDisplay(isClicked));
    }, [isClicked]);

    return (
        <>
            <form className="header__search" onSubmit={handleSubmit}>
                <input
                    className="header__search-control"
                    type="text"
                    placeholder="Поиск"
                    onChange={({target}) => setSearchValue(target.value)}
                    onClick={() => setIsClicked(true)}
                    required
                />
            </form>
            <button className="header__search-control--mobile" type="button"></button>
        </>
    )
};

export default React.memo(Search);