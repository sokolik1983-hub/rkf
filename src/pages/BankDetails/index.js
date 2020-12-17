import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import StickyBox from "react-sticky-box";
import Aside from "../../components/Layouts/Aside";
import ls from "local-storage";
import DetailsCard from "./components/DetailsCard";
import CopyrightInfo from "../../components/CopyrightInfo";
import TopComponent from "../../components/TopComponent";
import UserMenu from "../../components/Layouts/UserMenu";
import Card from "../../components/Card";
import UserInfo from "../../components/Layouts/UserInfo";
import { clubNav } from "../Docs/config";
import { kennelNav } from "../NurseryDocuments/config";
import { userNav } from "../UserDocuments/config";
import { Request } from "../../utils/request";
import { getFedInfo, mainFedList, oankooFedList } from "./config";
import "./index.scss";

const BankDetails = () => {
    const [fedIdList, setFedIdList] = useState(null);

    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const name = ls.get('user_info') ? ls.get('user_info').name : '';
    const logo = ls.get('user_info') ? ls.get('user_info').logo_link : '';
    const user_type = ls.get('user_info') ? ls.get('user_info').user_type : '';
    const first_name = ls.get('user_info') ? ls.get('user_info').first_name : '';
    const last_name = ls.get('user_info') ? ls.get('user_info').last_name : '';

    useEffect(() => {
        (() => Request({
            url: `/api/federation/payment_requisites`
        }, data => {
            setFedIdList(data);
        }, error => {
            console.log(error.response);
        }))();
    }, []);

    return (
        <Layout>
            <div className="redesign">
                <Container className="content">
                    {user_type !== 1 && <TopComponent
                        logo={logo ? logo : ``}
                        name={name ? name : ``}
                        canEdit={false}
                        withShare={false}
                        bank_details
                    />}
                    <div className="base-search__content-wrap">
                        <div className={`base-search__content ${user_type === 1 ? `_user_page` : ``}`}>
                            {user_type !== 1 && fedIdList && fedIdList.map((fed, i) => <DetailsCard
                                key={i}
                                iconClassName={getFedInfo(fed.organization_type).iconClassName}
                                title={`Реквизиты ${getFedInfo(fed.organization_type).fedName}`}
                                documentId={fed.document_id}
                                description={`В данном разделе Вы можете ознакомиться с реквизитами ${getFedInfo(fed.organization_type).fedName} для оплаты членских взносов и изготовления документов. В целях осуществления регистрации помета, изготовления родословной и др. документов необходимо произвести оплату по указанным реквизитам и прикрепить платежный документ к соответствующей заявке в разделе "Оформление документов".`}
                            />)}
                            {user_type === 1 && fedIdList && <>
                                {mainFedList(fedIdList).map((fed, i) => <DetailsCard
                                    key={i}
                                    iconClassName={getFedInfo(fed.organization_type).iconClassName}
                                    title={`Реквизиты ${getFedInfo(fed.organization_type).fedName}`}
                                    documentId={fed.document_id}
                                    description={`В данном разделе Вы можете ознакомиться с реквизитами ${getFedInfo(fed.organization_type).fedName} для оплаты членских взносов и изготовления документов. В целях осуществления регистрации помета, изготовления родословной и др. документов необходимо произвести оплату по указанным реквизитам и прикрепить платежный документ к соответствующей заявке в разделе "Оформление документов".`}
                                />)}
                                <DetailsCard
                                    isUserCard
                                    docList={oankooFedList(fedIdList)}
                                    iconClassName={'oankoo-logo'}
                                    title={`Реквизиты ОАНКОО`}
                                    documentId={1}
                                    description={`В данном разделе Вы можете ознакомиться с реквизитами ОАНКОО для оплаты членских взносов и изготовления документов. В целях осуществления регистрации помета, изготовления родословной и др. документов необходимо произвести оплату по указанным реквизитам и прикрепить платежный документ к соответствующей заявке в разделе "Оформление документов".`}
                                />
                            </>}
                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={65}>
                                <div className="base-search__info-inner">
                                    {user_type === 1 &&
                                        <>
                                            <Card style={{ margin: '16px 0 16px 0' }}>
                                                <UserInfo
                                                    // canEdit={canEdit}
                                                    logo_link={logo}
                                                    share_link={`https://rkf.online/user/${alias}`}
                                                    first_name={first_name ? first_name : 'Аноним'}
                                                    last_name={last_name ? last_name : ''}
                                                    alias={alias}
                                                // updateInfo={getUserInfo}
                                                />
                                            </Card>
                                            <UserMenu
                                                userNav={userNav(alias)}
                                            />
                                        </>
                                    }
                                    {user_type === 3 && <UserMenu
                                        userNav={clubNav(alias)}
                                    />}
                                    {user_type === 4 && <UserMenu
                                        userNav={kennelNav(alias)}
                                    />}
                                    <CopyrightInfo />
                                </div>
                            </StickyBox>
                        </Aside>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default React.memo(BankDetails);