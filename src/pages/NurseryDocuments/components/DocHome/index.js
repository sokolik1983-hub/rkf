import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import StickyBox from "react-sticky-box";
import Card from "../../../../components/Card";
import BookformCard from "../../../../components/BookformCard";
import { LoadableNotFound } from "../../../../appModules";
import Alert from "../../../../components/Alert";
import UserMenu from "../../../../components/Layouts/UserMenu";
import { Request } from "../../../../utils/request";
import { kennelNav } from "../../config";
import Loading from "../../../../components/Loading";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import "./styles.scss";


//method statuses
const _pedigree = 11;
const _litter = 12;
const _replacePedigreeExportOld = 13;
// const _replacePedigreeOld = 14;
// const _replacePedigreeChangeOwner = 15;
// const _replacePedigreeRkfFc1 = 16;
// const _replacePedigreeDuplicate = 17;
// const _replacePedigreeForeignRegistration = 18;
// const _replacePedigreeDeclarantError = 19;
// const _dogHealthCheckDysplasia = 20;
// const _dogHealthCheckPatella = 21;
// const _getRKFDocument = 22;
const _checkMembership = 23;

//temporarily hidden
//
// const replacePedigreeOld = authorizedAccess.includes(_replacePedigreeOld);
// const replacePedigreeChangeOwner = authorizedAccess.includes(_replacePedigreeChangeOwner);
// const replacePedigreeRkfFc1 = authorizedAccess.includes(_replacePedigreeRkfFc1);
// const replacePedigreeDuplicate = authorizedAccess.includes(_replacePedigreeDuplicate);
// const replacePedigreeForeignRegistration = authorizedAccess.includes(_replacePedigreeForeignRegistration);
// const replacePedigreeDeclarantError = authorizedAccess.includes(_replacePedigreeDeclarantError);
// const dogHealthCheckDysplasia = authorizedAccess.includes(_dogHealthCheckDysplasia);
// const dogHealthCheckPatella = authorizedAccess.includes(_dogHealthCheckPatella);
// const getRKFDocument = authorizedAccess.includes(_getRKFDocument);

