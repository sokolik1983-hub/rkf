import React, { useEffect, useRef, useState } from "react";
import {DEFAULT_IMG} from "../../appConfig";
import {CSSTransition} from "react-transition-group";
import LightTooltip from "../LightTooltip";
import {SvgIcon} from "@progress/kendo-react-common";
import {pencil, trash} from "@progress/kendo-svg-icons";
import EditAvatar from "../EditAvatar";
import ModalDeleteAvatar from "../Layouts/UserInfo/ModalDeleteAvatar";

import "./index.scss";

const PhotoComponent = ({photo, name, position, canEdit}) => {

    const [modalType, setModalType] = useState('');
    const [hover, setHover] = useState(false);
    const [photoSize, setPhotoSize] = useState({});

    const ref = useRef(null);

    useEffect(() => {
        ref.current && setPhotoSize({
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
        })
    }, [ref]);

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
                    owner
                    size={photoSize}
                />}
            {modalType === "delete-owner" &&
                <ModalDeleteAvatar
                    closeModal={() => setModalType("")}
                    owner
                />}
            <img src={photo || DEFAULT_IMG.noImage} alt="" className="photo-component__photo" ref={ref}/>
            <div className="photo-component__description">
                <h5 className="photo-component__title">{name}</h5>
                <p className="photo-component__subtitle">{position || "Руководитель"}</p>
            </div>
        </div>
    )
};

export default React.memo(PhotoComponent);