import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const PaymentFormFilter = ({payment_form_ids = [], onChange}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = id => {
        const paymentFormIds = payment_form_ids.includes(id) ? payment_form_ids.filter(item => item !== id) : [...payment_form_ids, id];
        onChange(paymentFormIds);
    };

    return (
        <Card className="payment-form-filter">
            <div className="payment-form-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="payment-form-filter__title">Форма</h5>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <ul className="payment-form-filter__list">
                    <li>
                        <CustomCheckbox
                            id="payment-form-filter-1"
                            label="Платная"
                            checked={payment_form_ids.includes(2)}
                            onChange={() => handleChange(2)}
                        />
                    </li>
                    <li>
                        <CustomCheckbox
                            id="payment-form-filter-2"
                            label="Бесплатная"
                            checked={payment_form_ids.includes(1)}
                            onChange={() => handleChange(1)}
                        />
                    </li>
                </ul>
            </CSSTransition>
        </Card>
    )
};

export default memo(PaymentFormFilter);