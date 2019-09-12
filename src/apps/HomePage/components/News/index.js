import React, { useState } from 'react'
import Modal from 'components/Modal'
import { useResourceAndStoreToRedux } from 'shared/hooks'
//import {getNewsSuccess} from 'apps/HomePage/actions'
import { publicNewsEndpoint } from 'apps/HomePage/config'
import { connectNewsList } from 'apps/HomePage/connectors'
import NewsStory from './NewsStory'
import NewsStoryDetails from './NewsStory/NewsStoryDetails'

import './styles.scss'

function NewsList({ listIds, route, getNewsSuccess }) {

    const [showModal, setShowModal] = useState(false);
    const [activeArticleId, setActiveArticleId] = useState(null);
    const onArticleClick = (id) => {
        setShowModal(true);
        setActiveArticleId(id);
    }
    const onModalClose = () => {
        setShowModal(false);
    }

    const url = route ? publicNewsEndpoint + '?alias=' + route : publicNewsEndpoint;
    const { loading } = useResourceAndStoreToRedux(url, getNewsSuccess);
    return (!loading && listIds) ?
        (<>
            <div className="NewsList">
                {listIds.map(id => <NewsStory key={id} id={id} onArticleClick={onArticleClick} />)}
            </div>
            <Modal showModal={showModal} handleClose={onModalClose}>
                {activeArticleId ? <NewsStoryDetails id={activeArticleId} /> : null}
            </Modal>
        </>
        )
        : <div>Новости не найдены</div>
}

export default connectNewsList(NewsList);