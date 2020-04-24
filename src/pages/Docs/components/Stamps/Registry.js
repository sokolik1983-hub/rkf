import React, { useEffect, useState } from 'react';
import Card from 'components/Card';
import { connect } from 'react-redux';
import Loading from "components/Loading";
import StampsRegistry from "./components/Table";
import { Request } from "utils/request";
import './styles.scss';

const Registry = ({ history, clubAlias, profile_id }) => {
    const [loading, setLoading] = useState(true);
    const [stamps, setStamps] = useState(null);

    useEffect(() => {
        (() => Request({
            url: `/api/clubs/ClubStampCode/club?id=${profile_id}`
        },
            data => {
                setStamps(data);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    return loading ?
        <Loading /> :
        <Card className="responsible-persons">
            <div className="responsible-persons__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
            </div>
            <div className="responsible-persons__table">
                {stamps && !!stamps.length ?
                    <StampsRegistry stamps={stamps} clubAlias={clubAlias} /> :
                    <h2>Клейм не найдено</h2>
                }
            </div>
        </Card>
};

const mapStateToProps = state => ({ profile_id: state.authentication.profile_id });
export default connect(mapStateToProps)(Registry);