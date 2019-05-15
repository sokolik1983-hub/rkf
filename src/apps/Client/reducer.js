import * as actiontypes from './actiontypes';


const clientInitialState = {
    loadingApi: false,
};

export default function clientRootReducer(state = clientInitialState, action) {

    switch (action.type) {


        default:
            return state;
    }
}
