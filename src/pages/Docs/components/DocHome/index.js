import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import CustomMenu from "../../../../components/CustomMenu";


const DocHome = ({clubAlias}) => (
    <div className="documents-page__info">
        <aside className="documents-page__left">
            <CustomMenu title="Личный кабинет">
                <Link to={`/${clubAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                <Link to="/reports" title="Отчеты">Отчеты</Link>
                <Link to={`/${clubAlias}`} title="Страница клуба">Страница клуба</Link>
            </CustomMenu>
        </aside>
        <div className="documents-page__right">
            <Card>
                <h3>ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА</h3>
                <p>В соответствии с требованиями РКФ, с заявлением на регистрацию помета так же принимаются:
                    акт вязки, акт обследования помета, копии свидетельств о происхождении производителей,
                    копии сертификатов всех титулов и рабочих испытаний, заключения по дисплазии, и однократно -
                    оригинал диплома с сертификатной выставки РКФ, копию Свидетельства о регистрации заводской приставки FCI.</p>
                <hr />
                <div className="Card__links">
                    <Link to={`/${clubAlias}/documents/apply-litter`}>Подать заявление</Link>
                    <Link to={`/${clubAlias}/documents/litter/status`}> Проверить статус документа</Link>
                </div>
            </Card>
            <Card>
                <h3>ОФОРМЛЕНИЕ РОДОСЛОВНОЙ</h3>
                <p>Метрика щенка не дает право на племенное использование собаки и подлежит обязательному обмену на
                    свидетельство о происхождении (родословную) РКФ до достижения собакой возраста 15 месяцев.</p>
                <hr />
                <div className="Card__links">
                    <Link to={`/${clubAlias}/documents/apply-pedigree`}>Подать заявление</Link>
                    <Link to={`/${clubAlias}/documents/pedigree/status`}> Проверить статус документа</Link>
                </div>
            </Card>
        </div>
    </div>
);

export default React.memo(DocHome);