import React, {useState} from 'react';
import {connect} from "formik";
import Card from '../../components/Card';
import StickyBox from "react-sticky-box";
import {editForm, sections} from './config';
import ClubInfo from "./components/ClubInfo";


const RenderFields = ({
                          isOpenFilters,
                          setShowFilters,
                          formik,
                          working,
                          coOwner,
                          randomKeyGenerator,
                      }) => {
    const [activeSection, setActiveSection] = useState(0);

    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        setShowFilters({isOpenFilters: false});
    };

    const renderSection = (section) => {
        switch (section) {
            case 0:
                return <Card>
                    <h3>Основная информация</h3>
                    <a className="support-link"
                       href="https://help.rkf.online/ru/knowledge_base/art/54/cat/3/#/"
                       target="_blank"
                       rel="noopener noreferrer"
                    >Инструкция по редактированию профиля
                    </a>
                    {/*<FormField {...alias} />*/}
                    <div className="ClubEdit__main-info">
                        <ClubInfo
                            // bindSubmitClubAlias={bindSubmitClubAlias}
                            // bindSubmitClubInfo={bindSubmitClubInfo}
                            // isFederation={is_federation}
                        />
                    </div>
                </Card>;
            case 1:
                return <Card>
                    <h3>Контакты</h3>
                    <div className="ClubEdit__contacts">
                    </div>
                </Card>;
            case 2:
                return <Card>
                    <h3>График работы</h3>
                    {/*<Schedule work_time={work_time} />*/}
                </Card>;
            case 3:
                return <Card>
                    <h3>Юридическая информация</h3>

                </Card>;
            case 4:
                return <Card>
                    <h3>Банковская информация</h3>

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
                                    <span className={`k-icon k-icon-32 ${sections[type].icon}`}/>
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