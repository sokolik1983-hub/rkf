import React, {memo, useState} from "react";
import {connect} from "formik";
import StickyBox from "react-sticky-box";
import Card from "../../../../components/Card";
import MainSection from "./sections/MainSection";
import ContactsSection from "./sections/ContactsSection";
// import ContactsPage from './components/ContactsPage';
// import BankInfo from "./components/BankInfo";
import {sections} from "./config";


const RenderFields = ({formik, isOpenFilters, setShowFilters}) => {
    const [activeSection, setActiveSection] = useState(0);

    const handleSectionSwitch = id => {
        setActiveSection(id);

        if(isOpenFilters) {
            setShowFilters({isOpenFilters: false});
        }
    };

    console.log(formik.values)

    return (
        <div className="nbc-edit__inner">
            <div className="nbc-edit__inner-left">
                {activeSection === 0 &&
                    <MainSection errors={formik.errors}/>
                }
                {activeSection === 1 &&
                    <ContactsSection errors={formik.errors}/>
                }

                {/*{activeSection === 0 ? <MainPage*/}
                {/*        name={name}*/}
                {/*        alias={alias}*/}
                {/*        formik={formik}*/}
                {/*        web_site={web_site}*/}
                {/*        comment={comment}*/}
                {/*    /> :*/}
                {/*    activeSection === 1 ? <ContactsPage*/}
                {/*            formik={formik}*/}
                {/*            social_networks={social_networks}*/}
                {/*            phones={phones}*/}
                {/*            emails={emails}*/}
                {/*            // randomKeyGenerator={randomKeyGenerator}*/}
                {/*        /> :*/}
                {/*        activeSection === 2 && <BankInfo*/}
                {/*            bank_comment={bank_comment}*/}
                {/*        />*/}
                {/*}*/}
            </div>
            <div className={`nbc-edit__inner-right${isOpenFilters ? " _open" : ""}`}>
                <StickyBox offsetTop={60}>
                    <Card>
                        <span className="nbc-edit__profile-label">Профиль</span>
                        <ul className="nbc-edit__inner-list">
                            {sections.map((section, i) =>
                                <li
                                    key={i}
                                    className={`nbc-edit__inner-item${section.id === activeSection ? ' active' : ''}`}
                                    onClick={() => activeSection !== section.id && handleSectionSwitch(section.id)}
                                >
                                    {section.icon}
                                    <span>{section.name}</span>
                                </li>
                            )}
                        </ul>
                    </Card>
                </StickyBox>
            </div>
        </div>
    )
};

export default memo(connect(RenderFields));