import React from "react";
import Card from "../../../../components/Card";
import "./index.scss";


const FeedbackComponent = () => {
    const handleClick = () => {
        console.log('click on button');
    };

    return (
        <Card className="feedback-component">
            <p className="feedback-component__description">
                Вы также можете задать вопрос или оставить свои пожелания, заполнив форму
            </p>
            <button className="feedback-component__button btn__transparent" onClick={handleClick}>
                Заполнить форму
            </button>
        </Card>
    )
};

export default React.memo(FeedbackComponent);