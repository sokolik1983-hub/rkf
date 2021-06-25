import React, { useState } from "react";
import { connect, FieldArray } from "formik";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import DocLink from "../../components/DocLink";
import Transliteratable from "../../components/Transliteratable";
import FormFile from "../../components/FormFile";
import PuppyItem from "../../components/PuppyItem";
import VerkParent from "../../components/VerkParent";
import { Request } from "utils/request";
import { apiLitterEverk } from "../../config.js";
import Alert from "components/Alert";
import { FormGroup, FormField } from "components/Form";
import HideIf from "components/HideIf";
import moment from "moment";
import "./index.scss";

const accept = ".pdf, .jpg, .jpeg";
// litter
const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes, formik, view, update, privacyHref, verkHref, statuses, litterStatuses, litterHref, stampCodes, nurseryAlias }) => {
    const distinction = "litter";
    const declarant = formik.values.declarants[i];
    const [email, setEmail] = useState(declarant.email || '');
    const [firstName, setFirstName] = useState(declarant.first_name || '');
    const [lastName, setLastName] = useState(declarant.last_name || '');
    const [secondName, setSecondName] = useState(declarant.second_name || '');
    const [activePuppy, setActivePuppy] = useState(0);
    const [everkAlert, setEverkAlert] = useState(false);
    const [everkData, setEverkData] = useState(null);
    const statusAllowsUpdate = declarant.status_id ? [2, 4, 7].includes(declarant.status_id) : true;
    const statusAllowsDocumentsUpdate = declarant.status_id ? [2, 4, 7, 8].includes(declarant.status_id) : true;
    let status = statuses.find(s => s.id === declarant.status_id);
    status = status ? status.name : 'Не обработана';
    let error = formik.errors.declarants && formik.errors.declarants[i] && formik.touched.declarants && formik.touched.declarants[i];

    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    const getEverkData = stamp_code =>
        PromiseRequest(`${apiLitterEverk}?stamp_code=${stamp_code}`)
            .then(data => {
                Object.keys(data).forEach(k => data[k] && formik.setFieldValue(`declarants[${i}].${k}`, data[k]))
                setEverkData(data);
                setEverkAlert(true);
            })
            .catch(e => setEverkAlert(true));
    const clearEverkData = () => {
        if (!everkData) return;
        Object.keys(everkData).forEach(k => everkData[k] && formik.setFieldValue(`declarants[${i}].${k}`, ''));
        setEverkData(null);
    }
    const filledEverk = val => !!everkData && !!everkData[val];
    const docConst = 4 + Number(declarant && declarant.father_foreign) + (declarant?.receipt_payment_fee_violated_breeding_document_id ? 1 : 0) + (declarant?.decision_breeding_commission_document_id ? 1 : 0);

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
        <tr className={`DocItem caps ${error ? 'error' : ''}`}>
            <td>{declarant.date_created ? moment(declarant.date_created).format("DD.MM.YYYY") : ''}</td>
            <td className="no-caps"><i>{status}{declarant.date_archive && ' (в архиве)'}</i></td>
            <td>{declarant.id || ''}</td>
            <td>{[lastName, firstName, secondName].filter(f => f).join(' ')}</td>
            <td>{email}</td>
            <td>{declarant.date_archive ? '' : declarant.documents ? (declarant.documents.length + docConst) : docConst}</td>
            <td>
                {!declarant.date_archive && <img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" onClick={activateClick} alt="" />}
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
                    <FormField
                        fieldType="customCheckbox"
                        name={`declarants[${i}].express`}
                        label='Срочное изготовление'
                        disabled
                    />
                    <FormGroup inline>
                        <FormField disabled={update || !!everkData} placeholder="Выберите..." fieldType="reactSelect" options={stampCodes} name={`declarants[${i}].stamp_code_id`} label='Код клейма' />
                        <HideIf cond={true || !!everkData || update}>
                            <Button onClick={e => {
                                let stamp_code = stampCodes && stampCodes.find(f => declarant.stamp_code_id === f.value);
                                if (!stamp_code) return;
                                stamp_code = stamp_code.label;
                                getEverkData(stamp_code);
                            }}>Поиск</Button>
                        </HideIf>
                        <HideIf cond={true || !everkData || update}>
                            <Button className="btn-red" onClick={e => clearEverkData()}>Очистить</Button>
                        </HideIf>
                    </FormGroup>
                    {/*<Link to={`/kennel/${nurseryAlias}/documents/stamps/add`}>Добавить клеймо</Link>*/}

                    <FormGroup inline>
                        <Transliteratable disabled={update} name={`declarants[${i}].last_name`} label='Фамилия заводчика' onChange={e => { formik.handleChange(e); setLastName(e.target.value) }} />
                        <Transliteratable disabled={update} name={`declarants[${i}].first_name`} label='Имя заводчика' onChange={e => { formik.handleChange(e); setFirstName(e.target.value) }} />
                    </FormGroup>
                    <HideIf cond={!declarant.last_name?.includes(' ')}>
                        <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
                    </HideIf>
                    <FormField disabled={update} name={`declarants[${i}].second_name`} label='Отчество заводчика (опционально)' onChange={e => { formik.handleChange(e); setSecondName(e.target.value) }} />
                    <FormField disabled={update} name={`declarants[${i}].email`} label='Email заводчика' onChange={e => { formik.handleChange(e); setEmail(e.target.value) }} />

                    <Transliteratable disabled={update || filledEverk('address')} name={`declarants[${i}].address`} label='Адрес заводчика (Индекс, город, улица, дом, строение, кв./офис)' />

                    <FormGroup inline>
                        <FormField disabled={update} name={`declarants[${i}].breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..." />
                        <FormField disabled={update} name={`declarants[${i}].date_of_birth_litter`} label='Дата рождения помета' readOnly={true} fieldType="formikDatePicker" required={false} />
                    </FormGroup>

                    <VerkParent
                        update={update}
                        view={view}
                        declarant={declarant}
                        i={i}
                        distinction={distinction}
                        addDocument={true}
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
                        addDocument={false}
                        who="mother"
                        whoRu="производительницы"
                        checkboxCaption='Иностранная производительница'
                    />


                    <FormField disabled={update} name={`declarants[${i}].nursery_name`} label='Название питомника (опционально)' />
                    <HideIf cond={!(declarant && declarant.nursery_name)}>
                        <FormField disabled={update} fieldType="customCheckbox" name={`declarants[${i}].prefix`} label='Префикс' />
                        <FormField disabled={update} fieldType="customCheckbox" name={`declarants[${i}].suffix`} label='Суффикс' />
                    </HideIf>
                    <FormGroup inline>
                        <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_last_name`} label='Фамилия инструктора клуба / владельца питомника (опционально)' />
                        <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_first_name`} label='Имя инструктора клуба / владельца питомника (опционально)' />
                    </FormGroup>
                    <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_second_name`} label='Отчество инструктора клуба / владельца питомника (опционально)' />

                    <FormGroup inline>
                        <FormField disabled={update} name={`declarants[${i}].hallmark_last_name`} label='Фамилия ответственного за клеймление' />
                        <FormField disabled={update} name={`declarants[${i}].hallmark_first_name`} label='Имя ответственного за клеймление' />
                    </FormGroup>
                    <FormField disabled={update} name={`declarants[${i}].hallmark_second_name`} label='Отчество ответственного за клеймление (опционально)' />

                    <FormGroup inline>
                        <FormField disabled={update} name={`declarants[${i}].last_name_lat`} label='Фамилия заводчика латиницей' />
                        <FormField disabled={update} name={`declarants[${i}].first_name_lat`} label='Имя заводчика латиницей' />
                    </FormGroup>
                    <HideIf cond={!declarant.last_name_lat?.includes(' ')}>
                        <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
                    </HideIf>
                    <FormField disabled={update || filledEverk('address_lat')} name={`declarants[${i}].address_lat`} label='Адрес заводчика латиницей' />

                    {/*files*/}
                    <h4>Файлы должны быть загружены в одном из следующих форматов: PDF, JPEG, JPG</h4>
                    <FormGroup inline>
                        <FormFile
                            name={`declarants[${i}].dog_mating_act`}
                            label='Акт вязки'
                            docId={declarant.dog_mating_act_id}
                            disabled={view || declarant.dog_mating_act_accept || !statusAllowsUpdate}
                            distinction={distinction}
                        />
                        <FormFile
                            name={`declarants[${i}].litter_diagnostic`}
                            label='Акт обследования помета'
                            docId={declarant.litter_diagnostic_id}
                            disabled={view || declarant.litter_diagnostic_accept || !statusAllowsUpdate}
                            distinction={distinction}
                        />
                    </FormGroup>
                    <FormGroup inline>
                        <FormFile
                            name={`declarants[${i}].application_document`}
                            label='Заявление на регистрацию помета'
                            docId={declarant.application_document_id}
                            disabled={view || declarant.application_document_accept || !statusAllowsUpdate}
                            distinction={distinction}
                        />
                        <FormFile
                            name={`declarants[${i}].personal_data_document`}
                            label='Соглашение на обработку персональных данных'
                            docId={declarant.personal_data_document_id}
                            disabled={view || declarant.personal_data_document_accept || !statusAllowsUpdate}
                            form={{ filename: "privacy.docx", href: privacyHref, linkText: 'Скачать форму соглашения' }}
                            distinction={distinction}
                        />
                    </FormGroup>
                    <FormGroup inline>
                        {(declarant.status_id === 9 || declarant.decision_breeding_commission_document_id) &&
                            < FormFile
                                name={`declarants[${i}].decision_breeding_commission_document`}
                                label='Решение/ответ племенной комиссии'
                                docId={declarant.decision_breeding_commission_document_id}
                                disabled={view || declarant.decision_breeding_commission_document_accept}
                                distinction={distinction}
                                document_type_id={55}
                            />}
                        {(declarant.status_id === 9 || declarant.receipt_payment_fee_violated_breeding_document_id) &&
                            <FormFile
                                name={`declarants[${i}].receipt_payment_fee_violated_breeding_document`}
                                label='Квитанция о дополнительном взносе на регистрацию в ВЕРК помета, полученного с нарушениями Племенного положения РКФ.'
                                docId={declarant.receipt_payment_fee_violated_breeding_document_id}
                                disabled={view || declarant.receipt_payment_fee_violated_breeding_document_accept}
                                distinction={distinction}
                                document_type_id={56}
                            />}
                    </FormGroup>

                    <h4>Щенки</h4>
                    <FieldArray name={`declarants[${i}].litters`} render={({ push, remove }) => (<table>
                        <thead>
                            <tr>
                                <th>Кличка</th>
                                <th>Окрас</th>
                                <th>Пол</th>
                                <th>№ клейма</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {declarant.litters && declarant.litters.map((puppy, j) =>
                                <PuppyItem
                                    puppy={puppy}
                                    j={j}
                                    i={i}
                                    key={j}
                                    activePuppy={activePuppy}
                                    activateClick={() => setActivePuppy(activePuppy === j ? -1 : j)}
                                    deleteClick={() => { remove(j); setActivePuppy(-1); }}
                                    sexTypes={sexTypes}
                                    error={error && formik.errors.declarants[i].litters && formik.errors.declarants[i].litters[j] && formik.touched.declarants[i].litters && formik.touched.declarants[i].litters[j]}
                                    cantEdit={view || declarant.litters_accept || !statusAllowsUpdate}
                                    litterStatuses={litterStatuses}
                                    puppyCount={declarant.litters ? declarant.litters.length : 0}
                                />)
                            }
                            <tr>
                                <td colSpan="5">
                                    <HideIf cond={view || declarant.litters_accept || !statusAllowsUpdate}>
                                        <div className="flex-row">
                                            <Button small onClick={() => {
                                                push({
                                                    dog_name: '',
                                                    dog_color: '',
                                                    dog_sex_type_id: '',
                                                    stamp_number: '',
                                                    chip_number: '',
                                                    litter_dog_status_id: '',
                                                    status_comment: ''
                                                });
                                                setActivePuppy(declarant.litters ? declarant.litters.length : 0);
                                            }}>Добавить щенка</Button>
                                        </div>
                                    </HideIf>
                                </td>
                            </tr>
                        </tbody>
                    </table>)} />

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
                            disabled={![2, 4, 8].includes(declarant.status_id)}
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
