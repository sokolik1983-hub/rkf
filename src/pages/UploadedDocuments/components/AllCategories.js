import React from "react";

const AllCategories = ({ match, setActiveCategoryId, documents }) => {
    setActiveCategoryId(null);
    return 'Все категории';
};

export default React.memo(AllCategories);