import React from "react";
import Card from "../../../../components/Card";
import "./index.scss";
import Feedback from "../../../../components/Feedback";


const FeedbackComponent = () => (
    <Card className="feedback-component">
        <p className="feedback-component__description">
            Вы также можете задать вопрос или оставить свои пожелания, заполнив форму
        </p>
        <Feedback className="feedback-component__button" title="Заполнить форму"/>
    </Card>
);

export default React.memo(FeedbackComponent);