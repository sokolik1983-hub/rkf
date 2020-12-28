import React from "react";
import Card from "components/Card";
import { categories } from "../config";

const CategoriesList = ({ canEdit, setModal, activeCategoryId, setActiveCategoryId, homePage }) => {
    const isActive = (value) => activeCategoryId === value ? "NewsFeed__category-item active" : "NewsFeed__category-item";

    const handleCategoryClick = (id) => {
        setActiveCategoryId(id)
        window.scrollTo(0, 0);
    }
    return <Card>
        <ul className="NewsFeed__inner-list">
            {categories.map(({ id, name, icon, disabled }, key) => {
                if (disabled) {
                    return <li className="NewsFeed__category-item disabled" key={key}>
                        <span className={icon} />
                        <span>{name}</span>
                    </li>;
                }
                return <li
                    onClick={() => handleCategoryClick(id)}
                    className={isActive(id)}
                    key={key} >
                    <span className={icon} />
                    <span>{name}</span>
                </li>
            }
            )}
        </ul>
    </Card>
};

export default React.memo(CategoriesList);