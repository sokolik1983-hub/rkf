import React from 'react'
import {connectExhibitionPriceList} from 'apps/ClientExhibitionPrices/connectors'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {listPricesByExhibitionIdUrl} from 'apps/ClientExhibitionPrices/config'
import ExhibitionPriceTableRow from './TableRow'
import './styles.scss'

function ExhibitionPriceTable({listIds, getPriceListSuccess, exhibitionId}) {
    const url = listPricesByExhibitionIdUrl + exhibitionId;
    useResourceAndStoreToRedux(url, getPriceListSuccess);
    return (
        listIds && !!listIds.length && <table className="exhibition-price-table">
            <thead>
            <tr>
                <td>Тип цены</td>
                <td>Скидка</td>
                <td>Цена</td>
            </tr>
            </thead>
            <tbody>
            {
                listIds.map(id => <ExhibitionPriceTableRow key={id} id={id}/>)
            }
            </tbody>
        </table>
    )
}

export default connectExhibitionPriceList(ExhibitionPriceTable)