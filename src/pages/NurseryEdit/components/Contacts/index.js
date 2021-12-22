import React from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
import "./styles.scss";

const Contacts = ({ contacts, is_public, errors }) => {

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

  const handleChange = (index) => {
    contacts.map(elem => elem.is_main = false);
    contacts[index].is_main = true;
  }

    return <div className="Contacts">
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
                                    onChange={() => handleChange(index)}
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
                            className={`btn-green Contacts__button-add ${checkForErrors(1) ? 'disabled' : ''}`}
                            onClick={() => arrayHelpers.push({
                                id: null,
                                value: '',
                                description: '',
                                is_main: false,
                                contact_type_id: 1
                            })}>Добавить телефон</Button>
                        <Button
                            className={`btn-green Contacts__button-add ${checkForErrors(2) ? 'disabled' : ''}`}
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
    </div>
};

export default connect(Contacts);