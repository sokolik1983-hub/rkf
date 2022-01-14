import React, {useState} from 'react';
import {connect} from 'formik';
import StickyBox from 'react-sticky-box';
import Card from '../../components/Card';
import {editForm, sections} from './config';
import ClubInfo from './components/ClubInfo';
import ClubSchedule from './components/ClubSchedule';
import ClubLegalInfo from './components/ClubLegalInfo';
import ClubBankInfo from './components/ClubBankInfo';
import ClubContacts from './components/ClubContacts';
import ClubDocuments from './components/ClubDocuments';
import ClubSocial from './components/ClubSocial';
import EditPageButtons from "./components/EditPageButtons";
import {SvgSelector} from "./icons";


const RenderFields = ({
        isOpenFilters,
        setShowFilters,
        is_federation,
        bindSubmitClubAlias,
        bindSubmitClubInfo,
        bindSubmitClubSchedule,
        bindSubmitClubLegalInfo,
        bindSubmitClubBankInfo,
        bindSubmitClubEmail,
        bindSubmitClubPhone,
        bindSubmitClubDocuments,
        bindSubmitClubSocials,
        handleSubmitForms,
}) => {
    const [activeSection, setActiveSection] = useState(0);

    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        setShowFilters({isOpenFilters: false});
    };

    const renderSection = (section) => {
        switch (section) {
            case 0:
                return <Card className='MainInfo'>
                    <h3>Основная информация</h3>
                    <a className="support-link"
                       href="https://help.rkf.online/ru/knowledge_base/art/54/cat/3/#/"
                       target="_blank"
                       rel="noopener noreferrer"
                    >Инструкция по редактированию профиля
                    </a>
                    <ClubInfo
                        bindSubmitClubAlias={bindSubmitClubAlias}
                        bindSubmitClubInfo={bindSubmitClubInfo}
                        isFederation={is_federation}
                    />
                    <ClubDocuments
                        bindSubmitForm={bindSubmitClubDocuments}
                    />
                    <EditPageButtons handleSubmitForms={handleSubmitForms}/>
                </Card>;
            case 1:
                return <Card className='Contacts'>
                    <h3>Контакты</h3>
                    <ClubContacts
                        bindSubmitClubEmail={bindSubmitClubEmail}
                        bindSubmitClubPhone={bindSubmitClubPhone}
                    />
                    <ClubSocial
                        bindSubmitForm={bindSubmitClubSocials}
                    />
                    <EditPageButtons handleSubmitForms={handleSubmitForms}/>
                </Card>;
            case 2:
                return <Card className='Schedule'>
                    <ClubSchedule
                        bindSubmitForm={bindSubmitClubSchedule}
                    />
                    <EditPageButtons handleSubmitForms={handleSubmitForms}/>
                </Card>;
            case 3:
                return <Card className='LegalInfo'>
                    <ClubLegalInfo
                        bindSubmitForm={bindSubmitClubLegalInfo}
                    />
                </Card>;
            case 4:
                return <Card className='BankInfo'>
                    <ClubBankInfo
                        bindSubmitForm={bindSubmitClubBankInfo}
                    />
                    <EditPageButtons handleSubmitForms={handleSubmitForms}/>
                </Card>;
            case 5:
                return <Card>
                    <h3>Удаление страницы</h3>
                    <div className='ClubEdit__delete'>
                        <p>
                            Удаление Профиля Клуба недоступно
                        </p>
                        <button className="button-delete__disable" disabled="disabled">
                            Удалить
                        </button>
                    </div>
                </Card>
            default:
                return <div>Not Found</div>;
        }
    };


    return (
        <div className='ClubEdit__inner'>
            <div className='ClubEdit__inner-left'>
                {renderSection(activeSection)}
            </div>
            <div className={`ClubEdit__inner-right${isOpenFilters ? ' _open' : ''}`}>
                <StickyBox offsetTop={60}>
                    <Card>
                        <span className='club-menu__profile-label'>Профиль</span>
                        <ul className='club-menu__inner-list'>
                            {Object.keys(sections).map((type, key) => <div
                                    className={sections[type].id === activeSection ? 'club-menu__inner-item active' : 'club-menu__inner-item'}
                                    key={key}
                                    onClick={() => activeSection !== sections[type].id && handleSectionSwitch(sections[type].id)}
                                >
                                    {/*<span className={`k-icon k-icon-32 ${sections[type].icon}`}/>*/}
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

export default connect(React.memo(RenderFields));