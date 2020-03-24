import React, { useState } from "react";
import Card from "../../../../components/Card";
import PlusButton from "../../../../components/PlusButton";
import {FormGroup, FormField} from "../../components/Form";
import "./index.scss";

const DocItem = ({ closeClick, i, validate, force }) => {
    const [moreDocs, setMoreDocs] = useState(0);
    const plusClick = e => setMoreDocs(moreDocs + 1);
    return <Card className="DocItem">
        <img className="DocItem__cross" src="/static/icons/cross-gray.svg" onClick={closeClick} alt=""/>
        <FormGroup>
            <FormField name={`declarants[${i}].last_name`} label='Фамилия' validate={validate} force={force} />
            <FormField name={`declarants[${i}].first_name`} label='Имя' validate={validate} force={force} />
            <FormField name={`declarants[${i}].second_name`} label='Отчество' validate={validate} force={force} />
            <FormField name={`declarants[${i}].email`} label='Email' validate={validate} force={force} />
            <FormField name={`declarants[${i}].biometric_card_document`} label='Метрика щенка' type="file" validate={validate} force={force} />
            {new Array(moreDocs).fill(0).map((d,j) => <FormField key={j} label={`Документ №${j + 2}`} type="file" name={`declarants[${i}].documents`} />)}
            <PlusButton onClick={plusClick}/>
        </FormGroup>
    </Card>
};

export default React.memo(DocItem);
