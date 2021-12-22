import React, { useState } from "react";
import { connect } from "formik";
import { FormField, FormGroup } from "components/Form";
import Transliteratable from "./components/Transliteratable"; // TODO: move to Form folder
import Contacts from './components/Contacts';
import Documents from './components/Documents';
import SocialNetworks from './components/SocialNetworks';
import Schedule from './components/Schedule';
import Card from "components/Card";
import { Request } from "utils/request";
import { editForm, sections } from './config';
import StickyBox from 'react-sticky-box';
import SubmitButton from '../../components/Form/SubmitButton';
// import DeletePage from '../UserEditKendo/sections/DeletePage';

const RenderFields = ({
      isOpenFilters,
      setShowFilters,
      formik,
      streetTypes,
      houseTypes,
      flatTypes,
      working,
      handleError,
      setWorking,
      coOwner
}) => {
    const [formModified, setFormModified] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    // const [visibilityStatuses, setVisibilityStatuses] = useState([]);
    // const [formBusy, setFormBusy] = useState(false);
    // const [cities, setCities] = useState([]);

    const handleUpload = (file, isLogo) => {
        setWorking(true);
        let data = new FormData();
        data.append('file', file);
        Request({
            url: isLogo ? '/api/Avatar/full' : '/api/HeaderPicture/full',
            method: "POST",
            data: data,
            isMultipart: true
        },
            data => {
                // formik.setFieldValue(isLogo ? 'logo_link' : 'banner_link', data.avatar_link);
                setWorking(false);
            },
            e => {
                setWorking(false);
                handleError(e);
            });
    };

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
        street_type_id,
        street_name,
        house_type_id,
        house_name,
        flat_type_id,
        flat_name
    } = address;

    const {
        contacts,
        documents,
        socials,
        work_time
    } = formik.values;

    const handleSectionSwitch = (id) => {
        if (formModified) {
            window.confirm('Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны.') && setActiveSection(id);
        } else {
            setActiveSection(id);
        }
        setShowFilters({ isOpenFilters: false });
    };
    const handleSubmit = async (data, type) => {
        // setFormBusy(true);
        // if (data.social_networks) data.social_networks = data.social_networks.filter(i => i.site !== '');
        // if (data.mails) data.mails = data.mails.filter(i => i.value !== '');
        // if (data.phones) data.phones = data.phones.filter(i => i.value !== '' && i.value !== phoneMask);
        // if (data.address && data.address.postcode) data.address.postcode = data.address.postcode.replaceAll('_', '');
        // if (data.birth_date) data.birth_date = moment(data.birth_date).format("YYYY-MM-DD");
        //
        // await Request({
        //     url: sections[type].url,
        //     method: 'PUT',
        //     data: JSON.stringify(data)
        // }, () => {
        //     getInfo(type);
        //     handleSuccess();
        //     setNameToLocalStorage(data);
        // }, error => {
        //     handleError(error);
        //     setFormBusy(false);
        // });
    };

    const renderSection = (section) => {
        switch (section) {
            case 0:
                return <Card>
                    <h3>Основная информация</h3>
                    <FormField {...alias} />
                    <div className="NurseryEdit__main-info">
                        <Transliteratable {...name} />
                        <FormField {...name_lat} />
                        <FormField {...description} />
                        <FormField {...web_site} />
                        <FormField {...co_owner_last_name} disabled={!!coOwner.lastName} />
                        <FormField {...co_owner_first_name} disabled={!!coOwner.firstName} />
                        <FormField {...co_owner_second_name} disabled={!!coOwner.secondName} />
                        <FormField {...co_owner_mail} disabled={!!coOwner.mail} />
                    </div>
                    <Documents documents={documents} />
                    <SocialNetworks socials={socials} />
                    <SubmitButton>Сохранить</SubmitButton>
                    {formik.errors && !!Object.keys(formik.errors).length
                        && <div className="NurseryEdit__is-valid">Не все необходимые поля заполнены</div>}
                    {working && <div className="NurseryEdit__is-valid">Идёт загрузка файла...</div>}

                </Card>;
            case 1:
                return <Card>
                    <h3>Контакты</h3>
                    <FormGroup inline>
                        <FormField {...city_id} className="nursery-activation__select" />
                        <FormField {...postcode} />
                    </FormGroup>
                    <FormGroup inline>
                        <FormField {...street_name} />
                        <FormField {...house_name} />
                        <FormField {...flat_name} />
                    </FormGroup>
                    <Contacts
                        contacts={contacts}
                        is_public={is_public}
                        errors={formik.errors}
                        // setFormModified={setFormModified}
                        // visibilityStatuses={visibilityStatuses}
                        // handleSubmit={handleSubmit}
                        // formBusy={formBusy}
                    />
                    <SubmitButton>Сохранить</SubmitButton>
                    {formik.errors && !!Object.keys(formik.errors).length
                        && <div className="NurseryEdit__is-valid">Не все необходимые поля заполнены</div>}
                    {working && <div className="NurseryEdit__is-valid">Идёт загрузка файла...</div>}

                </Card>;
            case 2:
                return <Card>
                    <Schedule
                        work_time={work_time}
                        // setFormModified={setFormModified}
                        // handleSubmit={handleSubmit}
                        // handleError={handleError}
                        // formBusy={formBusy}
                    />
                </Card>;
            case 3:
                return
                // <DeletePage updateInfo={getInfo} />;
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
                                    <span className={`k-icon k-icon-32 ${sections[type].icon}`} />
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