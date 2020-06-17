import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import StatusTable from "./components/Table";
import CustomCheckbox from "components/Form/CustomCheckbox";
import {Request} from "utils/request";
import "./index.scss";


const RequestRegistry = ({history, clubAlias}) => {
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState([1,2,3,4]);
    const [statuses, setStatuses] = useState([]);
    const [reqTypes, setReqTypes] = useState([]);
    const check = i => setChecked(checked.includes(i) ? checked.filter(x => x !== i) : checked.concat(i));
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        (() => Request({
            url: '/api/requests/replace_pedigree_request/replacepedigreerequest/register_of_requests',
            method: 'POST',
            data: {}
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
                &nbsp;/&nbsp;
                ЗАМЕНА РОДОСЛОВНОЙ
            </div>
            <h3>Фильтры</h3>
            <div>
                <CustomCheckbox id="custom-checkbox-1" label="Отклоненные" onChange={e => check(1)} checked={checked.includes(1)} />
                <CustomCheckbox id="custom-checkbox-2" label="В работе" onChange={e => check(2)} checked={checked.includes(2)} />
                <CustomCheckbox id="custom-checkbox-3" label="Выполненные" onChange={e => check(3)} checked={checked.includes(3)} />
                <CustomCheckbox id="custom-checkbox-4" label="Не отправленные" onChange={e => check(4)} checked={checked.includes(4)} />
                <p></p>
            </div>
            <div className="club-documents-status__table">
                {documents && !!documents.length ?
                    <StatusTable documents={documents.filter(x => x && checked.includes(x.status_id))} clubAlias={clubAlias}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(RequestRegistry);
