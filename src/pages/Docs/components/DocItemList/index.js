import React, { useState } from "react";
import { FormGroup, FormField } from "components/Form";
import FormFile from "../../components/FormFile";
import { connect, FieldArray } from "formik";
import Card from "components/Card";
import PlusButton from "components/PlusButton";
import DocItem from "../../components/DocItem";
import { emptyDeclarant } from "../../config.js";

const DocItemList = ({formik, name, doctypes, breeds, sexTypes, fedName, view, update}) => {
    const [active, setActive] = useState(0);
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
                            <FormFile disabled={view} name='payment_document' label='Квитанция об оплате' accept="application/pdf" />
                            <FormField disabled={view} name='payment_date' label='Дата оплаты' fieldType="reactDayPicker" />
                            <FormField disabled={view} name='payment_number' label='Номер платежного документа' />
                        </FormGroup>
                    </Card>
                </>

                    }
                />;
};


export default connect(React.memo(DocItemList));
