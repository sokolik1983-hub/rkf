import React, { useState, useEffect } from "react";
import UserLayout from "components/Layouts/UserLayout";
import ClubLayout from "components/Layouts/ClubLayout";
import NurseryLayout from "components/Layouts/NurseryLayout";
import CategoriesList from "./components/CategoriesList";
import MustRead from "./components/MustRead";
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

const Content = (props) => {
    const { showMustRead, notificationUrlIndex } = props;

    return (
        <div className="NewsFeed">
            <div className="NewsFeed-left">
                <NewsList {...props} />
            </div>
            <div className="NewsFeed-right">
                <CategoriesList {...props} />
                {( showMustRead || notificationUrlIndex === 4) && <MustRead {...props} notificationUrlIndex={notificationUrlIndex} />}
            </div>
        </div>);
};

const NewsFeed = (props) => {
    const [activeCategoryId, setActiveCategoryId] = useState(1);
    const [showMustRead, setShowMustRead] = useState(false);
    const [notificationUrlIndex, setNotificationUrlIndex] = useState(null);

    useEffect(() => {
        setActiveCategoryId(props.match.params.id ? parseInt(props.match.params.id) : 1);
        setNotificationUrlIndex(props.match.params.id ? parseInt(props.match.params.id) : null);
        setShowMustRead(props.match.params.id && parseInt(props.match.params.id) === 4 ? true : false);
    }, [props.match.params.id])

    return (<Layout {...props} user_type={user_type}>
        <Content
            activeCategoryId={activeCategoryId}
            setActiveCategoryId={setActiveCategoryId}
            showMustRead={showMustRead}
            setShowMustRead={setShowMustRead}
            notificationUrlIndex={notificationUrlIndex}
        />
    </Layout>
    )
}

export default NewsFeed;