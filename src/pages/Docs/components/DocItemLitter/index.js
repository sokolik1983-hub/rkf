import React, { useState } from "react";
import { connect, FieldArray } from "formik";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import DocLink from "../../components/DocLink";
import FormFile from "../../components/FormFile";
import { FormGroup, FormField } from "components/Form";
import HideIf from "components/HideIf";
import moment from "moment";
import "./index.scss";

const accept = ".pdf, .jpg, .jpeg";

const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes, formik, view, update, privacyHref, verkHref, statuses }) => {
    const declarant = formik.values.declarants[i];
    const [email, setEmail] = useState(declarant.email || '');
    const [firstName, setFirstName] = useState(declarant.first_name || '');
    const [lastName, setLastName] = useState(declarant.last_name || '');
    const [secondName, setSecondName] = useState(declarant.second_name || '');
    const statusAllowsUpdate = declarant.status_id ? declarant.status_id === 2 : true;
    let status = statuses.find(s => s.id === declarant.status_id);
    status = status ? status.name : 'Не обработана';
    let error = formik.errors.declarants && formik.errors.declarants[i] && formik.touched.declarants && formik.touched.declarants[i];
    
    return <><tr className={`DocItem ${error ? 'error' : ''}`}>
        <td>{declarant.date_created ? moment(declarant.date_created).format("DD.MM.YYYY") : ''}</td>
        <td><i>{status}</i></td>
        <td>{declarant.id || ''}</td>
        <td>{[lastName, firstName, secondName].filter(f=>f).join(' ')}</td>
        <td>{email}</td>
        <td>{declarant.documents ? declarant.documents.length + 3 : 3}</td>
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
            
            <FormField disabled={update} name={`declarants[${i}].first_name`} label='Имя заводчика' onChange={e => {formik.handleChange(e); setFirstName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].last_name`} label='Фамилия заводчика' onChange={e => {formik.handleChange(e); setLastName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].second_name`} label='Отчество заводчика (опционально)' onChange={e => {formik.handleChange(e); setSecondName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].email`} label='Email заводчика' onChange={e => {formik.handleChange(e); setEmail(e.target.value)}}/>
            
            <FormField disabled={update} name={`declarants[${i}].address`} label='Адрес заводчика'/>
            <FormField disabled={update} name={`declarants[${i}].first_name_lat`} label='Имя заводчика латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].last_name_lat`} label='Фамилия заводчика латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].address_lat`} label='Адрес заводчика латиницей'/>

            <FormField disabled={update} name={`declarants[${i}].breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..."/>
            <FormField disabled={update} name={`declarants[${i}].stamp_number`} label='Номер клейма'/>

            <FormField disabled={update} name={`declarants[${i}].father_name`} label='Кличка производителя'/>
            <FormField disabled={update} name={`declarants[${i}].father_pedigree_number`} label='Номер родословной производителя'/>
            <FormField disabled={update} name={`declarants[${i}].mother_name`} label='Кличка производительницы'/>
            <FormField disabled={update} name={`declarants[${i}].mother_pedigree_number`} label='Номер родословной производительницы'/>

            <FormField disabled={update} name={`declarants[${i}].date_of_birth_litter`} label='Дата рождения помета' fieldType="reactDayPicker"/>

            <FormField disabled={update} name={`declarants[${i}].nursery_name`} label='nursery_name'/>
            <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_first_name`} label='instructor_nursery_owner_first_name'/>
            <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_last_name`} label='instructor_nursery_owner_last_name'/>
            <FormField disabled={update} name={`declarants[${i}].instructor_nursery_owner_second_name`} label='instructor_nursery_owner_second_name (опционально)'/>
            
            <FormField disabled={update} name={`declarants[${i}].hall_mark_first_name`} label='hall_mark_first_name'/>
            <FormField disabled={update} name={`declarants[${i}].hall_mark_last_name`} label='hall_mark_last_name'/>
            <FormField disabled={update} name={`declarants[${i}].hall_mark_second_name`} label='hall_mark_second_name (опционально)'/>
            
            {/*files*/}
            <FormFile
                name={`declarants[${i}].application_document`}
                label='application_document'
                docId={declarant.application_document_id}
                disabled={view || declarant.application_document_accept}
                statusAllowsUpdate={statusAllowsUpdate}
            />
            <FormFile
                name={`declarants[${i}].litter_diagnostic`}
                label='litter_diagnostic'
                docId={declarant.litter_diagnostic_id}
                disabled={view || declarant.litter_diagnostic_accept}
                statusAllowsUpdate={statusAllowsUpdate}
            />
            <FormFile
                name={`declarants[${i}].personal_data_document`}
                label='Соглашение на обработку персональных данных'
                docId={}
                disabled={view || declarant.personal_data_document_accept}
                statusAllowsUpdate={statusAllowsUpdate}
            />
            <FormFile
                name={`declarants[${i}].personal_data_document`}
                label='Соглашение на обработку персональных данных'
                docId={}
                disabled={view || declarant.personal_data_document_accept}
                statusAllowsUpdate={statusAllowsUpdate}
            />
            <FormFile
                name={`declarants[${i}].personal_data_document`}
                label='Соглашение на обработку персональных данных'
                docId={}
                disabled={view || declarant.personal_data_document_accept}
                statusAllowsUpdate={statusAllowsUpdate}
            />
            <FormFile
                name={`declarants[${i}].personal_data_document`}
                label='Соглашение на обработку персональных данных'
                docId={}
                disabled={view || declarant.personal_data_document_accept}
                statusAllowsUpdate={statusAllowsUpdate}
                form={{filename:"privacy.docx", href: privacyHref, linkText: 'Скачать форму соглашения'}}
            />
            {/*files*/}
            
            <FieldArray name={`declarants[${i}].documents`} render={({push, remove}) => (<>
            {declarant.documents && declarant.documents.map((doc,j) => <FormGroup inline key={j}>
                    <input type="hidden" name={`declarants[${i}].documents[${j}].id`} />
                    <FormField disabled={update} options={doctypes} label={`Документ ${j + 1} - описание`} placeholder="Выберите..." fieldType="reactSelect" name={`declarants[${i}].documents[${j}].document_type_id`} />
                    <HideIf cond={view || !statusAllowsUpdate || doc.accept}>
                        <FormField disabled={view || !statusAllowsUpdate || doc.document_accept} label={`Документ ${j + 1}`} fieldType="file" name={`declarants[${i}].documents[${j}].document`} accept={accept} />
                    </HideIf>
                    <DocLink docId={doc.document_id}/>
                    <HideIf cond={update}>
                        <DeleteButton onClick={() => remove(j)} title="Удалить"/>
                    </HideIf>
                </FormGroup>)}
                <HideIf cond={update || (declarant.documents && declarant.documents.length > 29)}>
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
