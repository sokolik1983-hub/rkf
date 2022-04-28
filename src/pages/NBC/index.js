import React, {useEffect, useState} from "react";
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
                link={nbcInfo?.headliner_link} //сюда добавить, когда будет готово на беке   nbcInfo.headliner_link ||
                canEdit={canEdit}
                updateInfo={getNBCInfo}
            />
            {isMobile && nbcInfo &&
                <UserHeader
                    user={alias !== 'rkf-online' ? 'club' : ''}
                    logo={nbcInfo.logo_link}
                    name={'Название клуба отсутствует'} //сюда добавить, когда будет готово на беке => nbcInfo.name ||
                    alias={nbcInfo.alias}
                    profileId={nbcProfileId}
                    canEdit={canEdit}
                    subscribed={nbcInfo.subscribed}
                    onSubscriptionUpdate={onSubscriptionUpdate}
                    isAuthenticated={isAuthenticated}
                />
            }
            {/*<UserDescription description={nbcInfo.description} />*/}
            <UserContacts {...nbcInfo} profileAlias={alias} />
            <div className="club-page__exhibitions">
                <ExhibitionsComponent alias={alias} />
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
                    logo={nbcInfo.avatar}
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