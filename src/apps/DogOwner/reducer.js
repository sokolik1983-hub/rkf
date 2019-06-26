import * as actiontypes from './actiontypes';


const DogOwnerInitialState = {
    loadingApi: false,
};

export default function DogOwnerRootReducer(state = DogOwnerInitialState, action) {

    switch (action.type) {


        default:
            return state;
    }
}
