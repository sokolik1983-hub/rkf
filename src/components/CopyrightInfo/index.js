import React from "react";
import { Link } from "react-router-dom";
import Card from "components/Card";
import useIsMobile from "utils/useIsMobile";
import personalDataProcessingPolicyDoc from "./../../pages/PersonalDataProcessingPolicy/politic(120722).pdf";
import "./index.scss";

const CopyrightInfo = ({ withSocials }) => {
    const isMobile = useIsMobile();

    return isMobile ? null : (
        withSocials
            ? <Card className="copyright-wrap">
                <div className="copyright-info with-socials">
                    <div className="copyright-socials">
                        {/*<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/">*/}
                        {/*    <img src="/static/icons/social/facebook.svg" alt="" />*/}
                        {/*</a>*/}
                        <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed">
                            <img src="/static/icons/social/vk.svg" alt="" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig">
                            <img src="/static/icons/social/youtube.svg" alt="" />
                        </a>
                        {/*<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/">*/}
                        {/*    <img src="/static/icons/social/instagram.svg" alt="" />*/}
                        {/*</a>*/}
                        <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial">
                            <img src="/static/icons/social/telegram.svg" alt="" />
                        </a>
                    </div>
                    <div className="copyright-about">
                        <span>© 1991—{new Date().getFullYear()} СОКО РКФ.</span>
                        <Link to="/about" className="copyright-link">О RKF.Online</Link>
                    </div>
                    <div>
                        <Link
                            className="copyright-link copyright-policy"
                            to={personalDataProcessingPolicyDoc}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Политика обработки персональных данных
                        </Link>
                    </div>
                </div>
            </Card>
            : <div className="copyright-info">
                <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                <Link
                    className="copyright-policy"
                    to={personalDataProcessingPolicyDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Политика обработки персональных данных
                </Link>
            </div>
    );
}
export default CopyrightInfo;