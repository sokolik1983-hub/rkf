import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Card from "../Card";
import { Request } from "../../utils/request";
import declension from "../../utils/declension";
import "./index.scss";

const federationLogoClassName = (federation) => {
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
    const clubDeclension = count => count + ' ' + declension(count, ['Клуб', 'Клуба', 'Клубов']);

    const [nurseries, setNurseries] = useState({});
    const { nurseries_total_count, federation_nurseries } = nurseries;
    const nameDeclension = count => count + ' ' + declension(count, ['Питомник', 'Питомника', 'Питомников']);

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
                        <span className="statistics__text">{clubDeclension(clubs_total_count)}</span>
                        {federation_clubs.map((federation, i) =>
                            <p className="statistics__" key={i}>
                                <span className={federationLogoClassName(federation.federation_name)} />{`${federation.federation_name} ${federation.federation_clubs_count}`}
                            </p>
                        )}
                        <span className="statistics__text">{nameDeclension(nurseries_total_count)}</span>
                        {federation_nurseries.map((federation, i) =>
                            <p className="statistics__" key={i}>
                                <span className={federationLogoClassName(federation.federation_name)} />{`${federation.federation_name} ${federation.federation_nurseries_count}`}
                            </p>
                        )}
                    </div>
                </>
            }
        </Card>
    )
};

export default React.memo(Statistics);