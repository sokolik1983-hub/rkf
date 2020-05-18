import React from "react";
import {connect} from "formik";
import genericForm from "../../utils/genericForm";
import SubmitError from "../../components/SubmitError";
import DocTableItem from "../../components/DocItemTableLitter";
import config from "./config.js";
import Button from "components/Button";
import HideIf from "components/HideIf";
import Card from "components/Card";
import {Request} from "utils/request";

// litter
const TableFormFields = connect(({formik, update, options, clubAlias, setRedirect, send, Title}) => <>
    <Card>
    <Title/>
        <div className="flex-row">
                <Button className="btn-primary"
                    onClick={e => send({
                        button: 'create',
                        method: 'POST'
                    }, formik)}>
                Добавить заявку</Button>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {formik.values && formik.values.declarants && Object.keys(formik.values.declarants).map(i => <DocTableItem
                        key={i}
                        activateClick={() => setRedirect(`/${clubAlias}/documents/litter/${formik.values.declarants[i].id}/declarant/form`)}
                        {...formik.values.declarants[i].declarant}
                        documents={formik.values.declarants[i].documents}
                        statuses={options.statuses}
                        status_id={formik.values.declarants[i].status_id}
                        date_created={formik.values.declarants[i].date_create}
                        onDelete={() => {
                        if (window.confirm("Удалить заявку?")) {
                        Request({
                            method: 'DELETE',
                            url: `/api/requests/litter_request/LitterDeclarantRequest/header?id=${formik.values.declarants[i].id}`,
                        },() => setRedirect(`/${clubAlias}/documents/litter/${formik.values.id}/table/form`))}}}
                    />)}
                </tbody>
            </table>    
    </Card>
    <div className="stage-controls flex-row">
        <Button className="btn-condensed" onClick={e => setRedirect(`/${clubAlias}/documents/litter/${formik.values.id}/header/form`)}>Назад</Button>
        <SubmitError />
        <Button className="btn-green btn-condensed" onClick={e => setRedirect(`/${clubAlias}/documents/litter/${formik.values.id}/payment/form`)}>Продолжить</Button>
    </div>
    </>
)

const TableForm = genericForm(TableFormFields, config)

export default React.memo(TableForm)
