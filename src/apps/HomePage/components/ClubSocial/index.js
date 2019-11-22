import React, { useState } from 'react';
import SocialLink from './SocialLink';
import { connectClubCommon } from 'apps/HomePage/connectors';
import request, { getHeaders } from "utils/request";

function ClubSocial({ clubCommon }) {
    const [socials, setSocials] = useState([]);
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        request({
            url: `/api/clubs/SocialNetwork/list/${clubCommon.id}`,
            options: {
                method: "GET",
                headers: getHeaders(),
            }
        })
            .then(data => setSocials(data.result));
        setLoaded(true);
    }
    return (
        <div className="ClubSocial">
            {socials.map(document => <SocialLink key={document.id} {...document} />)}
        </div>
    )
}

export default connectClubCommon(ClubSocial)