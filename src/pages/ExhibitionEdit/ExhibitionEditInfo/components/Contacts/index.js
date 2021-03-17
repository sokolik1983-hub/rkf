import React from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
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
    }, [])

    return <div className="Contacts">
        <h3>Контакты</h3>
        <FieldArray
            
            name="phones"
            render={arrayHelpers => (
                <div className="FormGroup__contact">
                    {phones && !!phones.length &&
                    
                        phones.map((phone, index) => (
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
                                        disabled={phone.value.length < 16} 
                                        name={`phones[${index}].is_main`}
                                        fieldType="customCheckbox"
                                        // eslint-disable-next-line react/jsx-no-duplicate-props
                                        disabled={phone.is_main}
                                        onChange={e => {
                                            phones.forEach(p => p.is_main = false);
                                            formik.setFieldValue(e.currentTarget.checked);
                                        }} 
                                    />
                                    {
                                        phone.is_main
                                            ? ''
                                            : <span className="k-icon k-i-trash" onClick={() => arrayHelpers.remove(index)}/>
                                    }
                                    

                                </div>
                                
                        </FormGroup>
                    ))}
                    <div className="Contacts__buttons-wrap">
                        <Button
                           className={`btn-green Contacts__button-add ${checkForPhones() ? 'disabled' : ''}`}
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
                    {emails && !!emails.length &&
                    
                        emails.map((email, index) => (
                            <FormGroup inline key={index} className="FormGroup__contact">
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
                                        disabled={email.value.length < 7} 
                                        name={`emails[${index}].is_main`}
                                        // eslint-disable-next-line react/jsx-no-duplicate-props
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
                                            : <span className="k-icon k-i-trash" onClick={() => arrayHelpers.remove(index)}/>
                                    }
                                </div>
                              
                            </FormGroup>
                    ))}
                    <div className="Contacts__buttons-wrap">
                        <Button
                            className={`btn-green Contacts__button-add ${checkForEmails() ? 'disabled' : ''}`}
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