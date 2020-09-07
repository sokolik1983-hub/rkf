import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Card from "../Card";
import { Request } from "../../utils/request";
import declension from "../../utils/declension";
import "./index.scss";

const setLogoClassName = (federation) => {
    let modifier;
    switch (federation) {
        case 'РФЛС':
            modifier = 'rfls'
            break;
        case 'РФСС':
            modifier = 'rfss'
            break;
        case 'ОАНКОО':
            modifier = 'oankoo'
            break;
        case 'РФОС':
            modifier = 'rfos'
            break;
        default:
            modifier = ''
    }
    return `statistics__federation-logo statistics__federation-logo--${modifier}`
};

const Statistics = () => {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState({});
    const { clubs_total_count, federation_clubs } = clubs;
    const clubDeclension = count => <>{declension(count, ['Клуб', 'Клуба', 'Клубов'])}<br/>{count}</>;

    const [nurseries, setNurseries] = useState({});
    const { nurseries_total_count, federation_nurseries } = nurseries;
    const nurseryDeclension = count => <>{declension(count, ['Питомник', 'Питомника', 'Питомников'])}<br/>{count}</>;

    const PromiseRequest = payload => new Promise((res, rej) => Request(payload, res, rej));

    useEffect(() => {
        setLoading(true);
        Promise.all([
            PromiseRequest({ url: `/api/Club/federations_clubs_count` }),
            PromiseRequest({ url: `/api/nurseries/nursery/federations_nurseries_count` })
        ]).then(result => {
            setClubs(result[0]);
            setNurseries(result[1]);
            setLoading(false);
        }).catch(error => {
            console.log(error.response);
            setLoading(false);
        });
    }, []);

    return (
        <Card className="statistics">
            {loading ?
                <Loading centered={false} /> :
                <>
                    <h3 className="statistics__title">
                        На RKF.Online авторизовано<br />
                    </h3>
                    <div className="statistics__wrap">
                        <div className="statistics__text-wrap">
                            <span className="statistics__text">{clubDeclension(clubs_total_count)}</span>
                            <span className="statistics__text">{nurseryDeclension(nurseries_total_count)}</span>
                        </div>
                        <div className="statistics__federations-wrap">
                            <div>
                                {federation_clubs.map((federation, i) =>
                                    <p className="statistics__federations" key={i}>
                                        <span className={setLogoClassName(federation.federation_name)} />
                                        {`${federation.federation_name} ${federation.federation_clubs_count}`}
                                    </p>
                                )}
                            </div>
                            <div>
                                {federation_nurseries.map((federation, i) =>
                                    <p className="statistics__federations" key={i}>
                                        <span className={setLogoClassName(federation.federation_name)} />
                                        {`${federation.federation_name} ${federation.federation_nurseries_count}`}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            }
        </Card>
    )
};

export default React.memo(Statistics);