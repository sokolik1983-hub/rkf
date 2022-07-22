import React, {memo, useState} from "react";
import UserDescription from "../../../../components/UserDescription";
import UserContacts from "../../../NBC/UserContacts";
import ExhibitionsComponent from "../../../../components/ExhibitionsComponent";
import UserPhotoGallery from "../../../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../../../components/Layouts/UserGallerys/UserVideoGallery";
import AddArticle from "../../../../components/UserAddArticle";
import UserNews from "../../../../components/Layouts/UserNews";
import "./index.scss";


const NKPMain = ({NBCInfo, canEdit, isMobile}) => {
    const {name, user_type, counters} = NBCInfo;
    const [needNewsRequest, setNeedNewsRequest] = useState(true);
    const [userCounters, setUserCounters] = useState(counters);

    return (
        <>
            <UserDescription description={NBCInfo.comment} />
            <UserContacts {...NBCInfo} counters={userCounters} alias={`nbc/${NBCInfo.alias}`} />
            <ExhibitionsComponent alias={NBCInfo.alias} nbcId={NBCInfo.nbc_id} />
            {isMobile &&
                <>
                    <UserPhotoGallery
                        alias={NBCInfo.alias}
                        pageLink={`/nbc/${NBCInfo.alias}/gallery`}
                        canEdit={canEdit}
                    />
                    <UserVideoGallery
                        alias={NBCInfo.alias}
                        pageLink={`/nbc/${NBCInfo.alias}/video`}
                        canEdit={canEdit}
                    />
                </>
            }
            {canEdit &&
                <AddArticle
                    logo={NBCInfo.logo_link}
                    setNeedRequest={setNeedNewsRequest}
                    profileInfo={{name, user_type, counters}}
                    setProfileInfo={({counters}) => setUserCounters(counters)}
                />
            }
            <UserNews
                canEdit={canEdit}
                alias={NBCInfo.alias}
                needRequest={needNewsRequest}
                setNeedRequest={setNeedNewsRequest}
                counters={userCounters}
                setCounters={setUserCounters}
            />
        </>
    );
};

export default memo(NKPMain);