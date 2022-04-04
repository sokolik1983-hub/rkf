import React from "react";
import {scroller} from "react-scroll"
import Card from "../../../../components/Card";
import {SvgSelector, sections} from "./config.js";

import "./style.scss"


const LeftMenu = ({
    activeSection,
    setActiveSection,
    setShowFilters,
}) => {
    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        setShowFilters({isOpenFilters: false});
    };

    const scrollTo = (targetId) => {
        scroller.scrollTo(targetId,{
            offset: -76,
            duration: 600,
            smooth: 'easeInOutQuart',
        });
    };


    return (
        <Card className="left-menu">
            <h3 className="left-menu__title">Сервисы</h3>
            <ul className="left-menu__inner-list">
                {Object.keys(sections).map((type, key) =>
                    <div className={sections[type].id === activeSection
                        ? 'left-menu__inner-item active'
                        : 'left-menu__inner-item'}
                         key={key}
                         onClick={() => {activeSection !== sections[type].id &&
                         handleSectionSwitch(sections[type].id);
                             scrollTo(sections[type].to)}}
                    >
                        <SvgSelector icon={sections[type].icon} />
                        <li>{sections[type].name}</li>
                    </div>
                )}
            </ul>
        </Card>
    );
};

export default LeftMenu;
