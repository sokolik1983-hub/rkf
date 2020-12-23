import React, { useState, useEffect } from "react";
import UserLayout from "components/Layouts/UserLayout";
import ClubLayout from "components/Layouts/ClubLayout";
import NurseryLayout from "components/Layouts/NurseryLayout";
import CategoriesList from "./components/CategoriesList";
import NewsList from "./components/NewsList";
import ls from "local-storage";
import "./styles.scss";

const user_type = ls.get('user_info').user_type;
const Layout = props => {
    if (user_type === 1) {
        return <UserLayout {...props} />
    }
    else if (user_type === 4) {
        return <NurseryLayout {...props} />
    }
    else {
        return <ClubLayout {...props} />
    }
}

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

    useEffect(() => {
        setActiveCategoryId(props.match.params.id ? parseInt(props.match.params.id) : 1);
    }, [props.match.params.id])

    return (<Layout {...props} user_type={user_type}>
        <Content activeCategoryId={activeCategoryId} setActiveCategoryId={setActiveCategoryId} />
    </Layout>
    )
}

export default React.memo(NewsFeed);