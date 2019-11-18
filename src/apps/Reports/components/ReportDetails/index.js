import React, {useEffect, useState} from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Card from 'components/Card';
import Loading from "../../../../components/Loading";
import FinalReport from "./FinalReport";
import MainRingStatement from "./MainRingStatement";
import JudgeLoadReport from "./JudgeLoadReport";
import ReportDetailsDocument from './ReportDetailsDocument';
import {endpointGetHeader} from '../../config';
import {connectReportHeader} from '../../connectors';
import {Request} from "../../../../utils/request";


function ReportDetails(props) {
    const {match, fetchReportHeaderSuccess, reportHeader} = props;
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);
    const { path, url, params } = match;
    const exhibitionId = +params.id;

    const getHeader = async () => {
        await Request({
                url: endpointGetHeader,
                method: 'POST',
                data: JSON.stringify(exhibitionId)
            },
            data => {
                fetchReportHeaderSuccess(data);
                setLoading(false);
            },
            error => {
                setErrors({
                    status: error.response.status,
                    errors: error.response.data.errors
                });
                setLoading(false);
            }
        );
    };

    useEffect( () => {
        getHeader();
    }, []);

    return loading ?
        <Loading /> :
        <Card>
            {!errors ?
                <div className="ReportDetails">
                    <h3 className="ReportDetails__title">{`Отчётность по выставке "${reportHeader.exhibition_name}"`}</h3>
                    <div className="ReportDetails__nav">
                        <NavLink className="link" to={`${url}`} exact >Итоговый отчёт</NavLink>
                        <NavLink className="link" to={`${url}/main-ring-statement`}>Ведомость главного ринга</NavLink>
                        <NavLink className="link" to={`${url}/judge-load-report`}>Отчёт по нагрузке на судей</NavLink>
                        <NavLink className="link" to={`${url}/documents`}>Документы</NavLink>
                    </div>
                    <Switch>
                        <Route exact path={`${path}`} component={() => <FinalReport reportHeader={reportHeader} getHeader={getHeader}/>} />
                        <Route path={`${path}/main-ring-statement`} component={() => <MainRingStatement reportHeader={reportHeader} getHeader={getHeader}/>} />
                        <Route path={`${path}/judge-load-report`} component={() => <JudgeLoadReport reportHeader={reportHeader} getHeader={getHeader}/>} />
                        <Route path={`${path}/documents`} component={() => <ReportDetailsDocument reportHeader={reportHeader} getHeader={getHeader}/>} />
                    </Switch>
                </div> :
                errors.status === 422 ?
                    <div className="ReportDetails__errors">
                        {Object.keys(errors.errors).map(key => (
                            <p key={key}>{errors.errors[key]}</p>
                        ))}
                    </div> :
                    <Redirect to={'/not-found'}/>
            }
        </Card>
}

export default connectReportHeader(ReportDetails);
