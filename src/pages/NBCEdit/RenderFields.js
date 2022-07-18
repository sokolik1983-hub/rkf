import React, {useState} from 'react';
import {connect} from 'formik';
import {SvgSelector} from './icons';
import Card from '../../components/Card';
import {editForm, sections} from './config';
import MainPage from './components/MainPage';
import ContactsPage from './components/ContactsPage';
import BankInfo from "./components/BankInfo";
import StickyBox from "react-sticky-box";


const RenderFields = ({
                          formik,
                          randomKeyGenerator,
                          isOpenFilters,
                          setShowFilters,
                      }) => {
    const [activeSection, setActiveSection] = useState(0);

    const {
        name,
        alias,
        comment,
        web_site,
        bank_comment,
    } = editForm.fields;

    const {
        phones,
        emails,
        social_networks,
    } = formik.values;

    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        setShowFilters({isOpenFilters: false});
    };

    return (
        <div className="nursery-edit__inner">
            <div className="nursery-edit__inner-left">
                {activeSection === 0 ? <MainPage
                        name={name}
                        alias={alias}
                        formik={formik}
                        web_site={web_site}
                        comment={comment}
                    /> :
                    activeSection === 1 ? <ContactsPage
                            formik={formik}
                            social_networks={social_networks}
                            phones={phones}
                            emails={emails}
                            randomKeyGenerator={randomKeyGenerator}
                        /> :
                        activeSection === 2 && <BankInfo
                            bank_comment={bank_comment}
                        />
                }
            </div>
            <div className={`nursery-edit__inner-right${isOpenFilters ? " _open" : ""}`}>
                <StickyBox offsetTop={0}>
                    <Card>
                        <span className="nursery-edit__profile-label">Профиль</span>
                        <ul className="nursery-edit__inner-list">
                            {Object.keys(sections).map((type, key) => <div
                                    className={sections[type].id === activeSection
                                        ? "nursery-edit__inner-item active"
                                        : "nursery-edit__inner-item"}
                                    key={key}
                                    onClick={() => activeSection !== sections[type].id && handleSectionSwitch(sections[type].id)}
                                >
                                    <SvgSelector icon={sections[type].icon} />
                                    <li>{sections[type].name}</li>
                                </div>
                            )}
                        </ul>
                    </Card>
                </StickyBox>
            </div>
        </div>
    )
};

export default connect(React.memo(RenderFields));