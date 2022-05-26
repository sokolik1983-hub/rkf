import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../../../../components/Loading";
import Request from "../../../../../utils/request";
import Card from "../../../../../components/Card";
import "./index.scss";


const ExhibitionsInviteClub = ({ alias, userType }) => {
    // const [loading, setLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    console.log('ExhibitionsInviteClub')

    const location = useLocation();
    const id = location.search.replace('?exhibitionId=', '');
    console.log(id)

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/invite?exhibitionId=${id}`,
        }, data => {
            console.log('data', data)
            /*setDocuments(data.sort(function (a, b) {
                return new Date(b.date_create) - new Date(a.date_create);
            }).map(({ date_create, end_date, start_date, nbc_breed, ...rest }) => ({
                date_create: moment(date_create).format('DD.MM.YY'),
                end_date: moment(end_date).format('DD.MM.YY'),
                start_date: moment(start_date).format('DD.MM.YY'),
                nbc_breed: getBreeds(nbc_breed),
                ...rest
            })));*/
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading /> :
            <Card className="exhibitions-invite">
                пурум пум пум club
            </Card>
};

export default React.memo(ExhibitionsInviteClub);