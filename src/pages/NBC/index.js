import React from "react";
import UserBanner from "../../components/Layouts/UserBanner";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import NBCLayout from "../../components/Layouts/NBCLayout";
import UserHeader from "../../components/redesign/UserHeader";
import UserContacts from "../../components/redesign/UserContacts";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";

import "./index.scss"
import UserDescription from "../../components/UserDescription";

const Content = ({
                     isMobile,
                     nbcInfo,
                     canEdit,
                     getNBCInfo,
                     alias,
                     nbcProfileId,
                     onSubscriptionUpdate,
                     isAuthenticated,
                     setNeedRequest,
                     setNBCInfo,
                     needRequest
                 }) => {

    return (
        <>
            <UserBanner
                link={nbcInfo?.headliner_link}
                canEdit={canEdit}
                updateInfo={getNBCInfo}
            />
            {isMobile && nbcInfo &&
                <UserHeader
                    user='nbc'
                    logo={nbcInfo.logo_link}
                    name={nbcInfo.name || 'Название НКП отсутствует'}
                    alias={nbcInfo.alias}
                    profileId={nbcProfileId}
                    canEdit={canEdit}
                    subscribed={nbcInfo.subscribed}
                    onSubscriptionUpdate={onSubscriptionUpdate}
                    isAuthenticated={isAuthenticated}
                />
            }
            <UserDescription description={nbcInfo?.description} />
            <UserContacts {...nbcInfo} profileAlias={alias} />
            <div className="club-page__exhibitions">
                {/*//Временный тестовый алиас*/}
                <ExhibitionsComponent alias={'kdtf180320'} />
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

const NBCPage = (props) => {
    return (
            <NBCLayout {...props}>
                <Content />
            </NBCLayout>
    )
};

export default React.memo(NBCPage);