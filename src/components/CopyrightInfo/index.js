import React from "react";
import "./index.scss";

const CopyrightInfo = ({ withSocials }) => (
    <div className={`copyright-info${withSocials ? ' with-socials' : ''}`}>
        {withSocials && <div className="copyright-socials">
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
        </div>}
        <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
        <p>Политика обработки персональных данных</p>
    </div>
);

export default CopyrightInfo;