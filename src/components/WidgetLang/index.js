import React, {PureComponent} from 'react'
import './index.scss'

const Lang = ({currentLang, children, langCode, onClick}) => {
    const handleClick = () => {
        onClick(langCode)
    };
    const isActive = () => (currentLang === langCode);
    return <div
        onClick={handleClick}
        className={`lang-widget__lang${isActive() ? ' lang-widget__lang--active' : ''}`}
    >
        {children}
    </div>;
};

export default class WidgetLang extends PureComponent {
    state = {
        currentLang: 'ru',
    };

    render() {
        const {currentLang} = this.state;
        return (

            <div className="lang-widget">
                <Lang currentLang={currentLang} langCode="ru">Рус</Lang>
                <span>&nbsp;/&nbsp;</span>
                <Lang currentLang={currentLang} langCode="en">Eng</Lang>
            </div>
        )
    }
}