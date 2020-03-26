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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <hr />
                <div className="Card__links">
                    <Link to={`/${clubAlias}/documents/apply-litter`} onClick={e => e.preventDefault()} style={{opacity: .5, textDecoration: 'none'}}>Подать заявление</Link>
                    <Link to={`/${clubAlias}/documents/litter/status`} onClick={e => e.preventDefault()} style={{opacity: .5, textDecoration: 'none'}}> Проверить статус документа</Link>
                </div>
            </Card>
            <Card>
                <h3>ОФОРМЛЕНИЕ РОДОСЛОВНОЙ</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <hr />
                <div className="Card__links">
                    <Link to={`/${clubAlias}/documents/apply-pedigree`} onClick={e => e.preventDefault()} style={{opacity: .5, textDecoration: 'none'}}>Подать заявление</Link>
                    <Link to={`/${clubAlias}/documents/pedigree/status`} onClick={e => e.preventDefault()} style={{opacity: .5, textDecoration: 'none'}}> Проверить статус документа</Link>
                </div>
            </Card>
        </div>
    </div>
);

export default React.memo(DocHome);