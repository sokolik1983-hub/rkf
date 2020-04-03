import React, { useState } from "react";
import { connect, FieldArray } from "formik";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import DocLink from "../../components/DocLink";
import PlusButton from "../../../../components/PlusButton";
import { FormGroup, FormField } from "components/Form";
import FormFile from "../../components/FormFile";
import HideIf from "components/HideIf";
import moment from "moment";
import "./index.scss";

const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes, formik, view, update, privacyHref, statuses }) => {
    const declarant = formik.values.declarants[i];
    const [email, setEmail] = useState(declarant.email || '');
    const [firstName, setFirstName] = useState(declarant.owner_first_name || '');
    const [lastName, setLastName] = useState(declarant.owner_last_name || '');
    const [secondName, setSecondName] = useState(declarant.owner_second_name || '');
    const statusAllowsUpdate = declarant.status_id ? declarant.status_id === 2 : true;
    
    return <><tr className="DocItem">
        <td>{declarant.date_created ? moment(declarant.date_created).format("DD.MM.YYYY") : ''}</td>
        <td><i>{!!statuses.find(s => s.id === declarant.status_id) ? statuses[declarant.status_id].name : 'Не обработан'}</i></td>
        <td>{declarant.id || ''}</td>
        <td>{[lastName, firstName, secondName].filter(f=>f).join(' ')}</td>
        <td>{email}</td>
        <td>{declarant.documents ? declarant.documents.length + 2 : 2}</td>
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
            
            <FormField disabled={update} name={`declarants[${i}].owner_first_name`} label='Имя владельца' onChange={e => {formik.handleChange(e); setFirstName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].owner_last_name`} label='Фамилия владельца' onChange={e => {formik.handleChange(e); setLastName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].owner_second_name`} label='Отчество владельца (если есть)' onChange={e => {formik.handleChange(e); setSecondName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].email`} label='Email владельца' onChange={e => {formik.handleChange(e); setEmail(e.target.value)}}/>
            
            <FormField disabled={update} name={`declarants[${i}].owner_address`} label='Адрес владельца'/>
            <FormField disabled={update} name={`declarants[${i}].owner_first_name_lat`} label='Имя владельца латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].owner_last_name_lat`} label='Фамилия владельца латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].owner_address_lat`} label='Адрес владельца латиницей'/>

            <FormField disabled={update} name={`declarants[${i}].breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..."/>
            <FormField disabled={update} name={`declarants[${i}].dog_name`} label='Кличка собаки'/>
            <FormField disabled={update} name={`declarants[${i}].dog_name_lat`} label='Кличка собаки латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].dog_birth_date`} label='Дата рождения собаки' fieldType="reactDayPicker"/>
            <FormField disabled={update} name={`declarants[${i}].dog_sex_type`} fieldType="reactSelect" options={sexTypes} placeholder="Выберите..." label='Пол собаки'/>
            <FormField disabled={update} name={`declarants[${i}].stamp_number`} label='Номер клейма'/>
            <FormField disabled={update} name={`declarants[${i}].color`} label='Цвет'/>

            <FormField disabled={update} name={`declarants[${i}].father_name`} label='Кличка отца собаки'/>
            <FormField disabled={update} name={`declarants[${i}].father_pedigree_number`} label='Номер родословной отца собаки'/>
            <FormField disabled={update} name={`declarants[${i}].mother_name`} label='Кличка матери собаки'/>
            <FormField disabled={update} name={`declarants[${i}].mother_pedigree_number`} label='Номер родословной матери собаки'/>

            <FormField disabled={update} name={`declarants[${i}].breeder_first_name`} label='Имя заводчика'/>
            <FormField disabled={update} name={`declarants[${i}].breeder_last_name`} label='Фамилия заводчика'/>
            <FormField disabled={update} name={`declarants[${i}].breeder_second_name`} label='Отчество заводчика (если есть)'/>
            <FormField disabled={update} name={`declarants[${i}].breeder_address`} label='Адрес заводчика'/>

            <FormField disabled={update} name={`declarants[${i}].chip_number`} label='Номер чипа (если есть)'/>
            <FormField
                disabled={update}
                name={`declarants[${i}].was_reviewed`}
                type="checkbox"
                label='Щенок был на пересмотре, соответствует племенным требованиям'
                onChange={e => {formik.handleChange(e); formik.setFieldValue(`declarants[${i}].litter_or_request_number`, '')}}
            />
            <HideIf cond={!declarant.was_reviewed}>
                <FormField disabled={update} name={`declarants[${i}].litter_or_request_number`} label='Номер общепометной карты (или № заявки), в которую щенок был включен при регистрации помета.'/>
            </HideIf>
            <HideIf cond={view || declarant.biometric_card_document_accept || !statusAllowsUpdate}>
                <FormFile name={`declarants[${i}].biometric_card_document`} label='Метрика щенка' accept="application/pdf" type="file" />
            </HideIf>
            <DocLink docId={declarant.biometric_card_document_id} label='Метрика щенка' showLabel={view || declarant.biometric_card_document_accept} />
            <HideIf cond={view || declarant.personal_data_document_accept || !statusAllowsUpdate}>
                <FormFile name={`declarants[${i}].personal_data_document`} label='Соглашение на обработку персональных данных' accept="application/pdf" type="file" />
                <a download="privacy.docx" href={privacyHref}>Скачать форму соглашения</a>
            </HideIf>
            <DocLink docId={declarant.personal_data_document_id} label='Соглашение на обработку персональных данных' showLabel={view || declarant.personal_data_document_accept}/>
            <FieldArray name={`declarants[${i}].documents`} render={({push, remove}) => (<>
            {declarant.documents && declarant.documents.map((doc,j) => <FormGroup inline key={j}>
                    <input type="hidden" name={`declarants[${i}].documents[${j}].id`} />
                    <FormField disabled={update} options={doctypes} label={`Документ ${j + 1} - описание`} fieldType="reactSelect" name={`declarants[${i}].documents[${j}].document_type_id`} />
                    <HideIf cond={view || !statusAllowsUpdate || doc.accept}>
                        <FormFile disabled={view || !statusAllowsUpdate || doc.document_accept} label={`Документ ${j + 1}`} type="file" name={`declarants[${i}].documents[${j}].document`} accept="application/pdf" />
                    </HideIf>
                    <DocLink docId={doc.document_id}/>
                    <HideIf cond={update}>
                        <DeleteButton onClick={() => remove(j)} title="Удалить"/>
                    </HideIf>
                </FormGroup>)}
                <HideIf cond={update}>
                    <div className="flex-row">
                        <PlusButton small onClick={() => push({document_type_id:0,document:''})} title="Добавить документ"/>
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
