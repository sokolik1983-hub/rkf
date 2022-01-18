import React from "react";
import Loading from "../../../../../../components/Loading";
import ListDocument from "./ListItem";
import {useResourceAndStoreToRedux} from "../../../../../../shared/hooks";
import {connectListDocument} from "../../connectors";
import {getlistUrl} from "../../config";
import "./styles.scss";


const ClientDocumentList = ({
        club_id,
        listIds,
        editable,
        setDocs,
        getClubDocumentsListSuccess,
}) => {
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubDocumentsListSuccess);

    return loading ?
        <Loading/> :
        <div className="ClientDocumentList">
            {listIds.map(id => <ListDocument
                setDocs={setDocs}
                editable={editable}
                key={id}
                id={id}/>)}
        </div>
};

export default connectListDocument(React.memo(ClientDocumentList));