import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import CheckStatus from "../Club/components/CheckStatus";
import Card from "../../components/Card";
import "./style.scss";


const BaseSearch = () => {
    return (
        <Layout>
            <div className="base-search__wrap">
                <Container className="base-search content">

                    <CheckStatus isBaseSearch />

                    <Card className="base-search__card">
                        <h3>Регистрационные данные собаки</h3>
                        <p>В целях получения информации о факте регистрации помета в РКФ, наличии у собаки родословной или возможности ее получения введите код и номер клейма и нажмите кнопку "Поиск". Вся необходимая информация будет отображена ниже. Просим Вас использовать данную форму перед отправкой заявки на изготовление документов</p>
                        <div className="base-search__form">

                        </div>
                        <p>Данный помет зарегистрирован в РКФ, на собаку может быть оформлена родословная</p>
                        <p>На собаку с введенным клеймом зарегистрирована родословная</p>
                        <p>Данный помет не зарегистрирован в РКФ. Для уточнения деталей обратитесь в клуб, выпустивший метрику щенка</p>
                    </Card>

                    <Card className="base-search__card">
                        <h3>Информация о найденных собаках</h3>
                        <p>Если Вами была найдена собака, на теле которой проставлено клеймо - введите его код и номер в поля на данной карточке и нажмите кнопку "Поиск". В случае если данные клейма содержатся в Базе РКФ, Вам будет показан клуб, зарегистрировавший собаку, в который Вы можете обратиться для уточнения любой интересующей Вас информации.</p>
                        <div className="base-search__form">

                        </div>
                        <p>Данная собака зарегистрирована в РКФ</p>
                    </Card>

                    <div className="base-search__copy-wrap">
                        <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                        <p>Политика обработки персональных данных</p>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default React.memo(BaseSearch);