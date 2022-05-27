import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { Request, getHeaders } from "../../utils/request";
import Card from "../../components/Card";
import "./index.scss";


const NBCInvite = ({ alias, userType }) => {
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const id = location.search.replace('?exhibitionId=', '');

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/invite?exhibitionId=${id}`,
            headers: getHeaders(),
        }, data => {
            console.log('data', data)

            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading /> :
        <Card className="exhibitions-invite">
            пурум пум пум nbc
        </Card>
};

export default React.memo(NBCInvite);