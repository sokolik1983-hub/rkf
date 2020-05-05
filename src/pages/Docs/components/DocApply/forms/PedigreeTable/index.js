import React, {useState} from "react";
import {connect} from "formik";
import {Link} from "react-router-dom";
import removeNulls from "utils/removeNulls";
import { FormGroup, FormField } from "components/Form";
import genericForm from "../../utils/genericForm";
import DocTableItem from "../../components/DocItemTablePedigree";
import config from "./config.js";
import Button from "components/Button";
// pedigree
const TableFormFields = connect(({formik, update, options, clubAlias}) => {
    const [editing, setEditing] = useState(-1);
    return <>
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
                    {options && options.declarants && options.declarants.map((m, i) => <DocTableItem
                        key={i}
                        activateClick={() => setEditing(i)}
                        {...m}
                    />)}
                </tbody>
            </table>    
    </>
})

const TableForm = genericForm(TableFormFields, config)

export default React.memo(TableForm)
