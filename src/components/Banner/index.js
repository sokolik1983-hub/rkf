import React, {memo, useState, useEffect} from "react";
import {Request} from "../../utils/request";

import "./styles.scss";

const Banner = ({type, inputBanner}) => {
    const [banner, setBanner] = useState(inputBanner);

    useEffect(() => {
        if (type && !inputBanner) {
            (() => Request({
                url: '/api/banner?ids=' + type
            }, data => {
                if (data.length) {
                    setBanner(data[0]);
                }
            }, error => {
                console.log(error.response);
            }))();
        }
    }, []);

    return !!banner &&
        <div className="banner-component">
            <a className="banner-component__link" href={banner.url} target="_blank" rel="noreferrer noopener">
                <img
                    className="banner-component__img"
                    style={{
                        width: banner.width > 0 ? banner.width : '',
                        height: banner.height > 0 ? banner.height : ''
                    }}
                    src={banner.banner_link}
                    alt=""
                />
            </a>
        </div>
};

export default memo(Banner);