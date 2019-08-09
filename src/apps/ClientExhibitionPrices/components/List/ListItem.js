import React from 'react'
import {connectExhibitionPrice} from 'apps/ClientExhibitionPrices/connectors'

function ExhibitionPrice(props) {
    const {id, description, sum, discont} = props;
    return (
        <div id={`ExhibitionPrice_${id}`} className="flex-row">
            <div>description: {description}</div>
            <div>sum: {sum}</div>
            <div>discont: {discont}</div>
        </div>
    )
}

export default connectExhibitionPrice(ExhibitionPrice);