import React, {useEffect} from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
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
    const { path, url, params } = match;
    const exhibitionId = +params.id;
    const loading = !Object.keys(reportHeader).length;

    useEffect( () => {
        (() => Request({
            url: endpointGetHeader,
            method: 'POST',
            data: JSON.stringify(exhibitionId)
        }, fetchReportHeaderSuccess))();
    }, []);

    return loading ?
        <Loading /> :
        <Card>
            <div className="ReportDetails">
                <h3 className="ReportDetails__title">{`Отчётность по выставке "${reportHeader.exhibition_name}"`}</h3>
                <div className="ReportDetails__nav">
                    <NavLink className="link" to={`${url}`} exact >Итоговый отчет</NavLink>
                    <NavLink className="link" to={`${url}/main-ring-statement`}>Ведомость главного ринга</NavLink>
                    <NavLink className="link" to={`${url}/judge-load-report`}>Отчет по нагрузке на судей</NavLink>
                    <NavLink className="link" to={`${url}/documents`}>Документы</NavLink>
                </div>
                <Switch>
                    <Route exact path={`${path}`} component={() => <FinalReport reportHeader={reportHeader} />} />
                    <Route path={`${path}/main-ring-statement`} component={() => <MainRingStatement reportHeader={reportHeader}/>} />
                    <Route path={`${path}/judge-load-report`} component={() => <JudgeLoadReport reportHeader={reportHeader}/>} />
                    <Route path={`${path}/documents`} component={() => <ReportDetailsDocument reportHeader={reportHeader}/>} />
                </Switch>
            </div>
        </Card>
}

export default connectReportHeader(ReportDetails);
