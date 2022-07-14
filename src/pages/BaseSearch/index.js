import React, {memo, useState, useEffect} from "react";
import StickyBox from "react-sticky-box";
import {Link} from "react-router-dom";
import ls from "local-storage";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import CheckStatus from "../Club/components/CheckStatus";
import CheckLitterStatus from "../Club/components/CheckLitterStatus";
import CheckRegistration from "./components/CheckRegistration"
import FoundInfo from "./components/FoundInfo";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import ClubsMap from "../../components/ClubsMap";
import Statistics from "../../components/Statistics";
import StampSearch from "./components/StampSearch";
import TopComponent from "../../components/TopComponent";
import Banner from "../../components/Banner";
import PublicationSearch from "./components/PublicationSearch";
import {parseLocationSearch} from "./utils.js";
import {Request} from "../../utils/request";
import useIsMobile from "../../utils/useIsMobile";
import {connectAuthVisible} from "../Login/connectors";
import LeftMenu from "./components/LeftMenu/LeftMenu";
import {connectShowFilters} from "../../components/Layouts/connectors";
import ClickGuard from "../../components/ClickGuard";
import MenuComponentNew from "../../components/MenuComponentNew";
import "./index.scss";


const BaseSearch = ({isAuthenticated, isOpenFilters, setShowFilters}) => {
    const [clubData, setClubData] = useState(null);
    const [nbcData, setNbcData] = useState(null);
    const [nurseryData, setNurseryData] = useState(null);
    const [activeSection, setActiveSection] = useState(0);
    const [cardClicked, setCardClicked] = useState(0);
    const isMobile = useIsMobile(1080);
    const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';

    useEffect(() => {
        const organizationData = parseLocationSearch(window.location.search);
        const [orgType, alias] = organizationData[0];

        if(orgType && alias) {
            (() => Request({
                url: orgType === 'clubAlias' ? `/api/Club/public/${alias}`
                    : orgType === 'nbcAlias' ? `/api/NationalBreedClub/full?alias=${alias}`
                    :`/api/nurseries/nursery/public/${alias}`
            }, data => {
                orgType === 'clubAlias' ? setClubData(data)
                    : orgType === 'nbcAlias' ?setNbcData(data)
                    : setNurseryData(data);
            }, error => {
                console.log(error.response);
            }))();
        }
    }, []);

    return (
        <Layout layoutWithFilters>
            <ClickGuard
                value={isOpenFilters}
                callback={() => setShowFilters({isOpenFilters: false})}
            />
            <div className="redesign">
                <Container className="content base-search">
                    {clubData &&
                        <TopComponent
                            logo={clubData ? clubData.logo_link : ``}
                            name={clubData ? clubData.title : ``}
                            canEdit={false}
                            withShare={false}
                        />
                    }
                    {nurseryData &&
                        <TopComponent
                            logo={nurseryData ? nurseryData.logo_link : ``}
                            name={nurseryData ? nurseryData.name : ``}
                            canEdit={false}
                            withShare={false}
                            userType={4}
                        />
                    }
                    <div className="base-search__content-wrap">
                        <div className="base-search__content">
                            <FoundInfo cardClicked={cardClicked}/>
                            <CheckStatus cardClicked={cardClicked}/>
                            <CheckRegistration cardClicked={cardClicked}/>
                            <StampSearch cardClicked={cardClicked}/>
                            {isAuthenticated && (userType === 3 || userType === 4 || userType === 5) &&
                                <CheckLitterStatus cardClicked={cardClicked}/>
                            }
                            <PublicationSearch cardClicked={cardClicked}/>
                        </div>
                        <div className={`left-menu__inner-right hide${isOpenFilters ? ` _open` : ``}`}>
                            <LeftMenu
                                setActiveSection={setActiveSection}
                                activeSection={activeSection}
                                showFilter={isOpenFilters}
                                setShowFilters={setShowFilters}
                                isAuthenticated={isAuthenticated}
                                userType={userType}
                                setCardClicked={setCardClicked}
                            />
                        </div>
                        {!isMobile &&
                            <Aside className="base-search__info">
                                <StickyBox offsetTop={76}>
                                    <div className="base-search__info-inner">
                                        {!isMobile && clubData ?
                                            <>
                                                <LeftMenu
                                                    setActiveSection={setActiveSection}
                                                    activeSection={activeSection}
                                                    showFilter={isOpenFilters}
                                                    setShowFilters={setShowFilters}
                                                    isAuthenticated={isAuthenticated}
                                                    userType={userType}
                                                    setCardClicked={setCardClicked}
                                                />
                                                <MenuComponentNew />
                                            </> :
                                        nurseryData || nbcData ?
                                            <>
                                                <LeftMenu
                                                    setActiveSection={setActiveSection}
                                                    activeSection={activeSection}
                                                    showFilter={isOpenFilters}
                                                    setShowFilters={setShowFilters}
                                                    isAuthenticated={isAuthenticated}
                                                    userType={userType}
                                                    setCardClicked={setCardClicked}
                                                />
                                                <MenuComponentNew />
                                            </> :
                                            <>
                                                <LeftMenu
                                                    setActiveSection={setActiveSection}
                                                    activeSection={activeSection}
                                                    showFilter={isOpenFilters}
                                                    setShowFilters={setShowFilters}
                                                    isAuthenticated={isAuthenticated}
                                                    userType={userType}
                                                    setCardClicked={setCardClicked}
                                                />
                                                <Statistics/>
                                                <Banner type={11}/>
                                                <Card className="base-search__map-wrap">
                                                    <h3><Link className="base-search__map-title" to="/clubs-map">Карта
                                                        авторизованных клубов</Link></h3>
                                                    <div className="base-search__map">
                                                        <ClubsMap/>
                                                    </div>
                                                </Card>
                                            </>
                                        }
                                        <CopyrightInfo withSocials={true}/>
                                    </div>
                                </StickyBox>
                            </Aside>
                        }
                    </div>
                </Container>
            </div>
        </Layout>
    )
};
export default memo(connectShowFilters(connectAuthVisible(BaseSearch)));
