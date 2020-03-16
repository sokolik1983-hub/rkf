import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import Select from "react-select";
import { Request } from "../../utils/request";
import { connectWidgetLogin } from "../Login/connectors";
import Feedback from "components/Feedback";
import FormField from './components/FormField';
import { getHeaders } from "utils/request";
import { invoices, legalFields } from './config';
import "./index.scss";


const NotConfirmed = ({ clubId, history, logOutUser }) => {
    const [fields, setFields] = useState(null);
    const [active, setActive] = useState(false);
    const [interregional, setInterregional] = useState(false);
    const [statusesList, setStatusesList] = useState([]);
    const [regionsList, setRegionsList] = useState([]);
    const [federationsList, setFederationsList] = useState([]);
    const [activitiesList, setActivitiesList] = useState([]);
    const [documents, setDocuments] = useState({});
    const [membership, setMembership] = useState(null);
    const [preloaded, setPreloaded] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([getStatus(), getFederation(), getRegions(), getActivities(), getFields()])
            .then(() => setPreloaded(true));
    }, []);

    useEffect(() => {
        if (preloaded) {
            if (fields) {
                const m = fields.membership_payment_documents;
                setFields({ ...fields, 'regions': getRegionObjects(fields.regions) }); // Update regions
                Promise.all([1, 2].map(async type => await checkForDocuments('/api/clubs/ClubActivationRequest/file', fields.id, type))) // Get documents
                    .then((arr) => setDocuments(arr));
                m.length && Promise.all(m // Get membership payments if they were attached
                    .map(async item => await checkForDocuments('/api/clubs/ClubActivationRequest/membership_payment', item.document_id)))
                    .then((arr) => setMembership(arr));
                setLoaded(true);
            } else {
                getDefaultFields();
            }
        }
    }, [preloaded]);

    const checkForDocuments = async (url, id, type) => {
        let document;
        await fetch(url, {
            method: "POST",
            headers: getHeaders(),
            body: type // Check if document or membership
                ? JSON.stringify({
                    "request_id": id,
                    "document_type": type,
                })
                : id
        })
            .then(response => response.blob())
            .then(blob => document = type ? { type: type, url: URL.createObjectURL(blob) } : { url: URL.createObjectURL(blob) });
        return document;
    };

    const getDocUrl = type => documents.length && documents.find(d => d.type === type).url;

    const getStatus = () => {
        return Request({
            url: '/api/clubs/Status',
        }, data => {
            setStatusesList(data.reverse())
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        })
    };

    const getFederation = () => {
        return Request({
            url: '/api/clubs/Federation'
        }, data => {
            setFederationsList(data)
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        })
    };

    const getRegions = () => {
        return Request({
            url: '/api/Club/regions'
        }, data => {
            setRegionsList(data.map(r => ({ 'value': r.id, 'label': r.name })))
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        })
    };

    const getRegionObjects = ids => ids ? ids.map(id => regionsList.filter(r => r.value === id)[0]) : [];

    const getActivities = () => {
        return Request({
            url: '/api/Club/activities'
        }, data => {
            setActivitiesList(data.map(a => ({ 'value': a.id, 'label': a.name })))
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        })
    };

    const getFields = () => {
        return Request({
            url: '/api/clubs/ClubActivationRequest?id=' + clubId
        }, data => {
            if (data) {
                setFields(data);
                if (data.activation_request_status === 3) setActive(true); // Check if the club is activated
                if (data.status === 3) setInterregional(true);
            } else {
                getDefaultFields();
            }
        }, ({ response }) => {
            if (response && response.data.errors && response.data.errors.ActivationRequest === "Клуб уже активирован") {
                setActive(true);
            } else {
                getDefaultFields();
            }
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.keys(fields).forEach(
            function (key) {
                if (key === 'phone'
                    || key === 'phone_valid'
                    || key === 'fact_name'
                    || key === 'fact_name_valid'
                    || key === 'fact_city'
                    || key === 'fact_city_valid'
                    || key === 'fact_address'
                    || key === 'fact_address_valid'
                    || key === 'status'
                    || key === 'status_valid'
                    || key === 'stamp_code_registration_certificate'
                    || key === 'stamp_code_registration_certificate_valid'
                    || key === 'certificate_of_registration_legal_entity'
                    || key === 'certificate_of_registration_legal_entity_valid'
                    || key === 'membership_payment_document_first'
                    || key === 'membership_payment_document_second'
                    || key === 'membership_payment_document_third'
                    || key === 'membership_payment_document_fourth'
                    || key === 'membership_payment_document_first_date'
                    || key === 'membership_payment_document_second_date'
                    || key === 'membership_payment_document_third_date'
                    || key === 'membership_payment_document_fourth_date'
                    || key === 'membership_payment_document_valid'
                ) {
                    return data.append(key, fields[key])
                }
                if (fields[key] && fields[key].length) {
                    key === 'regions' && fields[key].map(r => data.append(key, r.value));
                    key === 'activities' && fields[key].map(a => data.append(key, a));

                }
            }
        );

        // for (var pair of data.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        await Request({
            url: '/api/clubs/ClubActivationRequest',
            method: "POST",
            data: data
        }, () => {
            alert('Информация отправлена');
            logOutUser();
            history.push('/');
        }, error => {
            if (error.response.status === 413) { return alert('Ошибка: слишком большой файл') };
            alert(
                `Ошибка: ${error.response.data.errors
                    ? Object.values(error.response.data.errors)
                    : `${error.response.status} ${error.response.statusText}`}`
            );
        });
    };

    const getDefaultFields = async () => {
        if (preloaded && !fields) {
            await Request({
                url: '/api/Club/base_request_information'
            }, data => {
                setFields({ ...data, activities: [] });
                setLoaded(true);
            });
        }
    };

    const onInputChange = ({ target }) => {
        if (target.name === 'status') setInterregional(parseInt(target.value) === 3 ? true : false);
        setFields({ ...fields, [target.name]: target.value });
    };

    const onFileChange = e => {
        if (e.target.files) {
            setFields({ ...fields, [e.target.name]: e.target.files[0] });
        }
    };

    const StatusSelect = ({ name, label, title, value, required }) => {
        const fieldComment = name + '_comment';
        const isValidField = name + '_valid';

        return (
            <div className="FormField">
                <h4>{label}</h4>
                {fields[isValidField]
                    ? <span>{statusesList.find(s => s.id === value).name}</span>
                    : <>
                        <select
                            required={!!required}
                            name={name}
                            title={title ? title : ''}
                            onChange={onInputChange}
                            defaultValue={value || ''}
                        >
                            {statusesList.map(s => <option key={s.id} value={s.id} >{s.name}</option>)}
                        </select>
                        <div className="FormField__comment">{fields[fieldComment]}</div>
                    </>}
            </div >
        )
    };

    const RegionsSelect = ({ isDisabled }) => {
        const fieldComment = 'regions_comment';
        const isValidField = 'regions_valid';
        const { regions } = fields;
        const handleChange = (val) => setFields({ ...fields, 'regions': val });

        return (
            <div className="FormField">
                <h4>Регионы осуществления деятельности</h4>
                {fields[isValidField]
                    ? <span>{regions.find(r => r.id === regions).name}</span>
                    : <>
                        <Select
                            defaultValue={regions && regions.length ? regions : []}
                            value={regions}
                            isMulti={true}
                            name="regions"
                            placeholder={"Выберите регионы"}
                            options={regionsList}
                            onChange={handleChange}
                            className="regions-multi-select"
                            classNamePrefix="select"
                            menuPortalTarget={document.querySelector('body')}
                            required={true}
                            isDisabled={isDisabled}
                        />
                        <div className="FormField__comment">{fields[fieldComment]}</div>
                    </>}
            </div >
        )
    };

    const Federations = () => {
        return <div className="FormField">
            <h4>Федерация</h4>
            {
                federationsList.map((f) => <div key={f.id} >
                    <input id={f.id} checked={!!fields.federation && !!fields.federation.find(id => id === f.id)} type="checkbox" disabled /> {f.name}
                </div>)
            }
            <div className="FormField__comment">{fields['federation_comment']}</div>
        </div>
    };

    const Activities = () => {
        const handleChange = ({ target }) => {
            setFields({
                ...fields, 'activities': target.checked
                    ? [].concat(...fields.activities, parseInt(target.value))
                    : [...fields.activities].filter(val => val !== parseInt(target.value))
            });
        };

        return <div className="FormField activities">
            <h4>Виды деятельности</h4>
            {
                activitiesList.map(({ value, label }) => <div key={value} >
                    <input
                        id={`activity-${value}`}
                        onChange={handleChange}
                        value={value}
                        name={label}
                        checked={fields.activities && fields.activities.length && fields.activities.find(a => a === value)}
                        type="checkbox"
                        disabled={!isEditable('activities')}
                    />&nbsp;
                    <label htmlFor={`activity-${value}`}>{label}</label>
                </div>)
            }
            {!fields['activities_valid'] && <div className="FormField__comment">{fields['activities_comment']}</div>}
        </div>
    };

    if (active) {
        alert("Ваша заявка была одобрена! \nТеперь Вы можете войти в свой личный кабинет на сайте.");
        logOutUser();
        history.push('/');
    }

    const isSubmitted = fields && fields.activation_request_status === 1;
    const isEditable = fieldName => !fields[`${fieldName}_valid`] && !isSubmitted;

    return (
        <Layout>
            <Container className="content NotConfirmed">
                {!loaded
                    ? <Loading />
                    : <>
                        {
                            isSubmitted
                                ? <h2 style={{ textAlign: 'center', color: 'red' }}>Заявка находится на рассмотрении</h2>
                                : <h2 style={{ textAlign: 'center' }}>Заполнение информации о клубе</h2>
                        }
                        <h3>{fields.name}</h3>
                        <form className="ClubDetails" onSubmit={handleSubmit}>
                            <fieldset disabled={isSubmitted}>
                                <Card>
                                    <h3>Юридическая информация</h3>
                                    {
                                        legalFields.map(({ label, name, type }) => <FormField
                                            label={label}
                                            name={name}
                                            value={type === 'date' ? new Date(fields.registration_date).toISOString().substr(0, 10) : fields[name]}
                                            props={{ placeholder: 'Не указано' }}
                                            fields={fields}
                                            onInputChange={onInputChange}
                                            disabled
                                        />)
                                    }
                                </Card>
                                <Card>
                                    <h3>Дополнительная информация</h3>
                                    <FormField fields={fields}
                                        onInputChange={onInputChange} type="text" required="true" label="Номер телефона" name="phone" value={fields.phone} title="Цифра 7 и далее 10 цифр номера телефона. Пример: 71234567890" pattern="7[0-9]{10}" />
                                    <Federations />
                                    <StatusSelect label="Территориальный статус" name="status" value={fields.status} />
                                    {interregional && <RegionsSelect isDisabled={!isEditable('status')} />}
                                    <Activities />
                                    <FormField fields={fields}
                                        onInputChange={onInputChange} type="text" required="true" label="Фактический город местонахождения клуба" name="fact_city" value={fields.fact_city} title="Введите фактический город местонахождения клуба" />
                                    <FormField fields={fields}
                                        onInputChange={onInputChange} type="text" required="true" label="Фактический полный адрес местонахождения клуба" name="fact_address" value={fields.fact_address} title="Введите фактический полный адрес местонахождения клуба" />
                                    <FormField fields={fields}
                                        onInputChange={onInputChange} type="text" required="true" label="Сокращенное наименование организации" name="fact_name" value={fields.fact_name} title="Введите фактическое название организации" />
                                </Card>

                                <Card>
                                    <h3>Документы</h3>
                                    <div className="FormField">
                                        {
                                            isEditable('stamp_code_registration_certificate')
                                                ? <>
                                                    <h4>
                                                        {
                                                            getDocUrl(2)
                                                                ? <a href={getDocUrl(2)} download="stamp_code_registration_certificate.pdf">Документ о регистрации кода клейма</a>
                                                                : 'Документ о регистрации кода клейма'
                                                        }
                                                    </h4>
                                                    <span>Прикрепите файл формата PDF: </span>
                                                    <input type="file" accept=".pdf" name="stamp_code_registration_certificate" required onChange={onFileChange} />
                                                    <div className="FormField__comment">{fields['stamp_code_registration_certificate_comment']}</div>
                                                </>
                                                : <a href={getDocUrl(2)} download="stamp_code_registration_certificate.pdf">Документ о регистрации кода клейма</a>
                                        }
                                    </div>
                                    {
                                        interregional && <div className="FormField">
                                            {
                                                isEditable('certificate_of_registration_legal_entity')
                                                    ? <>
                                                        <h4>
                                                            {
                                                                getDocUrl(1)
                                                                    ? <a href={getDocUrl(1)} download="certificate_of_registration_legal_entity.pdf">Свидетельство о регистрации организации</a>
                                                                    : 'Свидетельство о регистрации организации'
                                                            }
                                                        </h4>
                                                        <span>Прикрепите файл формата PDF: </span>
                                                        <input type="file" accept=".pdf" name="certificate_of_registration_legal_entity" required onChange={onFileChange} />
                                                        <div className="FormField__comment">{fields['certificate_of_registration_legal_entity_comment']}</div>
                                                    </>
                                                    : <a href={getDocUrl(1)} download="certificate_of_registration_legal_entity.pdf">Свидетельство о регистрации организации</a>
                                            }
                                        </div>
                                    }
                                    <br />
                                    <h3 className="documents-subheading">Квитанции об оплате членского взноса в Федерацию</h3>
                                    {
                                        isEditable('membership_payment_document')
                                            ? <>
                                                {
                                                    invoices.map(name => <div className="invoice">
                                                        <div>
                                                            <span>Прикрепите файл формата PDF: </span>
                                                            <input type="file" accept=".pdf" name={name} onChange={onFileChange} />
                                                        </div>
                                                        {
                                                            fields[name] && <div>
                                                                <span>Дата оплаты взноса: </span>
                                                                <input type="date" name={`${name}_date`} onChange={onInputChange} required />
                                                            </div>
                                                        }

                                                    </div>)
                                                }
                                                {
                                                    membership && membership.map((m, key) => <div className="FormField" key={key}>
                                                        <a href={m.url} download={`membership_payment_document_${++key}.pdf`}>{`Квитанции об оплате членского взноса №${key}`}</a>
                                                    </div>)
                                                }
                                                <div className="FormField__comment">{fields['membership_payment_document_comment']}</div>
                                            </>
                                            : membership
                                                ? membership.map((m, key) => <div className="FormField" key={key}>
                                                    <a href={m.url} download={`membership_payment_document_${++key}.pdf`}>{`Квитанции об оплате членского взноса №${key}`}</a>
                                                </div>)
                                                : <p>Нет прикреплённых квитанций</p>
                                    }
                                </Card>
                                {!isSubmitted && <button type="submit" className="btn btn-simple">Отправить</button>}
                            </fieldset>
                        </form>
                        <p className="NotConfirmed__feedback-reminder">В случае обнаружения ошибок или несоответствий - воспользуйтесь формой <Feedback className="feedback-link" title="обратной связи" /></p>
                    </>
                }
            </Container>
        </Layout >
    )
};

const mapStateToProps = state => ({
    clubId: state.authentication.profile_id
});

export default connect(mapStateToProps)(connectWidgetLogin(NotConfirmed));
