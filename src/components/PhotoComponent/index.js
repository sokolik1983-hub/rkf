import React, { useState } from "react";
import { DEFAULT_IMG } from "../../appConfig";
import { CSSTransition } from "react-transition-group";
import LightTooltip from "../LightTooltip";
import { SvgIcon } from "@progress/kendo-react-common";
import { pencil, trash } from "@progress/kendo-svg-icons";
import EditAvatar from "../EditAvatar";
import ModalDeleteAvatar from "../Layouts/UserInfo/ModalDeleteAvatar";
import useIsMobile from "../../utils/useIsMobile";

import "./index.scss";

const PhotoComponent = ({photo, name, position, canEdit}) => {

    const [modalType, setModalType] = useState('');
    const [hover, setHover] = useState(false);
    const isTable = useIsMobile(990);
    const isMobile = useIsMobile(561);
    const firstName = name.split(' ')[0];
    const secondName = name.split(' ')[1] + ' ' + name.split(' ')[2];
    const stylePosition = position.charAt(0).toUpperCase() + position.slice(1).toLowerCase();


    return (
        <div className="photo-component"
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             onTouchStart={() => {
                 setHover(true);
                 setTimeout(() => setHover(false), 3000);
             }}
        >
            {canEdit &&
                <>
                    <CSSTransition
                        in={hover}
                        timeout={350}
                        classNames="user-info__transition"
                        unmountOnExit
                    >
                        <LightTooltip
                            title="Редактировать"
                            enterDelay={200}
                            leaveDelay={200}>
                            <button
                                className={`user-info__edit-btn ${!photo && 'empty-photo' }`}
                                type="button"
                                onClick={() => setModalType('edit-owner')}
                            >
                                <SvgIcon icon={pencil} size="default"/>
                            </button>
                        </LightTooltip>
                    </CSSTransition>
                    {photo &&
                        <CSSTransition
                            in={hover}
                            timeout={350}
                            classNames="user-info__transition"
                            unmountOnExit
                        >
                            <LightTooltip
                                title="Удалить"
                                enterDelay={200}
                                leaveDelay={200}>
                                <button
                                    className="user-info__delete-btn"
                                    type="button"
                                    onClick={() => setModalType("delete-owner")}
                                >
                                    <SvgIcon icon={trash} size="default"/>
                                </button>
                            </LightTooltip>
                        </CSSTransition>
                    }
                </>
            }
            {modalType === "edit-owner" &&
                <EditAvatar
                    setModalType={setModalType}
                    avatar={photo}
                    owner={photo}
                />}
            {modalType === "delete-owner" &&
                <ModalDeleteAvatar
                    closeModal={() => setModalType("")}
                    owner
                />}
            <img src={photo || DEFAULT_IMG.noImage} alt="" className="photo-component__photo"/>
            <div className="photo-component__description">
                {isMobile || (!isMobile && !isTable ) ?
                    <>
                        <h5 className="photo-component__title">{name}</h5>
                        <p className="photo-component__subtitle">{position || "Руководитель"}</p>
                    </>
                    : isTable &&
                    <>
                        <h5 className="photo-component__title">{firstName}</h5>
                        <h5 className="photo-component__title">{secondName}</h5>
                        <p className="photo-component__subtitle">{stylePosition || "Руководитель"}</p>
                    </>
                }
            </div>
        </div>
    )
};

export default React.memo(PhotoComponent);