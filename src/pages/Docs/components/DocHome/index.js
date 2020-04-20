import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../../components/Card";
import CustomMenu from "../../../../components/CustomMenu";
import { LoadableNotFound } from "appModules";
import { Route, Switch } from "react-router-dom";
import Alert from 'components/Alert';
import './styles.scss';

const DocumentCards = ({ clubAlias }) => {
    return <div className="documents-page__right">
        <Card>
            <div className="documents-page__icon" />
            <h3>ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА</h3>
            <p>
                В соответствии с требованиями РКФ, с заявлением на регистрацию помета так же принимаются:
                акт вязки, акт обследования помета, копии свидетельств о происхождении производителей,
                копии сертификатов всех титулов и рабочих испытаний, заключения по дисплазии, и однократно -
                оригинал диплома с сертификатной выставки РКФ, копию Свидетельства о регистрации заводской приставки FCI.
        </p>
            <div className="documents-page__support-links">
                <p>
                    <a href="http://support.rkf.online/%d0%b8%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f-%d0%bf%d0%be-%d0%bf%d0%be%d0%b4%d0%b0%d1%87%d0%b5-%d0%ba%d0%bb%d1%83%d0%b1%d0%be%d0%bc-%d0%b7%d0%b0%d1%8f%d0%b2%d0%be%d0%ba-%d0%bd%d0%b0/" target="_blank" rel="noopener noreferrer">Инструкция по подаче заявления на регистрацию помета</a>
                </p>
            </div>
            <hr />
            <div className="Card__links">
                <Link to={`/${clubAlias}/documents/litter/form`}>Подать заявление</Link>
                <Link to={`/${clubAlias}/documents/litter/status`}> Проверить статус документа</Link>
            </div>
        </Card>
        <Card>
            <div className="documents-page__icon" />
            <h3>ОФОРМЛЕНИЕ РОДОСЛОВНОЙ</h3>
            <p>
                Метрика щенка не дает право на племенное использование собаки и подлежит обязательному обмену на
                свидетельство о происхождении (родословную) РКФ до достижения собакой возраста 15 месяцев.
        </p>
            <div className="documents-page__support-links">
                <p>
                    <a href="http://support.rkf.online/%d0%b8%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f-%d0%bf%d0%be-%d0%be%d1%84%d0%be%d1%80%d0%bc%d0%bb%d0%b5%d0%bd%d0%b8%d1%8e-%d1%80%d0%be%d0%b4%d0%be%d1%81%d0%bb%d0%be%d0%b2%d0%bd%d0%be/" target="_blank" rel="noopener noreferrer">Инструкция по подаче родословной</a>
                </p>
                <p>
                    <a href="http://support.rkf.online/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be-%d0%b8%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f-%d0%bf%d0%be-%d0%bf%d0%be%d0%b4%d0%b0%d1%87%d0%b5-%d1%80%d0%be%d0%b4%d0%be%d1%81%d0%bb%d0%be%d0%b2%d0%bd/" target="_blank" rel="noopener noreferrer">Видео-инструкция по подаче родословной</a>
                </p>
            </div>
            <hr />
            <div className="Card__links">
                <Link to={`/${clubAlias}/documents/pedigree/form`}>Подать заявление</Link>
                <Link to={`/${clubAlias}/documents/pedigree/status`}> Проверить статус документа</Link>
            </div>
        </Card>
        <Card>
            <div className="documents-page__icon" />
            <h3>МЕТРИКА ЩЕНКА</h3>
            <p>Метрика щенка автоматически формируется на основании данных, указанных при регистрации помета. Формирование документа на основании данных, предоставленных другой кинологической организацией может быть реализован посредством ввода кода клейма собаки. ФИО владельца собаки могут быть указаны заявителем в разделе редактирования метрики щенка.</p>
            <hr />
            <div className="Card__links">
                <Link to={`/${clubAlias}/documents/puppy/metrics`}>Реестр метрик</Link>
            </div>
        </Card>
    </div>
};

const StampCards = ({ clubAlias }) => {
    const [alert, seAlert] = useState(false);
    const handleClick = e => {
        e.preventDefault();
        seAlert(true);
    };
    return <div className="documents-page__right">
        <Card>
            <div className="documents-page__icon" />
            <h3>КЛЕЙМА</h3>
            <p>
                Указанные коды клейма могут быть использованы в формах оформления заявок на изготовление документов. При указании кода клейма клуба должна быть приложена электронная копия свидетельства о регистрации кода клейма или документ его заменяющий.
            </p>
            <hr />
            <div className="Card__links">
                <Link to={`/${clubAlias}/documents/stamps/add`}>Добавить клеймо</Link>
                <Link to={`/${clubAlias}/documents/stamps/registry`} onClick={handleClick}>Реестр кодов клейм</Link>
            </div>
            {alert &&
                <Alert
                    title="Внимание!"
                    text="Раздел находится в разработке."
                    autoclose={1.5}
                    onOk={() => seAlert(false)}
                />
            }
        </Card>
    </div>
};

const DocHome = ({ clubAlias }) => (
    <div className="documents-page__info">
        <aside className="documents-page__left">
            <CustomMenu title="Личный кабинет">
                <Link to={`/${clubAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                <Link to={`/${clubAlias}/documents/stamps`} title="Клейма">Клейма</Link>
                <Link to="/reports" title="Отчеты">Отчеты</Link>
                <Link to={`/${clubAlias}`} title="Страница клуба">Страница клуба</Link>
            </CustomMenu>
        </aside>
        <Switch>
            <Route path='/:route/documents/stamps' component={() => <StampCards clubAlias={clubAlias} />} />
            <Route path='/:route/documents' component={() => <DocumentCards clubAlias={clubAlias} />} />
            <Route component={LoadableNotFound} />
        </Switch>
    </div>
);

export default React.memo(DocHome);
