import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {SvgIcon} from "@progress/kendo-react-common";
import {pencil} from "@progress/kendo-svg-icons";
import Card from "../../Card";
import ModalEditBanner from "./ModalEditBanner";
import "./index.scss";


const UserBanner = ({link, canEdit, updateInfo}) => {
    const [hover, setHover] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <Card className="user-banner" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {canEdit &&
                <CSSTransition
                    in={hover}
                    timeout={350}
                    classNames="user-banner__transition"
                    unmountOnExit
                >
                    <button
                        className="user-banner__edit-btn"
                        type="button"
                        title="Редактировать"
                        onClick={() => setShowModal(true)}
                    >
                        <SvgIcon icon={pencil} size="default" />
                    </button>
                </CSSTransition>
            }
            {link &&
                <div className="user-banner__img" style={{background: `url(${link}) no-repeat center / cover`}}/>
            }
            {showModal &&
                <ModalEditBanner closeModal={() => setShowModal(false)} updateInfo={updateInfo} />
            }
        </Card>
    )
};

export default React.memo(UserBanner);