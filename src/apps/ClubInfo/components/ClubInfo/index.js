import React from 'react'
import {connectClubInfo} from 'apps/ClubInfo/connectors'
import {useResourceAndStoreToRedux} from "shared/hooks";
import {objectNotEmpty} from "../../../../utils";

function ClubInfo({club_id, clubInfo, getClubInfoSuccess}) {
    const url = '/api/club?id=' + club_id;
    const {loading} = useResourceAndStoreToRedux(url, getClubInfoSuccess);
    // TODO Исправить лигику вот этого вот всего
    if(!objectNotEmpty(clubInfo)){
        return null
    }
    const {id, address, site, description} = clubInfo;
    return (
        <div id={`ClubInfo_${id}`} className="ClubInfo">
            <div className="ClubInfo__address">address: {address}</div>
            <div className="ClubInfo__site">site: {site}</div>
            <div className="ClubInfo__description">description: {description}</div>
        </div>
    )
}

export default connectClubInfo(ClubInfo)