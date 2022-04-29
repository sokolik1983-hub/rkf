import React, {memo, useMemo, useState} from "react";
import SwipeTabs from "../../../../SwipeTabs";
import ClubRegistration from "./components/ClubRegistration";
import KennelRegistration from "./components/KennelRegistration";
import IndividualRegistration from "./components/IndividualRegistration";
import "./index.scss";


const RegistrationForm = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = useMemo(() => [
        {title: 'Физическое лицо', value: 0},
        {title: 'Питомник', value: 1},
        {title: 'Клуб', value: 2}
    ], []);

    return (
        <div className="registration-form">
            <SwipeTabs
                items={tabs}
                activeTabIndex={activeTab}
                onChange={({value}) => setActiveTab(value)}
            />
            {activeTab === 0 && <IndividualRegistration/>}
            {activeTab === 1 && <KennelRegistration/>}
            {activeTab === 2 && <ClubRegistration/>}
        </div>
    )
};

export default memo(RegistrationForm);