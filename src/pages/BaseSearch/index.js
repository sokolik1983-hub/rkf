import React, {memo, useState, useEffect} from "react";
import StickyBox from "react-sticky-box";
import {Link} from "react-router-dom";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import CheckStatus from "../Club/components/CheckStatus";
import CheckRegistration from "./components/CheckRegistration"
import FoundInfo from "./components/FoundInfo";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import ClubsMap from "../../components/ClubsMap";
import Statistics from "../../components/Statistics";
import StampSearch from "./components/StampSearch";
import TopComponent from "../../components/TopComponent";
import UserMenu from "../../components/Layouts/UserMenu";
import Banner from "../../components/Banner";
import PublicationSearch from "./components/PublicationSearch";
import {parseLocationSearch} from "./utils.js";
import {Request} from "../../utils/request";
import {clubNav} from "../Docs/config";
import {kennelNav} from "../NurseryDocuments/config";
import useIsMobile from "../../utils/useIsMobile";
import {connectAuthVisible} from "../Login/connectors";
import LeftMenu from "./components/LeftMune/LeftMenu";
import {connectShowFilters} from "../../components/Layouts/connectors";
import ClickGuard from "../../components/ClickGuard";

import "./index.scss";


const BaseSearch = props => {
    const {
        isOpenFilters,
        setShowFilters,
    } = props;

    const [clubData, setClubData] = useState(null);
    const [nurseryData, setNurseryData] = useState(null);
    const [activeSection, setActiveSection] = useState(0);
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        const organizationData = parseLocationSearch(window.location.search);
        const [orgType, alias] = organizationData[0];

        if(orgType && alias) {
            (() => Request({
                url: orgType === 'clubAlias' ? `/api/Club/public/${alias}` : `/api/nurseries/nursery/public/${alias}`
            }, data => {
                orgType === 'clubAlias' ? setClubData(data) : setNurseryData(data);
            }, error => {
                console.log(error.response);
            }))();
        }
    }, []);


    return (
        <Layout layoutWithFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
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
                        <div className="base-search__content">
                            {
                                activeSection === 0 ? <FoundInfo /> :
                                activeSection === 1 ? <CheckStatus /> :
                                activeSection === 2 ? <CheckRegistration /> :
                                activeSection === 3 ? <StampSearch /> :
                                activeSection === 4 && <PublicationSearch />
                            }
                        </div>
                        <div className={`left-menu__inner-right hide${isOpenFilters ? ` _open` : ``}`}>
                            <LeftMenu
                                setActiveSection={setActiveSection}
                                activeSection={activeSection}
                                showFilter={isOpenFilters}
                                setShowFilters={setShowFilters}
                            />
                        </div>
                        {!isMobile && <Aside className="base-search__info">
                            <StickyBox offsetTop={60}>
                                <div className="base-search__info-inner">
                                    {!isMobile && clubData ?
                                        <UserMenu userNav={clubNav(clubData.club_alias)}/> :
                                        nurseryData ?
                                            <UserMenu userNav={kennelNav(nurseryData.alias)}/> :
                                            <>
                                                <LeftMenu
                                                    setActiveSection={setActiveSection}
                                                    activeSection={activeSection}
                                                    showFilter={isOpenFilters}
                                                    setShowFilters={setShowFilters}
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
                        </Aside>}
                    </div>
                </Container>
            </div>
        </Layout>
    )
};
export default memo(connectShowFilters(connectAuthVisible(BaseSearch)));