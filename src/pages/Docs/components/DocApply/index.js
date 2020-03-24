import React, { useState } from "react";
import { object, array, string } from "yup";
import Card from "components/Card";
import Button from "components/Button";
import { Form, FormGroup, FormField } from "../../components/Form";
import DocItem from "../DocItem";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import data from "../../dummy.json";

const apiEndpoint = '/api/clubs/ClubFederationDocumentsRequest';

const DocApply = ({ clubAlias }) => {
    const [docItems, setDocItems] = useState([{}]);
    const plusClick = e => setDocItems(docItems.concat({}));
    const clearClick = e => setDocItems([{}]);

    const [docItems, setDocItems] = useState([0]);
    const [formData, setFormData] = useState({declarants:[], email: data.club.email});
    const [n, setN] = useState(1);
    const plusClick = e => {
        setDocItems(docItems.concat(n));
        setN(n + 1);
    }
    const clearClick = e => {
        update({declarants: []});
        setDocItems([]);
    }
    const update = patch => setFormData({...formData, ...patch});
    const updateDeclarants = (i, p) => {
        let {declarants} = formData;
        declarants[i] = {...(declarants[i]), ...p};
        update({declarants});
    }
    const updateSelf = ({target}) => {
        let {name, value} = target;
        update({[name]: value});
    }
    const validate = () => console.log(validationSchema.validateSync(formData));
    const submit = () => {
        let fd = new FormData(document.getElementsByTagName('form')[0]);
        console.log(formData);
        fetch(apiEndpoint, {method: 'POST', body: fd});
    }
    const deleteItem = i => {
        docItems.splice(i,1);
        formData.declarants.splice(i,1);
        setDocItems(docItems.concat([]));
        setFormData({...formData});
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
                        <FormField name='email' label='Email клуба' defaultValue={formData.email} onChange={updateSelf} onBlur={validate}/>
                        <FormField name='payment_document' label='Квитанция' type="file" onChange={updateSelf} onBlur={validate} />
                        <i>квитанция об оплате суммарного взноса за оформление пакета документов</i>
                    </FormGroup>
                </Card>
                <div className="documents-page__title-wrap">
                    <h3 className="documents-page__title">Заявители</h3>
                </div>
                {docItems.map((m, i) => <DocItem key={m} onChange={p => updateDeclarants(i,p)} onBlur={validate} closeClick={() => deleteItem(i)} i={i} />)}
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
