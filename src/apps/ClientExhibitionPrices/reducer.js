import * as actiontypes from './actiontypes';



const clientExhibitionPricesInitialState = {
    loading: false,
};

export default function clientExhibitionPricesReducer(state = clientExhibitionPricesInitialState, action) {

    switch (action.type) {

        case actiontypes.CLEAR_REQUEST_ERRORS: {
            return {
                ...state,
                requestErrors: {},
            }
        }

        default:
            return state;
    }
}
