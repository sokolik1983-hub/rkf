import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectClubInfo,
    selectClubHeader,
    selectClubDescription,
    selectClubContacts,
    selectClubHeaderPicture,
    selectClubLogoPicture,
    selectClubAlias,
} from './selectors'

import {
    getClubSuccess,
    clubPictureUpdateSuccess,
    clubLogoUpdateSuccess,
    clubAliasUpdateSuccess,
    clubInfoUpdateSuccess
} from './actions'


export const connectClientClubHeader = connect(
    selectClubHeader
);

export const connectClientClubDescription = connect(
    selectClubDescription
);

export const connectClientClubContacts = connect(
    selectClubContacts
);

export const connectClientClubHeaderPicture = connect(
    selectClubHeaderPicture,
    dispatch => bindActionCreators({
        clubPictureUpdateSuccess
    }, dispatch)
);

export const connectClientClubLogoPicture = connect(
    selectClubLogoPicture,
    dispatch => bindActionCreators({
        clubLogoUpdateSuccess
    }, dispatch)
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
export const connectClubAlias = connect(
    selectClubAlias,
    dispatch => bindActionCreators({
        clubAliasUpdateSuccess
    }, dispatch)
);

export const connectClubInfo = connect(
    selectClubInfo,
);

export const connectClubInfoForm = connect(
    selectClubInfo,
    dispatch => bindActionCreators({
        clubInfoUpdateSuccess
    }, dispatch)
);