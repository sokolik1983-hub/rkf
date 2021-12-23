import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import PuppiesTable from "./components/Table";
import {Request} from "../../../../utils/request";
import "./index.scss";


const PuppiesMetrics = ({history, nurseryAlias}) => {
    const [loading, setLoading] = useState(true);
    const [puppies, setPuppies] = useState(null);
console.log('nursery PuppiesMetrics')
    useEffect(() => {
        (() => Request({
            url: '/api/requests/NurseryLitterRequest/register_of_metrics'
        },
        data => {
            setPuppies(data);
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading/> :
        <Card className="puppies-metrics">
            <div className="puppies-metrics__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;Метрика щенка
            </div>
            <div className="puppies-metrics__table">
                {puppies && !!puppies.length ?
                    <PuppiesTable puppies={puppies} nurseryAlias={nurseryAlias}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(PuppiesMetrics);