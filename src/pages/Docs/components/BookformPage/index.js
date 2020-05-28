import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import StatusTable from "./components/Table";
import CustomCheckbox from "components/Form/CustomCheckbox";
import Bookform from "../Bookform";
import {Request} from "utils/request";
import "./index.scss";


const BookformPage = ({history, clubAlias}) => {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState([1,2,3,4]);
    const check = i => setChecked(checked.includes(i) ? checked.filter(x => x !== i) : checked.concat(i));
    const [documents, setDocuments] = useState(null);
    return loading ?
        <Loading/> :
        <Card className="club-documents-status">
            <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;Запись на очный прием
            </div>
            <div>
                <p>В данном разделе Вы можете записаться на очный прием в офисе Вашей федерации. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе). При посещении офиса необходимо иметь с собой документ, удостоверяющий личность</p>
            </div>
            <div>
                <Bookform />
            </div>
        </Card>
};

export default React.memo(BookformPage);
