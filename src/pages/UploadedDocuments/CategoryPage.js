import React, { useState, useEffect } from "react";
import Category from "./components/Category";
import { Redirect } from "react-router-dom";
import './styles.scss';

const CategoryPage = (props) => {
    const [redirect, setRedirect] = useState(false);
    const { match, categories, setActiveCategoryId, homePage } = props;

    let id = parseInt(match.params.id, 10);
    const currentCategory = categories.filter(c => c.id === id)[0];

    useEffect(() => {
        if (id === 0 || currentCategory) {
            setActiveCategoryId && setActiveCategoryId(id)
        } else {
            id && setRedirect(true); // Redirect if category is deleted or doesn't exist
        }
    }, []);

    return <>
        {redirect && <Redirect to={homePage} />}
        <Category {...props} id={id} currentCategory={currentCategory} />
    </>;
};

export default React.memo(CategoryPage);