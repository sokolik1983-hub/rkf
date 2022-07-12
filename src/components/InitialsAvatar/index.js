import React from "react";
import {useSelector} from "react-redux";

import "./index.scss";

const InitialsAvatar = ({card, id, name}) => {

    const getBgColorAvatar = () => {
        let cardId;
        if (id) {
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
    };

    const getInitialName = () => {
        let firstName;
        let lastName;

        !!name && (name = name.replace(/["-'.)(]/g, '').replace('  ', ' ').trim());

        if (!name) {
            firstName = useSelector(state => state.authentication.user_info.first_name ? state.authentication.user_info.first_name : state.authentication.user_info.name.split(' ')[0]).replace(/["-']/g, '');
            lastName = useSelector(state => state.authentication.user_info.last_name ? state.authentication.user_info.last_name : state.authentication.user_info.name.split(' ')[1]);
        } else if (name && name.split(' ').length > 1) {
            firstName = name.split(' ')[0];
            lastName = name.split(' ')[1];
        } else {
            firstName = name.split('')[0];
            lastName = name.split('')[1];
        }
        return firstName[0] + lastName[0]
    };

    return (
        <div className={`avatar__wrap ${card ? card : ""}`} style={{backgroundColor: getBgColorAvatar()}}>
            <div className="avatar__name-wrap">
                <span className="avatar__initials">{getInitialName().toUpperCase()}</span>
            </div>
        </div>
    );
};

export default InitialsAvatar;