import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Dropdown from 'components/Dropdown';
import { DropDownItem } from 'components/DropDownItem';
import Alert from "components/Alert";
import './index.scss';


const FloatingMenu = ({ alias, name, presidium }) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setShowAlert(true);
    };

    return <div className="FloatingMenu__wrap">
        <Dropdown
            className="FloatingMenu"
            position="dropup"
            closeOnClick={true}
            innerComponent={
                <div className="FloatingMenu__icon">
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            }
        >
            <DropDownItem>
                <Link to={`/exhibitions?Alias=${alias}`} className="FloatingMenu__link" title="Мероприятия">Мероприятия</Link>
            </DropDownItem>
            {presidium &&
                <DropDownItem>
                    <Link to="/" onClick={handleClick} className="FloatingMenu__link" title="Президиум">Президиум</Link>
                </DropDownItem>
            }
            <DropDownItem>
                <Link to="/" onClick={handleClick} className="FloatingMenu__link" title="Новости">Новости</Link>
            </DropDownItem>
            {alias !== 'rkf' &&
                <DropDownItem>
                    <Link to="/" onClick={handleClick} className="FloatingMenu__link" title="Клейма">Клейма</Link>
                </DropDownItem>
            }
            <DropDownItem>
                <Link to={`/${alias}`} className="FloatingMenu__link" title={name}>{name}</Link>
            </DropDownItem>
        </Dropdown>
        {showAlert &&
            <Alert
                title="Внимание!"
                text="Раздел находится в разработке."
                autoclose={1.5}
                onOk={() => setShowAlert(false)}
            />
        }
    </div>
};

export default FloatingMenu;
