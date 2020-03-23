import React from "react";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import Card from 'components/Card';
import data from "../../dummy.json";

const DocHome = () => {
    return <div className="docs-page__info">
        <aside className="docs-page__left">
            <CustomMenu title="Личный кабинет">
                <img src={data.club.avatar} alt="" />
                <Link to="/reports" title="Отчеты">Отчеты</Link>
                <Link to="/docs" title="Оформление документов">Оформление документов</Link>
            </CustomMenu>
        </aside>
        <div className="docs-page__right">
            <div className="docs-page__title-wrap">
                <h4 className="docs-page__title">{`Добро пожаловать в личный кабинет клуба ${data.club.display_name}`}</h4>
            </div>
            <Card className="docs-page__card">
                <h3>ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <hr />
                <div className="docs-page__card-links">
                    <Link to="/docs/apply-litter">Подать заявление</Link>
                    <Link to="/docs/apply-litter">Проверить статус документа</Link>
                </div>
            </Card>
            <Card className="docs-page__card">
                <h3>ОФОРМЛЕНИЕ РОДОСЛОВНОЙ</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <hr />
                <div className="docs-page__card-links">
                    <Link to="/docs/apply-pedigree">Подать заявление</Link>
                    <Link to="/docs/apply-pedigree">Проверить статус документа</Link>
                </div>
            </Card>
        </div>
    </div>
};

export default DocHome;