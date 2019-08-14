import {connect} from "react-redux";
import {
    selectClubHeader,
    selectClubDescription,
    selectClubContacts,
    selectClubHeaderPicture,
    selectClubLogoPicture,
    selectClubAlias
} from './selectors'

import {getClubSuccess,getClubPictureUpdateSuccess, getClubLogoUpdateSuccess} from './actions'
import {bindActionCreators} from "redux";


export const connectClientClubHeader = connect(
    selectClubHeader
);

export const connectClientClubDescription =  connect(
    selectClubDescription
);

export const connectClientClubContacts =  connect(
    selectClubContacts
);

export const connectClientClubHeaderPicture =  connect(
    selectClubHeaderPicture,
    dispatch=>bindActionCreators({
        getClubPictureUpdateSuccess
    },dispatch)

);

export const connectClientClubLogoPicture =  connect(
    selectClubLogoPicture,
    dispatch=>bindActionCreators({
        getClubLogoUpdateSuccess
    },dispatch)

);

export const connectClientClub = connect(
    null,
    dispatch => bindActionCreators({
        getClubSuccess
    }, dispatch)
);
export const connectClientClubAlias = connect(
    selectClubAlias,
    dispatch => bindActionCreators({
        getClubSuccess
    }, dispatch)
);