import * as actiontypes from './actiontypes';


const scheduleInitialState = {
    loadingApi: false,
};

export default function clientRootReducer(state = scheduleInitialState, action) {

    switch (action.type) {


        default:
            return state;
    }
}
