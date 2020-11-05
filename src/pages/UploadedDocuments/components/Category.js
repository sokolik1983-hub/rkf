import React from "react";

const Category = ({ match, setActiveCategoryId, categories, documents }) => {
    const id = parseInt(match.params.id, 10);
    const currentCategory = categories.filter(c => c.id === id)[0];
    setActiveCategoryId && setActiveCategoryId(parseInt(match.params.id, 10));
    // {JSON.stringify(documents.filter(d => match.params.id == d.category_id))}
    return currentCategory ? currentCategory.name : 'Неотсортированные';
};

export default React.memo(Category);