import React from "react";
import Card from "../../../../components/Card";
import "./index.scss";


const PageNotFound = () => (
    <Card className="not-found">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
    </Card>
);

export default React.memo(PageNotFound);