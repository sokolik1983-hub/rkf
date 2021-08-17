import React, {memo, useState, useEffect} from "react";
import StickyBox from "react-sticky-box";
import {Link} from "react-router-dom";
import ls from "local-storage";
import {useTimeOut} from "../../shared/hooks.js";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import CheckStatus from "../Club/components/CheckStatus";
import CheckLitterStatus from "../Club/components/CheckLitterStatus";
import CheckRegistration from "./components/CheckRegistration"
import FoundInfo from "./components/FoundInfo";
import GlobalCard from "./components/GlobalCard";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import ClubsMap from "../../components/ClubsMap";
import Statistics from "../../components/Statistics";
import StampSearch from "./components/StampSearch";
import RefereeSearch from "./components/RefereeSearch";
import TopComponent from "../../components/TopComponent";
import UserMenu from "../../components/Layouts/UserMenu";
import Banner from "../../components/Banner";
import PublicationSearch from "./components/PublicationSearch";
import {parseLocationSearch} from "./utils.js";
import {Request} from "../../utils/request";
import {clubNav} from "../Docs/config";
import {kennelNav} from "../NurseryDocuments/config";
import useIsMobile from "../../utils/useIsMobile";
import SearchCard from "./components/SearchCard/SearchCard";
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";


const BaseSearch = ({ isAuthenticated }) => {
    const [cardClicked, setCardClicked] = useState(0);
    const [clubData, setClubData] = useState(null);
    const [nurseryData, setNurseryData] = useState(null);
    const isMobile = useIsMobile(1080);
    const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';

    useEffect(() => {
        const organizationData = parseLocationSearch(window.location.search);
        const [orgType, alias] = organizationData[0];

        (() => Request({
            url: orgType === 'clubAlias' ? `/api/Club/public/${alias}` : `/api/nurseries/nursery/public/${alias}`
        }, data => {
            orgType === 'clubAlias' ? setClubData(data) : setNurseryData(data);
        }, error => {
            console.log(error.response);
        }))();
    }, []);

    const handleActiveReset = () => {
        setCardClicked(0);
    };

    useTimeOut(handleActiveReset, 2000);

    return (
        <Layout>
            <div className="redesign">
                <Container className="content base-search">
                    {clubData && <TopComponent
                        logo={clubData ? clubData.logo_link : ``}
                        name={clubData ? clubData.title : ``}
                        canEdit={false}
                        withShare={false}
                    />}
                    {nurseryData && <TopComponent
                        logo={nurseryData ? nurseryData.logo_link : ``}
                        name={nurseryData ? nurseryData.name : ``}
                        canEdit={false}
                        withShare={false}
                    />}
                    <div className="base-search__content-wrap">
                        {isMobile &&
                            <SearchCard className="search_card_mobile"
                                handleActiveReset={handleActiveReset}
                                setCardClicked={setCardClicked}
                                userType={userType}
                                isAuthenticated={isAuthenticated}
                            />
                        }
                        <div className="base-search__content">
                            <GlobalCard cardClicked={cardClicked} />
                            <FoundInfo cardClicked={cardClicked} />
                            <CheckStatus cardClicked={cardClicked} />
                            <CheckRegistration cardClicked={cardClicked} />
                            <StampSearch cardClicked={cardClicked} />

                            {isAuthenticated && (userType === 3 || userType === 4 || userType === 5) && <CheckLitterStatus cardClicked={cardClicked} />}

                            <RefereeSearch cardClicked={cardClicked} />
                            <PublicationSearch cardClicked={cardClicked} />

                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={65}>
                                <div className="base-search__info-inner">
                                    {!isMobile && clubData ?
                                        <UserMenu userNav={clubNav(clubData.club_alias)} /> :
                                        nurseryData ?
                                            <UserMenu userNav={kennelNav(nurseryData.alias)} /> :
                                            <>
                                                {!isMobile &&
                                                    <SearchCard
                                                        handleActiveReset={handleActiveReset}
                                                        setCardClicked={setCardClicked}
                                                        userType={userType}
                                                        isAuthenticated={isAuthenticated}
                                                    />
                                                }
                                                {/* <Socials /> */}
                                                <Statistics />
                                                <Banner type={11}/>
                                                <Card className="base-search__map-wrap">
                                                    <h3><Link className="base-search__map-title" to="/clubs-map">Карта авторизованных клубов</Link></h3>
                                                    <div className="base-search__map">
                                                        <ClubsMap />
                                                    </div>
                                                </Card>
                                            </>
                                    }
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
export default memo(connectAuthVisible(BaseSearch));