import React, {useEffect} from "react";
import StickyBox from "react-sticky-box";
import Aside from "../../../../components/Layouts/Aside";
import Statistics from "../../../../components/Statistics";
import FederationsFilter from "./FederationsFilter";
import IsActiveMember from "./IsActiveMember";
import IsActivatedFilter from "./IsActivatedFilter";
import BreedsFilter from "./BreedsFilter";
import CitiesFilter from "./CitiesFilter";
import {setOverflow} from "../../../../utils";
import {getEmptyFilters} from "../../utils";
import {RKFInfo} from "../../../Home/config";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import {connectFilters} from "../../connectors";
import "./index.scss";


const Filters = ({organization_type, setFilters, isOpenFilters}) => {
    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    return (
        <Aside className={`organizations-page__left${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox offsetTop={76}>
                <div className="organizations-page__filters">
                    {organization_type === 5 &&
                        <>
                            <div className="organizations-page__about">
                                <h3>{RKFInfo.aboutTitle}</h3>
                                <p>{RKFInfo.about}</p>
                            </div>
                            <div className="organizations-page__socials">
                                <h3>РКФ в соцсетях</h3>
                                <ul className="organizations-page__socials-list">
                                    <li>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/">
                                            <img src="/static/icons/social/facebook.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed">
                                            <img src="/static/icons/social/vk.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig">
                                            <img src="/static/icons/social/youtube.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/">
                                            <img src="/static/icons/social/instagram.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial">
                                            <img src="/static/icons/social/telegram.svg" alt="" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <Statistics/>
                        </>
                    }
                    {(organization_type === 3 || organization_type === 4) &&
                        <>
                            <FederationsFilter/>
                            <IsActiveMember/>
                            <IsActivatedFilter/>
                            {organization_type === 4 &&
                                <BreedsFilter/>
                            }
                            <CitiesFilter/>
                            <button
                                type="button"
                                className="link"
                                onClick={() => setFilters(getEmptyFilters())}
                            >
                                Сбросить все параметры
                            </button>
                        </>
                    }
                </div>
            </StickyBox>
        </Aside>
    )
};

export default connectShowFilters(connectFilters(React.memo(Filters)));