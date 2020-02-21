import { defaultReduxKey } from './config';

export const getState = state => state[defaultReduxKey];

export const selectReports = state => {
    const { reportsList } = getState(state);
    return {
        reportsList
    };
};
export const selectReportHeader = state => {
    const { reportHeader, exhibitionDetails } = getState(state);
    return {
        reportHeader,
        exhibitionDetails
    };
};
