import React, { useState } from "react";
import { connect, FieldArray } from "formik";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import DocLink from "../../components/DocLink";
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
const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes, formik, view, update, privacyHref, verkHref, statuses, litterStatuses, litterHref }) => {
    const distinction = "litter";
    const declarant = formik.values.declarants[i];
    const [email, setEmail] = useState(declarant.email || '');
    const [firstName, setFirstName] = useState(declarant.first_name || '');
    const [lastName, setLastName] = useState(declarant.last_name || '');
    const [secondName, setSecondName] = useState(declarant.second_name || '');
    const [activePuppy, setActivePuppy] = useState(0);
    const [everkAlert, setEverkAlert] = useState(false);
    const [everkData, setEverkData] = useState(null);
    const statusAllowsUpdate = declarant.status_id ? declarant.status_id === 2 : true;
    let status = statuses.find(s => s.id === declarant.status_id);
    status = status ? status.name : 'Не обработана';
    let error = formik.errors.declarants && formik.errors.declarants[i] && formik.touched.declarants && formik.touched.declarants[i];
    
    const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));
    const getEverkData = stamp_number =>
        PromiseRequest(`${apiLitterEverk}?stamp_number=${stamp_number}`)
        .then(data => {
            Object.keys(data).forEach(k => data[k] && formik.setFieldValue(`declarants[${i}].${k}`, data[k]))
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
    <tr className={`DocItem ${error ? 'error' : ''}`}>
        <td>{declarant.date_created ? moment(declarant.date_created).format("DD.MM.YYYY") : ''}</td>
        <td><i>{status}</i></td>
        <td>{declarant.id || ''}</td>
        <td>{[lastName, firstName, secondName].filter(f=>f).join(' ')}</td>
        <td>{email}</td>
        <td>{declarant.documents ? declarant.documents.length + 6 : 6}</td>
        <td>
        <img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" onClick={activateClick} alt=""/>
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
            <FormGroup inline>
                <FormField disabled={update || !!everkData} name={`declarants[${i}].stamp_number`} label='Код клейма'/>
                <HideIf cond={!!everkData}>
                    <Button onClick={e => getEverkData(declarant.stamp_number)}>Поиск</Button>
                </HideIf>
                <HideIf cond={!everkData}>
                    <Button className="btn-red" onClick={e => clearEverkData()}>Очистить</Button>
                </HideIf>
            </FormGroup>
            
            <FormField disabled={update} name={`declarants[${i}].first_name`} label='Имя заводчика' onChange={e => {formik.handleChange(e); setFirstName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].last_name`} label='Фамилия заводчика' onChange={e => {formik.handleChange(e); setLastName(e.target.value)}}/>
            <HideIf cond={!declarant.last_name.includes(' ')}>
                <p>Пожалуйста, заполните фамилию без инициалов, даже если в таком виде пришли данные из ВЕРК</p>
            </HideIf>
            <FormField disabled={update} name={`declarants[${i}].second_name`} label='Отчество заводчика (опционально)' onChange={e => {formik.handleChange(e); setSecondName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].email`} label='Email заводчика' onChange={e => {formik.handleChange(e); setEmail(e.target.value)}}/>
            
            <FormField disabled={update || filledEverk('address')} name={`declarants[${i}].address`} label='Адрес заводчика'/>
            <FormField disabled={update} name={`declarants[${i}].first_name_lat`} label='Имя заводчика латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].last_name_lat`} label='Фамилия заводчика латиницей'/>
            <HideIf cond={!declarant.last_name_lat.includes(' ')}>
                <p>Пожалуйста, заполните фамилию без инициалов, даже если в таком виде пришли данные из ВЕРК</p>
            </HideIf>
            <FormField disabled={update || filledEverk('address_lat')} name={`declarants[${i}].address_lat`} label='Адрес заводчика латиницей'/>

            <FormField disabled={update} name={`declarants[${i}].breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..."/>
            
            <VerkParent
                update={update}
                view={view}
                declarant={declarant}
                i={i}
                distinction={distinction}
                addDocument={false}
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

            <FormField disabled={update} name={`declarants[${i}].date_of_birth_litter`} label='Дата рождения помета' fieldType="reactDayPicker"/>

            <FormField disabled={update} name={`declarants[${i}].nursery_name`} label='Название питомника (опционально)'/>
            <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_first_name`} label='Имя инструктора / владельца питомника (опционально)'/>
            <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_last_name`} label='Фамилия инструктора / владельца питомника (опционально)'/>
            <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_second_name`} label='Отчество инструктора / владельца питомника (опционально)'/>
            
            <FormField disabled={update} name={`declarants[${i}].hallmark_first_name`} label='Имя ответственного за клеймление'/>
            <FormField disabled={update} name={`declarants[${i}].hallmark_last_name`} label='Фамилия ответственного за клеймление'/>
            <FormField disabled={update} name={`declarants[${i}].hallmark_second_name`} label='Отчество ответственного за клеймление (опционально)'/>
            
            {/*files*/}
            <FormFile
                name={`declarants[${i}].application_document`}
                label='Заявление на регистрацию помета'
                docId={declarant.application_document_id}
                disabled={view || declarant.application_document_accept || !statusAllowsUpdate}
                distinction={distinction}
                form={{filename:"litter_application.docx", href: litterHref, linkText: 'Скачать бланк заявления'}}
            />
            <FormFile
                name={`declarants[${i}].litter_diagnostic`}
                label='Акт обследования помета'
                docId={declarant.litter_diagnostic_id}
                disabled={view || declarant.litter_diagnostic_accept || !statusAllowsUpdate}
                distinction={distinction}
            />
            <FormFile
                name={`declarants[${i}].dog_mating_act`}
                label='Акт вязки'
                docId={declarant.dog_mating_act_id}
                disabled={view || declarant.dog_mating_act_accept || !statusAllowsUpdate}
                distinction={distinction}
            />
            <FormFile
                name={`declarants[${i}].parent_certificate_1`}
                label='Свидетельство о происхождении производителя'
                docId={declarant.parent_certificate_1_id}
                disabled={view || declarant.parent_certificate_1_accept || !statusAllowsUpdate}
                distinction={distinction}
            />
            <FormFile
                name={`declarants[${i}].parent_certificate_2`}
                label='Свидетельство о происхождении производительницы'
                docId={declarant.parent_certificate_2_id}
                disabled={view || declarant.parent_certificate_2_accept || !statusAllowsUpdate}
                distinction={distinction}
            />
            <FormFile
                name={`declarants[${i}].personal_data_document`}
                label='Соглашение на обработку персональных данных'
                docId={declarant.personal_data_document_id}
                disabled={view || declarant.personal_data_document_accept || !statusAllowsUpdate}
                form={{filename:"privacy.docx", href: privacyHref, linkText: 'Скачать форму соглашения'}}
                distinction={distinction}
            />
            {/*files*/}

            <h4>Щенки</h4>
            <FieldArray name={`declarants[${i}].litters`} render={({push, remove}) => (<table>
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
                    {declarant.litters && declarant.litters.map((puppy,j) => 
                        <PuppyItem
                            puppy={puppy}
                            j={j}
                            i={i}
                            key={j}
                            activePuppy={activePuppy}
                            activateClick={() => setActivePuppy(activePuppy === j ? -1 : j)}
                            deleteClick={() => {remove(j); setActivePuppy(-1);}}
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
                                            dog_name:'',
                                            dog_color:'',
                                            dog_sex_type_id:'',
                                            stamp_number:'',
                                            chip_number:'',
                                            litter_dog_status_id:'',
                                            status_comment:''
                                        });
                                        setActivePuppy(declarant.litters ? declarant.litters.length : 0);
                                    }}>Добавить щенка</Button>
                                </div>
                            </HideIf>
                        </td>
                    </tr>
                </tbody>
            </table>)} />
            
            <FieldArray name={`declarants[${i}].documents`} render={({push, remove}) => (<>
            {declarant.documents && declarant.documents.map((doc,j) => <FormGroup inline key={j}>
                    <input type="hidden" name={`declarants[${i}].documents[${j}].id`} />
                    <FormField disabled={view || !statusAllowsUpdate || doc.accept} options={doctypes} label={`Документ ${j + 1} - описание`} placeholder="Выберите..." fieldType="reactSelect" name={`declarants[${i}].documents[${j}].document_type_id`} />
                    <HideIf cond={view || !statusAllowsUpdate || doc.accept}>
                        <FormField disabled={view || !statusAllowsUpdate || doc.document_accept} label={`Документ ${j + 1}`} fieldType="file" name={`declarants[${i}].documents[${j}].document`} accept={accept} />
                    </HideIf>
                    <DocLink distinction={distinction} docId={doc.document_id}/>
                    <HideIf cond={update}>
                        <DeleteButton onClick={() => remove(j)} title="Удалить"/>
                    </HideIf>
                </FormGroup>)}
                <HideIf cond={view || !statusAllowsUpdate || (declarant.documents && declarant.documents.length > 29)}>
                    <p>Вы можете добавить дополнительные документы</p>
                    <div className="flex-row">
                        <Button small onClick={() => push({document_type_id:'',document:''})}>Добавить доп. документ</Button>
                    </div>
                </HideIf>
            </>)}
            />
            <HideIf cond={update}>
                <Button className="btn-red" onClick={closeClick}>Удалить</Button>
            </HideIf>
        </FormGroup>
    </td>
    </tr>
    </>
};

export default connect(React.memo(DocItem));
