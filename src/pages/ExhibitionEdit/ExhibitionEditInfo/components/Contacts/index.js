import React from "react";
import { connect, FieldArray } from "formik";
import Button from "../../../../../components/Button";
import { FormField, FormGroup } from "../../../../../components/Form";
import { DEFAULT_PHONE_INPUT_MASK } from "../../../../../appConfig";

import "./styles.scss";


const Contacts = ({ phones, emails, errors, formik }) => {

    const checkForPhones = () => {
        const { phones } = errors;
        if (phones) {
            if (phones.filter(c => c && (c.value === 'Введите номер телефона' || c.value === 'Формат номера: +7(999)999-99-99')).length) {
                return true
            }
        } else {
            return false
        }
    }

    const checkForEmails = () => {
        const { emails } = errors;
        if (emails) {
            if (emails.filter(c => c && (c.value === 'Введите e-mail' || c.value === 'Неверный формат электронного адреса')).length) {
                return true
            }
        } else {
            return false
        }
    }

    React.useEffect(() => {
        if(phones && emails) {
            phones.sort((a, b) => {
                if(a.is_main > b.is_main) return -1
                if(a.is_main < b.is_main) return 1
                else return 0
                })
            emails.sort((a, b) => {
                if(a.is_main > b.is_main) return -1
                if(a.is_main < b.is_main) return 1
                else return 0
                })
        }

    }, [])

    return <div className="сontacts">
        <FieldArray
            name="phones"
            render={arrayHelpers => (
                <div className="FormGroup__contact">
                    <h5 className="сontacts__title">Телефон</h5>
                    {phones && !!phones.length &&
                        phones.map((phone, index, phones) => (
                            <FormGroup inline key={index}>
                                {phones.length === index + 1 &&
                                    <Button
                                        className="triggerButton add-mini"
                                        disabled={checkForPhones()}
                                        onClick={() => {
                                            arrayHelpers.push({
                                                id: null,
                                                value: '',
                                                description: '',
                                                is_main: false,
                                            })
                                        }}
                                    />
                                }
                                <FormField
                                    className="first-field"
                                    fieldType="masked"
                                    mask={DEFAULT_PHONE_INPUT_MASK}
                                    name={`phones[${index}].value`}
                                    type="tel"
                                    placeholder="+7(___)___-__-__"
                                    title="Формат номера: +7(999)999-99-99"
                                />
                                <FormField
                                    placeholder="Введите описание"
                                    name={`phones[${index}].description`}
                                />
                                <div className="сontacts__checkbox-wrap">
                                    <label className="сontacts__checkbox-wrap-label">Основной</label>
                                    <div className="сontacts__checkbox-wrap-inner">
                                        <FormField
                                            name={`phones[${index}].is_main`}
                                            fieldType="customCheckbox"
                                            onChange={e => {
                                                phones.forEach(phone => phone.is_main = false);
                                                formik.setFieldValue(e.currentTarget.checked);
                                            }}
                                            disabled={phone.value.length < 16 || phone.is_main}
                                        />
                                        {
                                            phone.is_main
                                                ? ''
                                                : <div className="k-icon k-i-trash" onClick={() => arrayHelpers.remove(index)}/>
                                        }
                                    </div>
                                </div>
                        </FormGroup>
                    ))}
                </div>
            )}
        />
        <FieldArray
            name="emails"
            render={arrayHelpers => (
                <div className="FormGroup__contact">
                    <h5 className="сontacts__title">E-mail</h5>
                    {emails && !!emails.length &&
                        emails.map((email, index) => (
                            <FormGroup inline key={index} className="FormGroup__contact">
                                {emails.length === index + 1 &&
                                    <Button
                                        className="triggerButton add-mini"
                                        disabled={checkForEmails()}
                                        onClick={() => arrayHelpers.push({
                                            id: null,
                                            value: '',
                                            description: '',
                                            is_main: false,
                                        })}
                                    />
                                }
                                <FormField
                                    className="first-field"
                                    placeholder="Введите Email"
                                    name={`emails[${index}].value`}
                                />
                                <FormField
                                    placeholder="Введите описание"
                                    name={`emails[${index}].description`}
                                />
                                <div className="сontacts__checkbox-wrap">
                                    <label className="сontacts__checkbox-wrap-label">Основной</label>
                                    <div className="сontacts__checkbox-wrap-inner">
                                        <FormField
                                            disabled={email.value.length < 7}
                                            name={`emails[${index}].is_main`}
                                            disabled={email.is_main}
                                            fieldType="customCheckbox"
                                            onChange={e => {
                                                emails.forEach(email => email.is_main = false);
                                                formik.setFieldValue(e.currentTarget.checked);
                                            }}
                                        />
                                        {
                                            email.is_main
                                                ? ''
                                                : <div className="k-icon k-i-trash" onClick={() => arrayHelpers.remove(index)}/>
                                        }
                                    </div>
                                </div>
                            </FormGroup>
                    ))}
                </div>
            )}
        />
    </div>
};

export default connect(Contacts);