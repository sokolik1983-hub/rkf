import React, { useState } from "react";
import PlusButton from "components/PlusButton";
import Alert from "components/Alert";
import Card from "components/Card";
import Button from "components/Button";
import { Form, FormGroup, FormField, required, email } from "../../components/Form";
import DocItem from "../DocItem";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import './index.scss';
import data from "../../dummy.json";

const apiEndpoint = '/api/clubs/requests/PedigreeRequest';

const DocApply = ({ clubAlias }) => {
    const [docItems, setDocItems] = useState([0]);
    const [active, setActive] = useState(0);
    const [force, setForce] = useState(false);
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [formValid, setFormValid] = useState({});
    const [res, setResponse] = useState({});
    const [n, setN] = useState(1);
    const plusClick = e => {
        setDocItems(docItems.concat(n));
        setActive(docItems.length);
        setN(n + 1);
    }
    const clearClick = e => {
        setDocItems([]);
    }
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

    return <div className="documents-page__info DocApply">
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
<<<<<<< HEAD
        <div className="documents-page__right">
            <div className="documents-page__title-wrap">
                <h2 className="documents-page__title">Отправка документов</h2>
=======
        <div className="docs-page__right">
            <div className="docs-page__title-wrap">
                <h2 className="docs-page__title">Регистрация заявления на регистрацию помета</h2>
>>>>>>> e0901a5... [+] update form
            </div>
            {/*
                Это материал для страницы со списком документов
                {data.docs.map((d,i) => <DocEntry key={i} {...d}/>)}
                                */}
            <Form>
                <Card>
                    <FormGroup>
                        <FormField type="hidden" name="federation_id" value="1" label='Федерация'/>
                        <FormField name='name' label='ФИО заявителя' defaultValue={data.club.email} validate={validate} force={force}/>
                        <FormField name='phone' type="tel" label='Телефон заявителя' defaultValue={data.club.phone} validate={validate} force={force}/>
                        <FormField name='email' type="email" label='Эл. адрес заявителя' defaultValue={data.club.email} validate={validate} force={force}/>
                    </FormGroup>
                </Card>
<<<<<<< HEAD
                <div className="documents-page__title-wrap">
                    <h3 className="documents-page__title">Заявители</h3>
=======
                <div className="docs-page__title-wrap">
                    <h3 className="docs-page__title">Заводчики</h3>
>>>>>>> e0901a5... [+] update form
                </div>
                <Card>
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
                    <hr/>
                    <div className="flex-row">
                        <PlusButton title="Добавить еще заводчика" onClick={plusClick} />
                    </div>
                </Card>
                <Card>
                    <FormGroup>
                        <p><b>Приложите квитанцию об оплате {docItems.length} заявок по тарифу %наименование федерации% и заполните информацию о платеже.</b></p>
                        <FormField name='payment_document' label='Квитанция об оплате' type="file" accept="application/pdf" validate={validate} force={force} />
                        <FormField name='payment_date' label='Дата оплаты' type="date" validate={validate} force={force}/>
                        <FormField name='payment_number' label='Номер платежного документа' validate={validate} force={force}/>
                        <FormField name='payment_name' label='ФИО плательщика / юр. лица' defaultValue={data.club.email} validate={validate} force={force}/>
                    </FormGroup>
                </Card>
                <div className="flex-row">
                    <Button className="btn-green" onClick={submit}>Сохранить</Button>
                    <Link to="/docs"><Button className="btn-transparent">Закрыть</Button></Link>
                </div>
            </Form>
        </div>
    </div>
};

export default DocApply;
