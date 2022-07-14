import React, { useState, useEffect } from "react";
import Alert from "components/Alert";
import { connect, getIn, FieldArray } from "formik";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import VerkParent from "../../components/VerkParent";
import FormFile from "../../components/FormFile";
import RadioGroup from "../../components/RadioGroup";
import Transliteratable from "../../components/Transliteratable";
import { FormGroup, FormField } from "components/Form";
import { apiPedigreeEverk } from "../../config.js";
import { Request } from "utils/request";
import transliterate from "utils/transliterate";
import HideIf from "components/HideIf";
import moment from "moment";
import UserDatePicker from "../../../../../../components/kendo/DatePicker";
import "./index.scss";
const apiPrivacyEndpoint = '/api/requests/NurseryPedigreeRequest/personal_data_document';

const accept = ".pdf, .jpg, .jpeg";

// pedigree
const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes, formik, view, update, statuses, stampCodes, alias, stage }) => {
    const distinction = "pedigree";
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const declarant = formik.values;
    const [everkAlert, setEverkAlert] = useState(false);
    const [privacyHref, setPrivacyHref] = useState('');
    const [everkData, setEverkData] = useState(null);
    const statusAllowsUpdate = declarant.status_id ? [2, 4, 7].includes(declarant.status_id) : true;
    const [nurseryData, setNurseryData] = useState({});
    //let error = formik.errors && formik.touched;
    const handleTransliterate = (field) => formik.setFieldValue(`${field}_lat`, transliterate(getIn(formik.values, field)));
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    const getEverkData = (stamp_number, stamp_code) =>
        PromiseRequest(`${apiPedigreeEverk}?stamp_number=${stamp_number}&stamp_code=${stamp_code}`)
            .then(data => {
                data.dog_name && formik.setFieldValue('dog_name', data.dog_name);
                formik.setFieldValue('dog_name_lat', transliterate(data.dog_name));
                data.father_name && formik.setFieldValue('father_name', data.father_name);
                data.father_pedigree_number && formik.setFieldValue('father_pedigree_number', data.father_pedigree_number);
                data.mother_name && formik.setFieldValue('mother_name', data.mother_name);
                data.mother_pedigree_number && formik.setFieldValue('mother_pedigree_number', data.mother_pedigree_number);
                data.color && formik.setFieldValue('color', data.color);
                data.breed_id && formik.setFieldValue('breed_id', data.breed_id);
                data.dog_sex_type && formik.setFieldValue('dog_sex_type', data.dog_sex_type);
                data.dog_birth_date && formik.setFieldValue('dog_birth_date', data.dog_birth_date);
                setEverkData(data);
                setEverkAlert(true);
            })
            .catch(e => setEverkAlert(true));

    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init && formik.values.stamp_code_name === '') {
            setInit(true);
            let stamp = stampCodes[0];
            if (!!stamp) {
                formik.setFieldValue('stamp_code_name', stamp.label);
            }
        }
        Promise.all([
            fetch(apiPrivacyEndpoint, { headers })
                .then(response => response.blob())
                .then(data => setPrivacyHref(URL.createObjectURL(data))),
            PromiseRequest('/api/nurseries/Nursery/pedigree_request_information')
                .then(data => {
                    if (!formik.values.owner_first_name) {
                        Object.keys(data).forEach(k => k !== 'id' && data[k] && formik.setFieldValue(`${k}`, data[k]))
                        Object.keys(data).forEach(k => k !== 'id' && data[k] && formik.setFieldValue(`${k}_lat`, transliterate(data[k])))
                    }
                    setNurseryData(data);
                })
        ])
    }, []);

    const clearEverkData = () => {
        if (!everkData) return;
        Object.keys(everkData).forEach(k => everkData[k] && !nurseryData[k] && formik.setFieldValue(`${k}`, ''));
        formik.setFieldValue(`stamp_number`, '');
        setEverkData(null);
    };

    const filledEverk = val => !!everkData && !!everkData[val];

    const handleDateChange = date => {
        const selectedDate = moment(date.value).format(`YYYY-MM-DD`)
        formik.setFieldValue('dog_birth_date', selectedDate);
    };

    return <>
        {everkAlert &&
            <Alert
                title={everkData ? "" : "Ошибка"}
                text={everkData ? "Данные подгружены из базы ВЕРК" : "Указанный код клейма не найден. Возможно, помет не был зарегистрирован. Если вы уверены в правильности заполнения данного поля - просим вас обратиться в кинологическую организацию, осуществлявшую регистрацию помета"}
                autoclose={!!everkData}
                okButton={!everkData}
                onOk={() => setEverkAlert(false)}
            />
        }
        <HideIf cond={false}>
            <div className={`DocItem`}>
                <div className="flex-row heading-row">
                    <h4 className="caps caps_margin-top">Добавление заявки</h4>
                    <FormField disabled={update} fieldType="customCheckbox" name={`express`} label='Срочное изготовление' />
                </div>
                <RadioGroup radios={[
                    {
                        name: 'two_generation',
                        label: 'Выписка из ВЕРК РКФ единого образца (на двух языках)'
                    },
                    {
                        name: 'one_generation',
                        label: 'Свидетельство о регистрации собаки в ВЕРК РКФ'
                    }
                ]} />
                <FormGroup className="card">
                    {declarant.rejected_comment && <div className="alert alert-danger">
                        {declarant.rejected_comment.comment}
                    </div>}
                    <input type="hidden" name={`id`} />
                    <input type="hidden" name={`declarant_uid`} />
                    <FormGroup inline className="DocItem__stamp-inline">
                        {/*<FormField disabled={update || !!everkData} placeholder="XXX" fieldType="reactSelectCreatable" options={stampCodes} name={`stamp_code_name`} label={`Код клейма (<a href="/kennel/${alias}/documents/stamps/add">Добавить клеймо</a>)`} onChange={e => formik.setFieldValue(`stamp_code_name`, e.toUpperCase())}/>*/}
                        <FormField disabled={update || !!everkData || formik.values.foreign_owner} placeholder="XXX" fieldType="reactSelectCreatable" options={stampCodes} name={`stamp_code_name`} label={`Код клейма`} onChange={e => formik.setFieldValue(`stamp_code_name`, e.toUpperCase())} />
                        <FormField disabled={update || !!everkData} name={`stamp_number`} label='Номер клейма' placeholder="0000" />
                        <HideIf cond={!!everkData || update}>
                            <Button className="btn-primary" onClick={e => {
                                //let stamp_code = stampCodes && stampCodes.find(f => declarant.stamp_code_id === f.value);
                                //if (!stamp_code) return;
                                //stamp_code = stamp_code.label;
                                getEverkData(declarant.stamp_number, declarant.stamp_code_name);
                            }}>Поиск</Button>
                        </HideIf>
                        <HideIf cond={!everkData || update}>
                            <Button className="btn-red" onClick={e => clearEverkData()}>Очистить</Button>
                        </HideIf>
                    </FormGroup>

                    <FormField
                        disabled={update}
                        fieldType="customCheckbox"
                        name={`foreign_owner`}
                        onChange={e => {
                            Object.keys(nurseryData).forEach(k => k !== 'id' && nurseryData[k] && formik.setFieldValue(`${k}`, nurseryData[k]))
                            Object.keys(nurseryData).forEach(k => k !== 'id' && nurseryData[k] && formik.setFieldValue(`${k}_lat`, transliterate(nurseryData[k])))
                            stampCodes && stampCodes[0] && formik.setFieldValue('stamp_code_name', stampCodes[0].label)
                        }}
                        label='Для иностранного владельца'
                    />
                    <FormGroup inline className="DocItem__three-inline-columns">
                        <Transliteratable disabled={update || (nurseryData.owner_last_name && !formik.values.foreign_owner)} name={`owner_last_name`} label='Фамилия владельца' />
                        <Transliteratable disabled={update || (nurseryData.owner_first_name && !formik.values.foreign_owner)} name={`owner_first_name`} label='Имя владельца' />
                        <FormField disabled={update || (nurseryData.owner_second_name && !formik.values.foreign_owner)} name={`owner_second_name`} label='Отчество владельца (опционально)' />
                    </FormGroup>
                    <HideIf cond={!declarant.owner_last_name.includes(' ')}>
                        <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
                    </HideIf>
                    <FormGroup inline className="DocItem__owner-mail-inline">
                        <FormField disabled={update} name={`email`} label='Email владельца' />

                        <Transliteratable disabled={update || filledEverk('owner_address')} name={`owner_address`} label='Адрес владельца (Индекс, город, улица, дом, строение, кв./офис)' />
                    </FormGroup>
                    <FormGroup inline className="DocItem__dog-name-inline">
                        <FormField disabled={update} name={`breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..." />
                        <FormField disabled={update || filledEverk('dog_name')} name={`dog_name`} label='Кличка собаки' />
                        <Button
                            className="btn-primary"
                            onClick={() => handleTransliterate(`dog_name`)}
                            style={{ alignSelf: 'flex-end', padding: '12px' }}
                        >Транслитерировать</Button>
                    </FormGroup>
                    <FormGroup inline className="DocItem__three-inline-columns">
                        <div className="DocItem__pedigree-nursery-wrap">
                            <div>Дата рождения собаки</div>
                            <UserDatePicker
                                onChange={handleDateChange}
                                value={getIn(declarant, 'dog_birth_date') ?
                                    new Date(getIn(declarant, 'dog_birth_date')) :
                                    null
                                }
                                className="DocItem__pedigree-nursery-calendar"
                                disabled={update}
                            />
                        </div>
                        <FormField disabled={update || filledEverk('color')} name={`color`} label='Окрас' />
                        <FormField style={{ minWidth: '50%' }} disabled={update} name={`dog_sex_type`} fieldType="reactSelect" options={sexTypes} placeholder="Выберите..." label='Пол собаки' />
                    </FormGroup>

                    <VerkParent
                        update={update}
                        view={view}
                        declarant={declarant}
                        i={i}
                        distinction={distinction}
                        everkData={everkData}
                        who="father"
                        whoRu="производителя"
                        checkboxCaption='Иностранный производитель'
                    />
                    <VerkParent
                        update={update}
                        view={view}
                        declarant={declarant}
                        i={i}
                        distinction={distinction}
                        everkData={everkData}
                        who="mother"
                        whoRu="производительницы"
                        checkboxCaption='Иностранная производительница'
                    />

                    <FormGroup inline className="DocItem__three-inline-columns">
                        <FormField disabled={update} name={`breeder_last_name`} label='Фамилия заводчика' />
                        <FormField disabled={update} name={`breeder_first_name`} label='Имя заводчика' />
                        <FormField disabled={update} name={`breeder_second_name`} label='Отчество заводчика (опционально)' />
                    </FormGroup>
                    <HideIf cond={!declarant.breeder_last_name.includes(' ')}>
                        <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
                    </HideIf>
                    <FormField disabled={update || filledEverk('breeder_address')} name={`breeder_address`} label='Адрес заводчика (Индекс, город, улица, дом, строение, кв./офис)' />

                    <FormField disabled={update} name={`chip_number`} label='Номер чипа (опционально)' />
                    <FormField
                        disabled={update}
                        name={`was_reviewed`}
                        fieldType="customCheckbox"
                        label='Щенок был на пересмотре, соответствует племенным требованиям'
                        onChange={e => { formik.handleChange(e); formik.setFieldValue(`litter_or_request_number`, '') }}
                    />

                    <FormGroup inline className="DocItem__two-inline-columns">
                        <FormField disabled={update} name={`owner_last_name_lat`} label='Фамилия владельца латиницей' />
                        <FormField disabled={update} name={`owner_first_name_lat`} label='Имя владельца латиницей' />
                    </FormGroup>
                    <HideIf cond={!declarant.owner_last_name_lat.includes(' ')}>
                        <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
                    </HideIf>
                    <FormField disabled={update || filledEverk('owner_address_lat')} name={`owner_address_lat`} label='Адрес владельца латиницей' />
                    <div className="DocItem__name-warning-wrap">
                        <span className="DocItem__pedigree-warning">Если данное поле не заполнено, транслитерация клички остается на усмотрение кинолога</span>
                        <FormField  name={`dog_name_lat`} label='Кличка собаки латиницей' />
                    </div>
                    <h4>Файлы должны быть загружены в одном из следующих форматов: PDF, JPEG, JPG</h4>
                    <FormGroup inline className="DocItem__two-inline-columns_rows">
                        <FormFile
                            name={`biometric_card_document`}
                            label={<>Метрика щенка<br /><br /></>}
                            docId={declarant.biometric_card_document_id}
                            document_type_id={9}
                            disabled={view || declarant.biometric_card_document_accept || !statusAllowsUpdate}
                            distinction={distinction}
                        />

                        {/*<FormFile
                name={`request_extract_from_verk_document`}
                label='Заявка на изготовление выписки из ВЕРК'
                docId={declarant.request_extract_from_verk_document_id}
                document_type_id={11}
                disabled={view || declarant.request_extract_from_verk_document_accept || !statusAllowsUpdate}
                form={{filename:"request_extract_from_verk_document.docx", href: verkHref, linkText: 'Скачать шаблон формы'}}
                distinction={distinction}
            />*/}

                        <FormFile
                            name={`personal_data_document`}
                            label='Соглашение на обработку персональных данных'
                            docId={declarant.personal_data_document_id}
                            disabled={view || declarant.personal_data_document_accept || !statusAllowsUpdate}
                            document_type_id={11}
                            form={{ filename: "privacy.docx", href: privacyHref, linkText: 'Скачать форму соглашения' }}
                            distinction={distinction}
                        />
                    </FormGroup>


                    <FieldArray name={`documents`} render={({ push, remove }) => (<>
                        {declarant.documents && declarant.documents.map((doc, j) => <FormGroup className="mode-documents-wrap" inline key={j}>
                            <input type="hidden" name={`documents[${j}].id`} />
                            <FormField disabled={view || !statusAllowsUpdate || doc.accept} options={doctypes} label={`Документ ${j + 1} - описание`} placeholder="Выберите..." fieldType="reactSelect" name={`documents[${j}].document_type_id`} />
                            <HideIf cond={view || !statusAllowsUpdate || doc.accept}>
                                <FormFile
                                    name={`documents[${j}].document`}
                                    label={`Документ ${j + 1}`}
                                    docId={declarant.documents[j].document_id}
                                    disabled={view || !statusAllowsUpdate || doc.document_accept}
                                    document_type_id={doc.document_type_id}
                                    fieldType="file"
                                    distinction={distinction}
                                    accept={accept}
                                    declarant_uid={declarant.declarant_uid}
                                />
                            </HideIf>
                            <HideIf cond={update}>
                                <DeleteButton onClick={() => remove(j)} title="Удалить" />
                            </HideIf>
                        </FormGroup>)}
                        <HideIf cond={view || !statusAllowsUpdate || (declarant.documents && declarant.documents.length > 29)}>
                            {/*<p>Вы можете добавить дополнительные документы</p>*/}
                            <div className="flex-row">
                                <Button small className="btn-primary" onClick={() => push({ document_type_id: '', document: '' })}>Добавить доп. документ</Button>
                            </div>
                        </HideIf>
                    </>)}
                    />
                    <HideIf cond={true || update}>
                        <Button className="btn-red" onClick={closeClick}>Удалить</Button>
                    </HideIf>
                </FormGroup>
            </div>
        </HideIf>
    </>
};

export default connect(React.memo(DocItem));
