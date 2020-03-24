import React, { useState } from "react";
import Card from "components/Card";
import Button from "components/Button";
import { Form, FormGroup, FormField, required, email } from "../../components/Form";
import DocItem from "../DocItem";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import data from "../../dummy.json";

const apiEndpoint = '/api/clubs/requests/PedigreeRequest';

const DocApply = ({ clubAlias }) => {
    const [docItems, setDocItems] = useState([0]);
    const [force, setForce] = useState(false);
    const [formValid, setFormValid] = useState({});
    const [n, setN] = useState(1);
    const plusClick = e => {
        setDocItems(docItems.concat(n));
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
        .then(response => console.log(response))
    }
    const deleteItem = i => {
        docItems.splice(i,1);
        setDocItems(docItems.concat([]));
    }
>>>>>>> bc6039e... [+] reenable item delition

    return <div className="documents-page__info">
        <aside className="documents-page__left">
            <CustomMenu title="Личный кабинет">
                <Link to={`/${clubAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                <Link to="/reports" title="Отчеты">Отчеты</Link>
                <Link to={`/${clubAlias}`} title="Страница клуба">Страница клуба</Link>
            </CustomMenu>
        </aside>
        <div className="documents-page__right">
            <div className="documents-page__title-wrap">
                <h2 className="documents-page__title">Отправка документов</h2>
            </div>
            {/*
                Это материал для страницы со списком документов
                {data.docs.map((d,i) => <DocEntry key={i} {...d}/>)}
                                */}
            <Form>
                <Card>
                    <FormGroup>
                        <FormField name='email' label='Email клуба' defaultValue={data.club.email} validate={validate} force={force}/>
                        <FormField name='payment_document' label='Квитанция' type="file" validate={validate} force={force} />
                        <i>квитанция об оплате суммарного взноса за оформление пакета документов</i>
                    </FormGroup>
                </Card>
                <div className="documents-page__title-wrap">
                    <h3 className="documents-page__title">Заявители</h3>
                </div>
                {docItems.map((m, i) => <DocItem key={m} validate={validate} closeClick={() => deleteItem(i)} i={i} force={force} />)}
                <div className="flex-row">
                    <Button className="btn-primary" onClick={plusClick}>+ Добавить еще заявителя</Button>
                    <Button className="btn-transparent" onClick={clearClick}>Очистить форму</Button>
                    <Button className="btn-green" onClick={submit}>Отправить</Button>
                </div>
            </Form>
        </div>
    </div>
};

export default DocApply;
