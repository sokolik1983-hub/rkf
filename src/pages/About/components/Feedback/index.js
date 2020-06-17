import React from "react";
import Card from "../../../../components/Card";
import Feedback from "../../../../components/Feedback";
import "./index.scss";


const FeedbackComponent = () => (
    <Card className="feedback-component">
        <h4 className="feedback-component__title">Центр поддержки</h4>
        <p className="feedback-component__description">
            Вы также можете задать вопрос или оставить свои пожелания, заполнив форму
        </p>
        <Feedback className="feedback-component__button" title="Написать обращение"/>
    </Card>
);

export default React.memo(FeedbackComponent);