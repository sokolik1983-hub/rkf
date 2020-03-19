import React, { useState } from "react";
import Card from "components/Card";
import PlusButton from "components/PlusButton";
import { Form, FormGroup, FormField } from "components/Form";
import "./index.scss";

export default () => {
    const [moreDocs, setMoreDocs] = useState(0);
    const plusClick = e => setMoreDocs(moreDocs + 1)

    return <Card className="DocItem">
        <FormGroup>
            <FormField name='name' label='ФИО' />
            <FormField name='email' label='Email' />
            <FormField name='card' label='Пометная карта' type="file" />
            <FormField name='metrics' label='Метрика щенка' type="file" />
            {new Array(moreDocs).fill(0).map((d,i) => <FormField key={i} label={`Документ №${i + 3}`} type="file" name={`doc${i}`}/>)}
            <PlusButton onClick={plusClick}/>
        </FormGroup>
    </Card>
}
