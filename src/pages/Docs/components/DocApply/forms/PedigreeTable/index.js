import React, {useState} from "react";
import {connect} from "formik";
import {Link} from "react-router-dom";
import removeNulls from "utils/removeNulls";
import { FormGroup, FormField } from "components/Form";
import genericForm from "../../utils/genericForm";
import DocTableItem from "../../components/DocItemTablePedigree";
import config from "./config.js";
import Button from "components/Button";
import HideIf from "components/HideIf";
import Card from "components/Card";

// pedigree
const TableFormFields = connect(({formik, update, options, clubAlias, setRedirect}) => {
    const [editing, setEditing] = useState(-1);
    return <>
    <Card>
        <div className="flex-row">
                <Button className="btn-primary" type="submit">Добавить заявку</Button>
            </div>
        <table>
                <thead>
                    <tr>
                        <th>Дата регистрации</th>
                        <th>Статус</th>
                        <th>Номер док-та</th>
                        <th>ФИО владельца</th>
                        <th>Эл. почта</th>
                        <th>Кол-во док.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {formik.values && formik.values.declarants && Object.keys(formik.values.declarants).map(i => <DocTableItem
                        key={i}
                        activateClick={() => setEditing(i)}
                        {...formik.values.declarants[i]}
                    />)}
                </tbody>
            </table>    
    </Card>
    <div className="stage-controls flex-row">
        <HideIf>
            <Button className="btn-condensed" onClick={e => setRedirect(`/${clubAlias}/documents/pedigree/${formik.values.id}/header/form`)}>Назад</Button>
        </HideIf>
        <Button className="btn-condensed btn-green btn-light" type="submit">Сохранить</Button>
        <HideIf >
            <Button className="btn-green btn-condensed" onClick={e => formik.submitForm() && setRedirect(`/${clubAlias}/documents/pedigree/${formik.values.id}/payment/form`)}>Продолжить</Button>
        </HideIf>
    </div>
    </>
})

const TableForm = genericForm(TableFormFields, config)

export default React.memo(TableForm)
