import React, {memo, useState, useEffect} from "react";
import ls from "local-storage";
import NBCLayout from "../../components/Layouts/NBCLayout";
import UserLayout from "../../components/Layouts/UserLayout";
import ClubLayout from "../../components/Layouts/ClubLayout";
import NurseryLayout from "../../components/Layouts/NurseryLayout";
import { connectShowFilters } from '../../components/Layouts/connectors';
import CategoriesList from "./components/CategoriesList";
import MustRead from "./components/MustRead";
import NewsList from "./components/NewsList";
import {blockContent} from "../../utils/blockContent";

import "./styles.scss";

const user_type = ls.get('user_info').user_type;

const Layout = props => {
    if (user_type === 1) {
        return <UserLayout {...props} />
    }
    else if (user_type === 4) {
        return <NurseryLayout {...props} />
    } else if (user_type === 7) {
        return <NBCLayout newsFeed={true} {...props} layoutWithFilters={true} />
    }
    else {
        return <ClubLayout {...props} />
    }
};

const Content = props => { //Дополнительные props берутся из Layout. Это неочевидно и лучше так не делать.
    const {
        showMustRead,
        setShowMustRead,
        notificationUrlIndex,
        activeCategoryId,
        showFilter,
        setShowFilters,
        countersChanges,
        setCountersChanges,
    } = props;

    blockContent(showFilter);

    console.log(showMustRead, activeCategoryId);

    useEffect(() => {
        activeCategoryId === 5 && setShowMustRead(true)
    }, [])

    return (
        <>
            <div className="news-feed">

                <div className="news-feed-left">
                    <NewsList
                        {...props}
                        setCountersChanges={setCountersChanges}
                    />
                </div>

                <aside className={`notification-page__filters ${showFilter ? ' _open' : ''} `}>
                            <div className={showFilter ? "news-feed-right" : 'news-feed-right hidden'}>
                                <CategoriesList
                                    {...props}
                                    setShowFilters={setShowFilters}
                                    countersChanges={countersChanges}
                                    setCountersChanges={setCountersChanges}
                                />
                                {(showMustRead || (notificationUrlIndex === 4 && activeCategoryId === 5)) &&
                                    <MustRead
                                        {...props}
                                        notificationUrlIndex={notificationUrlIndex}
                                        setShowFilters={setShowFilters}
                                    />
                                }
                            </div>
                </aside>
            </div>
        </>
    );
};

const NewsFeed = props => {
    const [activeCategoryId, setActiveCategoryId] = useState(1);
    const [showMustRead, setShowMustRead] = useState(false);
    const [notificationUrlIndex, setNotificationUrlIndex] = useState(null);
    const [countersChanges, setCountersChanges] = useState(false);

    useEffect(() => {
        setActiveCategoryId(props.match.params.id ? parseInt(props.match.params.id) : 1);
        setNotificationUrlIndex(props.match.params.id ? parseInt(props.match.params.id) : null);
        setShowMustRead(!!props.match.params.id && parseInt(props.match.params.id) === 4);
    }, [props.match.params.id]);


    return (
        <Layout {...props} user_type={user_type}>
            <Content
                showFilter={props.isOpenFilters}
                setShowFilters={props.setShowFilters}
                activeCategoryId={activeCategoryId}
                setActiveCategoryId={setActiveCategoryId}
                showMustRead={showMustRead}
                setShowMustRead={setShowMustRead}
                notificationUrlIndex={notificationUrlIndex}
                countersChanges={countersChanges}
                setCountersChanges={setCountersChanges}
            />
        </Layout>
    )
};

export default connectShowFilters(memo(NewsFeed));