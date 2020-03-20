import React, { useState } from "react";
import Card from "../../../../components/Card";
import PlusButton from "../../../../components/PlusButton";
import {FormGroup, FormField} from "../../../../components/Form";
import "./index.scss";


const DocItem = ({ name, email }) => {
    const [moreDocs, setMoreDocs] = useState(0);
    const plusClick = () => setMoreDocs(moreDocs + 1);

    return <Card className="DocItem">
        <FormGroup>
            <FormField name='name' label='ФИО' value={name} />
            <FormField name='email' label='Email' value={email} />
            <FormField name='card' label='Пометная карта' type="file" />
            <FormField name='metrics' label='Метрика щенка' type="file" />
            {new Array(moreDocs).fill(0).map((d,i) => <FormField key={i} label={`Документ №${i + 3}`} type="file" name={`doc${i}`}/>)}
            <PlusButton onClick={plusClick}/>
        </FormGroup>
    </Card>
};

export default React.memo(DocItem);