import React, { useState, useEffect } from "react";
import { Request } from "utils/request";
import PlusButton from "components/PlusButton";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import Button from "components/Button";
import { Form, FormGroup, FormField } from "components/Form";
import { email, required } from "../../components/Form";
import DocItem from "../DocItem";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import { endpointGetFederations } from "pages/Clubs/config";
import './index.scss';
import data from "../../dummy.json";

const apiEndpoint = '/api/clubs/requests/PedigreeRequest';

const DocApply= ({ clubAlias }) => {
    const [docItems, setDocItems] = useState([0]);
    const [federations, setFederations] = useState([]);
    const [fedName, setFedName] = useState('федерации');
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(0);
    const [force, setForce] = useState(false);
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [formValid, setFormValid] = useState({});
    const [res, setResponse] = useState({});
    const [moreItems, setMoreItems] = useState(1);
    const plusClick = e => {
        setDocItems(docItems.concat(moreItems));
        setActive(docItems.length);
        setMoreItems(moreItems + 1);
    }
    const fedChange = e => setFedName(e.label);

    const validate = (name, value) => {
        let n = name.split('.')[1] || name;
        let result = n === 'email' ? email(value) : required(value);
         if (formValid[name] !== !result) {
             formValid[name] = !result;
             setFormValid({...formValid});
         }
         return result;
    }
    const submit = () => {
        let fd = new FormData(document.getElementsByTagName('form')[0]);
        setForce(true);
        let valid = Object.values(formValid).every(x=>x);
        valid && fetch(apiEndpoint, {method: 'POST', body: fd})
        .then(response => {
            if (!response.ok) {
                throw response;
            }
        })
        .then(() => setOkAlert(true))
        .catch(response => {setResponse(response); setErrAlert(true);})
    }
    const deleteItem = i => {
        docItems.splice(i,1);
        if (docItems.length <= active)
            setActive(docItems.length - 1);
        setDocItems(docItems.concat([]));
    }

    useEffect(() => {
        (() => Request({
            url: endpointGetFederations
        }, data => {
            setFederations(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name})));
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    return loading ? <Loading/> : <div className="documents-page__info DocApply">
        <aside className="documents-page__left">
        {okAlert &&
            <Alert
                title="Документы отправлены"
                text="Документы отправлены на рассмотрение. Вы можете отслеживать их статус в личном кабинете."
                autoclose={1.5}
                onOk={() => setOkAlert(false)}
            />
        }
        {errAlert &&
            <Alert
                title="Ошибка отправки"
                text={`Сервер вернул ошибку: ${res.status} - ${res.statusText}`}
                okButton="true"
                onOk={() => setErrAlert(false)}
            />
        }
            <CustomMenu title="Личный кабинет">
                <Link to={`/${clubAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                <Link to="/reports" title="Отчеты">Отчеты</Link>
                <Link to={`/${clubAlias}`} title="Страница клуба">Страница клуба</Link>
            </CustomMenu>
        </aside>
        <div className="documents-page__right">
            {/*
                Это материал для страницы со списком документов
                {data.docs.map((d,i) => <DocEntry key={i} {...d}/>)}
                                */}
            <Form onSuccess={() => setErrAlert(true)} action={endpointGetFederations}>
                <Card>
                    <h3>Регистрация заявления на регистрацию помета</h3>
                    <FormGroup>
                        <FormField options={federations} fieldType="reactSelect" name="federation_id" label='Федерация' onChange={fedChange} />
                        <FormField name='name' label='ФИО заявителя' />
                        <FormField name='phone' type="tel" label='Телефон заявителя' />
                        <FormField name='email' type="email" label='Эл. адрес заявителя' />
                    </FormGroup>
                </Card>
                <Card>
                    <h3>Заводчики</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Дата регистрации</th>
                                <th>Статус</th>
                                <th>Номер док-та</th>
                                <th>ФИО заводчика</th>
                                <th>Эл. почта</th>
                                <th>Кол-во док.</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {docItems.map((m, i) => <DocItem
                                key={m}
                                validate={validate}
                                closeClick={() => deleteItem(i)}
                                i={i}
                                force={force}
                                active={i === active}
                                activateClick={() => setActive(i)}
                            />)}
                        </tbody>
                    </table>
                    <div className="flex-row">
                        <PlusButton title="Добавить еще заводчика" onClick={plusClick} />
                    </div>
                </Card>
                <Card>
                    <FormGroup>
                        <p><b>Приложите квитанцию об оплате {docItems.length} заявок по тарифу {fedName} и заполните информацию о платеже.</b></p>
                        <FormField name='payment_document' label='Квитанция об оплате' type="file" accept="application/pdf" />
                        <FormField name='payment_date' label='Дата оплаты' type="date" />
                        <FormField name='payment_number' label='Номер платежного документа' />
                        <FormField name='payment_name' label='ФИО плательщика / юр. лица' />
                    </FormGroup>
                </Card>
                <div className="flex-row">
                    <Button className="btn-green" onClick={submit}>Сохранить</Button>
                    <Link to={`/${clubAlias}/documents`}><Button className="btn-transparent">Закрыть</Button></Link>
                </div>
            </Form>
        </div>
    </div>
};

export default DocApply;
