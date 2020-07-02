import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import StatusTable from "./components/Table";
import CustomCheckbox from "components/Form/CustomCheckbox";
import {Request} from "utils/request";
import "./index.scss";

const PromiseRequest = (data) => new Promise((resolve, reject) => Request(data, resolve, reject));

const ReplaceRegistry = ({history, alias}) => {
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
                url: '/api/requests/replace_pedigree_request/replacepedigreerequest/register_of_requests',
                method: 'POST',
                data: {}
            }),
            PromiseRequest({url:'/api/requests/commonrequest/replace_pedigree_type'})
        ]).then(data => {
            setDocuments(data[0]);

            const reqTypes = data[1].reduce((arr, item) => {
                if(arr[arr.length - 1].length === 3) {
                    arr.push([]);
                }

                arr[arr.length - 1].push(item);
                return arr;
            }, [[]]);

            setReqTypes(reqTypes);
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
                ЗАМЕНА РОДОСЛОВНОЙ
            </div>
            {documents && !!documents.length &&
                <>
                    <h3>Фильтры</h3>
                    <div className="flex-row heading-row">
                        <div>
                            <CustomCheckbox id="custom-checkbox-1" label="Отклоненные" onChange={e => check(1)} checked={checked.includes(1)} />
                            <CustomCheckbox id="custom-checkbox-2" label="В работе" onChange={e => check(2)} checked={checked.includes(2)} />
                            <CustomCheckbox id="custom-checkbox-3" label="Выполненные" onChange={e => check(3)} checked={checked.includes(3)} />
                        </div>
                        {!!reqTypes.length && reqTypes.map((arr, i) =>
                            <div key={i}>
                                {arr.map(({id, name}) =>
                                    <CustomCheckbox
                                        key={id}
                                        id={`custom-checkbox-reqtypes-${id}`}
                                        label={name}
                                        onChange={() => checkType(id)}
                                        checked={checkedTypes.includes(id)}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </>
            }
            <div className="club-documents-status__table">
                {documents && !!documents.length ?
                    <StatusTable documents={documents.filter(x => x && checkedTypes.includes(x.type_id) && checked.includes(x.status_id))} alias={alias}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(ReplaceRegistry);
