import React, { useState } from "react";
import Button from "components/Button";
import { Link } from "react-router-dom";
import { FormGroup, FormField } from "components/Form";
import HideIf from "components/HideIf";
import { connect, FieldArray } from "formik";
import PlusButton from "components/PlusButton";
import DocItemPedigree from "../../components/DocItemPedigree";
import DocItemLitter from "../../components/DocItemLitter";
import DocLink from "../../components/DocLink";
import { emptyPedigreeDeclarant, emptyLitterDeclarant } from "../../config.js";
import test from "../../test.json";

const accept = ".pdf, .jpg, .jpeg";

const DocItemList = ({formik, name, doctypes, breeds, sexTypes, fedName, view, update, privacyHref, verkHref, statuses, clubAlias, cash_payment, distinction, litterStatuses}) => {
    window.test = () => Object.keys(test).forEach(t => {
        formik.setFieldValue(t, test[t]);
    });
    formik.errors && Object.keys(formik.errors).length && console.log(formik.errors);
    const DocItem = distinction === "pedigree" ? DocItemPedigree : DocItemLitter;
    const [active, setActive] = useState(-1);
    const statusAllowsUpdate = formik.values.status_id ? formik.values.status_id === 2 : true;
    const canSave = statusAllowsUpdate || formik.values.declarants.some(d => d.status_id ? d.status_id === 2 : true);
    return <FieldArray
                    name={name}
                    render={helpers => <>
                    <div>
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
                                    litterStatuses={litterStatuses}
                                />)}
                            </tbody>
                        </table>
                        <div className={`flex-row ${update ? 'hidden' : ''}`}>
                            {(typeof(formik.errors.declarants) === "string") &&
                                <p className="red">{formik.errors.declarants}</p>
                            }
                            <PlusButton title="Добавить еще заводчика" onClick={() => {
                                setActive(formik.values.declarants.length);
                                helpers.push(distinction === "pedigree" ? {...emptyPedigreeDeclarant} : {...emptyLitterDeclarant});
                            }} />
                        </div>
                    </div>
                    <div>
                        <FormGroup>
                            <p className={update ? 'hidden' : ''}><b>Приложите квитанцию об оплате {formik.values.declarants.length} заявок по тарифу {fedName} и заполните информацию о платеже.</b></p>
                            <FormField disabled={view || formik.values.cash_payment_accept || !statusAllowsUpdate} fieldType="customCheckbox" name='cash_payment' label='Оплата наличными'/>
                            <HideIf cond={formik.values.cash_payment}>
                                <HideIf cond={view || formik.values.payment_document_accept || !statusAllowsUpdate}>
                                    <FormField fieldType="file" disabled={view} name='payment_document' label='Квитанция об оплате' accept={accept} />
                                </HideIf>
                                <DocLink docId={formik.values.payment_document_id} label='Квитанция об оплате' showLabel={view || formik.values.payment_document_accept}/>
                                <FormField disabled={view || formik.values.payment_date_accept || !statusAllowsUpdate} name='payment_date' label='Дата оплаты' fieldType="reactDayPicker" readOnly={true} />
                                <FormField disabled={view || formik.values.payment_number_accept || !statusAllowsUpdate} name='payment_number' label='Номер платежного документа' />
                                <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
                                <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='ogrn' label='ОГРН (для юр. лиц)' />
                            </HideIf>
                        </FormGroup>
                    </div>
                    <HideIf cond={view || !canSave} className="flex-row">
                        <Button className="btn-green" type="submit" disabled={formik.isSubmitting}>{formik.isSubmitting ? "Идет отправка..." : "Сохранить"}</Button>
                        <Link to={`/${clubAlias}/documents`}><Button className="btn-transparent">Закрыть</Button></Link>
                    </HideIf>
                </>

                    }
                />;
};


export default connect(React.memo(DocItemList));
