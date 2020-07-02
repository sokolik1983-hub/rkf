import React, {useEffect, useState} from "react";
// import {Link} from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import StatusTable from "./components/Table";
import CustomCheckbox from "components/Form/CustomCheckbox";
import {Request} from "utils/request";
import "./index.scss";


const RequestRegistry = ({history, nurseryAlias, distinction}) => {
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState([1,2,3,4]);
    const check = i => setChecked(checked.includes(i) ? checked.filter(x => x !== i) : checked.concat(i));
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ?
                '/api/requests/NurseryPedigreeRequest/register_of_requests' :
                '/api/requests/NurseryLitterRequest/register_of_requests'
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
        <Card className="nursery-documents-status">
            <div className="nursery-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                {distinction === 'pedigree' 
                    ? 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'
                    : 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА'}
            </div>
            {documents && !!documents.length &&
                <>
                    <h3>Фильтры</h3>
                    <div className="nursery-documents-status__filters">
                        <CustomCheckbox id="custom-checkbox-1" label="Отклоненные" onChange={e => check(1)} checked={checked.includes(1)} />
                        <CustomCheckbox id="custom-checkbox-2" label="В работе" onChange={e => check(2)} checked={checked.includes(2)} />
                        <CustomCheckbox id="custom-checkbox-3" label="Выполненные" onChange={e => check(3)} checked={checked.includes(3)} />
                        <CustomCheckbox id="custom-checkbox-4" label="Не отправленные" onChange={e => check(4)} checked={checked.includes(4)} />
                    </div>
                </>
            }
            <div className="nursery-documents-status__table">
                {documents && !!documents.length ?
                    <StatusTable documents={documents.filter(x => x && checked.includes(x.status_id))} distinction={distinction} nurseryAlias={nurseryAlias}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(RequestRegistry);
