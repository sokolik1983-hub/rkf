import React from "react";
import { Link } from "react-router-dom";
import Card from "components/Card";
import useIsMobile from "utils/useIsMobile";
import "./index.scss";

const CopyrightInfo = ({ withSocials }) => {
    const isMobile = useIsMobile();

    return isMobile ? null : (
        withSocials
            ? <Card className="copyright-wrap">
                <div className="copyright-info with-socials">
                    <div className="copyright-socials">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/">
                            <img src="/static/icons/social/facebook.svg" alt="" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed">
                            <img src="/static/icons/social/vk.svg" alt="" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig">
                            <img src="/static/icons/social/youtube.svg" alt="" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/">
                            <img src="/static/icons/social/instagram.svg" alt="" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial">
                            <img src="/static/icons/social/telegram.svg" alt="" />
                        </a>
                    </div>
                    <div className="copyright-about">
                        <span>© 1991—{new Date().getFullYear()} СОКО РКФ.</span>
                        <Link to="/about" className="copyright-link">О RKF.Online</Link>
                    </div>
                    <div className='copyright-policy'>Политика обработки персональных данных</div>
                </div>
            </Card>
            : <div className="copyright-info">
                <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                <p>Политика обработки персональных данных</p>
            </div>
    );
}
export default CopyrightInfo;