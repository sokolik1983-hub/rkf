import React, { useState } from "react";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import PlusButton from "../../../../components/PlusButton";
import {FormGroup, FormField} from "components/Form";
import data from "../../dummy.json";
import "./index.scss";

const DocItem = ({ closeClick, i, validate, force, active, activateClick }) => {
    const [moreDocs, setMoreDocs] = useState(0);
    const [docItems, setDocItems] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
        <td>{name}</td>
        <td>{email}</td>
        <td>{docItems.length + 1}</td>
        <td>
        <img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" onClick={activateClick} alt=""/>
        </td>
    </tr>
    <tr className={`DocItem collapse ${active && 'active'}`}>
    <td colSpan="7">
        <FormGroup className="card">
            <FormField name={`declarants[${i}].name`} label='ФИО заводчика' onChange={setName}/>
            <FormField name={`declarants[${i}].email`} label='Эл. адрес заводчика' onChange={setEmail}/>
            <FormField name={`declarants[${i}].biometric_card_document`} label='Метрика щенка' accept="application/pdf" type="file" />
            {docItems.map((m,j) => <FormGroup inline key={m}>
                <FormField options={data.options} label={`Документ №${j + 2} - описание`} type="select" name={`declarants[${i}].documents[${j}].name`} />
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
