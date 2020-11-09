import React, { useEffect } from "react";
import Category from './Category';

const AllCategories = ({ match, canEdit, setActiveCategoryId, categories, documents, setModal, getDocuments, handleError, handleSuccess, homePage }) => {
    useEffect(() => {
        setActiveCategoryId(null);
    }, []);
    const unsortedCategory = { id: 0, name: "Неотсортированные" };
    const updatedCategories = [unsortedCategory, ...categories];

    return <>
        {updatedCategories.map((c, i) => {
            return <Category
                key={i}
                match={match}
                canEdit={canEdit}
                setActiveCategoryId={setActiveCategoryId}
                categories={updatedCategories}
                unsortedCategory={unsortedCategory}
                currentCategory={categories.filter(cat => cat.id === c.id)[0]}
                documents={documents.filter(d => d.category_id === c.id)}
                setModal={setModal}
                getDocuments={getDocuments}
                handleError={handleError}
                handleSuccess={handleSuccess}
                homePage={homePage}
                id={c.id}
            />
        })}
    </>;
};

export default React.memo(AllCategories);