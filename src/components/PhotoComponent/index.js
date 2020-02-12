import React from "react";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const PhotoComponent = ({photo, name, position}) => (
    <div className="photo-component">
        <img src={photo || DEFAULT_IMG.noImage} alt="" className="photo-component__photo"/>
        <div className="photo-component__description">
            <h5 className="photo-component__title">{name}</h5>
            <p className="photo-component__subtitle">{position || "Руководитель"}</p>
        </div>
    </div>
);

export default React.memo(PhotoComponent);