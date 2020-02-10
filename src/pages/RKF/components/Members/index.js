import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import "./index.scss";

const members = [
    {
        id: 1,
        name: 'РФЛС',
        url: '/',
        avatar_link: '/static/images/rkf/avatar-rfls.jpg'
    },
    {
        id: 2,
        name: 'РФСС',
        url: '/',
        avatar_link: '/static/images/rkf/avatar-rfss.jpg'
    },
    {
        id: 3,
        name: 'ОАНКОО',
        url: '/',
        avatar_link: '/static/images/rkf/avatar-oankoo.jpg'
    },
    {
        id: 4,
        name: 'РФОС',
        url: '/',
        avatar_link: '/static/images/rkf/avatar-rfos.jpg'
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