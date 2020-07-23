import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "components/Card";
import Alert from "components/Alert";
import { DEFAULT_IMG } from "appConfig";
import "./index.scss";
import Share from "components/Share";
import MenuComponent from "components/MenuComponent";


const ClubUserHeader = ({ user, logo, banner, name, alias, profileId, federationName, federationAlias }) => {
    const [shareAlert, setShareAlert] = useState(false);

    const share = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareAlert(true);
    };

    const shareOk = () => setShareAlert(false);

    return (
        <Card className="user-header">
            <div className="user-header__logo-wrap">
                <div className="user-header__logo" style={logo
                    ? { backgroundImage: `url(${logo})` }
                    : { backgroundImage: `url(${DEFAULT_IMG.clubAvatar})`, borderRadius: '50%', border: '1px solid #c0d3f9', width: '100px' }} />
            </div>
            <div className="user-header__content">
                <hr style={{marginTop: 0}}/>
                <div className="user-header__info">

                    <div className="user-header__wrap">
                        <div>
                            <p className="user-header__user">
                                {user === 'club' ? 'Клуб' : user === 'nursery' ? 'Питомник' : ''}
                            </p>
                            <h3 className="user-header__name">{name}</h3>
                            {federationName && federationAlias &&
                                <Link to={`/${federationAlias}`} className="user-header__federation">{federationName}</Link>
                            }
                        </div>
                        <Share />
                    </div>
                </div>
                <hr />
                <MenuComponent
                    alias={alias}
                    user={user}
                    profileId={profileId}
                    name={name}
                    noCard={true}
                />
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

export default React.memo(ClubUserHeader);
