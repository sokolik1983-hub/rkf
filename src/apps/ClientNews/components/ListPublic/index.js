import React, { useContext, useState } from 'react'
import NewsAreEmpty from 'components/Club/NewsAreEmpty'
import Modal from 'components/Modal'
import ListArticle from '../ListArticle'
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
    const ellipsisText = (e, etc) => {
        let wordArray = e.innerHTML.split(" ");
        while (e.scrollHeight > e.offsetHeight) {
            wordArray.pop();
            e.innerHTML = wordArray.join(" ") + (etc || "...");
        }
    };
    [].forEach.call(document.querySelectorAll(".NewsStory__Text"), elem => ellipsisText(elem));


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
        <>
            {listIds.map(id => <ListArticle key={id} id={id} onArticleClick={onArticleClick} />)}
            <Modal showModal={showModal} handleClose={onModalClose}>
                {activeArticleId ? <ListArticle id={activeArticleId} /> : null}
            </Modal>
        </>
    )
}

export default connectNewsList(ClientNewsList)

