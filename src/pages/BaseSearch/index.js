import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";

import { useTimeOut } from "../../shared/hooks.js";
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
import RefereeSearch from "./components/RefereeSearch";
import TopComponent from "../../components/TopComponent";
import UserMenu from "../../components/Layouts/UserMenu";
import PublicationSearch from "./components/PublicationSearch";
import { parseLocationSearch } from "./utils.js";
import { Request } from "../../utils/request";
import { clubNav } from "../Docs/config";
import { kennelNav } from "../NurseryDocuments/config";
import useIsMobile from "../../utils/useIsMobile";
import SearchCard from "./components/SearchCard/SearchCard";
import Socials from "../../components/Socials";

import "./index.scss";


const BaseSearch = () => {
    const [found_info_clicked, setFoundInfoClicked] = useState(false);
    const [status_clicked, setStatusClicked] = useState(false);
    const [registration_clicked, setRegistrationClicked] = useState(false);
    const [stamp_clicked, setStampClicked] = useState(false);
    const [referee_clicked, setRefereeClicked] = useState(false);
    const [publication_clicked, setPublicationClicked] = useState(false);
    const [clubData, setClubData] = useState(null);
    const [nurseryData, setNurseryData] = useState(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        const organizationData = parseLocationSearch(window.location.search);
        let [orgType, alias] = organizationData[0];
        if (orgType === 'clubAlias') {

            (() => Request({ url: `/api/Club/public/${alias}` },
                data => {
                    setClubData(data);
                },
                error => {
                    console.log(error.response);
                }))();
        } else if (orgType === 'nurseryAlias') {

            (() => Request({ url: `/api/nurseries/nursery/public/${alias}` },
                data => {
                    setNurseryData(data);
                },
                error => {
                    console.log(error.response);
                }))();
        }
        window.scrollTo(0, 0);
    }, [])

    const handleActiveReset = () => {
        setFoundInfoClicked(false);
        setStatusClicked(false);
        setRegistrationClicked(false);
        setStampClicked(false);
        setRefereeClicked(false);
        setPublicationClicked(false);
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
                                setFoundInfoClicked={setFoundInfoClicked}
                                setStatusClicked={setStatusClicked}
                                setRegistrationClicked={setRegistrationClicked}
                                setStampClicked={setStampClicked}
                                setRefereeClicked={setRefereeClicked}
                                setPublicationClicked={setPublicationClicked}
                            />
                        }
                        <div className="base-search__content">
                            <FoundInfo found_info_clicked={found_info_clicked} />
                            <CheckStatus status_clicked={status_clicked} />
                            <CheckRegistration registration_clicked={registration_clicked} />
                            <StampSearch stamp_clicked={stamp_clicked} />
                            <RefereeSearch referee_clicked={referee_clicked} />
                            <PublicationSearch publication_clicked={publication_clicked} />
                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={65}>
                                <div className="base-search__info-inner">
                                    {clubData ?
                                        <UserMenu userNav={clubNav(clubData.club_alias)} /> :
                                        nurseryData ?
                                            <UserMenu userNav={kennelNav(nurseryData.alias)} /> :
                                            <>
                                                {!isMobile &&
                                                    <SearchCard
                                                        handleActiveReset={handleActiveReset}
                                                        setFoundInfoClicked={setFoundInfoClicked}
                                                        setStatusClicked={setStatusClicked}
                                                        setRegistrationClicked={setRegistrationClicked}
                                                        setStampClicked={setStampClicked}
                                                        setRefereeClicked={setRefereeClicked}
                                                        setPublicationClicked={setPublicationClicked}
                                                    />
                                                }
                                                <Socials />
                                                <Statistics />
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

export default React.memo(BaseSearch);