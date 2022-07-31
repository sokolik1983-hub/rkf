import React, {useEffect, useState} from "react";
import {connect, FieldArray} from "formik";
import {editForm} from "../../config";
import Button from "../../../../components/Button";
import {FormField, FormGroup} from "../../../../components/Form";
import MaskedInput from "../../../../components/Form/Field/MaskedInput";
import "./styles.scss";


const Contacts = ({phones, emails, errors}) => {
    const [countPhone, setCountPhone] = useState(true);
    const [countEmail, setCountEmail] = useState(true);
    const [isChangePhones, setIsChangePhones] = useState(false);
    const [isChangeEmails, setIsChangeEmails] = useState(false);

    const {fields} = editForm;

    useEffect(() => {
        isChangePhones && checkForCount();
        isChangeEmails && checkForCount();
    }, [isChangePhones, isChangeEmails]);

    const checkForErrors = (type) => {
        const {contacts} = errors;
        if (contacts) {
            if (type === 1 && contacts
                .filter(contacts => contacts && (contacts.value === 'Введите номер телефона' || contacts.value === 'Формат номера: +7(999)999-99-99')).length) {
                return true;
            } else if (type === 2 && contacts
                .filter(contacts => contacts && (contacts.value === 'Введите e-mail' || contacts.value === 'Неверный формат электронного адреса')).length) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const checkForCount = () => {
        phones.filter(({contact_type_id}) => contact_type_id === 1).length > 2 && setCountPhone(false) && setIsChangePhones(false);
        emails.filter(({contact_type_id}) => contact_type_id === 2).length > 2 && setCountEmail(false) && setIsChangeEmails(false);
    };

    const handleChangePhone = (index) => {
        phones.map(elem => elem.is_main = false);
        phones[index].is_main = true;
    };

    const handleChangeEmail = (index) => {
        emails.map(elem => elem.is_main = false);
        emails[index].is_main = true;
    };

    return <div className="nursery-contacts__contacts">
        <FieldArray
            name="phones"
            render={arrayHelpers => (
                <div className="Contacts">
                    <h4>Телефон</h4>
                    {phones?.map(({contact_type_id, value}, index) => (
                        contact_type_id === 1 &&
                        <FormGroup key={index}>
                            <MaskedInput
                                {...fields.phones.phone}
                                name={`phones[${index}].value`}
                            />
                            <FormField
                                placeholder="Введите описание"
                                name={`phones[${index}].description`}
                            />
                            <div className="Contacts__checkbox-wrap">
                                <div>Основной</div>
                                <FormField
                                    onChange={() => handleChangePhone(index)}
                                    name={`phones[${index}].is_main`}
                                    fieldType="customCheckbox"
                                />
                            </div>
                            <Button className="btn Contacts__button-delete"
                                    onClick={() => {
                                        arrayHelpers.remove(index);
                                        (arrayHelpers.form.values.phones.filter(({contact_type_id}) => contact_type_id === 1).length <= 3
                                            && setCountPhone(true))
                                    }}
                            >
                            </Button>
                        </FormGroup>
                    ))}
                    <div className="Contacts__buttons-wrap">
                        {countPhone &&
                            <Button
                                className={`btn-green Contacts__button-add ${checkForErrors(1)
                                    ? "disabled btn-mini"
                                    : (arrayHelpers.form.values.phones.filter(({contact_type_id}) => contact_type_id === 1).length > 0)
                                        ? "btn-mini"
                                        : ""}`}
                                onClick={() => {
                                    arrayHelpers.push({
                                        value: "",
                                        description: "",
                                        is_main: false,
                                        contact_type_id: 1
                                    });
                                    setIsChangePhones(true)
                                }}>Добавить телефон
                            </Button>}
                    </div>
                </div>
            )}
        />
        <FieldArray
            name="emails"
            render={arrayHelpers => (
                <div className="Contacts email">
                    <h4>E-mail</h4>
                    {emails?.map(({contact_type_id, value}, index) => (
                        (contact_type_id !== 1) &&
                        <FormGroup key={index}>
                            <FormField
                                placeholder="Введите e-mail"
                                name={`emails[${index}].value`}
                            />
                            <FormField
                                placeholder="Введите описание"
                                name={`emails[${index}].description`}
                            />
                            <div className="Contacts__checkbox-wrap">
                                <div>Основной</div>
                                <FormField
                                    onChange={() => handleChangeEmail(index)}
                                    name={`emails[${index}].is_main`}
                                    fieldType="customCheckbox"
                                />
                            </div>
                            <Button className="btn Contacts__button-delete"
                                    onClick={() => {
                                        arrayHelpers.remove(index);
                                        (arrayHelpers.form.values.emails.filter(({contact_type_id}) => contact_type_id === 1).length <= 3
                                            && setCountEmail(true))
                                    }}
                            >
                            </Button>
                        </FormGroup>
                    ))}
                    <div className="Contacts__buttons-wrap">
                        {countEmail &&
                            <Button
                                className={`btn-green Contacts__button-add ${checkForErrors(2)
                                    ? "disabled btn-mini"
                                    : (arrayHelpers.form.values.emails.filter(({contact_type_id}) => contact_type_id === 2).length > 0)
                                        ? "btn-mini"
                                        : ""}`}
                                onClick={() => {
                                    arrayHelpers.push({
                                        value: "",
                                        description: "",
                                        is_main: false,
                                        contact_type_id: 2
                                    });
                                    setIsChangeEmails(true)
                                }}
                            >
                                Добавить e-mail
                            </Button>}
                    </div>
                </div>
            )}
        />
    </div>;
};

export default connect(Contacts);