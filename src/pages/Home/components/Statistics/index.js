import React, { useState, useEffect } from 'react';
import Card from "components/Card";
import Loading from 'components/Loading';
import { Request } from 'utils/request';
import declension from 'utils/declension';
import './styles.scss';

const Statistics = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Request({
            url: '/api/Club/federations_clubs_count'
        }, data => {
            setStats(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
        });
    }, []);

    const { clubs_total_count, federation_clubs } = stats;
    const clubDeclension = count => count + ' ' + declension(count, ['клуб', 'клуба', 'клубов']);

    return <Card className="Statistics">
        {
            loading
                ? <Loading centered={false} />
                : <>
                    <h3 className="Statistics__title">
                        На RKF.Online авторизовано:<br />
                        {clubDeclension(clubs_total_count)}
                    </h3>
                    {federation_clubs.map((f, key) => {
                        return <p key={key}>
                            {`${f.federation_name} - ${clubDeclension(f.federation_clubs_count)}`}
                        </p>
                    })}
                </>
        }
    </Card>
};

export default Statistics;