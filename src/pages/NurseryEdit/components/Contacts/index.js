import React from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
import Card from "components/Card";
import "./styles.scss";

const Contacts = ({ contacts, is_public }) => {

    return <Card className="Contacts">
        <h3>Контакты</h3>

        <FieldArray
            name="contacts"
            render={arrayHelpers => (
                <div>
                    {contacts.map(({ contact_type_id }, index) => (
                        <FormGroup inline key={index}>
                            <FormField
                                label={contact_type_id === 1 ? 'Номер телефона' : 'E-mail'}
                                placeholder={contact_type_id === 1 ? 'Введите номер телефона' : 'Введите e-mail'}
                                name={`contacts[${index}].value`}
                            />
                            <FormField
                                label={'Описание'}
                                placeholder="Введите описание"
                                name={`contacts[${index}].description`}
                            />
                            <div className="Contacts__checkbox-wrap">
                                <div>Основной</div>
                                <FormField
                                    name={`contacts[${index}].is_main`}
                                    fieldType="customCheckbox"
                                />
                            </div>
                            <Button className="btn Contacts__button-delete" onClick={() => arrayHelpers.remove(index)}>Удалить</Button>
                        </FormGroup>
                    ))}
                    <FormField {...is_public} />
                    <div className="Contacts__buttons-wrap">
                        <Button
                            className="btn-green Contacts__button-add"
                            onClick={() => arrayHelpers.push({
                                id: null,
                                value: '',
                                description: '',
                                is_main: false,
                                contact_type_id: 1
                            })}>Добавить телефон</Button>
                        <Button
                            className="btn-green Contacts__button-add"
                            onClick={() => arrayHelpers.push({
                                id: null,
                                value: '',
                                description: '',
                                is_main: false,
                                contact_type_id: 2
                            })}>Добавить e-mail</Button>
                    </div>
                </div>
            )}
        />
    </Card>
};

export default connect(Contacts);