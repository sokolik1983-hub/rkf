import React from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
import "./styles.scss";

const Contacts = ({ phones, emails, errors }) => {
    const checkForErrors = (type) => {
        const { contacts } = errors;

        if (contacts) {
            if (type === 1 && contacts
                .filter(c => c && (c.value === 'Введите номер телефона' || c.value === 'Формат номера: +7(999)999-99-99')).length) {
                return true
            } else if (type === 2 && contacts
                .filter(c => c && (c.value === 'Введите e-mail' || c.value === 'Неверный формат электронного адреса')).length) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    };

    return <div className="Contacts">
        <h3>Контакты</h3>
        <FieldArray
            name="phones"
            render={arrayHelpers => (
                <div>
                    {phones.map((phone, index) => (
                        <FormGroup inline key={index}>
                            <FormField
                                label={'Номер телефона'}
                                placeholder={'Введите номер телефона'}
                                name={`phones[${index}].value`}
                            />
                            <FormField
                                label={'Описание'}
                                placeholder="Введите описание"
                                name={`phones[${index}].description`}
                            />
                            <div className="Contacts__checkbox-wrap">
                                <div>Основной</div>
                                <FormField
                                    name={`phones[${index}].is_main`}
                                    fieldType="customCheckbox"
                                />
                            </div>
                            <Button className="btn Contacts__button-delete" onClick={() => arrayHelpers.remove(index)}>Удалить</Button>
                        </FormGroup>
                    ))}
                    <div className="Contacts__buttons-wrap">
                        <Button
                            className={`btn-green Contacts__button-add ${checkForErrors(1) ? 'disabled' : ''}`}
                            onClick={() => arrayHelpers.push({
                                id: null,
                                value: '',
                                description: '',
                                is_main: false,
                            })}>Добавить телефон</Button>
                    </div>
                </div>
            )}
        />
        <FieldArray
            name="emails"
            render={arrayHelpers => (
                <div>
                    {emails.map((email, index) => (
                        <FormGroup inline key={index}>
                            <FormField
                                label={'Email'}
                                placeholder={'Введите Email'}
                                name={`emails[${index}].value`}
                            />
                            <FormField
                                label={'Описание'}
                                placeholder="Введите описание"
                                name={`emails[${index}].description`}
                            />
                            <div className="Contacts__checkbox-wrap">
                                <div>Основной</div>
                                <FormField
                                    name={`emails[${index}].is_main`}
                                    fieldType="customCheckbox"
                                />
                            </div>
                            <Button className="btn Contacts__button-delete" onClick={() => arrayHelpers.remove(index)}>Удалить</Button>
                        </FormGroup>
                    ))}
                    <div className="Contacts__buttons-wrap">
                        <Button
                            className={`btn-green Contacts__button-add ${checkForErrors(2) ? 'disabled' : ''}`}
                            onClick={() => arrayHelpers.push({
                                id: null,
                                value: '',
                                description: '',
                                is_main: false,
                            })}>Добавить e-mail</Button>
                    </div>
                </div>
            )}
        />
    </div>
};

export default connect(Contacts);