import React, { useEffect, useState } from 'react';
import Card from 'components/Card';
import { connect } from 'react-redux';
import Loading from "components/Loading";
import Table from "./components/Table";
import { Request } from "utils/request";
import './styles.scss';

const Registry = ({ profile_id }) => {
    const [loading, setLoading] = useState(true);
    const [stamps, setStamps] = useState(null);

    useEffect(() => {
        (() => Request({
            url: `/api/requests/StampCodeRequest/club`
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

    const setDefaultStamp = async id => {
        await Request({
            url: '/api/clubs/ClubStampCode/default',
            method: 'PUT',
            data: JSON.stringify({ profile_id: profile_id, stamp_code_id: id })
        }, () => {
            let newDefaultStamp = stamps.filter(row => row.stamp_code_id === id)[0];
            newDefaultStamp.is_default = true;
            const otherStamp = stamps.filter(row => row.stamp_code_id !== id).map(row => {
                row.is_default = false;
                return row;
            });

            setStamps([newDefaultStamp, ...otherStamp]);
        }, error => {
            console.log(error.response);
        });
    }

    return <Card className="responsible-stamps">
        <h3>РЕЕСТР КОДОВ КЛЕЙМ</h3>
        {loading
            ? <Loading />
            : <div className="responsible-stamps__table">
                {
                    stamps && !!stamps.length
                        ? <Table documents={stamps} setDefaultStamp={setDefaultStamp} />
                        : <h2>Клейм не найдено</h2>
                }
            </div>}
    </Card>
};

const mapStateToProps = state => ({ profile_id: state.authentication.profile_id });
export default connect(mapStateToProps)(Registry);