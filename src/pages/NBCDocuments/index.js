import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import StickyBox from "react-sticky-box";
import ls from "local-storage";
import Card from "../../components/Card";
import Container from "../../components/Layouts/Container";
import TopComponent from "../../components/TopComponent";
import Banner from "../../components/Banner";
import Layout from "../../components/Layouts";
import CopyrightInfo from "../../components/CopyrightInfo";
import MenuComponentNew from "../../components/MenuComponentNew";
import { LoadableNotFound } from "../../appModules";
import useIsMobile from "../../utils/useIsMobile";
import CardMessage from "../../components/CardMessage";

import "./styles.scss";


const ExhibitionsCards = ({ alias }) => {
    return <div className="documents-page__right">
        <Card>
            <div className="documents-page__icon exhibitions-icon" />
            <h3>ПРИГЛАШЕНИЯ СУДЕЙ НА МЕРОПРИЯТИЯ</h3>
            <p>
                В данном разделе НКП предоставлена возможность согласовать судей на мероприятия, после согласования их списка со стороны клуба, который проводит выставку
            </p>
            <hr />
            <div className="Card__links">
                <Link to={`/nbc/${alias}/documents/exhibitions/invite/registry`}>Реестр заявок</Link>
            </div>
        </Card>
    </div>
};

const NBCDocuments = () => {
    const { alias, name, logo_link } = ls.get('user_info') || {};
    const isMobile = useIsMobile(1080);

    return <Layout>
        <div className="documents-page content">
            <Container className="documents-page__content">
                <TopComponent
                    logo={logo_link}
                    name={name}
                    canEdit={false}
                    withShare={false}
                    userType ={7}
                />
                <div className="documents-page__info">
                    <aside className="documents-page__left">
                        <StickyBox offsetTop={60}>
                            {!isMobile && <MenuComponentNew />}
                            {!isMobile && <Banner type={8} />}
                            <CopyrightInfo withSocials={true} />
                        </StickyBox>
                    </aside>
                    <main className="documents-page__right">
                        <CardMessage>
                            <h3>Уважаемые пользователи портала RKF.ONLINE!</h3>
                            <p>Ввиду того, что некоторые посетители офиса РКФ регулярно пропускают время своей записи,
                                не отменив ее и не освободив тем самым «окно» для других желающих, мы вынуждены ввести
                                ограничительные меры. Если в течение 30 календарных дней вы трижды пропустили запись
                                на посещение офиса РКФ и не отменили ее в личном кабинете, на следующие 30 дней
                                возможность зарегистрироваться на прием будет для вас ограничена.
                                Просим своевременно отменять запись в случае невозможности ею воспользоваться!</p>
                        </CardMessage>
                        <Switch>
                            <Route
                                exact={true}
                                path='/nbc/:route/documents/'
                                component={() => <ExhibitionsCards alias={alias}/>}
                            />
                            <Route component={LoadableNotFound} />
                        </Switch>
                    </main>
                </div>
            </Container>
        </div>
    </Layout>;
};

export default NBCDocuments;