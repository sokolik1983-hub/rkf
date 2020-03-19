import React, { useEffect, useState } from "react";
import TopComponent from "../../components/TopComponent";
import PageNotFound from "../404";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import PlusButton from "../../components/PlusButton";
import { Form, FormGroup, FormField } from "components/Form";
import DocEntry from "./components/DocEntry";
import DocItem from "./components/DocItem";
import Layout from "../../components/Layouts";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import CustomMenu from "../../components/CustomMenu";
import "../Exhibition/index.scss";
import data from "./dummy.json";

const Docs = () => {
    const loading = false;
    const isError = false;
    const [docItems, setDocItems] = useState([{}]);
    const plusClick = e => setDocItems(docItems.concat({}))
    return isError ?
        <PageNotFound /> :
        loading ?
            <Loading /> :
            <Layout>
                <div className="exhibition-page">
                    <Container className="content exhibition-page__content">
                        <TopComponent
                            logo={data.club.avatar}
                            name={data.club.display_name}
                            canEdit={true}
                        />
                        <div className="exhibition-page__info"> 
                            <aside className="exhibition-page__left">
                                <CustomMenu title="Личный кабинет">
                                    <Link to="/reports" title="Отчеты">Отчеты</Link>
                                    <Link to="/docs" title="Оформление документов">Оформление документов</Link>
                                </CustomMenu>
                            </aside>
                            <div className="exhibition-page__right">
                                <div className="exhibition-page__title-wrap">
                                    <h2 className="exhibition-page__title">Оформление документов</h2>
                                </div>
                                {data.docs.map((d,i) => <DocEntry key={i} {...d}/>)}
                                <Form onSuccess={x=>x} action='POST'>
                                    <Card className="DocItem">
                                        <h3>Оформление документа</h3>
                                            <FormGroup>
                                                <FormField name='club_email' label='Email клуба' value={data.club.email}/>
                                                <FormField name='club_bill' label='Квитанция' type="file" />
                                                <i>квитанция об оплате суммарного взноса за оформление пакета документов</i>
                                            </FormGroup>
                                    </Card>
                                    {docItems.map((m,i) => <DocItem key={i}/>)}
                                    <div className="flex-row">
                                        <PlusButton large onClick={plusClick}/>
                                        <div className="caption">
                                            Добавить еще заявителя
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default Docs
