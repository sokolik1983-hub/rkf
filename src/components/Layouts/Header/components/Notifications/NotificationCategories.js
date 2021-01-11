import React from "react";

const NotificationCategories = ({ categories, setCurrentCategory, setControlsOpen }) => {

    const handleClick = (id) => {
        setCurrentCategory(id);
        setControlsOpen(false);
    }

    return (
        <div className="NotificationCategories">
            {categories.map(c => {
                return (
                    <div className="NotificationCategories__item" key={c.id} onClick={() => handleClick(c.id)}>
                        <div className="NotificationCategories__item-left">
                            <div>
                                <div className="NotificationCategories__item-icon" style={{ backgroundImage: `url(${c.icon})` }} />
                                <span>{c.name}</span>
                            </div>
                        </div>
                        <div className="NotificationCategories__item-right">
                            {c.count}
                        </div>
                    </div>
                )
            })}

        </div>
    )
};

export default React.memo(NotificationCategories);