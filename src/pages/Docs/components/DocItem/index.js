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
            <FormField name='name' label='ФИО' value={values.name || ''} onChange={update} />
            <FormField name='email' label='Email' value={values.email || ''} onChange={update} />
            <FormField name='card' label='Пометная карта' type="file" onChange={update} />
            <FormField name='metrics' label='Метрика щенка' type="file" onChange={update} />
            {new Array(moreDocs).fill(0).map((d,i) => <FormField key={i} label={`Документ №${i + 3}`} type="file" name={`doc${i}`} onChange={update}/>)}
            <PlusButton onClick={plusClick}/>
        </FormGroup>
    </Card>
};

export default React.memo(DocItem);
