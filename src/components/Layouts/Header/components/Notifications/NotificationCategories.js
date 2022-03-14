import React from 'react';

const NotificationCategories = ({ categories, currentCategory, setCurrentCategory }) => {

    const handleClick = (id) => {
        setCurrentCategory(id);
    }

    return (
        <div className="NotificationCategories">
            {categories.map(c => {
                return (
                    <div className={`NotificationCategories__item${currentCategory === c.id ? ' _active' : ''}`} key={c.id} onClick={() => handleClick(c.id)}>
                        <div className="NotificationCategories__item-inner">
                            <div className="NotificationCategories__item-icon" style={{ backgroundImage: `url(${c.icon})` }} />
                            <div className="NotificationCategories__item-name">{c.name}</div>
                            {c.count > 0 &&
                                <div className="NotificationCategories__item-count">{c.count <= 99 ? c.count : '99+'}</div>
                            }
                        </div>
                    </div>
                )
            })}

        </div>
    )
};

export default React.memo(NotificationCategories);