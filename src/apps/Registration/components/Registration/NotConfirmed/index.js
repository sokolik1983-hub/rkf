import React, { useState, useEffect } from 'react';
import Card from "components/Card";
import axios from "axios";
import { Request, getHeaders } from "utils/request";
import { connect } from 'react-redux';
import Loading from 'components/Loading';
import PublicLayout from 'components/Layout';
import Container from 'components/Layout/Container';
import { connectWidgetLogin } from 'apps/Auth/connectors';
import './styles.scss';

const NotConfirmed = ({ clubId, history, logOutUser }) => {
    const [fields, setFields] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [active, setActive] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [federations, setFederations] = useState([]);

    useEffect(() => {
        Request({
            url: '/api/clubs/Status',
            method: 'GET'
        }, (data) => setStatuses(data.reverse()));
    }, []);

    useEffect(() => {
        Request({
            url: '/api/clubs/Federation',
            method: 'GET'
        }, (data) => setFederations(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        //data.append('file', state.inputValue);
        Object.keys(fields).forEach(key => data.append(key, fields[key]));
        for (var pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const config = {
            url: '/api/clubs/ClubActivationRequest',
            method: "POST",
            data: data,
            headers: getHeaders(true)
        };
        try {
            await axios(config);
            alert('Информация отправлена');
            logOutUser();
            history.push('/');
        }
        catch ({ response }) {
            alert(
                `Ошибка: ${response.data.errors
                    ? Object.values(response.data.errors)
                    : `${response.status} ${response.statusText}`}`
            );
        }
    }

    if (!fields) {
        let options = {
            url: '/api/clubs/ClubActivationRequest?id=' + clubId,
            method: "GET",
            headers: getHeaders()
        };
        axios(options)
            .then(({ data }) => {
                if (data.result) {
                    setFields(data.result);
                    setLoaded(true);
                    if (data.result.activation_request_status === 3) setActive(true); // Check if the club is activated
                } else {
                    setDefaultFields();
                }
            })
            .catch(({ response }) => { // Check if the club is activated
                if (response && response.data.errors && response.data.errors.ActivationRequest === "Клуб уже активирован") {
                    setActive(true);
                }
            });
    };

    const setDefaultFields = () => {
        if (!fields) {
            let options = {
                url: '/api/Club/base_request_information',
                method: "GET",
                headers: getHeaders()
            };
            axios(options)
                .then(({ data }) => {
                    setFields(data.result);
                    setLoaded(true);
                });
        };
    };

    const onInputChange = ({ target }) => {
        setFields({ ...fields, [target.name]: target.value })
    };

    const onFileChange = e => {
        if (e.target.files) {
            setFields({
                ...fields,
                [e.target.name]: e.target.files[0]
            })
        }
    };

    const FormField = ({ type, label, name, value, title, pattern, required, props }) => {
        const fieldComment = name + '_comment';
        const isValidField = name + '_valid';
        return (
            <div className="FormField">
                <h4>{label}</h4>
                {
                    fields[isValidField]
                        ? <span>{value}</span>
                        : <React.Fragment>
                            <input
                                type={type}
                                name={name}
                                onBlur={onInputChange}
                                required={required ? true : false}
                                title={title ? title : ''}
                                defaultValue={value || ''}
                                pattern={pattern ? pattern : undefined}
                                {...props}
                            />
                            <div className="FormField__comment">{fields[fieldComment]}</div>
                        </React.Fragment>
                }
            </div>
        )
    };

    const FormSelect = ({ name, label, title, value, required }) => {

        return <div className="FormField">
            <h4>{label}</h4>
            <select
                type="text"
                required={required ? true : false}
                name={name}
                list={`${name}list`}
                title={title ? title : ''}
                onBlur={onInputChange}
                defaultValue={value || ''}
            >
                {name === 'status' ? null : <option value="">{name === 'status' ? 'Выберите статус' : 'Выберите федерацию'}</option>}
                {
                    name === 'status'
                        ? statuses.map(s => <option key={s.id} value={s.id} >{s.name}</option>)
                        : federations.map(s => <option key={s.id} value={s.id}>{`${s.name} (${s.short_name})`}</option>)
                }
            </select>
        </div >
    };

    if (active) {
        alert("Ваша заявка была одобрена! \nТеперь Вы можете войти в свой личный кабинет на сайте.");
        logOutUser();
        history.push('/');
    }

    const {
        name,
        legal_name,
        ogrn,
        inn,
        registration_date,
        legal_city,
        kpp,
        legal_address,
        okpo,
        owner_name,
        apartment_office,
        phone,
        status,
        federation,
        fact_city,
        fact_address,
        fact_name,
        description,
        bic,
        bank_account,
        bank_name
    } = fields;

    return (
        <PublicLayout>
            <Container className="NotConfirmed">
                {
                    loaded
                        ? <Card>
                            <h2 style={{ textAlign: 'center' }}>Заполнение информации о клубе</h2>
                            <h3>{name}</h3>
                            <form className="ClubDetails" onSubmit={handleSubmit}>
                                <fieldset className="ClubDetails__text">
                                    <legend>Информация о клубе</legend>
                                    <FormField type="text" required="true" label="Руководитель" name="owner_name" value={owner_name} />
                                    <FormField type="text" required="true" label="Наименование юридического лица" name="legal_name" value={legal_name} />
                                    <FormField type="date" required="true" label="Дата регистрации юридического лица" name="registration_date" value={registration_date ? new Date(registration_date).toISOString().substr(0, 10) : null} />
                                    <FormField type="text" required="true" label="Город регистрации" name="legal_city" value={legal_city} />
                                    <FormField type="text" required="true" label="Юридический адрес" name="legal_address" value={legal_address} props={{ placeholder: 'Введите юридический адрес клуба без указания офиса/квартиры', title: 'Введите юридический адрес клуба без указания офиса/квартиры' }} />
                                    <FormField type="text" label="Квартира/офис" name="apartment_office" value={apartment_office} props={{ placeholder: 'Введите номер офиса/квартиры юридического адреса', title: 'Введите номер офиса/квартиры юридического адреса' }} />
                                    <FormField type="text" required="true" label="ИНН" name="inn" value={inn} title="Номер инн состоит из 10 или 12 цифр" pattern="[0-9]{10}|[0-9]{12}" />
                                    <FormField type="text" required="true" label="КПП" name="kpp" value={kpp} title="Номер кпп состоит из 9 цифр" pattern="[0-9]{9}" />
                                    <FormField type="text" required="true" label="ОГРН" name="ogrn" value={ogrn} title="Номер огрн состоит из 13 цифр" pattern="[0-9]{13}" />
                                    <FormField type="text" required="true" label="ОКПО" name="okpo" value={okpo} title="Номер окпо состоит из 8 или 10 цифр" pattern="[0-9]{8}|[0-9]{10}" />
                                    <FormField type="text" required="true" label="Номер телефона" name="phone" value={phone} title="Цифра 7 и далее 10 цифр номера телефона. Пример: 71234567890" pattern="7[0-9]{10}" />
                                    <FormSelect label="Статус" name="status" value={status} />
                                    <FormSelect required="true" label="Федерация" name="federation" value={federation} title="Укажите федерацию" />
                                    <FormField type="text" required="true" label="Фактический город местонахождения клуба" name="fact_city" value={fact_city} title="Введите фактический город местонахождения клуба" />
                                    <FormField type="text" required="true" label="Фактический полный адрес местонахождения клуба" name="fact_address" value={fact_address} title="Введите фактический полный адрес местонахождения клуба" />
                                    <FormField type="text" required="true" label="Фактическое название организации" name="fact_name" value={fact_name} title="Введите фактическое название организации" />
                                    <FormField type="text" required="true" label="Описание компании" name="description" value={description} title="Описание компании должно содержать минимум 10 символов" pattern=".{10,}" />
                                    <FormField type="text" required="true" label="Название банка организации" name="bank_name" value={bank_name} title="Введите название банка организации" />
                                    <FormField type="text" required="true" label="Номер расчетного счета" name="bank_account" value={bank_account} title="Номер расчетного счета состоит из 20 цифр" pattern="[0-9]{20}" />
                                    <FormField type="text" required="true" label="БИК номер организации" name="bic" value={bic} title="БИК номер организации состоит из 9 цифр" pattern="[0-9]{9}" />
                                </fieldset>
                                <fieldset className="ClubDetails__file">
                                    <legend>Документы</legend>
                                    <div className="FormField">
                                        <h4>Свидетельство о регистрации организации</h4>
                                        {
                                            !fields.certificate_of_registration_legal_entity_valid
                                                ? (<React.Fragment>
                                                    <span>Прикрепите файл формата PDF: </span><input type="file" accept="application/pdf" name="certificate_of_registration_legal_entity" required onChange={onFileChange} />
                                                    <div className="FormField__comment">{fields['certificate_of_registration_legal_entity_comment']}</div>
                                                </React.Fragment>)
                                                : null
                                        }
                                    </div>
                                    <div className="FormField">
                                        <h4>Выписка из ЕГРЮЛ</h4>
                                        {
                                            !fields.extract_from_the_egrul_valid
                                                ? (<React.Fragment>
                                                    <span>Прикрепите файл формата PDF: </span><input type="file" accept="application/pdf" name="extract_from_the_egrul" required onChange={onFileChange} />
                                                    <div className="FormField__comment">{fields['extract_from_the_egrul_comment']}</div>
                                                </React.Fragment>)
                                                : null
                                        }
                                    </div>
                                    <div className="FormField">
                                        <h4>Документ о регистрации кода клейма</h4>
                                        {
                                            !fields.stamp_code_registration_certificate_valid
                                                ? (<React.Fragment>
                                                    <span>Прикрепите файл формата PDF: </span><input type="file" accept="application/pdf" name="stamp_code_registration_certificate" required onChange={onFileChange} />
                                                    <div className="FormField__comment">{fields['stamp_code_registration_certificate_comment']}</div>
                                                </React.Fragment>)
                                                : null
                                        }
                                    </div>
                                </fieldset>
                                <button type="submit">Отправить</button>
                            </form>
                        </Card>
                        : <Loading />
                }
            </Container>
        </PublicLayout>
    )
}

const mapStateToProps = state => ({
    clubId: state.authentication.profile_id
});

export default connect(mapStateToProps)(connectWidgetLogin(NotConfirmed));
