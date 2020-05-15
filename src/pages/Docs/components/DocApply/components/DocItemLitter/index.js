import React, { useState, useEffect } from "react";
import { connect, FieldArray } from "formik";
import { Link } from "react-router-dom";
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
const apiPrivacyEndpoint = '/api/requests/LitterRequest/personal_data_document';

const accept = ".pdf, .jpg, .jpeg, .png";
// litter
const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes, formik, view, update, verkHref, statuses, litterStatuses, litterHref, stampCodes, clubAlias }) => {
    const distinction = "litter";
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const declarant = formik.values;
    const [email, setEmail] = useState(declarant.email || '');
    const [privacyHref, setPrivacyHref] = useState(declarant.email || '');
    const [firstName, setFirstName] = useState(declarant.first_name || '');
    const [lastName, setLastName] = useState(declarant.last_name || '');
    const [secondName, setSecondName] = useState(declarant.second_name || '');
    const [activePuppy, setActivePuppy] = useState(-1);
    const [everkAlert, setEverkAlert] = useState(false);
    const [everkData, setEverkData] = useState(null);
    const statusAllowsUpdate = declarant.status_id ? [2,4,7].includes(declarant.status_id) : true;
    let status = statuses.find(s => s.id === declarant.status_id);
    status = status ? status.name : 'Не обработана';
    let error = formik.errors.declarants && formik.errors.declarants[i] && formik.touched.declarants && formik.touched.declarants[i];
    
    const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));
    const getEverkData = stamp_code =>
        PromiseRequest(`${apiLitterEverk}?stamp_code=${stamp_code}`)
        .then(data => {
            Object.keys(data).forEach(k => k !== 'id' && data[k] && formik.setFieldValue(`${k}`, data[k]))
            setEverkData(data);
            setEverkAlert(true);
        })
        .catch(e => setEverkAlert(true));
    const clearEverkData = () => {
        if (!everkData) return;
        Object.keys(everkData).forEach(k => k !== 'id' && everkData[k] && formik.setFieldValue(`${k}`, ''));
        setEverkData(null);
    }
    const filledEverk = val => !!everkData && !!everkData[val]


    useEffect(() => {
        Promise.all([
            fetch(apiPrivacyEndpoint, {headers})
            .then(response => response.blob())
            .then(data => setPrivacyHref(URL.createObjectURL(data))),
            //fetch(apiLitterEmptyDocument, {headers})
            //.then(response => response.blob())
            //.then(data => setLitterHref(URL.createObjectURL(data))),
        ])
    }, []);

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
    <div className={`DocItem`}>
        <FormGroup className="card">
            {declarant.rejected_comment && <div className="alert alert-danger">
                {declarant.rejected_comment.comment}
            </div>}
            <input type="hidden" name={`id`} />
            <input type="hidden" name={`declarant_uid`} />
            <FormGroup inline>
                <Transliteratable disabled={update} name={`last_name`} label='Фамилия заводчика' onChange={e => {formik.handleChange(e); setLastName(e.target.value)}}/>
                <Transliteratable disabled={update} name={`first_name`} label='Имя заводчика' onChange={e => {formik.handleChange(e); setFirstName(e.target.value)}}/>
                <FormField disabled={update} name={`second_name`} label='Отчество заводчика (не обязательное поле)' onChange={e => {formik.handleChange(e); setSecondName(e.target.value)}}/>
            </FormGroup>
            <HideIf cond={!declarant.last_name.includes(' ')}>
                <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
            </HideIf>

            <FormGroup inline>
                <FormField disabled={update} name={`email`} label='Email заводчика' onChange={e => {formik.handleChange(e); setEmail(e.target.value)}}/>
                <Transliteratable disabled={update || filledEverk('address')} name={`address`} label='Адрес заводчика (Индекс, город, улица, дом, строение, кв./офис)'/>
            </FormGroup>
            <FormGroup inline>
                <FormField disabled={update || !!everkData} placeholder="Выберите..." fieldType="reactSelect" options={stampCodes} name={`stamp_code_id`} label={`Код клейма (<a href="/${clubAlias}/documents/stamps/add">Добавить клеймо</a>)`}/>
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
                <FormField disabled={update} name={`breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..."/>
                <FormField disabled={update} name={`date_of_birth_litter`} label='Дата рождения помета' readOnly={true} fieldType="formikDatePicker"/>
            </FormGroup>
            
            <FormGroup inline>
            </FormGroup>
            
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


            <FormField disabled={update} name={`nursery_name`} label='Название питомника (опционально)'/>
            <FormGroup inline>
                <FormField disabled={update} name={`instructor_nursery_owner_last_name`} label='Фамилия инструктора клуба / владельца питомника (опционально)'/>
                <FormField disabled={update} name={`instructor_nursery_owner_first_name`} label='Имя инструктора клуба / владельца питомника (опционально)'/>
            </FormGroup>
            <FormField disabled={update} name={`instructor_nursery_owner_second_name`} label='Отчество инструктора клуба / владельца питомника (опционально)'/>
            
            <FormGroup inline>
                <FormField disabled={update} name={`hallmark_last_name`} label='Фамилия ответственного за клеймление'/>
                <FormField disabled={update} name={`hallmark_first_name`} label='Имя ответственного за клеймление'/>
            </FormGroup>
            <FormField disabled={update} name={`hallmark_second_name`} label='Отчество ответственного за клеймление (опционально)'/>
            
            <FormGroup inline>
                <FormField disabled={update} name={`last_name_lat`} label='Фамилия заводчика латиницей'/>
                <FormField disabled={update} name={`first_name_lat`} label='Имя заводчика латиницей'/>
            </FormGroup>
            <HideIf cond={!declarant.last_name_lat.includes(' ')}>
                <p className="red">Если вам известны имя и отчество - укажите их в данной форме. В противном случае разнесите инициалы, загруженные из ВЕРК, по соответствующим полям.</p>
            </HideIf>
            <FormField disabled={update || filledEverk('address_lat')} name={`address_lat`} label='Адрес заводчика латиницей'/>

            {/*files*/}
            <FormGroup inline>
            <FormFile
                name={`dog_mating_act`}
                label='Акт вязки (PDF, JPEG, JPG, PNG)'
                document_type_id={14}
                docId={declarant.dog_mating_act_id}
                disabled={view || declarant.dog_mating_act_accept || !statusAllowsUpdate}
                distinction={distinction}
            />
            <FormFile
                name={`litter_diagnostic`}
                label='Акт обследования помета (PDF, JPEG, JPG, PNG)'
                docId={declarant.litter_diagnostic_id}
                document_type_id={13}
                disabled={view || declarant.litter_diagnostic_accept || !statusAllowsUpdate}
                distinction={distinction}
            />
            <FormFile
                name={`personal_data_document`}
                label='Соглашение на обработку персональных данных (PDF, JPEG, JPG, PNG)'
                docId={declarant.personal_data_document_id}
                document_type_id={11}
                disabled={view || declarant.personal_data_document_accept || !statusAllowsUpdate}
                form={{filename:"privacy.docx", href: privacyHref, linkText: 'Скачать форму соглашения'}}
                distinction={distinction}
            />
            </FormGroup>
            {/*files*/}

            <h4>Щенки</h4>
            <FieldArray name={`litters`} render={({push, remove}) => (<table>
                <thead>
                    <tr>
                    <th>Кличка</th>
                    <th>Окрас</th>
                    <th>Пол</th>
                    <th>№ клейма</th>
                    <th></th>
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
                            deleteClick={() => {
                                if (window.confirm("Удалить щенка?")) {
                                    remove(j); setActivePuppy(-1);
                                }
                            }}
                            sexTypes={sexTypes}
                            error={formik.errors && formik.errors.litters && formik.errors.litters[j] && formik.touched.litters && formik.touched.litters[j]}
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
            
            <FieldArray name={`documents`} render={({push, remove}) => (<>
            {declarant.documents && declarant.documents.map((doc,j) => <FormGroup inline key={j}>
                    <input type="hidden" name={`documents[${j}].id`} />
                    <FormField disabled={view || !statusAllowsUpdate || doc.accept} options={doctypes} label={`Документ ${j + 1} - описание`} placeholder="Выберите..." fieldType="reactSelect" name={`documents[${j}].document_type_id`} />
                    <HideIf cond={view || !statusAllowsUpdate || doc.accept}>
                        <FormFile
                            name={`documents[${j}].document`}
                            label={`Документ ${j + 1} (PDF, JPEG, JPG, PNG)`}
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
                        <DeleteButton onClick={() => remove(j)} title="Удалить"/>
                    </HideIf>
                </FormGroup>)}
                <HideIf cond={view || !statusAllowsUpdate || (declarant.documents && declarant.documents.length > 29)}>
                    <p>Вы можете добавить дополнительные документы</p>
                    <div className="flex-row">
                        <Button small className="btn-primary" onClick={() => push({document_type_id:'',document:''})}>Добавить доп. документ</Button>
                    </div>
                </HideIf>
            </>)}
            />
        </FormGroup>
    </div>
    </>
};

export default connect(React.memo(DocItem));
