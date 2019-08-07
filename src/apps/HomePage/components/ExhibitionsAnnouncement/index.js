import React from 'react'

import {useResourceAndStoreToRedux} from 'shared/hooks'
import {getExhibitionsSuccess} from 'apps/HomePage/actions'
import {publicExhibitionsEndpoint} from 'apps/HomePage/config'
import {connectExhibitionsAnnouncementList} from 'apps/HomePage/connectors'
import ExhibitionAnnouncement from './Announcement'

import './styles.scss'

function ExhibitionsAnnouncementList({listIds}) {

    const {loading} = useResourceAndStoreToRedux(publicExhibitionsEndpoint, getExhibitionsSuccess);

    return (
        <div className="ExhibitionAnnouncement__list">
            {
                loading ?
                    <div className="text-center">"loading..."</div>
                    :
                    listIds.map(id => <ExhibitionAnnouncement key={id} id={id}/>)
            }
        </div>
    )
}

export default connectExhibitionsAnnouncementList(ExhibitionsAnnouncementList);