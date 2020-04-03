import React, { useState } from "react";
import Button from "components/Button";
import { Link } from "react-router-dom";
import { FormGroup, FormField } from "components/Form";
import HideIf from "components/HideIf";
import FormFile from "../../components/FormFile";
import { connect, FieldArray } from "formik";
import Card from "components/Card";
import PlusButton from "components/PlusButton";
import DocItem from "../../components/DocItem";
import DocLink from "../../components/DocLink";
import { emptyDeclarant } from "../../config.js";

const DocItemList = ({formik, name, doctypes, breeds, sexTypes, fedName, view, update, privacyHref, verkHref, statuses, clubAlias}) => {
    const [active, setActive] = useState(0);
    const statusAllowsUpdate = formik.values.status_id ? formik.values.status_id === 2 : true;
    const canSave = statusAllowsUpdate || formik.values.declarants.some(d => d.status_id ? d.status_id === 2 : true);
    return <FieldArray
                    name={name}
                    render={helpers => <>
                    <Card>
                        <h3>Владельцы</h3>
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
                                {formik.values.declarants.map((m, i) => <DocItem
                                    key={i}
                                    closeClick={() => {
                                        helpers.remove(i);
                                        if (active > formik.values.declarants.length - 1) {
                                            setActive(formik.values.declarants.length - 1);
                                        }
                                    }}
                                    i={i}
                                    active={i === active}
                                    activateClick={() => setActive(i === active ? -1 : i)}
                                    doctypes={doctypes}
                                    breeds={breeds}
                                    sexTypes={sexTypes}
                                    view={view}
                                    update={update}
                                    privacyHref={privacyHref}
                                    verkHref={verkHref}
                                    statuses={statuses}
                                />)}
                            </tbody>
                        </table>
                        <div className={`flex-row ${update ? 'hidden' : ''}`}>
                            <PlusButton title="Добавить еще заводчика" onClick={() => {
                                setActive(formik.values.declarants.length);
                                helpers.push({...emptyDeclarant});
                            }} />
                        </div>
                    </Card>
                    <Card>
                        <FormGroup>
                            <p className={update ? 'hidden' : ''}><b>Приложите квитанцию об оплате {formik.values.declarants.length} заявок по тарифу {fedName} и заполните информацию о платеже.</b></p>
                            <HideIf cond={view || formik.values.payment_document_accept || !statusAllowsUpdate}>
                                <FormFile disabled={view} name='payment_document' label='Квитанция об оплате' accept="application/pdf" />
                            </HideIf>
                            <DocLink docId={formik.values.payment_document_id} label='Квитанция об оплате' showLabel={view || formik.values.payment_document_accept}/>
                            <FormField disabled={view || formik.values.payment_date_accept || !statusAllowsUpdate} name='payment_date' label='Дата оплаты' fieldType="reactDayPicker" />
                            <FormField disabled={view || formik.values.payment_number_accept || !statusAllowsUpdate} name='payment_number' label='Номер платежного документа' />
                            <FormField disabled={update} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
                            <FormField disabled={update} name='ogrn' label='ОГРН (для юр. лиц)' />
                        </FormGroup>
                    </Card>
                    <HideIf cond={view || !canSave} className="flex-row">
                        <Button className="btn-green" type="submit" disabled={formik.isSubmitting}>Сохранить</Button>
                        <Link to={`/${clubAlias}/documents`}><Button className="btn-transparent">Закрыть</Button></Link>
                    </HideIf>
                </>

                    }
                />;
};


export default connect(React.memo(DocItemList));
