import React from "react";
import {useSelector} from "react-redux";

import "./index.scss";

const InitialsAvatar = ({firstName, lastName, card, id}) => {
    const newName = firstName?.split('');
    const newLastName = lastName?.split('');


    const getBgColorAvatar = () => {
        let cardId;
        if(id) {
            cardId = id.toString().slice(-1);
        } else {
            cardId =  useSelector(state => state.authentication.profile_id);
        }

        if(cardId >= 0 && cardId <= 3) {
            return "#FAE1E3"
        } else if(cardId > 3 && cardId <= 6) {
            return "#DFF2E3"
        } else {
            return "#DCF1F4"
        }
    }

    return (
        <div className={`avatar__wrap ${card ? card : ""}`} style={{backgroundColor: getBgColorAvatar()}}>
            <div className="avatar__name-wrap">
                <span>{newName && newName[0]}</span>
                <span>{newLastName && newLastName[0]}</span>
            </div>
        </div>
    )
};

export default InitialsAvatar;