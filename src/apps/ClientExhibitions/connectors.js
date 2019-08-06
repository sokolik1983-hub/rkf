import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    getExhibitionById,
    getExhibitionsDetailsImages,
    getExhibitionsDetailsById, getExhibitionsIdList, getExhibitionDetailsFor
} from "./selectors";
import {
    getExhibitionDetails,
    getExhibitionList,
    addExhibitionSuccess,
    updateExhibitionSuccess,
    addAvatarSuccess,
    addMapSuccess,
    deleteAvatarSuccess,
    deleteMapSuccess,
} from "./actions";

export const connectExhibitionDetails = connect(
    getExhibitionsDetailsById,
    dispatch => bindActionCreators({
        getExhibitionDetails,
    }, dispatch)
);


export const connectExhibitionImages = connect(
    getExhibitionsDetailsImages,
    dispatch => bindActionCreators({
        addAvatarSuccess,
        addMapSuccess,
        deleteAvatarSuccess,
        deleteMapSuccess,
    }, dispatch)
);

export const connectClientExhibitionListItem = connect(
    getExhibitionById,
);

export const connectClientExhibitionsList = connect(
    getExhibitionsIdList,
    dispatch => bindActionCreators({
        getExhibitionList
    }, dispatch)
);

export const connectCreateExhibitionForm = connect(
    null,
    dispatch => bindActionCreators({
            addExhibitionSuccess,
        }, dispatch
    )
);

export const connectUpdateExhibitionForm = connect(
    getExhibitionDetailsFor,
    dispatch => bindActionCreators({
            updateExhibitionSuccess,
        }, dispatch
    )
);