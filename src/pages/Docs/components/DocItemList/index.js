import React, { useState } from "react";
import { connect, FieldArray } from "formik";
import Card from "components/Card";
import PlusButton from "components/PlusButton";
import DocItem from "../../components/DocItem";
import { emptyDeclarant } from "../../config.js";

const DocItemList = ({formik, name, doctypes, breeds, sexTypes}) => {
    const [active, setActive] = useState(0);
    return <FieldArray
                    name={name}
                    render={helpers => <Card>
                        <h3>Заводчики</h3>
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
                                    activateClick={() => setActive(i)}
                                    doctypes={doctypes}
                                    breeds={breeds}
                                    sexTypes={sexTypes}
                                />)}
                            </tbody>
                        </table>
                        <div className="flex-row">
                            <PlusButton title="Добавить еще заводчика" onClick={() => {
                                setActive(formik.values.declarants.length);
                                helpers.push({...emptyDeclarant});
                            }} />
                        </div>
                    </Card>}
                />;
};


export default connect(React.memo(DocItemList));
