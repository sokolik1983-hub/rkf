import React, { useState } from "react";
import { connect, FieldArray, getIn } from "formik";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import DocLink from "../../components/DocLink";
import Alert from "components/Alert";
import { FormGroup, FormField } from "components/Form";
import { Request } from "utils/request";
import HideIf from "components/HideIf";
import moment from "moment";
import "./index.scss";

const accept = ".pdf, .jpg, .jpeg";
// pedigree
const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes, formik, view, update, privacyHref, verkHref, statuses }) => {
    const distinction = "pedigree";
    const declarant = formik.values.declarants[i];
    const [email, setEmail] = useState(declarant.email || '');
    const [firstName, setFirstName] = useState(declarant.owner_first_name || '');
    const [lastName, setLastName] = useState(declarant.owner_last_name || '');
    const [secondName, setSecondName] = useState(declarant.owner_second_name || '');
    const [fatherEverk, setFatherEverk] = useState(false);
    const [motherEverk, setMotherEverk] = useState(false);
    const [everkAlert, setEverkAlert] = useState(false);
    const setEverk = { 'father': setFatherEverk, 'mother': setMotherEverk };
    const statusAllowsUpdate = declarant.status_id ? declarant.status_id === 2 : true;

    const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));
    const getEverk = who => {
        let rfc = getIn(formik.values, `declarants[${i}].${who}_pedigree_number`);
        rfc = rfc.split('-')[1] || rfc;
        if (!rfc) return;
        PromiseRequest(`/api/dog/Dog/everk_dog/${rfc}`)
        .then(data => data && (data.name || data.name_lat))
        .then(name => {
            if (!name) {
                throw new Error("name not set");
            }
            setEverk[who] && setEverk[who](true);
            formik.setFieldValue(`declarants[${i}].${who}_name`, name);
        })
        .catch(x => setEverkAlert(true));
    }
    const clearEverk = who => {
        if (!setEverk[who]) return;
        setEverk[who](false);
        formik.setFieldValue(`declarants[${i}].${who}_name`, '');
        formik.setFieldValue(`declarants[${i}].${who}_pedigree_number`, '');
    }

    let status = statuses.find(s => s.id === declarant.status_id);
    status = status ? status.name : 'Не обработана';
    let error = formik.errors.declarants && formik.errors.declarants[i] && formik.touched.declarants && formik.touched.declarants[i];
    
    return <>
        {everkAlert &&
            <Alert
                title="Ошибка"
                text="Номер родословной не найден в базе ВЕРК. Если производитель иностранный, пожалуйста заполните поля вручную и прикрепите копию свидетельства о происхождении"
                autoclose={false}
                okButton={true}
                onOk={() => setEverkAlert(false)}
            />
        }
    <tr className={`DocItem ${error ? 'error' : ''}`}>
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
            <FormField disabled={update} fieldType="customCheckbox" name={`declarants[${i}].express`} label='Срочная'/>
            
            <FormField disabled={update} name={`declarants[${i}].owner_first_name`} label='Имя владельца' onChange={e => {formik.handleChange(e); setFirstName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].owner_last_name`} label='Фамилия владельца' onChange={e => {formik.handleChange(e); setLastName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].owner_second_name`} label='Отчество владельца (опционально)' onChange={e => {formik.handleChange(e); setSecondName(e.target.value)}}/>
            <FormField disabled={update} name={`declarants[${i}].email`} label='Email владельца' onChange={e => {formik.handleChange(e); setEmail(e.target.value)}}/>
            
            <FormField disabled={update} name={`declarants[${i}].owner_address`} label='Адрес владельца'/>
            <FormField disabled={update} name={`declarants[${i}].owner_first_name_lat`} label='Имя владельца латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].owner_last_name_lat`} label='Фамилия владельца латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].owner_address_lat`} label='Адрес владельца латиницей'/>

            <FormField disabled={update} name={`declarants[${i}].breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..."/>
            <FormField disabled={update} name={`declarants[${i}].dog_name`} label='Кличка собаки'/>
            <FormField disabled={update} name={`declarants[${i}].dog_name_lat`} label='Кличка собаки латиницей'/>
            <FormField disabled={update} name={`declarants[${i}].dog_birth_date`} label='Дата рождения собаки' fieldType="reactDayPicker" readOnly={true} />
            <FormField disabled={update} name={`declarants[${i}].dog_sex_type`} fieldType="reactSelect" options={sexTypes} placeholder="Выберите..." label='Пол собаки'/>
            <FormField disabled={update} name={`declarants[${i}].stamp_number`} label='Код клейма'/>
            <FormField disabled={update} name={`declarants[${i}].color`} label='Цвет'/>

            <FormGroup inline>
                <FormField disabled={update || fatherEverk} name={`declarants[${i}].father_pedigree_number`} label='Номер родословной производителя'/>
                <HideIf cond={update || declarant.father_foreign || fatherEverk}>
                    <Button onClick={e => getEverk('father')} disabled={fatherEverk}>Поиск</Button>
                </HideIf>
                <HideIf cond={update || !fatherEverk}>
                    <DeleteButton className="btn-red" onClick={e => clearEverk('father')} title="Удалить данные производителя"/> 
                </HideIf>
            </FormGroup>
            <FormField
                disabled={update || !declarant.father_foreign}
                name={`declarants[${i}].father_name`}
                label='Кличка производителя'
                placeholder={declarant.father_foreign ? 'Введите кличку' : 'Кличка заполняется автоматически по номеру родословной'}
            />
            <HideIf cond={fatherEverk}>
                <FormField
                    disabled={update}
                    fieldType="customCheckbox"
                    name={`declarants[${i}].father_foreign`}
                    label='Иностранный производитель'
                    onChange={e => {
                        formik.handleChange(e);
                        formik.setFieldValue(`declarants[${i}].father_pedigree_document`, '');
                        formik.setFieldValue(`declarants[${i}].father_name`, '');
                    }}
                />
                <HideIf cond={view || !statusAllowsUpdate || !declarant.father_foreign}>
                    <FormField name={`declarants[${i}].father_pedigree_document`} label='Свидетельство о происхождении производителя' accept={accept} fieldType="file" />
                </HideIf>
                <DocLink distinction={distinction} docId={declarant.father_pedigree_document_id} label='Свидетельство о происхождении производителя' showLabel={view} />
            </HideIf>
            
            <FormGroup inline>
                <FormField disabled={update || motherEverk} name={`declarants[${i}].mother_pedigree_number`} label='Номер родословной производителя'/>
                <HideIf cond={update || declarant.mother_foreign}>
                    <Button onClick={e => getEverk('mother')} disabled={motherEverk}>Поиск</Button>
                </HideIf>
            </FormGroup>
            <FormField disabled={update || motherEverk} name={`declarants[${i}].mother_name`} label='Кличка производителя'/>
            <HideIf cond={update || !motherEverk}>
                <Button className="btn-red" onClick={e => clearEverk('mother')}>Удалить данные производителя</Button> 
            </HideIf>
            <HideIf cond={motherEverk}>
                <FormField
                    disabled={update}
                    fieldType="customCheckbox"
                    name={`declarants[${i}].mother_foreign`}
                    label='Иностранный производитель'
                    onChange={e => {formik.handleChange(e); formik.setFieldValue(`declarants[${i}].mother_pedigree_document`, '')}}
                />
                <HideIf cond={view || !statusAllowsUpdate || !declarant.mother_foreign}>
                    <FormField name={`declarants[${i}].mother_pedigree_document`} label='Свидетельство о происхождении производителя' accept={accept} fieldType="file" />
                </HideIf>
                <DocLink distinction={distinction} docId={declarant.mother_pedigree_document_id} label='Свидетельство о происхождении производителя' showLabel={view} />
            </HideIf>

            <FormField disabled={update} name={`declarants[${i}].breeder_first_name`} label='Имя заводчика'/>
            <FormField disabled={update} name={`declarants[${i}].breeder_last_name`} label='Фамилия заводчика'/>
            <FormField disabled={update} name={`declarants[${i}].breeder_second_name`} label='Отчество заводчика (опционально)'/>
            <FormField disabled={update} name={`declarants[${i}].breeder_address`} label='Адрес заводчика'/>

            <FormField disabled={update} name={`declarants[${i}].chip_number`} label='Номер чипа (опционально)'/>
            <FormField
                disabled={update}
                name={`declarants[${i}].was_reviewed`}
                fieldType="customCheckbox"
                label='Щенок был на пересмотре, соответствует племенным требованиям'
                onChange={e => {formik.handleChange(e); formik.setFieldValue(`declarants[${i}].litter_or_request_number`, '')}}
            />
            <HideIf cond={!declarant.was_reviewed}>
                <FormField disabled={update} name={`declarants[${i}].litter_or_request_number`} label='Номер общепометной карты (или № заявки), в которую щенок был включен при регистрации помета.'/>
            </HideIf>
            
            <HideIf cond={view || declarant.biometric_card_document_accept || !statusAllowsUpdate}>
                <FormField name={`declarants[${i}].biometric_card_document`} label='Метрика щенка' accept={accept} fieldType="file" />
            </HideIf>
            <DocLink distinction={distinction} docId={declarant.biometric_card_document_id} label='Метрика щенка' showLabel={view || declarant.biometric_card_document_accept} />
            
            <HideIf cond={view || declarant.personal_data_document_accept || !statusAllowsUpdate}>
                <FormField name={`declarants[${i}].personal_data_document`} label='Соглашение на обработку персональных данных' accept={accept} fieldType="file" />
                <a download="privacy.docx" href={privacyHref}>Скачать форму соглашения</a>
            </HideIf>
            <DocLink distinction={distinction} docId={declarant.personal_data_document_id} label='Соглашение на обработку персональных данных' showLabel={view || declarant.personal_data_document_accept}/>
            
            <HideIf cond={view || declarant.request_extract_from_verk_document_accept || !statusAllowsUpdate}>
                <FormField name={`declarants[${i}].request_extract_from_verk_document`} label='Заявка на изготовление выписки из ВЕРК' accept={accept} fieldType="file" />
                <a download="request_extract_from_verk_document.docx" href={verkHref}>Скачать шаблон формы</a>
            </HideIf>
            <DocLink distinction={distinction} docId={declarant.request_extract_from_verk_document_id} label='Заявка на изготовление выписки из ВЕРК' showLabel={view || declarant.request_extract_from_verk_document_accept}/>
            
            <FieldArray name={`declarants[${i}].documents`} render={({push, remove}) => (<>
            {declarant.documents && declarant.documents.map((doc,j) => <FormGroup inline key={j}>
                    <input type="hidden" name={`declarants[${i}].documents[${j}].id`} />
                    <FormField disabled={update} options={doctypes} label={`Документ ${j + 1} - описание`} placeholder="Выберите..." fieldType="reactSelect" name={`declarants[${i}].documents[${j}].document_type_id`} />
                    <HideIf cond={view || !statusAllowsUpdate || doc.accept}>
                        <FormField disabled={view || !statusAllowsUpdate || doc.document_accept} label={`Документ ${j + 1}`} fieldType="file" name={`declarants[${i}].documents[${j}].document`} accept={accept} />
                    </HideIf>
                    <DocLink distinction={distinction} docId={doc.document_id}/>
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
