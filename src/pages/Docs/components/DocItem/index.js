import React, { useState } from "react";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import PlusButton from "../../../../components/PlusButton";
import {FormGroup, FormField} from "components/Form";
import "./index.scss";

const DocItem = ({ closeClick, i, validate, force, active, activateClick, doctypes, breeds, sexTypes }) => {
    const [moreDocs, setMoreDocs] = useState(0);
    const [docItems, setDocItems] = useState([]);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondName, setSecondName] = useState('');
    const plusClick = e => {
        setDocItems(docItems.concat(moreDocs));
        setMoreDocs(moreDocs + 1);
    }
    const deleteItem = i => {
        docItems.splice(i,1);
        setDocItems(docItems.concat([]));
    }

    return <><tr className="DocItem">
        <td>{new Date().toLocaleDateString("ru")}</td>
        <td><i>Не обработан</i></td>
        <td>322-223-322</td>
        <td>{[lastName, firstName, secondName].filter(f=>f).join(' ')}</td>
        <td>{email}</td>
        <td>{docItems.length + 1}</td>
        <td>
        <img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" onClick={activateClick} alt=""/>
        </td>
    </tr>
    <tr className={`DocItem collapse ${active && 'active'}`}>
    <td colSpan="7">
        <FormGroup className="card">
            <FormField name={`declarants[${i}].owner_first_name`} label='Имя владельца' onChange={e => setFirstName(e.target.value)}/>
            <FormField name={`declarants[${i}].owner_last_name`} label='Фамилия владельца' onChange={e => setLastName(e.target.value)}/>
            <FormField name={`declarants[${i}].owner_second_name`} label='Отчество владельца' onChange={e => setSecondName(e.target.value)}/>
            <FormField name={`declarants[${i}].owner_address`} label='Адрес владельца'/>
            <FormField name={`declarants[${i}].owner_first_name_lat`} label='Имя владельца латиницей'/>
            <FormField name={`declarants[${i}].owner_last_name_lat`} label='Фамилия владельца латиницей'/>
            <FormField name={`declarants[${i}].owner_address_lat`} label='Адрес владельца латиницей'/>

            <FormField name={`declarants[${i}].breed_id`} label='Порода' options={breeds} fieldType="reactSelect" placeholder="Выберите..."/>
            <FormField name={`declarants[${i}].dog_name`} label='Кличка собаки'/>
            <FormField name={`declarants[${i}].dog_name_lat`} label='Кличка собаки латиницей'/>
            <FormField name={`declarants[${i}].dog_birth_date`} label='Дата рождения собаки' type="date"/>
            <FormField name={`declarants[${i}].dog_sex_type`} fieldType="reactSelect" options={sexTypes} placeholder="Выберите..." label='Пол собаки'/>
            <FormField name={`declarants[${i}].stamp_number`} label='Номер клейма'/>
            <FormField name={`declarants[${i}].color`} label='Цвет'/>

            <FormField name={`declarants[${i}].father_name`} label='Кличка отца собаки'/>
            <FormField name={`declarants[${i}].father_pedigree_number`} label='Родословная отца собаки'/>
            <FormField name={`declarants[${i}].mother_name`} label='Кличка матери собаки'/>
            <FormField name={`declarants[${i}].mother_pedigree_number`} label='Родословная матери собаки'/>

            <FormField name={`declarants[${i}].breeder_first_name`} label='Имя заводчика'/>
            <FormField name={`declarants[${i}].breeder_last_name`} label='Фамилия заводчика'/>
            <FormField name={`declarants[${i}].breeder_second_name`} label='Отчество заводчика'/>
            <FormField name={`declarants[${i}].breeder_address`} label='Адрес заводчика'/>
            <FormField name={`declarants[${i}].email`} label='Email заводчика' onChange={e => setEmail(e.target.value)}/>

            <FormField name={`declarants[${i}].folder_number`} label='Номер папки'/>
            <FormField name={`declarants[${i}].was_reviewed`} type="checkbox" label='Щенок был на пересмотре, соответствует племенным требованиям'/>
            <FormField name={`declarants[${i}].litter_or_request_number`} label='Номер общепометной карты (или № заявки), в которую щенок был включен при регистрации помета.'/>
            <FormField name={`declarants[${i}].biometric_card_document`} label='Метрика щенка' accept="application/pdf" type="file" />
            <FormField name={`declarants[${i}].personal_data_document`} label='Соглашение на обработку персональных данных' accept="application/pdf" type="file" />
            {docItems.map((m,j) => <FormGroup inline key={m}>
                <FormField options={doctypes} label={`Документ №${j + 2} - описание`} fieldType="reactSelect" name={`declarants[${i}].documents[${j}].document_type_id`} />
                <FormField label={`Документ №${j + 2}`} type="file" name={`declarants[${i}].documents[${j}].document`} accept="application/pdf" />
                <DeleteButton onClick={() => deleteItem(j)} title="Удалить"/>
            </FormGroup>)}
            <div className="flex-row">
                <PlusButton small onClick={plusClick} title="Добавить документ"/>
            </div>
            <Button className="btn-red" onClick={closeClick}>Удалить</Button>
        </FormGroup>
    </td>
    </tr>
    </>
};

export default React.memo(DocItem);
