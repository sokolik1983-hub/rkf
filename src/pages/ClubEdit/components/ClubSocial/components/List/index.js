import React from "react";
import Loading from "../../../../../../components/Loading";
import ListSocial from "./ListItem";
import {useResourceAndStoreToRedux} from "../../../../../../shared/hooks";
import {getlistUrl} from "../../config";
import {connectListSocial} from "../../connectors";
import "./styles.scss";


const ClientSocialList = ({listIds, getClubSocialListSuccess, club_id, editable}) => {
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubSocialListSuccess);
    
    return (
        <div className="ClientSocialList">
            {loading ?
                <Loading/> :
                listIds.map(id => <ListSocial editable={editable} key={id} id={id} />)}
        </div>
    )
};

export default connectListSocial(ClientSocialList)