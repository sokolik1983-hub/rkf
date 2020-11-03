import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {SvgIcon} from "@progress/kendo-react-common";
import {pencil, trash} from "@progress/kendo-svg-icons";
import Card from "../../Card";
import ModalEditBanner from "./ModalEditBanner";
import ModalDeleteBanner from "./ModalDeleteBanner";
import "./index.scss";


const UserBanner = ({link, canEdit, updateInfo}) => {
    const [hover, setHover] = useState(false);
    const [modalType, setModalType] = useState('');

    return (
        <Card className="user-banner" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {canEdit &&
                <>
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
                            onClick={() => setModalType('edit')}
                        >
                            <SvgIcon icon={pencil} size="default" />
                        </button>
                    </CSSTransition>
                    {link &&
                        <CSSTransition
                            in={hover}
                            timeout={350}
                            classNames="user-banner__transition"
                            unmountOnExit
                        >
                            <button
                                className="user-banner__delete-btn"
                                type="button"
                                title="Удалить"
                                onClick={() => setModalType('delete')}
                            >
                                <SvgIcon icon={trash} size="default"/>
                            </button>
                        </CSSTransition>
                    }
                </>
            }
            {link &&
                <div className="user-banner__img" style={{background: `url(${link}) no-repeat center / cover`}}/>
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