const DocumentCards = ({ nurseryAlias, authorizedAccess }) => {
    const [alert, seAlert] = useState(false);
    const pedigree = authorizedAccess.includes(_pedigree);
    const litter = authorizedAccess.includes(_litter);
    const replacePedigreeExportOld = authorizedAccess.includes(_replacePedigreeExportOld);
    const hasAccess = pedigree && litter && replacePedigreeExportOld;

    return <div className="documents-page__right">
    {!hasAccess && <Card className="documents-page__alert-card">
            <h3>УВАЖАЕМЫЙ ПОЛЬЗОВАТЕЛЬ!</h3>
            <p style={{padding: 0, textAlign: 'center'}}>Для продолжения работы с личным кабинетов Вам необходимо подтвердить членство Вашей организации. Для этого Вам необходимо перейти в раздел "Организационная информация" вашего личного кабинета
                и подать заявку на подтверждение членства.</p>
        </Card>}
        <Card className={litter ? `` : `_inactive`}>
            <div className="documents-page__icon litter-icon" />
            <h3>ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА</h3>
            <p>
                В соответствии с требованиями РКФ, с заявлением на регистрацию помета так же принимаются:
                акт вязки, акт обследования помета, копии свидетельств о происхождении производителей,
                копии сертификатов всех титулов и рабочих испытаний, заключения по дисплазии, и однократно -
                оригинал диплома с сертификатной выставки РКФ, копию Свидетельства о регистрации заводской приставки FCI.
            </p>
            <div className="documents-page__support-links">
                <p>
                    <a href="https://help.rkf.online/ru/knowledge_base/art/4/cat/3/#/" target="_blank" rel="noopener noreferrer">Инструкция по подаче заявления на регистрацию помета</a>
                </p>
                <p>
                    <a href="https://help.rkf.online/ru/knowledge_base/article/81/category/3/#/" target="_blank" rel="noopener noreferrer">Видео-инструкция по подаче заявления на регистрацию помета</a>
                </p>
            </div>
            <hr />
            <div className="Card__links">
                <Link to={`/kennel/${nurseryAlias}/documents/litter/form`}>Подать заявление</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/litter/status`}> Проверить статус документа</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/litter/requests`}> Реестр заявок</Link>
            </div>
        </Card>
        <Card className={pedigree ? `` : `_inactive`}>
            <div className="documents-page__icon pedigree-icon" />
            <h3>ОФОРМЛЕНИЕ РОДОСЛОВНОЙ</h3>
            <p>
                Метрика щенка не дает право на племенное использование собаки и подлежит обязательному обмену на
                свидетельство о происхождении (родословную) РКФ до достижения собакой возраста 15 месяцев.
            </p>
            <div className="documents-page__support-links">
                <p>
                    <a href="https://help.rkf.online/ru/knowledge_base/art/37/cat/3/#/" target="_blank" rel="noopener noreferrer">Инструкция по подаче родословной</a>
                </p>
                <p>
                    <a href="https://help.rkf.online/ru/knowledge_base/art/68/cat/3/#/" target="_blank" rel="noopener noreferrer">Видео-инструкция по подаче родословной</a>
                </p>
            </div>
            <hr />
            <div className="Card__links">
                <Link to={`/kennel/${nurseryAlias}/documents/pedigree/form`}>Подать заявление</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/pedigree/status`}> Проверить статус документа</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/pedigree/requests`}> Реестр заявок</Link>
            </div>
        </Card>
        <Card className={litter ? `` : `_inactive`}>
            <div className="documents-page__icon puppy-icon" />
            <h3>МЕТРИКА ЩЕНКА</h3>
            <p>Метрика щенка автоматически формируется на основании данных, указанных при регистрации помета. Формирование документа на основании данных, предоставленных другой кинологической организацией может быть реализован посредством ввода кода клейма собаки. ФИО владельца собаки могут быть указаны заявителем в разделе редактирования метрики щенка.</p>
            <hr />
            <div className="Card__links">
                {/* <Link to={`/kennel/${nurseryAlias}/documents/puppy/metrics`}>Реестр метрик</Link> */}
                <span style={{ color: '#72839c', fontWeight: '600' }}>Реестр метрик</span>
            </div>
        </Card>
        <Card className={replacePedigreeExportOld ? `` : `_inactive`}>
            <div className="documents-page__icon replace-pedigree-icon" />
            <h3>ЗАМЕНА РОДОСЛОВНОЙ</h3>
            <p>Обмен родословной возможен при наличии у заявителя внутренней или экспортной родословной РКФ старого образца или свидетельства о регистрации, выданного зарубежной кинологической организацией. Кроме того, при подаче соответствующего заявления может быть осуществлена выдача дубликата родословной или замена владельца в документе.</p>
            <hr />
            <div className="Card__link-columns">
                <div>
                    <Link to={`/kennel/${nurseryAlias}/documents/replace-pedigree/2/form`} >По внутренней родословной старого образца</Link>
                    <Link to={`/kennel/${nurseryAlias}/documents/replace-pedigree/1/form`} >По экспортной родословной старого образца</Link>
                    <Link to={`/kennel/${nurseryAlias}/documents/replace-pedigree/4/form`} >По заявлению при смене владельца</Link>
                    <Link to={`/kennel/${nurseryAlias}/documents/replace-pedigree/7/form`} >Замена родословной по ошибке заявителя</Link>
                </div>
                <div>
                    <Link to={`/kennel/${nurseryAlias}/documents/replace-pedigree/5/form`} >По родословной выданной вне системы РКФ/FCI</Link>
                    <Link to={`/kennel/${nurseryAlias}/documents/replace-pedigree/3/form`} >По заявлению о выдаче дубликата</Link>
                    <Link to={`/kennel/${nurseryAlias}/documents/replace-pedigree/6/form`} >Регистрация иностранной родословной</Link>
                </div>
            </div>
            <hr />
            <div className="Card__link-columns">
                <div>
                    <Link to={`/kennel/${nurseryAlias}/documents/replace-pedigree/registry`} >Реестр заявок</Link>
                </div>
            </div>
        </Card>
        <Card>
            <div className="documents-page__icon dysplasia-icon" />
            <h3>СЕРТИФИКАТ О ПРОВЕРКЕ НА ДИСПЛАЗИЮ</h3>
            <p>Для изготовления и получения сертификата о проверке на дисплазию HD и ED необходимо подать заявку, прикрепив договор с печатью ветеринарного учреждения и подписью ветеринарного врача, а также рентгенограмму. Плановый срок изготовления сертификата составляет два месяца со дня подачи документов в РКФ. После изготовления сертификата результаты исследования автоматически вносятся в электронную базу РКФ и в дальнейшем отражаются в родословных потомков собаки.</p>
            <hr />
            <div className="Card__links">
                <div>
                    <Link to={`/kennel/${nurseryAlias}/documents/dysplasia/form`}>Подать заявление</Link>
                    <Link to={`/kennel/${nurseryAlias}/documents/dysplasia/registry`}>Реестр заявок</Link>
                </div>
            </div>
        </Card>
        <Card>
            <div className="documents-page__icon patella-icon" />
            <h3>СЕРТИФИКАТ КЛИНИЧЕСКОЙ ОЦЕНКИ КОЛЕННЫХ СУСТАВОВ (PL) (ПАТЕЛЛА)</h3>
            <p>Для оформления сертфиката клинической оценки коленных суставов необходимо обратиться к любому ветеринарному врачу РКФ, лицензированному в системе FCI в качестве специалиста, имеющего право оценки состояния коленных суставов (PL) с выдачей сертификата установленного образца.</p>
            <hr />
            <div className="Card__links">
                <div>
                    <Link to={`/kennel/${nurseryAlias}/documents/patella/form`}>Подать заявление</Link>
                    <Link to={`/kennel/${nurseryAlias}/documents/patella/registry`}>Реестр заявок</Link>
                </div>
            </div>
        </Card>
        <Card>
            <div className="documents-page__icon litter-icon" />
            <h3>ЗАЯВКА НА ПОЛУЧЕНИЕ ДОКУМЕНТОВ РКФ</h3>
            <p>В данном разделе Вы можете оформить заявки на получение следующих документов: дипломы чемпионов, дипломы победителей, племенные сертификаты, рабочие сертификаты. После изготовления диплома/сертификата данные автоматически заносятся в электронную базу РКФ.</p>
            <hr />
            <div className="Card__links">
                <div>
                    <Link to={`/kennel/${nurseryAlias}/documents/application/form`}>Подать заявление</Link>
                    <Link to={`/kennel/${nurseryAlias}/documents/application/registry`}>Реестр заявок</Link>
                </div>
            </div>
        </Card>
        {alert &&
            <Alert
                title="Внимание!"
                text="В настоящее время данный раздел в разработке и будет доступен в ближайшее время. При необходимости подачи заявок данного характера - просьба пользоваться сервисом подачи заявок по электронной почте."
                autoclose={5}
                onOk={() => seAlert(false)}
            />
        }
    </div>
};

