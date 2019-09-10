import React from 'react'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {connectExhibitionPrices} from 'apps/Exhibitions/connectors'
import './styles.scss'

function PriceTableRow({description, sum}) {
    return (
        <tr>
            <td className="ExhibitionDetailsPrices__description">{description}</td>
            <td className="ExhibitionDetailsPrices__sum">{sum}</td>
        </tr>
    )

}

function ExhibitionDetailsPrices({exhibition_id, exhibitionPrices, storePrices}) {
    const url = '/api/exhibitions/Price/byexhibition/' + exhibition_id;
    const {loading} = useResourceAndStoreToRedux(url, storePrices);

    return (
        <div className="ExhibitionDetailsPrices">
            <h3>Цены</h3>
            <table>
                <thead>
                <tr>
                    <th>Тип</th>
                    <th>Цена</th>
                </tr>
                </thead>
                <tbody>
                {
                    exhibitionPrices.map(row => <PriceTableRow key={row.id} {...row}/>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default connectExhibitionPrices(ExhibitionDetailsPrices)