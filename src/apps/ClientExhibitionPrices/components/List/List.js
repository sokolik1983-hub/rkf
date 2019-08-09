import React from 'react'

import {useResourceAndStoreToRedux} from 'shared/hooks'
import {connectExhibitionPriceList} from 'apps/ClientExhibitionPrices/connectors'
import {listPricesByExhibitionIdUrl} from 'apps/ClientExhibitionPrices/config'

import ExhibitionPrice from './ListItem'


function ExhibitionPriceList({listIds, getPriceListSuccess, exhibitionId}) {
    const url = listPricesByExhibitionIdUrl + exhibitionId;
    const {loading} = useResourceAndStoreToRedux(url, getPriceListSuccess);

    return (
        <div className="ExhibitionPriceList">
            {
                loading ?
                    'Загрузка...'
                    :
                    listIds.map(id => <ExhibitionPrice key={id} id={id}/>)
            }
        </div>
    )
}

export default connectExhibitionPriceList(ExhibitionPriceList);