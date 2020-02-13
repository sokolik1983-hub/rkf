import React from "react";
import "./index.scss";


const Advantages = () => (
    <div className="advantages-component">
        <h2 className="advantages-component__title">Полностью онлайн. Всегда рядом</h2>
        <ul className="advantages-component__list">
            <li className="advantages-component__item">
                <div className="advantages-component__item-content">
                    <h4 className="advantages-component__item-title">1е преимущество</h4>
                    <p className="advantages-component__item-subtitle">
                        Совершайте операции онлайн без посещения отделения РК.
                    </p>
                </div>
            </li>
            <li className="advantages-component__item">
                <div className="advantages-component__item-content">
                    <h4 className="advantages-component__item-title">2е преимущество</h4>
                    <p className="advantages-component__item-subtitle">
                        Это не только портал услуг, но и социальная сеть для всех любителей собак.
                    </p>
                </div>
            </li>
            <li className="advantages-component__item">
                <div className="advantages-component__item-content">
                    <h4 className="advantages-component__item-title">3е преимущество</h4>
                    <p className="advantages-component__item-subtitle">
                        Коммерческий успех подтверждается профильными наградами и финансовыми.
                    </p>
                </div>
            </li>
        </ul>
    </div>
);

export default React.memo(Advantages);