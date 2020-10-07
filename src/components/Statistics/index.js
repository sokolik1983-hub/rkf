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

const Statistics = ({isAboutPage}) => {
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
        <Card className={`statistics ${isAboutPage ? `_about_page` : ``}`}>
            {loading ?
                <Loading centered={false} /> :
                <>
                    <h3 className="statistics__title">
                        На RKF.Online авторизовано
                    </h3>
                    <div className="statistics__wrap">
                        <div className="statistics__text-wrap">
                            <span className="statistics__text">Клубов</span>
                            <span className="statistics__text">Питомников</span>
                        </div>
                        <div className="statistics__federations-wrap">
                            <div className="statistics__federations--table">
                              <div className="statistics__federations--column">
                                {sortFederationName(federation_clubs).map((federation, i) =>
                                    <div className="statistics__federations" key={i}>
                                        <div className="statistics__federations--head">
                                            <span className={setLogoClassName(federation.federation_name)} />
                                            <span>{federation.federation_name}</span>
                                        </div>
                                        <span className="federation-count">{federation.federation_clubs_count}</span>
                                    </div>
                                )}
                             </div>
                             <div className="statistics__federations--column statistics__federations--column--last">
                                {sortFederationName(federation_nurseries).map((federation, i) =>
                                    <div className="statistics__federations" key={i}>
                                        <span className="federation-count">{federation.federation_nurseries_count}</span>
                                    </div>
                                )}
                              </div>
                            </div>
                        </div>
                        <div className="statistics__federations-total">
                            <span className="statistics-total__name">Всего</span>
                            <ul className="statistics-list">
                                <li>{clubs_total_count}</li>
                                <li>{nurseries_total_count}</li>
                            </ul>
                        </div>
                    </div>
                </>
            }
        </Card>
    )
};

export default React.memo(Statistics);