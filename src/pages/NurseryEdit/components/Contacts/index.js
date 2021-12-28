import React, {useEffect, useState} from 'react';
import {connect, FieldArray} from 'formik';
import {FormField, FormGroup} from '../../../../components/Form';
import Button from '../../../../components/Button';

import './styles.scss';


const Contacts = ({contacts, is_public, errors, randomKeyGenerator}) => {
    const [countPhone, setCountPhone] = useState(true);
    const [countEmail, setCountEmail] = useState(true);
    const [change, setChange] = useState(false)

    useEffect(() => {
        checkForCount();
    }, [change])

    const checkForErrors = (type) => {
        const {contacts} = errors;
        if (contacts) {
            if (type === 1 && contacts
                .filter(c => c && (c.value === 'Введите номер телефона' || c.value === 'Формат номера: +7(999)999-99-99')).length) {
                return true;
            } else if (type === 2 && contacts
                .filter(c => c && (c.value === 'Введите e-mail' || c.value === 'Неверный формат электронного адреса')).length) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    const checkForCount = () => {
        contacts.filter(({contact_type_id}) => contact_type_id === 1).length > 2 && setCountPhone(false);
        contacts.filter(({contact_type_id}) => contact_type_id === 2).length > 2 && setCountEmail(false);
        setChange(false);
    };
    const handleChange = (index) => {
        contacts.map(elem => elem.is_main = false);
        contacts[index].is_main = true;
    };


    return <div className='nursery__contacts__contacts'>
        <FieldArray
            name='contacts'
            render={arrayHelpers => (
                <div className='Contacts'>
                    <FormField {...is_public} />
                    <h4>Телефон</h4>
                    {contacts.map(({contact_type_id}, index) => (
                        (contact_type_id === 1) &&
                        <FormGroup key={randomKeyGenerator()}>
                            <FormField
                                placeholder={'Введите номер телефона'}
                                name={`contacts[${index}].value`}
                            />
                            <FormField
                                placeholder='Введите описание'
                                name={`contacts[${index}].description`}
                            />
                            <div className='Contacts__checkbox-wrap'>
                                <div>Основной</div>
                                <FormField
                                    onChange={() => handleChange(index)}
                                    name={`contacts[${index}].is_main`}
                                    fieldType='customCheckbox'
                                />
                            </div>
                            <Button className='btn Contacts__button-delete'
                                    onClick={() => {
                                        arrayHelpers.remove(index);
                                        (arrayHelpers.form.values.contacts.filter(({contact_type_id}) => contact_type_id === 1).length <= 3
                                            && setCountPhone(true))
                                    }}
                            >Удалить</Button>
                        </FormGroup>
                    ))}
                    <div className='Contacts__buttons-wrap'>
                        {countPhone &&
                            <Button
                                className={`btn-green Contacts__button-add ${checkForErrors(1)
                                    ? 'disabled btn-mini'
                                    : (arrayHelpers.form.values.contacts.filter(({contact_type_id}) => contact_type_id === 1).length > 0) ? 'btn-mini'
                                        : ''}`}
                                onClick={() => {
                                    arrayHelpers.push({
                                        id: null,
                                        value: '',
                                        description: '',
                                        is_main: false,
                                        contact_type_id: 1
                                    });
                                    setChange(true)
                                }}>Добавить телефон
                            </Button>}
                    </div>
                    <h4>E-mail</h4>
                    {contacts.map(({contact_type_id}, index) => (
                        (contact_type_id !== 1) &&
                        <FormGroup key={randomKeyGenerator()}>
                            <FormField
                                placeholder={'Введите e-mail'}
                                name={`contacts[${index}].value`}
                            />
                            <FormField
                                placeholder='Введите описание'
                                name={`contacts[${index}].description`}
                            />
                            <div className='Contacts__checkbox-wrap'>
                                <div>Основной</div>
                                <FormField
                                    onChange={() => handleChange(index)}
                                    name={`contacts[${index}].is_main`}
                                    fieldType='customCheckbox'
                                />
                            </div>
                            <Button className='btn Contacts__button-delete'
                                    onClick={() => {
                                        arrayHelpers.remove(index);
                                        (arrayHelpers.form.values.contacts.filter(({contact_type_id}) => contact_type_id === 1).length <= 3
                                            && setCountEmail(true))
                                    }}
                            >Удалить</Button>
                        </FormGroup>
                    ))}
                    <div className='Contacts__buttons-wrap'>
                        {countEmail &&
                            <Button
                                className={`btn-green Contacts__button-add ${checkForErrors(2)
                                    ? 'disabled btn-mini'
                                    : (arrayHelpers.form.values.contacts.filter(({contact_type_id}) => contact_type_id === 2).length > 0) ? 'btn-mini'
                                        : ''}`}
                                onClick={() => {
                                    arrayHelpers.push({
                                        id: null,
                                        value: '',
                                        description: '',
                                        is_main: false,
                                        contact_type_id: 2
                                    });
                                    setChange(true)
                                }}>Добавить e-mail
                            </Button>}
                    </div>
                </div>
            )}
        />
    </div>;
};

export default connect(Contacts);