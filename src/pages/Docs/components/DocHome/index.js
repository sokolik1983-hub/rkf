import React from "react";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import Card from 'components/Card';

const DocHome = ({ clubAlias }) => {

    return <div className="documents-page__info">
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <hr />
                <div className="Card__links">
                    <Link to={`/${clubAlias}/documents/apply-litter`}>Подать заявление</Link>
                    <Link to={`/${clubAlias}/documents/apply-litter`}> Проверить статус документа</Link>
                </div>
            </Card>
            <Card>
                <h3>ОФОРМЛЕНИЕ РОДОСЛОВНОЙ</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <hr />
                <div className="Card__links">
                    <Link to={`/${clubAlias}/documents/apply-pedigree`}>Подать заявление</Link>
                    <Link to={`/${clubAlias}/documents/apply-pedigree`}> Проверить статус документа</Link>
                </div>
            </Card>
        </div>
    </div>
};

export default DocHome;