import React, { useState } from 'react';
import Card from 'components/Card';
import Alert from 'components/Alert';
import "./index.scss";


const Support = () => {
    const [showAlert, setShowAlert] = useState(false);
    const handleClick = e => {
        e.preventDefault();
        setShowAlert(true);
    }

    const handleClose = e => setShowAlert(false);

    return <Card className="about-page__contacts contacts">
        {showAlert && <Alert
            title="Внимание!"
            text="Ресурс находится в разработке."
            autoclose={1.5}
            onOk={handleClose}
        />}
        <h4 className="contacts__title">Поддержка</h4>
        <div className="contacts__block _wiki">
            <p>
                <span className="contacts__block-title">
                    <a href="http://support.rkf.online/" target="_blank" rel="noopener noreferrer">База знаний</a>
                </span>
            </p>
        </div>
        <div className="contacts__block _help">
            <p>
                <span className="contacts__block-title">
                    <a href="/" className="contacts__link--disabled" onClick={handleClick}>Воросы и ответы</a>
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
    </Card>
};

export default React.memo(Support);