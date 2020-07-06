import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import StatusTable from "./components/Table";
import CustomCheckbox from "components/Form/CustomCheckbox";
import StickyFilters from "components/StickyFilters";
import {Request} from "utils/request";
import "./index.scss";

const PromiseRequest = (data) => new Promise((resolve, reject) => Request(data, resolve, reject));

const ReplaceRegistry = ({history, alias, distinction, profileType}) => {
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState([1,2,3,4]);
    const [reqTypes, setReqTypes] = useState([]);
    const [checkedTypes, setCheckedTypes] = useState([]);
    const check = i => setChecked(checked.includes(i) ? checked.filter(x => x !== i) : checked.concat(i));
    const checkType = i => setCheckedTypes(checkedTypes.includes(i) ? checkedTypes.filter(x => x !== i) : checkedTypes.concat(i))
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        (() => Promise.all([
            PromiseRequest({
                url: `/api/requests/dog_health_check_request/${profileType === "kennel" ? 'kennel' : ''}doghealthcheckrequest/register_of_requests`,
                method: 'POST',
                data: {type_id:distinction === "dysplasia" ? 1 : 2}
            }),
            PromiseRequest({url:'/api/requests/commonrequest/dog_health_check_type'})
        ]).then(
        data => {
            setDocuments(data[0]);
            setReqTypes(data[1]);
            setCheckedTypes(data[1].map(({id})=>id));
            setLoading(false);
        }).catch(
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
                {distinction === "dysplasia" ? "СЕРТИФИКАТ О ПРОВЕРКЕ НА ДИСПЛАЗИЮ" : "СЕРТИФИКАТ КЛИНИЧЕСКОЙ ОЦЕНКИ КОЛЕННЫХ СУСТАВОВ (PL) (ПАТЕЛЛА)"}
            </div>
            <h3>Фильтры</h3>
            <StickyFilters>
            <div className="flex-row heading-row">
                    <CustomCheckbox id="custom-checkbox-1" label="Отклоненные" onChange={e => check(1)} checked={checked.includes(1)} />
                    <CustomCheckbox id="custom-checkbox-2" label="В работе" onChange={e => check(2)} checked={checked.includes(2)} />
                    <CustomCheckbox id="custom-checkbox-3" label="Выполненные" onChange={e => check(3)} checked={checked.includes(3)} />
            </div>
            </StickyFilters>
            <div className="club-documents-status__table">
                {documents && !!documents.length ?
                    <StatusTable profileType={profileType} documents={documents.filter(x => x && checkedTypes.includes(x.type_id) && checked.includes(x.status_id))} alias={alias}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(ReplaceRegistry);
