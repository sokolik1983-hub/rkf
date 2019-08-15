import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectClubContacts,
    selectClubDescription,
    selectClubHeader,
    selectClubHeaderPicture,
    selectClubLogoPicture,
    selectClubDocuments,
    selectPublicClubAddress
} from './selectors'

import {getClubSuccess} from './actions'



export const connectPublicClubHeader = connect(
    selectClubHeader
);

export const connectPublicClubDescription =  connect(
    selectClubDescription
);

export const connectPublicClubContacts =  connect(
    selectClubContacts
);

export const connectPublicClubDocuments =  connect(
    selectClubDocuments
);

export const connectPublicClubHeaderPicture =  connect(
    selectClubHeaderPicture,
);

export const connectPublicClubLogoPicture =  connect(
    selectClubLogoPicture,
);

export const connectPublicClubAddress =  connect(
    selectPublicClubAddress,
);

export const connectPublicClub = connect(
    null,
    dispatch => bindActionCreators({
        getClubSuccess
    }, dispatch)
);
