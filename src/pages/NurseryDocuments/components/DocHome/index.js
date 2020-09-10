import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../../components/Card";
import CustomMenu from "../../../../components/CustomMenu";
import BookformCard from 'components/BookformCard';
import { LoadableNotFound } from "appModules";
import { Route, Switch } from "react-router-dom";
// import Registry from '../Stamps/Registry';
import Alert from 'components/Alert';
import './styles.scss';

const DocumentCards = ({ nurseryAlias }) => {
    const [alert, seAlert] = useState(false);
    // const handleClick = e => {
    //     e.preventDefault();
    //     seAlert(true);
    // };
    return <div className="documents-page__right">
        <Card>
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
        <Card>
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
        <Card>
            <div className="documents-page__icon puppy-icon" />
            <h3>МЕТРИКА ЩЕНКА</h3>
            <p>Метрика щенка автоматически формируется на основании данных, указанных при регистрации помета. Формирование документа на основании данных, предоставленных другой кинологической организацией может быть реализован посредством ввода кода клейма собаки. ФИО владельца собаки могут быть указаны заявителем в разделе редактирования метрики щенка.</p>
            <hr />
            <div className="Card__links">
                {/* <Link to={`/kennel/${nurseryAlias}/documents/puppy/metrics`}>Реестр метрик</Link> */}
                <span style={{ color: '#72839c', fontWeight: '600' }}>Реестр метрик</span>
            </div>
        </Card>
        <Card>
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
                    {/*<span style={{ color: '#72839c', fontWeight: '600', marginRight: '20px' }}>Подать заявление</span>*/}
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
                    {/*<span style={{ color: '#72839c', fontWeight: '600', marginRight: '20px' }}>Подать заявление</span>*/}
                    <Link to={`/kennel/${nurseryAlias}/documents/patella/registry`}>Реестр заявок</Link>
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

// const StampCards = ({ nurseryAlias }) => {
//     const [alert, seAlert] = useState(false);
//     const handleClick = e => {
//         e.preventDefault();
//         seAlert(true);
//     };
//     return <div className="documents-page__right">
//         <Card>
//             <div className="documents-page__icon" />
//             <h3>КЛЕЙМА</h3>
//             <p>
//                 Указанные коды клейма могут быть использованы в формах оформления заявок на изготовление документов. При указании кода клейма клуба должна быть приложена электронная копия свидетельства о регистрации кода клейма или документ его заменяющий.
//             </p>
//             <hr />
//             <div className="Card__links">
//                 <Link to={`/kennel/${nurseryAlias}/documents/stamps/add`}>Добавить клеймо</Link>
//                 <Link to={`/kennel/${nurseryAlias}/documents/stamps/registry`} onClick={handleClick}>Подать заявку на регистрацию кода клейма</Link>
//                 <Link to={`/kennel/${nurseryAlias}/documents/stamps/registry`} onClick={handleClick}>Реестр заявок</Link>
//             </div>
//             {alert &&
//                 <Alert
//                     title="Внимание!"
//                     text="Раздел находится в разработке."
//                     autoclose={1.5}
//                     onOk={() => seAlert(false)}
//                 />
//             }
//         </Card>
//         <Registry />
//     </div>
// };

const ResponsibleCards = ({ nurseryAlias }) => {
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
    </div>
};

const DocHome = ({ nurseryAlias, bookform }) => {
    const [alert, seAlert] = useState(false);
    // const handleClick = e => {
    //     e.preventDefault();
    //     seAlert(true);
    // };
    return <div className="documents-page__info">
        <aside className="documents-page__left">
            <CustomMenu title="Личный кабинет">
                <Link to={`/kennel/${nurseryAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/responsible`} title="Организационная информация">Организационная информация</Link>
                <Link to={`/base-search?alias=${nurseryAlias}`}>Поиск по базе РКФ</Link>
                {/*<Link to={`/kennel/${nurseryAlias}/documents/stamps`} title="Клейма">Клейма</Link>*/}
                {/*<Link to="/reports" title="Отчеты" onClick={handleClick}>Отчеты</Link>*/}
                <Link to={`/kennel/${nurseryAlias}/documents/bookform`}>Запись на очный прием</Link>
                <Link to={`/kennel/${nurseryAlias}/documents/review`}>Оценка работы федерации</Link>
                <Link to={`/kennel/${nurseryAlias}`} title="Страница питомника">Страница питомника</Link>
            </CustomMenu>
        </aside>
        <Switch>
            <Route path='/kennel/:route/documents/responsible' component={() => <ResponsibleCards nurseryAlias={nurseryAlias} />} />
            {/*<Route path='/kennel/:route/documents/stamps' component={() => <StampCards nurseryAlias={nurseryAlias} />} />*/}
            <Route path='/kennel/:route/documents/bookform' component={() => <BookformCard distinction='bookform' url='/api/nurseries/Nursery/nursery_federation' />} />
            <Route path='/kennel/:route/documents/review' component={() => <BookformCard url='/api/nurseries/Nursery/nursery_federation' />} />
            <Route path='/kennel/:route/documents' component={() => <DocumentCards nurseryAlias={nurseryAlias} />} />
            <Route component={LoadableNotFound} />
        </Switch>
        {alert &&
            <Alert
                title="Внимание!"
                text="Раздел находится в разработке."
                autoclose={1.5}
                onOk={() => seAlert(false)}
            />
        }
    </div>
};

export default React.memo(DocHome);
