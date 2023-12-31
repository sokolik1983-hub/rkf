import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import Alert from "../Alert";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";
import Share from "components/Share";


const UserHeader = ({user, logo, banner, name, federationName, federationAlias}) => {
    const [shareAlert, setShareAlert] = useState(false);

    const shareOk = () => setShareAlert(false);

    return (
        <Card className="user-header">
            {banner && <div className="user-header__img" style={{backgroundImage: `url(${banner})`}} />}
            <div className="user-header__content">
                <div className="user-header__info">
                    <div className="user-header__logo" style={{backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`}} />
                    <div className="user-header__wrap">
                        <p className="user-header__user">
                            {user === 'club' ?
                                'Клуб' :
                                user === 'nursery' ?
                                    'Питомник' :
                                    user === 'nbc' ?
                                        'НКП' : ''}
                        </p>
                        <h3 className="user-header__name">{name}</h3>
                        {federationName && federationAlias &&
                            <Link to={`/${federationAlias}`} className="user-header__federation">{federationName}</Link>
                        }
                    </div>
                </div>
                <Share />
            </div>
            {shareAlert &&
                <Alert
                    title="Поделиться"
                    text="Ссылка скопирована в буфер обмена"
                    autoclose={1.5}
                    onOk={shareOk}
                />
            }
        </Card>
    )
};

export default React.memo(UserHeader);
