import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import StickyBox from "react-sticky-box";
import Aside from "../../components/Layouts/Aside";
import ls from "local-storage";
import DetailsCard from "./components/DetailsCard";
import CopyrightInfo from "../../components/CopyrightInfo";
import TopComponent from "../../components/TopComponent";
import Card from "../../components/Card";
import UserInfo from "../../components/Layouts/UserInfo";
import { Request } from "../../utils/request";
import { getFedInfo, mainFedList, oankooFedList } from "./config";
import { connectAuthVisible } from "../../pages/Login/connectors";
import Loading from "../../components/Loading";
import useIsMobile from "../../utils/useIsMobile";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./index.scss";

const BankDetails = ({ profile_id, is_active_profile, isAuthenticated, history }) => {
    const [fedIdList, setFedIdList] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile(1080);

    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const name = ls.get('user_info') ? ls.get('user_info').name : '';
    const logo = ls.get('user_info') ? ls.get('user_info').logo_link : '';
    const user_type = ls.get('user_info') ? ls.get('user_info').user_type : '';

    useEffect(() => {
        (() => Request({
            url: `/api/federation/federation_documents`
        }, data => {
            setFedIdList(data);
        }, error => {
            console.log(error.response);
            history.replace('/');
        }))();
    }, []);

    useEffect(() => {
       if (user_type === 1) { Promise.all([getUserInfo()])
            .then(() => setLoading(false));} else {
                setLoading(false)
            }
    }, [user_type]);

    const getUserInfo = async needUpdateAvatar => {
        return Request({
            url: '/api/owners/owner/public_full/' + alias
        }, data => {
            if (needUpdateAvatar) {
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
            }
            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
        });
    };

    return (loading ? <Loading /> :
        <Layout>
            <div className="redesign">
                <Container className="content">
                    {user_type !== 1 && <TopComponent
                        logo={logo ? logo : ``}
                        name={name ? name : ``}
                        canEdit={false}
                        withShare={false}
                        userType={user_type}
                        bank_details
                    />}

                    <div className="base-search__content-wrap">
                        {isMobile && user_type === 1 &&
                            <Card className="base-search__content-card">
                                <UserInfo
                                    canEdit={canEdit}
                                    logo_link={userInfo.logo_link}
                                    share_link={`${window.location.host}/user/${alias}`}
                                    first_name={userInfo.personal_information.first_name ? userInfo.personal_information.first_name : 'Аноним'}
                                    last_name={userInfo.personal_information.last_name ? userInfo.personal_information.last_name : ''}
                                    alias={alias}
                                    updateInfo={getUserInfo}
                                    judgeInfo={userInfo.open_roles}
                                />
                            </Card>
                        }
                        <div className={`base-search__content ${user_type === 1 ? `_user_page` : ``}`}>
                            {user_type !== 1 && fedIdList?.map((fed, i) => <DetailsCard
                                key={i}
                                fedName={getFedInfo(fed.organization_type).fedName}
                                iconClassName={getFedInfo(fed.organization_type).iconClassName}
                                title={`Реквизиты ${getFedInfo(fed.organization_type).fedName}`}
                                documents={fed.documents}
                                description={getFedInfo(fed.organization_type).fedName === 'РКФ' ? `В данном разделе Вы можете ознакомиться с реквизитами РКФ для оплаты изготовления документов. Для оформления сертификатов, дипломов и керакарт необходимо произвести оплату по указанным реквизитам и прикрепить платежный документ к соответствующей заявке в разделе "Оформление документов".` :
                                    `В данном разделе Вы можете ознакомиться с реквизитами ${getFedInfo(fed.organization_type).fedName} для оплаты членских взносов и оформления племенных документов. В целях осуществления регистрации помета, изготовления родословной необходимо произвести оплату по указанным реквизитам и прикрепить платежный документ к соответствующей заявке в разделе "Оформление документов".`
                                }
                            />)}
                            {user_type === 1 && fedIdList && <>
                                {mainFedList(fedIdList).map((fed, i) => <DetailsCard
                                    key={i}
                                    fedName={getFedInfo(fed.organization_type).fedName}
                                    iconClassName={getFedInfo(fed.organization_type).iconClassName}
                                    title={`Реквизиты ${getFedInfo(fed.organization_type).fedName}`}
                                    documents={fed.documents}
                                    description={getFedInfo(fed.organization_type).fedName === 'РКФ' ? `В данном разделе Вы можете ознакомиться с реквизитами РКФ для оплаты изготовления документов. Для оформления сертификатов, дипломов и керакарт необходимо произвести оплату по указанным реквизитам и прикрепить платежный документ к соответствующей заявке в разделе "Оформление документов".` :
                                        `В данном разделе Вы можете ознакомиться с реквизитами ${getFedInfo(fed.organization_type).fedName} для оплаты членских взносов и оформления племенных документов. В целях осуществления регистрации помета, изготовления родословной необходимо произвести оплату по указанным реквизитам и прикрепить платежный документ к соответствующей заявке в разделе "Оформление документов".`
                                    }
                                />)}
                                <DetailsCard
                                    isUserCard
                                    docList={oankooFedList(fedIdList)}
                                    iconClassName="oankoo-logo"
                                    title="Реквизиты ОАНКОО"
                                    description={`В данном разделе Вы можете ознакомиться с реквизитами ОАНКОО для оплаты членских взносов и оформления племенных документов. В целях осуществления регистрации помета, изготовления родословной необходимо произвести оплату по указанным реквизитам и прикрепить платежный документ к соответствующей заявке в разделе "Оформление документов".`}
                                />
                            </>}
                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={60}>
                                <div className="base-search__info-inner">
                                    {user_type === 1 &&
                                        <>
                                            {!isMobile &&
                                                <Card className="base-search__info-card">
                                                    <UserInfo
                                                        canEdit={canEdit}
                                                        logo_link={userInfo.logo_link}
                                                        share_link={`${window.location.host}/user/${alias}`}
                                                        first_name={userInfo.personal_information.first_name ? userInfo.personal_information.first_name : 'Аноним'}
                                                        last_name={userInfo.personal_information.last_name ? userInfo.personal_information.last_name : ''}
                                                        alias={alias}
                                                        updateInfo={getUserInfo}
                                                        judgeInfo={userInfo.open_roles}                                                />
                                                </Card>
                                            }
                                        </>
                                    }
                                    {!isMobile &&  <MenuComponentNew />}
                                    <CopyrightInfo withSocials={true} />
                                </div>
                            </StickyBox>
                        </Aside>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default connectAuthVisible(React.memo(BankDetails));