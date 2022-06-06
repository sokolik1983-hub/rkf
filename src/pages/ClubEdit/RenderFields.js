import React, {useState} from 'react';
import StickyBox from 'react-sticky-box';
import {sections} from './config';
import {SvgSelector} from './icons';
import Card from '../../components/Card';
import ClubMain from './components/ClubRightMenu/ClubMain';
import ClubBank from './components/ClubRightMenu/ClubBank';
import ClubLegal from './components/ClubRightMenu/ClubLegal';
import ClubDelete from './components/ClubRightMenu/ClubDelete';
import ClubDefault from './components/ClubRightMenu/ClubDefault';
import ClubScheduleCard from './components/ClubRightMenu/ClubSchedule';
import ClubContactsCard from './components/ClubRightMenu/ClubContacts';


const RenderFields = ({
        bindSubmitClubAlias,
        bindSubmitClubBankInfo,
        bindSubmitClubEmail,
        bindSubmitClubInfo,
        bindSubmitClubLegalInfo,
        bindSubmitClubPhone,
        bindSubmitClubSchedule,
        bindSubmitClubSocials,
        club_alias,
        club_id,
        handleSubmitForms,
        isOpenFilters,
        is_federation,
        setShowFilters,
        work_time,
}) => {
    const [activeSection, setActiveSection] = useState(0);

    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        setShowFilters({isOpenFilters: false});
    };


    return (
        <div className="ClubEdit__inner">
            <div className="ClubEdit__inner-left">
                {activeSection === 0 ? <ClubMain
                        club_alias={club_alias}
                        is_federation={is_federation}
                        handleSubmitForms={handleSubmitForms}
                        bindSubmitClubInfo={bindSubmitClubInfo}
                        bindSubmitClubAlias={bindSubmitClubAlias}
                    /> :
                    activeSection === 1 ? <ClubContactsCard
                        handleSubmitForms={handleSubmitForms}
                        bindSubmitClubInfo={bindSubmitClubInfo}
                        bindSubmitClubPhone={bindSubmitClubPhone}
                        bindSubmitClubEmail={bindSubmitClubEmail}
                        bindSubmitClubSocials={bindSubmitClubSocials}
                    /> :
                    activeSection === 2 ? <ClubScheduleCard
                        work_time={work_time}
                        club_id={club_id}
                        handleSubmitForms={handleSubmitForms}
                        bindSubmitClubSchedule={bindSubmitClubSchedule}
                    /> :
                    activeSection === 3 ? <ClubLegal
                        bindSubmitClubLegalInfo={bindSubmitClubLegalInfo}
                    /> :
                    activeSection === 4 ? <ClubBank
                        handleSubmitForms={handleSubmitForms}
                        bindSubmitClubBankInfo={bindSubmitClubBankInfo}
                    /> :
                    activeSection === 5 ? <ClubDelete
                        is_federation={is_federation}
                    /> :
                    <ClubDefault />
                }
            </div>
            <div className={`ClubEdit__inner-right${isOpenFilters ? " _open" : ""}`}>
                <StickyBox offsetTop={60}>
                    <Card>
                        <span className="ClubEdit__profile-label">Профиль</span>
                        <ul className="ClubEdit__inner-list">
                            {Object.keys(sections).map((type, key) =>
                                <div
                                    className={sections[type].id === activeSection
                                        ? "ClubEdit__inner-item active"
                                        : "ClubEdit__inner-item"}
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
        </div>
    );
}

export default React.memo(RenderFields);