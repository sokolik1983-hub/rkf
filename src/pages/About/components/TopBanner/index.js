import React from "react";
import "./index.scss";


const TopBanner = () => (
    <div className="about-page__top-banner">
        <div className="top-banner">
            <div className="top-banner__info">
                <div className="top-banner__logo">
                </div>

                <h2 className="top-banner__title">
                    30 лет РОССИЙСКОЙ КИНОЛОГИЧЕСКОЙ ФЕДЕРАЦИИ
                </h2>
            </div>
        </div>
    </div>
);

export default React.memo(TopBanner);