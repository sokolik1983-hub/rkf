import React, { useState } from "react";
import Card from "../../../../components/Card";
import PlusButton from "../../../../components/PlusButton";
import {FormGroup, FormField} from "../../../../components/Form";
import "./index.scss";

const DocItem = ({ values, setValues, closeClick }) => {
    const [moreDocs, setMoreDocs] = useState(0);
    const plusClick = e => setMoreDocs(moreDocs + 1)
    const update = ({target}) => {
        let patch = {[target.name]: target.value};
        setValues({...values, ...patch});
    }
    return <Card className="DocItem">
        <img className="DocItem__cross" src="/static/icons/cross-gray.svg" onClick={closeClick}/>
        <FormGroup>
            <FormField name='declarants[][last_name]' validate={required} label='Фамилия' />
            <FormField name='declarants[][first_name]' label='Имя' validate={required} />
            <FormField name='declarants[][second_name]' label='Отчество' validate={required} />
            <FormField name='declarants[][email]' label='Email' validate={email} />
            <FormField name='declarants[][biometric_card_document]' label='Метрика щенка' type="file" validate={required} />
            {new Array(moreDocs).fill(0).map((d,i) => <FormField key={i} label={`Документ №${i + 3}`} type="file" name={`declarants[][documents]`} onChange={update}/>)}
            <PlusButton onClick={plusClick}/>
        </FormGroup>
    </Card>
};

export default React.memo(DocItem);
