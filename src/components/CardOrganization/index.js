import React from "react";
import { Link } from "react-router-dom";

import Card from "../Card";
import {ActiveUserMark, FederationChoiceMark} from "../Marks";
import { DEFAULT_IMG } from "../../appConfig";
import CardFooter from '../CardFooter';

import "./index.scss";


const CardOrganization = ({   id,
                              alias,
                              logo,
                              name,
                              user_type,
                              active_member,
                              active_rkf_user,
                              city_name,
                              city_id,
                              owner_name,
                              owner_position,
                              federation_name,
                              federation_alias,
                              content,
                              phones,
                              mails,
                              breeds,
                              site,
                              setFilters }) => {
    const url = user_type === 4 ? `/kennel/${alias}` : user_type === 7 ? null :
        (user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online') ? `/club/${alias}` : `/${alias}/`;

    return (
        <Card className="card-organization">
            <div className="card-organization__content">
                <div className="card-organization__header">
                    {url ?
                        <div className="card-organization__author">
                            <Link
                                to={url}
                                className={`card-organization__logo ${user_type === 3 || user_type === 4 ? `item-card__logo--club` : ``}`}
                                style={{
                                    backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`
                                }}
                            />
                            <div className="card-organization__name-wrap">
                                <div>
                                    <div className="card-organization__name-inner">
                                    <Link to={url} className="card-organization__name" title={name || 'Название отсутствует'}>
                                        {(user_type === 3 || user_type === 4 || user_type === 5 || user_type === 7) &&
                                        <>
                                                <span>
                                                    {user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : user_type === 7 ? 'НКП' : ''}
                                                </span>
                                            &nbsp;
                                            </>
                                        }
                                        <span>{name || 'Название отсутствует'}</span>
                                    </Link>
                                    <span className="card-organization__mark">
                                        {active_rkf_user &&
                                        <ActiveUserMark/>
                                        }
                                        {active_member &&
                                        <FederationChoiceMark/>
                                        }
                                    </span>
                                    </div>
                                </div>
                                    </span>

                        </div>
                    }
                </div>
            </div>

            <div className="card-organization__controls">
                <CardFooter
                    id={id}
                    share_link={ `https://rkf.online${url}` }
                />
            </div>
        </Card>
    )
};

export default React.memo(CardOrganization);