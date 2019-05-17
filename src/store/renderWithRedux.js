import React from 'react'
import {render} from 'react-testing-library'
import {Provider} from 'react-redux'
import configureStore from 'store'


//Store
const store = configureStore({}, null);
export default function renderWithRedux(
    ui,
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}