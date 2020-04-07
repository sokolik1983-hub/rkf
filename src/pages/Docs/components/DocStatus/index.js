import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import StatusTable from "./components/Table";
import {Request} from "../../../../utils/request";
import "./index.scss";


const ClubDocumentsStatus = ({history, clubAlias, distinction}) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ?
                '/api/clubs/requests/PedigreeRequest/headers_base_info' :
                '/api/clubs/requests/LitterRequest/headers_base_info'
        },
        data => {
            setDocuments(data);
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading/> :
        <Card className="club-documents-status">
            <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
            </div>
            <div className="club-documents-status__table">
                {documents && documents.length ?
                    <StatusTable documents={documents} distinction={distinction} clubAlias={clubAlias}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
            <div className="club-documents-status__bottom">
                <p>{distinction === 'litter' ?
                    'В соответствии с требованиями РКФ, с заявлением на регистрацию помета так же принимаются: акт вязки, акт обследования помета, копии свидетельств о происхождении производителей, копии сертификатов всех титулов и рабочих испытаний, заключения по дисплазии, и однократно - оригинал диплома с сертификатной выставки РКФ, копию Свидетельства о регистрации заводской приставки FCI.' :
                    'Метрика щенка не дает право на племенное использование собаки и подлежит обязательному обмену на свидетельство о происхождении (родословную) РКФ до достижения собакой возраста 15 месяцев.'
                }</p>
                <Link
                    to={`/${clubAlias}/documents/${distinction}/form`}
                    className="btn-add"
                    title="Добавить новую заявку"
                >+</Link>
            </div>
        </Card>
};

export default React.memo(ClubDocumentsStatus);