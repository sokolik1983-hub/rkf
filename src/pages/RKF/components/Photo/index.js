import React from "react";
import "./index.scss";


const PhotoComponent = () => (
    <div className="photo-component">
        <img src="/static/images/rkf/photo.png" alt="" className="photo-component__photo"/>
        <div className="photo-component__description">
            <h5 className="photo-component__title">Голубев Владимир Семенович</h5>
            <p className="photo-component__subtitle">Президент Российской Кинологической Федерации</p>
        </div>
    </div>
);

export default React.memo(PhotoComponent);