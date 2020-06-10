import React from "react";
import { connect } from "formik";
import { FormField, FormGroup } from "components/Form";
import ActiveImageWrapper from "components/ActiveImageWrapper";
import { DEFAULT_IMG } from "appConfig";
import Transliteratable from "./components/Transliteratable"; // TODO: move to Form folder
import Contacts from './components/Contacts';
import Documents from './components/Documents';
import SocialNetworks from './components/SocialNetworks';
import Card from "components/Card";
import { Request } from "utils/request";
import { editForm } from "./config";

const RenderFields = ({ formik, streetTypes, houseTypes, flatTypes, working, handleError, setWorking }) => {

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
                setWorking(false);
            },
            e => {
                setWorking(false);
                handleError(e);
            });
    };

    const { alias,
        name,
        name_lat,
        description,
        web_site,
        address
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
        banner_link,
        logo_link,
        contacts,
        documents,
        socials } = formik.values;

    return (
        <>
            <Card>
                <FormField {...alias} />
                <div className="NurseryEdit__main-info">
                    <div className="NurseryEdit__main-info-left">
                        <h3>Логотип</h3>

                        <ActiveImageWrapper onChangeFunc={file => handleUpload(file, true)} requestUrl={'/'} >
                            <div
                                style={{ backgroundImage: `url(${logo_link ? logo_link : DEFAULT_IMG.clubAvatar})` }} className="NurseryEdit__main-info-logo" />
                        </ActiveImageWrapper>

                    </div>
                    <div className="NurseryEdit__main-info-right">
                        <h3>Общая информация</h3>
                        <Transliteratable {...name} />
                        <FormField {...name_lat} />
                        <FormField {...description} />
                        <FormField {...web_site} />
                    </div>
                </div>
            </Card>
            <Card>
                <h3>Адрес питомника</h3>
                <FormGroup inline>
                    <FormField {...city_id} className="nursery-activation__select" />
                    <FormField {...postcode} />
                </FormGroup>
                <FormGroup inline>
                    <FormField {...street_type_id} options={streetTypes} />
                    <FormField {...street_name} />
                </FormGroup>
                <FormGroup inline>
                    <FormField {...house_type_id} options={houseTypes} />
                    <FormField {...house_name} />
                </FormGroup>
                <FormGroup inline>
                    <FormField {...flat_type_id} options={flatTypes} />
                    <FormField {...flat_name} />
                </FormGroup>
            </Card>


            <Contacts contacts={contacts} />
            <Documents documents={documents} />
            <SocialNetworks socials={socials} />

            <Card>
                <ActiveImageWrapper onChangeFunc={file => handleUpload(file, false)} requestUrl={'/'} >
                    <div
                        style={{ backgroundImage: `url(${banner_link ? banner_link : DEFAULT_IMG.clubAvatar})` }} className="NurseryEdit__banner" />
                </ActiveImageWrapper>
            </Card>

            {formik.errors && !!Object.keys(formik.errors).length
                && <div className="NurseryEdit__is-valid">Не все необходимые поля заполнены</div>}
            {working && <div className="NurseryEdit__is-valid">Идёт загрузка файла...</div>}
        </>
    )
};

export default connect(React.memo(RenderFields));