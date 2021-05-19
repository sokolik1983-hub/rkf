import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "components/Alert";
import { connect, FieldArray } from "formik";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import DocLink from "../../components/DocLink";
import RadioGroup from "../DocApply/components/RadioGroup";
import VerkParent from "../../components/VerkParent";
import FormFile from "../../components/FormFile";
import Transliteratable from "../../components/Transliteratable";
import { FormGroup, FormField } from "components/Form";
import { apiPedigreeEverk } from "../../config.js";
import { Request } from "utils/request";
import HideIf from "components/HideIf";
import moment from "moment";
import "./index.scss";

const accept = ".pdf, .jpg, .jpeg";
// pedigree
const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes, formik, view, update, privacyHref, verkHref, statuses, stampCodes, clubAlias }) => {
    const distinction = "pedigree";
    const declarant = formik.values.declarants[i];
    const [email, setEmail] = useState(declarant.email || '');
    const [firstName, setFirstName] = useState(declarant.owner_first_name || '');
    const [lastName, setLastName] = useState(declarant.owner_last_name || '');
    const [secondName, setSecondName] = useState(declarant.owner_second_name || '');
    const [everkAlert, setEverkAlert] = useState(false);
    const [everkData, setEverkData] = useState(null);
    const statusAllowsUpdate = declarant.status_id ? [2, 4, 7].includes(declarant.status_id) : true;
    const statusAllowsDocumentsUpdate = declarant.status_id ? [2, 4, 7, 11].includes(declarant.status_id) : true;
    let status = statuses.find(s => s.id === declarant.status_id);
    status = status ? status.name : 'Не обработана';
    let error = formik.errors.declarants && formik.errors.declarants[i] && formik.touched.declarants && formik.touched.declarants[i];

    const docConst = 2 + Number(declarant.father_foreign) + Number(declarant.mother_foreign);
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    const getEverkData = (stamp_number, stamp_code) =>
        PromiseRequest(`${apiPedigreeEverk}?stamp_number=${stamp_number}&stamp_code=${stamp_code}`)
            .then(data => {
                data.dog_name && formik.setFieldValue('dog_name', data.dog_name);
                data.dog_name_lat && formik.setFieldValue('dog_name_lat', data.dog_name_lat);
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
    const clearEverkData = () => {
        if (!everkData) return;
        Object.keys(everkData).forEach(k => everkData[k] && formik.setFieldValue(`declarants[${i}].${k}`, ''));
        formik.setFieldValue(`declarants[${i}].stamp_number`, '');
        setEverkData(null);
    }
    const filledEverk = val => !!everkData && !!everkData[val]
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
        <tr onClick={declarant.date_archive ? () => null : activateClick} className={`DocItem caps ${error ? 'error' : ''}`}>
            <td>{declarant.date_created ? moment(declarant.date_created).format("DD.MM.YYYY") : ''}</td>
            <td className="no-caps"><i>{status}{declarant.date_archive && ' (в архиве)'}</i></td>
            <td>{declarant.id || ''}</td>
            <td>{[lastName, firstName, secondName].filter(f => f).join(' ')}</td>
            <td>{email}</td>
            <td>{declarant.date_archive ? '' : declarant.documents ? declarant.documents.length + docConst : docConst}</td>
            <td>
                {!declarant.date_archive && <img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" alt="" />}
            </td>
        </tr>
        <tr className={`DocItem collapse ${active && 'active'}`}>
            <td colSpan="7">
                <FormGroup className="card">
                    {declarant.rejected_comment && <div className="alert alert-danger">
                        {declarant.rejected_comment.comment}
                    </div>}
                    <input type="hidden" name={`declarants[${i}].id`} />
                    <input type="hidden" name={`declarants[${i}].declarant_uid`} />
                    <b><FormField disabled={update} fieldType="customCheckbox" name={`declarants[${i}].express`} label='Срочная' /></b>
                    <RadioGroup disabled={update} radios={[
                        {
                            name: `declarants[${i}].two_generation`,
                            label: 'Выписка из ВЕРК РКФ единого образца (на двух языках)'
                        },
                        {
                            name: `declarants[${i}].one_generation`,
                            label: 'Свидетельство о регистрации собаки в ВЕРК РКФ'
                        }
                    ]} />
                    <FormGroup inline>
                        <FormField disabled={update || !!everkData} placeholder="XXX" fieldType="reactSelectCreatable" options={stampCodes} name={`declarants[${i}].stamp_code_name`} label='Код клейма' onChange={e => formik.setFieldValue(`declarants[${i}].stamp_code_name`, e.toUpperCase())} />
                        <FormField disabled={update || !!everkData} name={`declarants[${i}].stamp_number`} label='Номер клейма' placeholder="0000" />
                        <HideIf cond={!!everkData || update}>
                            <Button onClick={e => {
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
                    <Link to={`/${clubAlias}/documents/stamps/add`}>Добавить клеймо</Link>

                    <FormGroup inline>
                        <Transliteratable disabled={update} name={`declarants[${i}].owner_last_name`} label='Фамилия владельца' onChange={e => { formik.handleChange(e); setLastName(e.target.value) }} />
                        <Transliteratable disabled={update} name={`declarants[${i}].owner_first_name`} label='Имя владельца' onChange={e => { formik.handleChange(e); setFirstName(e.target.value) }} />
                    </FormGroup>
                    <HideIf cond={!declarant.owner_last_name?.includes(' ')}>
                        <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
                    </HideIf>
                    <FormField disabled={update} name={`declarants[${i}].owner_second_name`} label='Отчество владельца (опционально)' onChange={e => { formik.handleChange(e); setSecondName(e.target.value) }} />
                    <FormField disabled={update} name={`declarants[${i}].email`} label='Email владельца' onChange={e => { formik.handleChange(e); setEmail(e.target.value) }} />

                    <Transliteratable disabled={update || filledEverk('owner_address')} name={`declarants[${i}].owner_address`} label='Адрес владельца (Индекс, город, улица, дом, строение, кв./офис)' />
                    <FormGroup inline>
                        <FormField disabled={update} name={`declarants[${i}].breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..." />
                        <FormField disabled={update} name={`declarants[${i}].dog_birth_date`} label='Дата рождения собаки' fieldType="formikDatePicker" readOnly={true} />
                    </FormGroup>
                    <Transliteratable disabled={update || filledEverk('dog_name')} name={`declarants[${i}].dog_name`} label='Кличка собаки' />
                    <FormGroup inline>
                        <FormField disabled={update || filledEverk('color')} name={`declarants[${i}].color`} label='Окрас' />
                        <FormField disabled={update} name={`declarants[${i}].dog_sex_type`} fieldType="reactSelect" options={sexTypes} placeholder="Выберите..." label='Пол собаки' />
                    </FormGroup>

                    <VerkParent
                        update={update}
                        view={view}
                        declarant={declarant}
                        i={i}
                        distinction={distinction}
                        addDocument={true}
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
                        addDocument={true}
                        everkData={everkData}
                        who="mother"
                        whoRu="производительницы"
                        checkboxCaption='Иностранная производительница'
                    />

                    <FormGroup inline>
                        <FormField disabled={update} name={`declarants[${i}].breeder_last_name`} label='Фамилия заводчика' />
                        <FormField disabled={update} name={`declarants[${i}].breeder_first_name`} label='Имя заводчика' />
                    </FormGroup>
                    <HideIf cond={!declarant.breeder_last_name?.includes(' ')}>
                        <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
                    </HideIf>
                    <FormField disabled={update} name={`declarants[${i}].breeder_second_name`} label='Отчество заводчика (опционально)' />
                    <FormField disabled={update || filledEverk('breeder_address')} name={`declarants[${i}].breeder_address`} label='Адрес заводчика (Индекс, город, улица, дом, строение, кв./офис)' />

                    <FormField disabled={update} name={`declarants[${i}].chip_number`} label='Номер чипа (опционально)' />
                    <FormField
                        disabled={update}
                        name={`declarants[${i}].was_reviewed`}
                        fieldType="customCheckbox"
                        label='Щенок был на пересмотре, соответствует племенным требованиям'
                        onChange={e => { formik.handleChange(e); formik.setFieldValue(`declarants[${i}].litter_or_request_number`, '') }}
                    />

                    <FormGroup inline>
                        <FormField disabled={update} name={`declarants[${i}].owner_last_name_lat`} label='Фамилия владельца латиницей' />
                        <FormField disabled={update} name={`declarants[${i}].owner_first_name_lat`} label='Имя владельца латиницей' />
                    </FormGroup>
                    <HideIf cond={!declarant.owner_last_name_lat?.includes(' ')}>
                        <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
                    </HideIf>
                    <FormField disabled={update || filledEverk('owner_address_lat')} name={`declarants[${i}].owner_address_lat`} label='Адрес владельца латиницей' />

                    <FormField disabled={update || filledEverk('dog_name_lat')} name={`declarants[${i}].dog_name_lat`} label='Кличка собаки латиницей' />

                    <h4>Файлы должны быть загружены в одном из следующих форматов: PDF, JPEG, JPG</h4>
                    <FormFile
                        name={`declarants[${i}].biometric_card_document`}
                        label='Метрика щенка'
                        docId={declarant.biometric_card_document_id}
                        disabled={view || declarant.biometric_card_document_accept || !statusAllowsUpdate}
                        distinction={distinction}
                    />

                    {/*<FormFile
                name={`declarants[${i}].request_extract_from_verk_document`}
                label='Заявка на изготовление выписки из ВЕРК'
                docId={declarant.request_extract_from_verk_document_id}
                disabled={view || declarant.request_extract_from_verk_document_accept || !statusAllowsUpdate}
                form={{filename:"request_extract_from_verk_document.docx", href: verkHref, linkText: 'Скачать шаблон формы'}}
                distinction={distinction}
            />*/}

                    <FormFile
                        name={`declarants[${i}].personal_data_document`}
                        label='Соглашение на обработку персональных данных'
                        docId={declarant.personal_data_document_id}
                        disabled={view || declarant.personal_data_document_accept || !statusAllowsUpdate}
                        form={{ filename: "privacy.docx", href: privacyHref, linkText: 'Скачать форму соглашения' }}
                        distinction={distinction}
                    />


                    <FieldArray name={`declarants[${i}].documents`} render={({ push, remove }) => (<>
                        {declarant.documents && declarant.documents.map((doc, j) => <FormGroup inline key={j}>
                            <input type="hidden" name={`declarants[${i}].documents[${j}].id`} />
                            <FormField disabled={view || !statusAllowsDocumentsUpdate || doc.document_accept} options={doctypes} label={`Документ ${j + 1} - описание`} placeholder="Выберите..." fieldType="reactSelect" name={`declarants[${i}].documents[${j}].document_type_id`} />
                            <HideIf cond={view || !statusAllowsDocumentsUpdate || doc.document_accept}>
                                <FormField disabled={view || !statusAllowsDocumentsUpdate || doc.document_accept} label={`Документ ${j + 1}`} fieldType="file" name={`declarants[${i}].documents[${j}].document`} accept={accept} />
                            </HideIf>
                            <DocLink distinction={distinction} docId={doc.document_id} />
                            <HideIf cond={update}>
                                <DeleteButton onClick={() => remove(j)} title="Удалить" />
                            </HideIf>
                        </FormGroup>)}
                        <HideIf cond={view || !statusAllowsDocumentsUpdate || (declarant.documents && declarant.documents.length > 29)}>
                            <p>Вы можете добавить дополнительные документы</p>
                            <div className="flex-row">
                                <Button small onClick={() => push({ document_type_id: '', document: '' })}>Добавить доп. документ</Button>
                            </div>
                        </HideIf>
                    </>)}
                    />
                    <HideIf cond={!update}>
                        <FormField
                            name={`declarants[${i}].comment`}
                            label={`Комментарий`}
                            disabled={![2, 4, 11].includes(declarant.status_id)}
                        />
                    </HideIf>
                    <HideIf cond={update}>
                        <Button className="btn-red" onClick={closeClick}>Удалить</Button>
                    </HideIf>
                </FormGroup>
            </td>
        </tr>
    </>
};

export default connect(React.memo(DocItem));
