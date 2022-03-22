import React from 'react';

const NotificationCategories = ({
                                    categories,
                                    currentCategory,
                                    setCurrentCategory,
                                    setStartElement,
                                }) => {

    const handleClick = (id) => {
        setCurrentCategory(id);
        setStartElement(1);
    }

    return (
        <div className="NotificationCategories">
            {categories.map(category => {
                return (
                    <div
                        className={`NotificationCategories__item${currentCategory === category.id ? ' _active' : ''}`}
                        key={category.id}
                        onClick={() => handleClick(category.id)}
                    >
                        <div className="NotificationCategories__item-inner">
                            <div
                                className="NotificationCategories__item-icon"
                                style={{ backgroundImage: `url(${category.icon})` }}
                            />
                            <div className="NotificationCategories__item-name">
                                {category.name}
                            </div>
                            {category.count > 0 &&
                                <div className="NotificationCategories__item-count">
                                    {category.count <= 99 ? category.count : '99+'}
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default React.memo(NotificationCategories);