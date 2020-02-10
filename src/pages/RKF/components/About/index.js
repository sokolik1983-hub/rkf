import React from "react";
import Card from "../../../../components/Card";
import "./index.scss";


const AboutComponent = () => (
    <Card className="rkf-page__description">
        <h4>Описание</h4>
        <p>Российская кинологическая федерация (РКФ) является общественным объединением
            кинологических организаций. Учреждена в 1991 году. На сегодняшний день РКФ является
            самой крупной кинологической организацией в России. В племенной книге РКФ
            зарегистрировано порядка 5,5 миллионов собак, 1427 кинологических клубов, около
            22358 питомников из всех регионов страны.</p>
        <p>Сайт клуба: <a href="http://rkf.org.ru">http://rkf.org.ru</a></p>
    </Card>
);

export default React.memo(AboutComponent);