import React from "react";
import { connect, getIn } from "formik";
import { FormField, FormGroup } from "components/Form";
import FieldError from "components/Form/Field/Error";
import CustomCheckbox from "components/Form/CustomCheckbox";
import ActiveImageWrapper from "components/ActiveImageWrapper";
import { DEFAULT_IMG } from "appConfig";
import Contacts from './components/Contacts';
import Documents from './components/Documents';
import SocialNetworks from './components/SocialNetworks';
import Card from "components/Card";
import { Request } from "utils/request";
import { editForm } from "./config";
import UserDatePicker from "../../components/kendo/DatePicker";
import moment from "moment";


const RenderFields = ({ formik, working, handleError, setWorking }) => {
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
                formik.setFieldValue(isLogo ? 'logo_link' : 'banner_link', data.avatar_link);
                formik.setFieldValue('sex_type_id', data.sex_type_id ? data.sex_type_id : 0);
                setWorking(false);
            },
            e => {
                setWorking(false);
                handleError(e);
            });
    };

    const handleGenderChange = id => {
        formik.setFieldValue('personal_information.sex_type_id', id);
    }

    const {
        alias,
        address,
        personal_information,
        web_site
    } = editForm.fields;

    const {
        city_id
    } = address;

    const {
        first_name,
        // first_name_lat,
        last_name,
        // last_name_lat,
        second_name,
        birth_date,
        is_hidden,
        description
    } = personal_information;

    const {
        headliner_link,
        logo_link,
        contacts,
        documents,
        social_networks,
        // web_sites
    } = formik.values;

    const handleDateChange = date => {
        const selectedDate = moment(date.value).format(`YYYY-MM-DD`)
        formik.setFieldValue('personal_information.birth_date', selectedDate);
    };

    return (
        <>
            <Card>
                <div className="UserEdit__main-info">
                    <div className="UserEdit__main-info-left">
                        <ActiveImageWrapper onChangeFunc={file => handleUpload(file, true)} requestUrl={'/'} >
                            <div
                                style={{ backgroundImage: `url(${logo_link ? logo_link : DEFAULT_IMG.userAvatar})` }}
                                className="UserEdit__main-info-logo"
                            />
                        </ActiveImageWrapper>
                    </div>
                    <div className="UserEdit__main-info-right">
                        {/*<div className="UserEdit__support-link-wrap">*/}
                        {/*    <a className="UserEdit__support-link" href="https://help.rkf.online/ru/knowledge_base/art/54/cat/3/#/" target="_blank" rel="noopener noreferrer">Инструкция по редактированию профиля</a>*/}
                        {/*</div>*/}
                        <div className="UserEdit__alias-wrap">
                            <FormField {...alias} />
                        </div>
                    </div>
                </div>
                <div className="UserEdit__banner-wrap">
                    <div className="UserEdit__banner-title">Обложка</div>
                    <ActiveImageWrapper onChangeFunc={file => handleUpload(file, false)} requestUrl={'/'} className="test" >
                        <div style={{ backgroundImage: `url(${headliner_link ? headliner_link : DEFAULT_IMG.emptyGallery})` }} className="UserEdit__banner" />
                    </ActiveImageWrapper>
                </div>
            </Card>
            <Card>
                <FormGroup inline>
                    <FormField {...last_name} />
                    <FormField {...first_name} />
                    <FormField {...second_name} />
                    {/*<FormField {...last_name_lat} />*/}
                </FormGroup>
                {/*<FormGroup inline>*/}
                {/*    <FormField {...first_name} />*/}
                {/*    <FormField {...first_name_lat} />*/}
                {/*</FormGroup>*/}
                <div className="UserEdit__checkboxes-wrap">
                    <div className="UserEdit__gender-wrap">
                        <div className="UserEdit__label">Пол</div>
                        <div>
                            <CustomCheckbox
                                id="gender-m"
                                label={"M"}
                                checked={getIn(formik.values, 'personal_information.sex_type_id') === 1 ? true : false}
                                onChange={() => handleGenderChange(1)}
                            />
                            <CustomCheckbox
                                id="gender-f"
                                label={"Ж"}
                                checked={getIn(formik.values, 'personal_information.sex_type_id') === 2 ? true : false}
                                onChange={() => handleGenderChange(2)}
                            />
                        </div>
                        <FieldError name="personal_information.sex_type_id" />
                    </div>
                    <FormGroup inline>
                        <FormField {...city_id} />
                    </FormGroup>
                    <div className="UserEdit__item-wrap">
                        <div className="UserEdit__label">{birth_date.label}</div>
                        <UserDatePicker
                            onChange={handleDateChange}
                            value={getIn(formik.values, 'personal_information.birth_date') ?
                                new Date(getIn(formik.values, 'personal_information.birth_date')) :
                                null
                            }
                            className="UserEdit__date-picker"
                        />
                        <FieldError name="personal_information.birth_date" />
                    </div>
                    <FormField className="UserEdit__is-hidden" {...is_hidden} />
                </div>
                <Contacts contacts={contacts} errors={formik.errors} />
                <FormField {...description} />
            </Card>

            <Card>
                <Documents documents={documents} />
                <SocialNetworks social_networks={social_networks} />
                <FormField {...web_site} />
                {/* <WebSites web_sites={web_sites} /> */}
            </Card>

            {formik.errors && !!Object.keys(formik.errors).length
                && <div className="UserEdit__is-valid">Не все необходимые поля заполнены</div>}
            {working && <div className="UserEdit__is-valid">Идёт загрузка файла...</div>}
        </>
    )
};

export default connect(React.memo(RenderFields));