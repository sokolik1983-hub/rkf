import React, {useState, useEffect} from "react";
import Loading from "../Loading";
import {Request} from "../../utils/request";
import declension from "../../utils/declension";
import "./index.scss";


const Statistics = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const {clubs_total_count, federation_clubs} = stats;
    const clubDeclension = count => count + ' ' + declension(count, ['клуб', 'клуба', 'клубов']);

    useEffect(() => {
        (() => Request({
            url: '/api/Club/federations_clubs_count'
        }, data => {
            setStats(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
        }))();
    }, []);

    return (
        <div className="statistics">
            {loading ?
                <Loading centered={false} /> :
                <>
                    <h3 className="statistics__title">
                        На RKF.Online авторизовано:<br />
                        {clubDeclension(clubs_total_count)}
                    </h3>
                    {federation_clubs.map((federation, i) =>
                        <p key={i}>
                            {`${federation.federation_name} - ${clubDeclension(federation.federation_clubs_count)}`}
                        </p>
                    )}
                </>
            }
        </div>
    )
};

export default React.memo(Statistics);