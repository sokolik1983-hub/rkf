import React from "react";
import Card from "components/Card";
import { Form, FormGroup, FormField } from "components/Form";
import "./index.scss";

export default () =>
    <Card className="DocItem">
        <FormGroup>
            <FormField name='name' label='ФИО' />
            <FormField name='email' label='Email' />
            <FormField name='bill' label='Квитанция' type="file" />
        </FormGroup>
    </Card>
