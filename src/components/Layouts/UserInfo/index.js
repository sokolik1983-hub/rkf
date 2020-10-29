import React, {useState} from "react";
import {SvgIcon} from '@progress/kendo-react-common';
import {pencil} from '@progress/kendo-svg-icons';
import {CSSTransition} from "react-transition-group";
import Share from "../../Share";
import ModalEditAvatar from "./ModalEditAvatar";
import {DEFAULT_IMG} from "../../../appConfig";
import "./index.scss";


const UserInfo = ({logo_link, share_link, first_name, last_name, canEdit, updateInfo}) => {
    const [hover, setHover] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="user-info">
            <div className="user-info__logo-wrap" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {canEdit &&
                    <CSSTransition
                        in={hover}
                        timeout={350}
                        classNames="user-info__transition"
                        unmountOnExit
                    >
                        <button
                            className="user-info__edit-btn"
                            type="button"
                            title="Редактировать"
                            onClick={() => setShowModal(true)}
                        >
                            <SvgIcon icon={pencil} size="default" />
                        </button>
                    </CSSTransition>
                }
                <img className="user-info__logo" src={logo_link ? logo_link : DEFAULT_IMG.userAvatar} alt="" />
            </div>
            <div className="user-info__info">
                {share_link ?
                    <div className="user-info__with-share">
                        <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                        <Share url={share_link} />
                    </div> :
                    <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                }
                {last_name && <p title={last_name}>{last_name}</p>}
            </div>
            {showModal &&
                <ModalEditAvatar closeModal={() => setShowModal(false)} updateInfo={updateInfo} />
            }
        </div>
    )
};

export default React.memo(UserInfo);