const ResponsibleCards = ({ nurseryAlias, authorizedAccess }) => {
    const checkMembership = authorizedAccess.includes(_checkMembership);

    return <div className="documents-page__right">
        <Card>
            <div className="documents-page__icon declarants-icon" />
            <h3>ЗАЯВИТЕЛИ</h3>
            <p>
                В данном разделе могут быть добавлены ответственные лица, уполномоченные действовать от имени клуба в части оформления и отслеживания заявок на изготовление документов.
            </p>
            <hr />
            <div className="Card__links">
                <Link to={`/kennel/${nurseryAlias}/documents/responsible/form`}>Назначить ответственное лицо</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/responsible/table`}>Реестр ответственных лиц</Link>
            </div>
        </Card>
        {checkMembership && <Card>
            <div className="documents-page__icon membership-icon" />
            <h3>ПОДТВЕРЖДЕНИЕ ЧЛЕНСТВА</h3>
            <p>
                В данном разделе можно направить электронную копию племенной книги за прошедший год и предоставить квитанцию об оплате ежегодного членского взноса.
            </p>
            <hr />
            <div className="Card__links">
                <Link to={`/kennel/${nurseryAlias}/documents/responsible/checkmembership/form`}>Предоставить данные</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/responsible/checkmembership/registry`}>Реестр предоставленных документов</Link>
            </div>
        </Card>}
    </div>
};

const DocHome = ({ nurseryAlias }) => {
    const [loading, setLoading] = useState(true);
    const [authorizedAccess, setAuthorizedAccess] = useState([]);

    useEffect(() => {
        (() => Request({
            url: `/api/requests/commonrequest/request_access`
        }, data => {
            setAuthorizedAccess(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return (loading ? <Loading /> : <div className="documents-page__info">
        <aside className="documents-page__left">
            <StickyBox offsetTop={65}>
                <UserMenu userNav={kennelNav(nurseryAlias)} />
                <div className="documents-page__publication">
                    <a href="https://www.royal-canin.ru/breeders/partner/" title="Royal-Canin" target="_blank" rel="noopener noreferrer">
                        <img src="/static/images/publications/breeder-club.png" alt="" />
                    </a>
                </div>
                <CopyrightInfo withSocials={true} />
            </StickyBox>
        </aside>
        <Switch>
            <Route path='/kennel/:route/documents/responsible' component={() => <ResponsibleCards authorizedAccess={authorizedAccess} nurseryAlias={nurseryAlias} />} />
            <Route path='/kennel/:route/documents/bookform' component={() => <BookformCard distinction='bookform' url='/api/nurseries/Nursery/nursery_federation' />} />
            <Route path='/kennel/:route/documents/review' component={() => <BookformCard url='/api/nurseries/Nursery/nursery_federation' />} />
            <Route path='/kennel/:route/documents' component={() => <DocumentCards authorizedAccess={authorizedAccess} nurseryAlias={nurseryAlias} />} />
            <Route component={LoadableNotFound} />
        </Switch>
    </div>
    )
};

export default React.memo(DocHome);