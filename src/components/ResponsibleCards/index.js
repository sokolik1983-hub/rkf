import Card from "../Card";
import {Link} from "react-router-dom";
import React from "react";

const _checkMembership = 23;

const ResponsibleCards = ({ nurseryAlias, authorizedAccess }) => {
    const checkMembership = authorizedAccess?.includes(_checkMembership);

    return <div className="documents-page__right">
        <Card>
            <div className="documents-page__icon declarants-icon" />
            <h3>ЗАЯВИТЕЛИ</h3>
            <p>
                В данном разделе могут быть добавлены ответственные лица, уполномоченные действовать от имени клуба в части оформления и отслеживания заявок на изготовление документов.
            </p>
            <hr />
            <div className="Card__links">
                <Link to={`/kennel/${nurseryAlias}/documents/responsible/form`}>Назначить ответственное лицо</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/responsible/table`}>Реестр ответственных лиц</Link>
            </div>
        </Card>
        <Card className={checkMembership ? `` : `_inactive`}>
            <div className="documents-page__icon membership-icon" />
            <h3>ОТЧЁТЫ О ПЛЕМЕННОЙ ДЕЯТЕЛЬНОСТИ</h3>
            <p>
                В данном разделе можно направить электронную копию племенной книги за прошедший год и предоставить квитанцию об оплате ежегодного членского взноса.
            </p>
            <hr />
            <div className="Card__links">
                <Link to={`/kennel/${nurseryAlias}/documents/responsible/checkmembership/form`}>Предоставить данные</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/responsible/checkmembership/registry`}>Реестр предоставленных документов</Link>
            </div>
        </Card>
    </div>
};

export default ResponsibleCards;