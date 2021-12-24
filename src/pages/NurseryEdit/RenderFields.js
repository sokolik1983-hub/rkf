import React, {useState} from 'react';
import {connect} from 'formik';
import {FormField, FormGroup} from '../../components/Form';
import Transliteratable from './components/Transliteratable';
import Contacts from './components/Contacts';
import Documents from './components/Documents';
import SocialNetworks from './components/SocialNetworks';
import Schedule from './components/Schedule';
import Card from '../../components/Card';
import {editForm, sections} from './config';
import StickyBox from 'react-sticky-box';
import SubmitButton from '../../components/Form/SubmitButton';


const RenderFields = ({
                          isOpenFilters,
                          setShowFilters,
                          formik,
                          working,
                          coOwner,
                          randomKeyGenerator,
                      }) => {
    const [activeSection, setActiveSection] = useState(0);

    const {
        alias,
        name,
        name_lat,
        description,
        web_site,
        co_owner_last_name,
        co_owner_first_name,
        co_owner_second_name,
        co_owner_mail,
        address,
        is_public
    } = editForm.fields;

    const {
        postcode,
        city_id,
        street_name,
        house_name,
        flat_name
    } = address;

    const {
        contacts,
        documents,
        socials,
        work_time
    } = formik.values;

    const handleSectionSwitch = (id) => {
        setActiveSection(id);
        setShowFilters({isOpenFilters: false});
    };


    const renderSection = (section) => {
        switch (section) {
            case 0:
                return <Card>
                    <h3>Основная информация</h3>
                    <a className="support-link" href="https://help.rkf.online/ru/knowledge_base/art/54/cat/3/#/"
                       target="_blank" rel="noopener noreferrer">
                        Инструкция по редактированию профиля
                    </a>
                    <FormField {...alias} />
                    <div className="NurseryEdit__main-info">
                        <Transliteratable {...name} />
                        <FormField {...name_lat} />
                        <FormField {...description} />

                        <FormField {...co_owner_last_name} disabled={!!coOwner.lastName}/>
                        <FormField {...co_owner_first_name} disabled={!!coOwner.firstName}/>
                        <FormField {...co_owner_second_name} disabled={!!coOwner.secondName}/>
                        <FormField {...co_owner_mail} disabled={!!coOwner.mail}/>
                    </div>
                    <Documents documents={documents}/>
                    <SocialNetworks socials={socials}/>
                    <SubmitButton>Сохранить</SubmitButton>
                    {formik.errors && !!Object.keys(formik.errors).length
                        && <div className="NurseryEdit__is-valid">Не все необходимые поля заполнены</div>}
                    {working && <div className="NurseryEdit__is-valid">Идёт загрузка файла...</div>}

                </Card>;
            case 1:
                return <Card className="nursery__contacts">
                    <h3>Контакты</h3>
                    <div className='nursery__contacts__address'>
                        <FormGroup inline>
                            <FormField {...city_id} className="nursery-activation__select"/>
                            <FormField {...postcode} />
                        </FormGroup>
                        <FormGroup inline>
                            <FormField {...street_name} />
                            <FormField {...house_name} />
                            <FormField {...flat_name} />
                        </FormGroup>
                    </div>
                    <Contacts
                        contacts={contacts}
                        is_public={is_public}
                        errors={formik.errors}
                        randomKeyGenerator={randomKeyGenerator}
                    />
                    <FormGroup inline>
                        <FormField {...web_site} />
                    </FormGroup>
                    <SubmitButton>Сохранить</SubmitButton>
                    {formik.errors && !!Object.keys(formik.errors).length
                        && <div className="NurseryEdit__is-valid">Не все необходимые поля заполнены</div>}
                    {working && <div className="NurseryEdit__is-valid">Идёт загрузка файла...</div>}

                </Card>;
            case 2:
                return <Card>
                    <Schedule work_time={work_time}/>
                </Card>;
            case 3:
                return <Card>
                    <div className='nursery-page__delete'>
                        <h3>Удаление страницы</h3>
                        <p>
                            Удаление Профиля Питомника недоступно
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
        <div className='NurseryEdit__inner'>
            <div className='NurseryEdit__inner-left'>
                {renderSection(activeSection)}
            </div>
            <div className={`NurseryEdit__inner-right${isOpenFilters ? ' _open' : ''}`}>
                <StickyBox offsetTop={60}>
                    <Card>
                        <span className='NurseryEdit__profile-label'>Профиль</span>
                        <ul className='NurseryEdit__inner-list'>
                            {Object.keys(sections).map((type, key) => <div
                                    className={sections[type].id === activeSection ? 'NurseryEdit__inner-item active' : 'NurseryEdit__inner-item'}
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
    )
};

export default connect(React.memo(RenderFields));