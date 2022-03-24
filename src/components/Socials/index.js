import React from 'react';

import Card from "../Card";

import "./index.scss";

export default function Socials() {
    return (
        <Card className="socials">
            <h3>РКФ в соцсетях</h3>
            <div className="socials__content">
                {/*<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/"><img src="/static/icons/social/facebook.svg" alt="" /></a>*/}
                <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed"><img src="/static/icons/social/vk.svg" alt="" /></a>
                {/* <a target="_blank" rel="noopener noreferrer" href="https://ok.ru/rkforg"><img src="/static/icons/social/odnoklassniki.svg" alt="" /></a>
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ruskynologfed"><img src="/static/icons/social/twitter.svg" alt="" /></a> */}
                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig"><img src="/static/icons/social/youtube.svg" alt="" /></a>
                {/*<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/"><img src="/static/icons/social/instagram.svg" alt="" /></a>*/}
                <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial"><img src="/static/icons/social/telegram.svg" alt="" /></a>
            </div>
        </Card>
    )
}
