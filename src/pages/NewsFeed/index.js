import React, { useState } from "react";
import UserLayout from "components/Layouts/UserLayout";
import CategoriesList from "./components/CategoriesList";
import NewsList from "./components/NewsList";
import "./styles.scss";

const Content = (props) => <div className="NewsFeed">
    <div className="NewsFeed-left">
        <NewsList {...props} />
    </div>
    <div className="NewsFeed-right">
        <CategoriesList {...props} />
    </div>
</div>;


const NewsFeed = (props) => {
    const [activeCategoryId, setActiveCategoryId] = useState(1);

    return (
        <UserLayout {...props}>
            <Content activeCategoryId={activeCategoryId} setActiveCategoryId={setActiveCategoryId} />
        </UserLayout>
    )
}

export default React.memo(NewsFeed);