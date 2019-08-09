import React from 'react'
import {connectExhibitionPrice} from 'apps/ClientExhibitionPrices/connectors'


function ExhibitionPriceTableRow({id, description, sum, discont}){
    return(
        <tr>
            <td>{description}</td>
            <td>{discont}</td>
            <td>{sum}</td>
        </tr>
    )
}

export default connectExhibitionPrice(ExhibitionPriceTableRow)