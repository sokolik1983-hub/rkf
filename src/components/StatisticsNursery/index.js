import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Card from "../Card";
import { Request } from "../../utils/request";
import declension from "../../utils/declension";
import "../Statistics/index.scss";


const StatisticsNursery = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const { nurseries_total_count, federation_nurseries } = stats;
    const nameDeclension = count => count + ' ' + declension(count, ['питомник', 'питомника', 'питомников']);

    useEffect(() => {
        (() => Request({
            url: '/api/nurseries/nursery/federations_nurseries_count'
        }, data => {
            setStats(data);
            setLoading(false);
            window.scrollTo(0, 0);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
            window.scrollTo(0, 0);
        }))();
    }, []);

    return (
        <Card className="statistics">
            {loading ?
                <Loading centered={false} /> :
                <>
                    <h3 className="statistics__title">
                        На RKF.Online авторизовано:<br />
                        {nameDeclension(nurseries_total_count)}
                    </h3>
                    {federation_nurseries.map((federation, i) =>
                        <p key={i}>
                            {`${federation.federation_name} - ${nameDeclension(federation.federation_nurseries_count)}`}
                        </p>
                    )}
                </>
            }
        </Card>
    )
};

export default React.memo(StatisticsNursery);