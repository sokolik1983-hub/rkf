import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { SvgIcon } from "@progress/kendo-react-common";
import { pencil, trash } from "@progress/kendo-svg-icons";
import Card from "../../Card";
import ModalEditBanner from "./ModalEditBanner";
import ModalDeleteBanner from "./ModalDeleteBanner";
import LightTooltip from "../../LightTooltip";
import useIsMobile from "../../../utils/useIsMobile";
import "./index.scss";


const UserBanner = ({ link, canEdit, updateInfo }) => {
    const [hover, setHover] = useState(false);
    const [modalType, setModalType] = useState('');


    return (
        <Card
            className={`user-banner ${link ? ` _custom_banner` : ``}`}
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
                    {link &&
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
            {link &&
                <div className="user-banner__img" style={{ background: `url(${link}) no-repeat center / cover` }} />
            }
            {modalType === 'edit' &&
                <ModalEditBanner closeModal={() => setModalType('')} updateInfo={updateInfo} />
            }
            {modalType === 'delete' &&
                <ModalDeleteBanner closeModal={() => setModalType('')} updateInfo={updateInfo} />
            }
        </Card>
    )
};

export default React.memo(UserBanner);