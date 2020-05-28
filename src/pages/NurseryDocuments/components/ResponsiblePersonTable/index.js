import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import ResponsibleTable from "./components/Table";
import {Request} from "../../../../utils/request";
import "./index.scss";


const ResponsivePersonTable = ({history, nurseryAlias}) => {
    const [loading, setLoading] = useState(true);
    const [declarants, setDeclarants] = useState(null);

    useEffect(() => {
        (() => Request({
            url: '/api/clubs/Declarant/club_declarants'
        },
        data => {
            setDeclarants(data);
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading/> :
        <Card className="responsible-persons">
            <div className="responsible-persons__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;Заявители
            </div>
            <div className="responsible-persons__table">
                {declarants && !!declarants.length ?
                    <ResponsibleTable declarants={declarants} nurseryAlias={nurseryAlias}/> :
                    <h2>Ответственных лиц не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(ResponsivePersonTable);