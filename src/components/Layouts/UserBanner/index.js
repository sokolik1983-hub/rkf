import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {SvgIcon} from "@progress/kendo-react-common";
import {pencil, trash} from "@progress/kendo-svg-icons";
import Card from "../../Card";
import LightTooltip from "../../LightTooltip";
import EditAvatar from "../../EditAvatar";
import ModalDeleteAvatar from "../UserInfo/ModalDeleteAvatar";
import {connectAuthUserInfo} from "../../../pages/Login/connectors";
import "./index.scss";


const UserBanner = ({user_info, link, canEdit}) => {
    const [hover, setHover] = useState(false);
    const [modalType, setModalType] = useState('');

    const {headliner_link} = user_info;
    const bannerLink = canEdit ? headliner_link : link;

    return (
        <Card
            className={`user-banner${bannerLink ? ' _custom_banner' : ''}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={()=> {
                setHover(true);
                setTimeout(() => setHover(false), 3000);
            }}
        >
            {canEdit &&
                <>
                    <CSSTransition
                        in={hover}
                        timeout={350}
                        classNames="user-banner__transition"
                        unmountOnExit
                    >
                        <LightTooltip title="Редактировать" enterDelay={200} leaveDelay={200}>
                            <button
                                className="user-banner__edit-btn"
                                type="button"
                                onClick={() => setModalType('edit')}
                            >
                                <SvgIcon icon={pencil} size="default" />
                            </button>
                        </LightTooltip>
                    </CSSTransition>
                    {bannerLink &&
                        <CSSTransition
                            in={hover}
                            timeout={350}
                            classNames="user-banner__transition"
                            unmountOnExit
                        >
                            <LightTooltip title="Удалить" enterDelay={200} leaveDelay={200}>
                                <button
                                    className="user-banner__delete-btn"
                                    type="button"
                                    onClick={() => setModalType('delete')}
                                >
                                    <SvgIcon icon={trash} size="default" />
                                </button>
                            </LightTooltip>
                        </CSSTransition>
                    }
                </>
            }
            {headliner_link &&
                <div className="user-banner__img" style={{background: `url(${bannerLink}) no-repeat center / cover`}} />
            }
            {modalType === 'edit' &&
                <EditAvatar
                    setModalType={setModalType}
                    pageBanner
                />
            }
            {modalType === 'delete' &&
                <ModalDeleteAvatar
                    closeModal={() => setModalType('')}
                    pageBanner
                />
            }
        </Card>
    )
};

export default memo(connectAuthUserInfo(UserBanner));