import React, {memo} from "react";


const NotificationCategories = ({categories, currentCategory, onClick}) => (
    <div className="notification-categories">
        {categories.map(category =>
            <div
                className={`notification-categories__item${currentCategory === category.id ? ' _active' : ''}`}
                key={category.id}
                onClick={() => onClick(category.id)}
            >
                <div className="notification-categories__item-inner">
                    <div
                        className="notification-categories__item-icon"
                        style={{ backgroundImage: `url(${category.icon})` }}
                    />
                    <div className="notification-categories__item-name">
                        {category.name}
                    </div>
                    {category.count > 0 &&
                        <div className="notification-categories__item-count">
                            {category.count <= 99 ? category.count : '99+'}
                        </div>
                    }
                </div>
            </div>
        )}
    </div>
);

export default memo(NotificationCategories);