import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import PuppiesTable from "./components/Table";
// import {Request} from "../../../../utils/request";
import "./index.scss";


const defaultPuppies = [
    {
        id: 1,
        date_create: '2020-04-14T10:31:36.202816',
        puppy_name: 'Щенок',
        stamp: '1234657',
        owner_name: 'Пупкин Василий Иванович',
        puppy_birthday: '2020-04-14T10:31:36.202816',
        status_name: 'Принята',
        status_id: 1
    },
    {
        id: 2,
        date_create: '2020-04-14T10:36:36.202816',
        puppy_name: 'Щенок',
        stamp: '1234657',
        owner_name: 'Пупкин Василий Иванович',
        puppy_birthday: '2020-04-14T10:36:36.202816',
        status_name: 'Не принята',
        status_id: 2
    }
];


const PuppiesMetrics = ({history, clubAlias}) => {
    const [loading, setLoading] = useState(true);
    const [puppies, setPuppies] = useState(null);

    useEffect(() => {
        setPuppies(defaultPuppies);
        setLoading(false);
        // (() => Request({
        //     url: ''
        // },
        // data => {
        //     setDocuments(data);
        //     setLoading(false);
        // },
        // error => {
        //     console.log(error.response);
        //     setLoading(false);
        // }))();
    }, []);

    return loading ?
        <Loading/> :
        <Card className="puppies-metrics">
            <div className="puppies-metrics__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
            </div>
            <div className="puppies-metrics__table">
                {puppies && !!puppies.length ?
                    <PuppiesTable puppies={puppies} clubAlias={clubAlias}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(PuppiesMetrics);