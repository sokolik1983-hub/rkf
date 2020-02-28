import React from "react";
import Card from "components/Card";
import "./index.scss";


const Support = () => <Card className="about-page__contacts contacts">
    <h4 className="contacts__title">Поддержка</h4>
    <div className="contacts__block _wiki">
        <p>
            <span className="contacts__block-title">
                <a href="http://wiki.rkf.online/" target="_blank" rel="noopener noreferrer">База знаний</a>
            </span>
        </p>
    </div>
    <div className="contacts__block _help">
        <p>
            <span className="contacts__block-title">
                <a href="http://help.rkf.online/" target="_blank" rel="noopener noreferrer">Образовательный портал</a>
            </span>
        </p>
    </div>
    <div className="contacts__block _email">
        <p>
            <span className="contacts__block-title">E-mail:</span>
            <span className="contacts__block-info">
                <a href="mailto:support@rkf.online">support@rkf.online</a>
            </span>
        </p>
    </div>
</Card>;

export default React.memo(Support);