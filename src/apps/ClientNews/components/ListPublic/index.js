import React, { useContext, useState } from 'react'
import NewsAreEmpty from 'components/Club/NewsAreEmpty'
import Modal from 'components/Modal'
import ListArticle from '../ListArticle'
import ListArticleDetails from '../ListArticle/ListArticleDetails'
import Card from 'components/Card'
import NewsListSearch from '../NewsListSearch'
import { connectNewsList } from 'apps/ClientNews/connectors'
import { GET_NEWS_ENDPOINT } from 'apps/ClientNews/config'
import { useResourceAndStoreToRedux } from "shared/hooks";
import { ClubRouteContext } from 'apps/HomePage/context'

function ClientNewsList({ getNewsSuccess, listIds }) {

    const [showModal, setShowModal] = useState(false);
    const [activeArticleId, setActiveArticleId] = useState(null);
    const onArticleClick = (id) => {
        setShowModal(true);
        setActiveArticleId(id);
    }
    const onModalClose = () => {
        setShowModal(false);
    }

    const { params } = useContext(ClubRouteContext);
    const { route } = params;
    const url = route ? `${GET_NEWS_ENDPOINT}${route}` : `${GET_NEWS_ENDPOINT}rkf`;
    const { loading } = useResourceAndStoreToRedux(url, getNewsSuccess);
    if (listIds.length === 0) {
        return <NewsAreEmpty />
    }
    if (loading) {
        return (<div className="text-center">загрузка...</div>)
    }

    return (
        <Card style={{ marginBottom: '24px' }}>
            <NewsListSearch />
            {listIds.map(id => <ListArticle key={id} id={id} onArticleClick={onArticleClick} />)}
            <Modal showModal={showModal} handleClose={onModalClose}>
                {activeArticleId ? <ListArticleDetails id={activeArticleId} /> : null}
            </Modal>
        </Card>
    )
}

export default connectNewsList(ClientNewsList)

