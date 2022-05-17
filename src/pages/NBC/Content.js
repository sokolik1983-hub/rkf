import React, {useState} from "react";
import UserDescription from "../../components/UserDescription";
import UserContacts from "./UserContacts";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";

const Content = ({
                     isMobile,
                     nbcInfo,
                     canEdit,
                     alias,
                     nbcProfileId,
                     setNBCInfo,
                 }) => {
    const [needRequest, setNeedRequest] = useState(true);
    return (
        <>
            <UserDescription description={nbcInfo?.comment} />
            <UserContacts {...nbcInfo} alias={`nbc/${nbcInfo?.alias}`} />
            <div className="club-page__exhibitions">
                <ExhibitionsComponent alias={alias} nbcId={nbcInfo?.nbc_id} />
            </div>
            {isMobile && nbcInfo &&
                <>
                    <UserPhotoGallery
                        alias={nbcInfo.alias}
                        pageLink={`/nbc/${nbcInfo.alias}/gallery`}
                        canEdit={canEdit}
                    />
                    <UserVideoGallery
                        alias={nbcInfo.alias}
                        pageLink={`/nbc/${nbcInfo.alias}/video`}
                        canEdit={canEdit}
                    />
                </>
            }
            {canEdit && nbcInfo &&
                <AddArticle
                    id={nbcProfileId}
                    logo={nbcInfo.logo_link}
                    setNeedRequest={setNeedRequest}
                    profileInfo={nbcInfo}
                    setProfileInfo={setNBCInfo}
                />
            }
            <UserNews
                canEdit={canEdit}
                alias={alias}
                needRequest={needRequest}
                setNeedRequest={setNeedRequest}
                profileInfo={nbcInfo}
                setProfileInfo={setNBCInfo}
            />
        </>
    )
}

export default Content;