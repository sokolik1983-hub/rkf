import React from "react";
import UserBanner from "../../components/Layouts/UserBanner";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import UserDescription from "../../components/Layouts/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import { DEFAULT_IMG } from "../../appConfig";
import UserLayout from 'components/Layouts/UserLayout';

const Content = ({ isMobile,
    userInfo,
    getUserInfo,
    canEdit,
    alias,
    setNeedRequest,
    needRequest,
    setUserInfo
}) => <>
        {!isMobile &&
            <UserBanner link={userInfo.headliner_link} canEdit={canEdit} updateInfo={getUserInfo} />
        }
        <UserDescription
            mainInfo={userInfo.main_information}
            additionalInfo={userInfo.additional_information}
            counters={userInfo.counters}
            profileAlias={`/user/${alias}`}
        />
        {isMobile &&
            <>
                <UserPhotoGallery
                    alias={alias}
                    pageLink={`/user/${alias}/gallery`}
                    canEdit={canEdit}
                />
                <UserVideoGallery
                    alias={alias}
                    pageLink={`/user/${alias}/video`}
                    canEdit={canEdit}
                />
            </>
        }
        {canEdit &&
            <AddArticle
                id={userInfo.profile_id}
                logo={userInfo.logo_link || DEFAULT_IMG.userAvatar}
                setNeedRequest={setNeedRequest}
                userPage
                profileInfo={userInfo}
                setProfileInfo={setUserInfo}
            />
        }
        <UserNews
            canEdit={canEdit}
            alias={alias}
            needRequest={needRequest}
            setNeedRequest={setNeedRequest}
            first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
            last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
            profileInfo={userInfo}
            setProfileInfo={setUserInfo}
        />
    </>;

const UserPage = (props) => {
    return (
        <UserLayout {...props}>
            <Content />
        </UserLayout>
    )
};

export default React.memo(UserPage);