import React from "react";
import StickyBox from "react-sticky-box";
import Card from "../../../../components/Card";
import {SvgSelector, sections} from "./config.js";

import "./style.scss"


const LeftMenu = ({
    activeSection,
    className,
    isOpenFilters,
    setActiveSection,
    setShowFilters,
}) => {
    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        setShowFilters({isOpenFilters: false});
    };



    return (
        <div className={`left-menu__inner-right${isOpenFilters && ` _open`} ${className === "hide" && ` hide`}`}>
            <StickyBox offsetTop={60}>
                <Card className="left-menu">
                    <h3 className="left-menu__title">Сервисы</h3>
                    <ul className="left-menu__inner-list">
                        {Object.keys(sections).map((type, key) =>
                            <div
                                className={sections[type].id === activeSection
                                    ? "left-menu__inner-item active"
                                    : "left-menu__inner-item"}
                                key={key}
                                onClick={() => activeSection !== sections[type].id &&
                                    handleSectionSwitch(sections[type].id)}
                            >
                                <SvgSelector icon={sections[type].icon} />
                                <li>{sections[type].name}</li>
                            </div>
                        )}
                    </ul>
                </Card>
            </StickyBox>
        </div>
    );
};

export default LeftMenu;
