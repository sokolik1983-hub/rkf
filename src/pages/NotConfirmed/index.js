import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import {Request} from "../../utils/request";
import {connectWidgetLogin} from "../../apps/Auth/connectors";
import "./index.scss";


const NotConfirmed = ({clubId, history, logOutUser}) => {
    const [fields, setFields] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [active, setActive] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [federations, setFederations] = useState([]);

    useEffect(() => {
        (() => Request({
            url: '/api/clubs/Status',
        }, data => setStatuses(data.reverse())))();

        (() => Request({
            url: '/api/clubs/Federation'
        }, data => setFederations(data)))();

        (() => Request({
            url: '/api/clubs/ClubActivationRequest?id=' + clubId
        }, data => {
            if(data) {
                setFields(data);
                setLoaded(true);
                if (data.activation_request_status === 3) setActive(true); // Check if the club is activated
            } else {
                setDefaultFields();
            }
        }, ({response}) => {
            if (response && response.data.errors && response.data.errors.ActivationRequest === "Клуб уже активирован") {
                setActive(true);
            } else {
                setDefaultFields();
            }
        }))();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.keys(fields).forEach(key => data.append(key, fields[key]));

        await Request({
            url: '/api/clubs/ClubActivationRequest',
            method: "POST",
            data: data
        }, () => {
            alert('Информация отправлена');
            logOutUser();
            history.push('/');
        }, error => {
            alert(
                `Ошибка: ${error.response.data.errors
                    ? Object.values(error.response.data.errors)
                    : `${error.response.status} ${error.response.statusText}`}`
            );
        });
    };

    const setDefaultFields = async () => {
        if (!fields) {
            await Request({
                url: '/api/Club/base_request_information'
            }, data => {
                setFields(data);
                setLoaded(true);
            });
        }
    };

    const onInputChange = ({target}) => {
        setFields({ ...fields, [target.name]: target.value });
    };

    const onFileChange = e => {
        if (e.target.files) {
            setFields({...fields, [e.target.name]: e.target.files[0]});
        }
    };

    const FormField = ({type, label, name, value, title, pattern, required, props}) => {
        const fieldComment = name + '_comment';
        const isValidField = name + '_valid';
        return (
            <div className="FormField">
                <h4>{label}</h4>
                {
                    fields[isValidField]
                        ? <span>{value}</span>
                        : <>
                            <input
                                type={type}
                                name={name}
                                onBlur={onInputChange}
                                required={!!required}
                                title={title || ''}
                                defaultValue={value || ''}
                                pattern={pattern ? pattern : undefined}
                                {...props}
                            />
                            <div className="FormField__comment">{fields[fieldComment]}</div>
                        </>
                }
            </div>
        )
    };

    const FormSelect = ({name, label, title, value, required}) => {
        const fieldComment = name + '_comment';
        const isValidField = name + '_valid';

        return (
            <div className="FormField">
                <h4>{label}</h4>
                {fields[isValidField]
                    ? <span>{name === 'status' ? statuses.find(s => s.id === value).name : federations.find(s => s.id === value).name}</span>
                    : <>
                        <select
                            required={!!required}
                            name={name}
                            title={title ? title : ''}
                            onBlur={onInputChange}
                            defaultValue={value || ''}
                        >
                            {name !== 'status' && <option value="">Выберите федерацию</option>}
                            {name === 'status' ?
                                statuses.map(s => <option key={s.id} value={s.id} >{s.name}</option>) :
                                federations.map(s => <option key={s.id} value={s.id}>{`${s.name} (${s.short_name})`}</option>)
                            }
                        </select>
                        <div className="FormField__comment">{fields[fieldComment]}</div>
                    </>}
            </div >
        )
    };

    if (active) {
        alert("Ваша заявка была одобрена! \nТеперь Вы можете войти в свой личный кабинет на сайте.");
        logOutUser();
        history.push('/');
    }

    return (
        <Layout>
            <Container className="content NotConfirmed">
                {!loaded ?
                    <Loading/> :
                    <Card>
                        <h2 style={{ textAlign: 'center' }}>Заполнение информации о клубе</h2>
                        <h3>{fields.name}</h3>
                        <form className="ClubDetails" onSubmit={handleSubmit}>
                            <fieldset className="ClubDetails__text">
                                <legend>Информация о клубе</legend>
                                <FormField type="text" required="true" label="Руководитель" name="owner_name" value={fields.owner_name} />
                                <FormField type="text" required="true" label="Должность руководителя" name="owner_position" value={fields.owner_position} />
                                <FormField type="text" required="true" label="Наименование юридического лица" name="legal_name" value={fields.legal_name} />
                                <FormField type="date" required="true" label="Дата регистрации юридического лица" name="registration_date" value={fields.registration_date ? new Date(fields.registration_date).toISOString().substr(0, 10) : null} />
                                <FormField type="text" required="true" label="Город регистрации" name="legal_city" value={fields.legal_city} />
                                <FormField type="text" required="true" label="Юридический адрес" name="legal_address" value={fields.legal_address} props={{ placeholder: 'Введите юридический адрес клуба без указания офиса/квартиры', title: 'Введите юридический адрес клуба без указания офиса/квартиры' }} />
                                <FormField type="text" label="Квартира/офис" name="apartment_office" value={fields.apartment_office} props={{ placeholder: 'Введите номер офиса/квартиры юридического адреса', title: 'Введите номер офиса/квартиры юридического адреса' }} />
                                <FormField type="text" required="true" label="ИНН" name="inn" value={fields.inn} title="Номер инн состоит из 10 или 12 цифр" pattern="[0-9]{10}|[0-9]{12}" />
                                <FormField type="text" required="true" label="КПП" name="kpp" value={fields.kpp} title="Номер кпп состоит из 9 цифр" pattern="[0-9]{9}" />
                                <FormField type="text" required="true" label="ОГРН" name="ogrn" value={fields.ogrn} title="Номер огрн состоит из 13 цифр" pattern="[0-9]{13}" />
                                <FormField type="text" required="true" label="ОКПО" name="okpo" value={fields.okpo} title="Номер окпо состоит из 8 или 10 цифр" pattern="[0-9]{8}|[0-9]{10}" />
                                <FormField type="text" required="true" label="Номер телефона" name="phone" value={fields.phone} title="Цифра 7 и далее 10 цифр номера телефона. Пример: 71234567890" pattern="7[0-9]{10}" />
                                <FormSelect label="Статус" name="status" value={fields.status} />
                                <FormSelect required="true" label="Федерация" name="federation" value={fields.federation} title="Укажите федерацию" />
                                <FormField type="text" required="true" label="Фактический город местонахождения клуба" name="fact_city" value={fields.fact_city} title="Введите фактический город местонахождения клуба" />
                                <FormField type="text" required="true" label="Фактический полный адрес местонахождения клуба" name="fact_address" value={fields.fact_address} title="Введите фактический полный адрес местонахождения клуба" />
                                <FormField type="text" required="true" label="Фактическое название организации" name="fact_name" value={fields.fact_name} title="Введите фактическое название организации" />
                                <FormField type="text" required="true" label="Описание компании" name="description" value={fields.description} title="Описание компании должно содержать минимум 10 символов" pattern=".{10,}" />
                                <FormField type="text" required="true" label="Название банка организации" name="bank_name" value={fields.bank_name} title="Введите название банка организации" />
                                <FormField type="text" required="true" label="Номер расчетного счета" name="bank_account" value={fields.bank_account} title="Номер расчетного счета состоит из 20 цифр" pattern="[0-9]{20}" />
                                <FormField type="text" required="true" label="БИК номер организации" name="bic" value={fields.bic} title="БИК номер организации состоит из 9 цифр" pattern="[0-9]{9}" />
                            </fieldset>
                            <fieldset className="ClubDetails__file">
                                <legend>Документы</legend>
                                <div className="FormField">
                                    <h4>Свидетельство о регистрации организации</h4>
                                    {!fields.certificate_of_registration_legal_entity_valid &&
                                        <>
                                            <span>Прикрепите файл формата PDF: </span><input type="file" accept="application/pdf" name="certificate_of_registration_legal_entity" required onChange={onFileChange} />
                                            <div className="FormField__comment">{fields['certificate_of_registration_legal_entity_comment']}</div>
                                        </>
                                    }
                                </div>
                                <div className="FormField">
                                    <h4>Выписка из ЕГРЮЛ</h4>
                                    {!fields.extract_from_the_egrul_valid &&
                                        <>
                                            <span>Прикрепите файл формата PDF: </span><input type="file" accept="application/pdf" name="extract_from_the_egrul" required onChange={onFileChange} />
                                            <div className="FormField__comment">{fields['extract_from_the_egrul_comment']}</div>
                                        </>
                                    }
                                </div>
                                <div className="FormField">
                                    <h4>Документ о регистрации кода клейма</h4>
                                    {!fields.stamp_code_registration_certificate_valid &&
                                        <>
                                            <span>Прикрепите файл формата PDF: </span><input type="file" accept="application/pdf" name="stamp_code_registration_certificate" required onChange={onFileChange} />
                                            <div className="FormField__comment">{fields['stamp_code_registration_certificate_comment']}</div>
                                        </>
                                    }
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn-simple">Отправить</button>
                        </form>
                    </Card>
                }
            </Container>
        </Layout>
    )
};

const mapStateToProps = state => ({
    clubId: state.authentication.profile_id
});

export default connect(mapStateToProps)(connectWidgetLogin(NotConfirmed));
