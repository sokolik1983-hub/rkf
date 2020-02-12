import React from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const MembersComponent = ({members}) => (
    <Card className="members-component">
        <h4 className="members-component__title">
            Члены&nbsp;
            <span className="members-component__title-count">{members.length}</span>
        </h4>
        <ul className="members-component__list">
            {members.map(item =>
                <li className="members-component__item" key={item.id}>
                    <Link to={item.alias} className="members-component__link">
                        <div className="members-component__link-avatar"
                             style={{background: `url(${item.avatar_link || DEFAULT_IMG.clubAvatar}) no-repeat center`}}
                        />
                        <p className="members-component__link-name">{item.name}</p>
                    </Link>
                </li>
            )}
        </ul>
    </Card>
);

export default React.memo(MembersComponent);