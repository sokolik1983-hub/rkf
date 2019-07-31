import injectReducer from "../utils/injectReducer";
import injectSaga from "../utils/injectSaga";

export const createDefaultInjectors = ({defaultReduxKey, reducer, saga}) => {
    if (defaultReduxKey) {
        return {
            withReducer: injectReducer({key: defaultReduxKey, reducer: reducer}),
            withSaga: injectSaga({key: defaultReduxKey, saga})
        }
    }
    throw Error('No defaultReduxKey was provided')
};