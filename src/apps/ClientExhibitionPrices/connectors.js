import {connect} from 'react-redux'
import {selectExhibitionPriceList, selectPrice} from './selectors'
import {getPriceListSuccess} from './actions'
import {bindActionCreators} from "redux";

export const connectExhibitionPriceList = connect(
    selectExhibitionPriceList,
    dispatch => bindActionCreators(
        {
            getPriceListSuccess
        }, dispatch
    )
);

export const connectExhibitionPrice = connect(
    selectPrice,
)