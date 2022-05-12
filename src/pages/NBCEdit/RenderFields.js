import React, {useState} from 'react';
import {connect} from 'formik';
import {SvgSelector} from './icons';
import StickyBox from 'react-sticky-box';
import Card from '../../components/Card';
import {editForm, sections} from './config';
import MainPage from './components/MainPage';
import ContactsPage from './components/ContactsPage';
import BankInfo from "./components/BankInfo";


const RenderFields = ({
        formik,
        working,
        coOwner,
        isOpenFilters,
        setShowFilters,
        randomKeyGenerator,
}) => {
    const [activeSection, setActiveSection] = useState(0);

    const {
        alias,
        name,
        // name_lat,
        comment,
        web_site,
        bank_comment,
        // co_owner_last_name,
        // co_owner_first_name,
        // co_owner_second_name,
        // co_owner_mail,
        // address,
        // is_public
    } = editForm.fields;

    // const {
    //     postcode,
    //     city_id,
    //     street_name,
    //     house_name,
    //     flat_name
    // } = address;

    const {
        phones,
        // documents,
        // socials,
        // work_time
    } = formik.values;

    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        // setShowFilters({isOpenFilters: false});
    };


    return (
        <div className="nursery-edit__inner">
            <div className="nursery-edit__inner-left">
                {activeSection === 0 ? <MainPage
                        // name={name}
                        alias={alias}
                        formik={formik}
                        // coOwner={coOwner}
                        // working={working}
                        // name_lat={name_lat}
                        web_site={web_site}
                        comment={comment}
                        // co_owner_mail={co_owner_mail}
                        // co_owner_last_name={co_owner_last_name}
                        // co_owner_first_name={co_owner_first_name}
                        // co_owner_second_name={co_owner_second_name}
                    /> :
                    activeSection === 1 ? <ContactsPage
                        formik={formik}
                        // city_id={city_id}
                        // socials={socials}
                        // working={working}
                        phones={phones}
                        // postcode={postcode}
                        // flat_name={flat_name}
                        // is_public={is_public}
                        // house_name={house_name}
                        // street_name={street_name}
                        randomKeyGenerator={randomKeyGenerator}
                    /> :
                    activeSection === 2 ? <BankInfo
                        bank_comment={bank_comment}
                    />
                        : ""
                    // activeSection === 3 ? <DeletePage
                    // /> : <DefaultPage />
                }
            </div>
            {/*<div className={`nursery-edit__inner-right${isOpenFilters ? " _open" : ""}`}>*/}
            <div>
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