import React, { useState, useEffect } from "react";
import { Request } from "utils/request";
import "./styles.scss";


const Banner =({type, inputBanner}) =>{
    const [banner, setBanner] = useState();

    useEffect(() => {
        if(type !=null && inputBanner == null){
            (() => Request({
                url: '/api/banner?ids=' + type
            }, data => {
                if(data.length > 0){
                    setBanner(data[0]);
                }
            }, error => {
                console.log(error.response);
            }))()
        }else{
            setBanner(inputBanner);
        };
    }, []);

    return (
        banner &&
        <div className = "banner_component">
            <a className = "banner_component__a" href={banner.url} target="_blank" rel="noreferrer noopener">
                <img className = "banner_component__img" style ={{ width: banner.width > 0 ? banner.width : '', height: banner.height > 0 ? banner.height : '' }} src={banner.banner_link} alt=""/>
            </a>  
        </div>
    )
};

export default Banner;