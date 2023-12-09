import React, {memo, useState} from "react";
import "./index.scss";


const PriceFilter = ({price_from, price_to, onChange}) => {
    const [priceFrom, setPriceFrom] = useState(price_from);
    const [priceTo, setPriceTo] = useState(price_to);

    const handleChange = (e, type) => {
        const value = e.target.value.replace(/\D/g, '');

        type === 'priceFrom' ? setPriceFrom(value) : setPriceTo(value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        onChange({price_from: priceFrom, price_to: priceTo});
    };

    return (
        <div className="price-filter">
            <h5 className="price-filter__title">Цена</h5>
            <form className="price-filter__form" onSubmit={handleSubmit}>
                <div className="price-filter__form-field">
                    <label className="price-filter__form-label">Цена от</label>
                    <input
                        className="price-filter__form-input"
                        type="text"
                        value={priceFrom}
                        onChange={e => handleChange(e, 'priceFrom')}
                    />
                </div>
                <div className="price-filter__form-field">
                    <label className="price-filter__form-label">Цена до</label>
                    <input
                        className="price-filter__form-input"
                        type="text"
                        value={priceTo}
                        onChange={e => handleChange(e, 'priceTo')}
                    />
                </div>
                <button className="price-filter__form-submit" type="submit">
                    <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7106 11.0006H12.5006L16.7406 15.2606C17.1506 15.6706 17.1506 16.3406 16.7406 16.7506C16.3306 17.1606 15.6606 17.1606 15.2506 16.7506L11.0006 12.5006V11.7106L10.7306 11.4306C9.33063 12.6306 7.42063 13.2506 5.39063 12.9106C2.61063 12.4406 0.390626 10.1206 0.0506256 7.32063C-0.469374 3.09063 3.09063 -0.469374 7.32063 0.0506256C10.1206 0.390626 12.4406 2.61063 12.9106 5.39063C13.2506 7.42063 12.6306 9.33063 11.4306 10.7306L11.7106 11.0006ZM2.00063 6.50063C2.00063 8.99063 4.01063 11.0006 6.50063 11.0006C8.99063 11.0006 11.0006 8.99063 11.0006 6.50063C11.0006 4.01063 8.99063 2.00063 6.50063 2.00063C4.01063 2.00063 2.00063 4.01063 2.00063 6.50063Z" />
                    </svg>
                </button>
            </form>
        </div>
    )
};

export default memo(PriceFilter);