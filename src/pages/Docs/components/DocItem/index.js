import React, { useState } from "react";
import Card from "../../../../components/Card";
import Button from "components/Button";
import PlusButton from "../../../../components/PlusButton";
import {FormGroup, FormField} from "../../components/Form";
import "./index.scss";

const DocItem = ({ closeClick, i, validate, force, active, activateClick }) => {
    const [moreDocs, setMoreDocs] = useState(0);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const plusClick = e => setMoreDocs(moreDocs + 1);
    return <><tr className="DocItem">
        <td>{new Date().toLocaleDateString("ru")}</td>
        <td><i>Не обработан</i></td>
        <td>322-223-322</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{moreDocs + 1}</td>
        <td>
        <img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" onClick={activateClick} alt=""/>
        </td>
    </tr>
    <tr className={`DocItem collapse ${active && 'active'}`}>
    <td colSpan="7">
        <FormGroup className="card">
            <FormField name={`declarants[${i}].name`} label='Фамилия' validate={validate} force={force} onChange={setName}/>
            <FormField name={`declarants[${i}].email`} label='Email' validate={validate} force={force} onChange={setEmail}/>
            <FormField name={`declarants[${i}].biometric_card_document`} label='Метрика щенка' accept="application/pdf" type="file" validate={validate} force={force} />
            {new Array(moreDocs).fill(0).map((d,j) => <FormGroup inline key={j}>
                <FormField label={`Документ №${j + 2} - описание`} type="select" name={`declarants[${i}].documents[${j}].name`} />
                <FormField label={`Документ №${j + 2}`} type="file" name={`declarants[${i}].documents[${j}].document`} accept="application/pdf" />
                <Button className="btn-red">Удалить</Button>
                <p>&nbsp;</p>
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
