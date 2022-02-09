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
import { Fade } from '@progress/kendo-react-animation';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';


const RenderFields = ({
        isOpenFilters,
        is_federation,
        setShowFilters,
        handleSubmitForms,
        bindSubmitClubInfo,
        bindSubmitClubEmail,
        bindSubmitClubAlias,
        bindSubmitClubPhone,
        bindSubmitClubSocials,
        bindSubmitClubBankInfo,
        bindSubmitClubSchedule,
        bindSubmitClubLegalInfo,
        bindSubmitClubDocuments,
}) => {
    const [activeSection, setActiveSection] = useState(0);
    const [success, setSuccess] = useState(false);

    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        setShowFilters({isOpenFilters: false});
    };

    const handleSuccess = () => {
        setSuccess(true);
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };


    return (
        <div className="ClubEdit__inner">
            <div className="ClubEdit__inner-left">
                {activeSection === 0 ? <ClubMain
                        handleSuccess={handleSuccess}
                        is_federation={is_federation}
                        handleSubmitForms={handleSubmitForms}
                        bindSubmitClubInfo={bindSubmitClubInfo}
                        bindSubmitClubAlias={bindSubmitClubAlias}
                        bindSubmitClubDocuments={bindSubmitClubDocuments}
                    /> :
                    activeSection === 1 ? <ClubContactsCard
                        handleSuccess={handleSuccess}
                        handleSubmitForms={handleSubmitForms}
                        bindSubmitClubInfo={bindSubmitClubInfo}
                        bindSubmitClubPhone={bindSubmitClubPhone}
                        bindSubmitClubEmail={bindSubmitClubEmail}
                        bindSubmitClubSocials={bindSubmitClubSocials}
                    /> :
                    activeSection === 2 ? <ClubScheduleCard
                        handleSuccess={handleSuccess}
                        handleSubmitForms={handleSubmitForms}
                        bindSubmitClubSchedule={bindSubmitClubSchedule}
                    /> :
                    activeSection === 3 ? <ClubLegal
                        bindSubmitClubLegalInfo={bindSubmitClubLegalInfo}
                    /> :
                    activeSection === 4 ? <ClubBank
                        handleSuccess={handleSuccess}
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
            <NotificationGroup>
                <Fade enter={true} exit={true}>
                    {success && <Notification
                        type={{ style: 'success', icon: true }}
                        closable={true}
                        onClose={() => setSuccess(false)}
                    >
                        <span>Информация сохранена!</span>
                    </Notification>}
                </Fade>
            </NotificationGroup>
        </div>
    );
}

export default React.memo(RenderFields);