import React, { useState } from 'react';
import Card from "components/Card";
import axios from "axios";
import { getHeaders } from "utils/request";
import { connect } from 'react-redux';
import Loading from 'components/Loading';
import PublicLayout from 'components/Layout';
import Container from 'components/Layout/Container';
import { connectWidgetLogin } from 'apps/Auth/connectors';
import './styles.scss';

const NotConfirmed = ({ clubId, history, logOutUser }) => {
    const [fields, setFields] = useState('');
    const [loaded, setLoaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        //data.append('file', state.inputValue);
        Object.keys(fields).forEach(key => data.append(key, fields[key]));

        const config = {
            url: '/api/clubs/ClubActivationRequest',
            method: "POST",
            data: data,
            headers: getHeaders(true)
        };
        try {
            await axios(config);
            console.log(fields);
            alert('Информация отправлена');
            logOutUser();
            history.push('/');
        }
        catch (e) {
            console.log(fields);
            alert(`Ошибка: ${e.response.status} (${e.response.errors ? e.response.errors.ActivationRequest : e.response.statusText})`);
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
                }
                else {
                    setDefaultFields();
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

    const FormField = ({ type, label, name, value }) => {
        const fieldComment = name + '_comment';
        const isValidField = name + '_valid';
        return (
            <div className="FormField">
                <h4>{label}</h4>
                {
                    fields[isValidField]
                        ? <span>{value}</span>
                        : <React.Fragment>
                            <input type={type} name={name} onBlur={onInputChange} required defaultValue={value || ''} />
                            <div className="FormField__comment">{fields[fieldComment]}</div>
                        </React.Fragment>
                }
            </div>
        )
    };

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
        apartment_office
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
                                    <FormField type="text" label="Руководитель клуба" name="owner_name" value={owner_name} />
                                    <FormField type="text" label="Наименование юридического лица" name="legal_name" value={legal_name} />
                                    <FormField type="date" label="Дата регистрации юридического лица" name="registration_date" value={new Date(registration_date).toISOString().substr(0, 10) || new Date().toISOString().substr(0, 10)} />
                                    <FormField type="text" label="Город регистрации" name="legal_city" value={legal_city} />
                                    <FormField type="text" label="Юридический адрес" name="legal_address" value={legal_address} />
                                    <FormField type="text" label="Квартира/офис" name="apartment_office" value={apartment_office} />
                                    <FormField type="text" label="ИНН" name="inn" value={inn} />
                                    <FormField type="text" label="КПП" name="kpp" value={kpp} />
                                    <FormField type="text" label="ОГРН" name="ogrn" value={ogrn} />
                                    <FormField type="text" label="ОКПО" name="okpo" value={okpo} />
                                </fieldset>
                                <fieldset className="ClubDetails__file">
                                    <legend>Документы</legend>
                                    <div className="FormField">
                                        <h4>certificate_of_registration_legal_entity</h4>
                                        {
                                            !fields.certificate_of_registration_legal_entity_valid
                                                ? <input type="file" name="certificate_of_registration_legal_entity" required onChange={onFileChange} />
                                                : null
                                        }
                                    </div>
                                    <div className="FormField">
                                        <h4>extract_from_the_egrul</h4>
                                        {
                                            !fields.extract_from_the_egrul_valid
                                                ? <input type="file" name="extract_from_the_egrul" required onChange={onFileChange} />
                                                : null
                                        }
                                    </div>
                                    <div className="FormField">
                                        <h4>stamp_code_registration_certificate</h4>
                                        {
                                            !fields.stamp_code_registration_certificate_valid
                                                ? <input type="file" name="stamp_code_registration_certificate" required onChange={onFileChange} />
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
