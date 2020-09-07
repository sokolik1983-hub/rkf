import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Card from "../Card";
import { Request } from "../../utils/request";
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

const sortFederationName = (array) => {
    let firstName = array.find(i => i.federation_name === 'РФСС');
    let secondName = array.find(i => i.federation_name === 'РФЛС');
    let thirdName = array.find(i => i.federation_name === 'ОАНКОО');
    let fourthName = array.find(i => i.federation_name === 'РФОС');

    return [firstName, secondName, thirdName, fourthName];
};

const Statistics = () => {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState({});
    const { clubs_total_count, federation_clubs } = clubs;

    const [nurseries, setNurseries] = useState({});
    const { nurseries_total_count, federation_nurseries } = nurseries;

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
                            <span className="statistics__text">Клубов<br/><span>{clubs_total_count}</span></span>
                            <span className="statistics__text">Питомников<br/><span>{nurseries_total_count}</span></span>
                        </div>
                        <div className="statistics__federations-wrap">
                            <div>
                                {sortFederationName(federation_clubs).map((federation, i) =>
                                    <p className="statistics__federations" key={i}>
                                        <span className={setLogoClassName(federation.federation_name)} />
                                        <span>{federation.federation_name}</span>
                                        <span>{federation.federation_clubs_count}</span>
                                    </p>
                                )}
                            </div>
                            <div>
                                {sortFederationName(federation_nurseries).map((federation, i) =>
                                    <p className="statistics__federations" key={i}>
                                        <span className={setLogoClassName(federation.federation_name)} />
                                        <span>{federation.federation_name}</span>
                                        <span>{federation.federation_nurseries_count}</span>
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