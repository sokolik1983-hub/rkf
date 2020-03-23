import React, { useState } from "react";
import { object, array, string } from "yup";
import Card from "components/Card";
import Button from "components/Button";
import { Form, FormGroup, FormField } from "components/Form";
import DocItem from "../DocItem";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import data from "../../dummy.json";

const apiEndpoint = '/api/clubs/ClubFederationDocumentsRequest';

const DocApply = ({ clubAlias }) => {
    const [docItems, setDocItems] = useState([{}]);
    const plusClick = e => setDocItems(docItems.concat({}));
    const clearClick = e => setDocItems([{}]);

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
            <Form onSuccess={x => x} action='POST'>
                <Card>
                    <FormGroup>
                        <FormField name='club_email' label='Email клуба' value={data.club.email} />
                        <FormField name='club_bill' label='Квитанция' type="file" />
                        <i>квитанция об оплате суммарного взноса за оформление пакета документов</i>
                    </FormGroup>
                </Card>
                <div className="documents-page__title-wrap">
                    <h3 className="documents-page__title">Заявители</h3>
                </div>
                {docItems.map((m, i) => <DocItem key={i} {...m} i={i} />)}
                <div className="flex-row">
                    <Button className="btn-primary" onClick={plusClick}>+ Добавить еще заявителя</Button>
                    <Button className="btn-transparent" onClick={clearClick}>Очистить форму</Button>
                    <Button className="btn-green" onClick={x => console.log('click')}>Отправить</Button>
                </div>
            </Form>
        </div>
    </div>
};

export default DocApply;
