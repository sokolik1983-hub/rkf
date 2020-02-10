import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import {DEFAULT_IMG} from "../../../../appConfig";
import "./index.scss";


const members = [
    {
        id: 1,
        name: 'РФЛС',
        url: '/rfls',
        avatar_link: DEFAULT_IMG.clubAvatar
    },
    {
        id: 2,
        name: 'РФСС',
        url: '/rfss',
        avatar_link: DEFAULT_IMG.clubAvatar
    },
    {
        id: 3,
        name: 'ОАНКОО',
        url: '/oankoo',
        avatar_link: DEFAULT_IMG.clubAvatar
    },
    {
        id: 4,
        name: 'РФОС',
        url: '/rfos',
        avatar_link: DEFAULT_IMG.clubAvatar
    }
];


const MembersComponent = () => (
    <Card className="members-component">
        <h4 className="members-component__title">
            Члены ркф &nbsp;
            <span className="members-component__title-count">{members.length}</span>
        </h4>
        <ul className="members-component__list">
            {members.map(item =>
                <li className="members-component__item" key={item.id}>
                    <Link to={item.url} className="members-component__link">
                        <div className="members-component__link-avatar"
                             style={{background: `url(${item.avatar_link}) no-repeat center`}}
                        />
                        <p className="members-component__link-name">{item.name}</p>
                    </Link>
                </li>
            )}
        </ul>
    </Card>
);

export default React.memo(MembersComponent);