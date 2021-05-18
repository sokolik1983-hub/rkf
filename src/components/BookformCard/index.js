import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Card from "../Card";
import Modal from "../Modal";
import Alert from "../Alert";
import { Request } from "../../utils/request";
import ls from "local-storage";
import "./index.scss";

const feds = {
    "РФСС": {
        id: 30629,
        federation: 'https://yandex.ru/poll/enter/EyPLyK531CypGWfK4kpumN',
        support: 'https://yandex.ru/poll/enter/B76mJcZ1LRkNCYeAAojSty'
    },
    "РФЛС": {
        id: 30627,
        federation: 'https://yandex.ru/poll/enter/9uhq1djVi5RPzdbfzdbgGs',
        support: 'https://yandex.ru/poll/enter/EYhekUnYmXY864nH47Djb1'
    },
    "РФОС": {
        id: 30628,
        federation: 'https://yandex.ru/poll/enter/5ds7dfT5GmyrcnaNyUehp7',
        support: 'https://yandex.ru/poll/enter/B7sraQmmFGtMpy2ZZ5AbNC'
    },
    "ОАНКОО/Фауна": {
        id: 30630,
        federation: 'https://yandex.ru/poll/enter/AXxQPxJVazKNZktJSkjHFh',
        support: 'https://yandex.ru/poll/enter/kUKs4Gzija8wsGpoR1QCi'
    },
    "ОАНКОО/РКК": {
        id: 30632,
        federation: 'https://yandex.ru/poll/enter/5orKZHTRjFTdhkR1gNHnZX',
        support: 'https://yandex.ru/poll/enter/XpnjF2hiGAYw691DbHNxnV'
    },
    "ОАНКОО/Элита": {
        id: 30631,
        federation: 'https://yandex.ru/poll/enter/3m4RVPpkBYv1BDZgCeWA5U',
        support: 'https://yandex.ru/poll/enter/ide3ioSZATAGvrg83cczh'
    }
};


const BookformCard = ({ url, distinction }) => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [link, setLink] = useState('');
    const [federation, setFederation] = useState('');
    const [color, setColor] = useState('');
    const [headerName, setHeaderName] = useState('');
    const [authorizedAccess, setAuthorizedAccess] = useState(true);

    const user_type = ls.get('user_info') ? ls.get('user_info').user_type : '';
    const user_email = ls.get('user_info') ? ls.get('user_info').mail : '';

    useEffect(() => {
        if (user_type === 4) {
            (() => Request({
                url: `/api/nurseries/nursery/federation_reception_access`
            }, data => {
                setAuthorizedAccess(data);
                setLoading(false);
            }, error => {
                console.log(error.response);
                setLoading(false);
            }))();
        }
    }, []);

    useEffect(() => {
        (() => Request({ url },
            data => {
                data && data.short_name && setFederation(data.short_name);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    const handleClick = (e, rkf, destination) => {
        e.preventDefault();
        if (!destination) {
            setColor('');
            setLink(`https://widget.bookform.ru/${rkf ? 30637 : federation && feds[federation].id}/`);
            setHeaderName(`Запись в ${rkf ? 'РКФ' : federation}`);
            setShowModal(true);
        } else {
            if (federation) {
                setColor('_blue');
                setLink(feds[federation][destination]);
                setHeaderName(`Оценка работы ${destination === "support" ? `службы поддержки ${federation}` : federation}`);
                setShowModal(true);
            } else {
                setShowAlert(true);
            }
        }
    };

    const correspondenceURL = `https://zline.me/widgets/registration-for-service?service_id=27&email=` + user_email;

    const handleZlineClick = (e, targetUrl, rkf) => {
        e.preventDefault();
        (() => Request({
            url: `/api/registration/user_info_for_zline_session_registration`
        }, data => {
            setLink(targetUrl + (data.first_name ? `&first_name=${data.first_name.replaceAll(' ', '_')}` : '') + (data.last_name ? `&last_name=${data.last_name.replaceAll(' ', '_')}` : '') + (data.phone ? `&phone=${data.phone.replaceAll(' ', '_')}` : '') + (data.additional_info ? `&additional_info=${data.additional_info.replaceAll(' ', '_')}` : ''));
            setColor('_blue');
            setHeaderName(`Запись в ${rkf ? 'РКФ' : federation}`);
            setShowModal(true);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    };


    const Bookform = <>
        {federation && authorizedAccess && <Card>
            <div className="documents-page__icon registration-icon" />
            <h3>ЗАПИСЬ НА ОЧНЫЙ ПРИЕМ В ФЕДЕРАЦИЮ</h3>
            <p>В данном разделе Вы можете записаться на очный прием в офисе Вашей федерации. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
            <p>Отменить запись в Федерацию Вы можете в группе в Telegram по ссылке <a href="https://t.me/EntryRKFOnline" target="_blank" rel="noopener noreferrer">https://t.me/EntryRKFOnline</a></p>
            <hr />
            <div className="Card__links">
                <Link to={`/`} onClick={e => handleClick(e)}>Запись в {federation}</Link>
            </div>
        </Card>}
        <Card>
            <div className="documents-page__icon registration-icon" />
            <h3>ЗАПИСЬ НА ОЧНЫЙ ПРИЕМ В РКФ</h3>
            <p>В данном разделе Вы можете записаться на очный прием в офисе РКФ. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
            <p>Отменить запись в РКФ Вы можете в группе в Telegram по ссылке <a href="https://t.me/EntryRKFOnline" target="_blank" rel="noopener noreferrer">https://t.me/EntryRKFOnline</a></p>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <div className="Card__links" style={{ marginRight: '20px' }}>
                    <Link to={`/`} onClick={e => handleClick(e, true)}>Запись в РКФ</Link>
                </div>
                <div className="Card__links">
                    <Link to={`/`} onClick={e => handleZlineClick(e, correspondenceURL, true)}>Подача корреспонденции в РКФ</Link>
                </div>
            </div>
        </Card>
    </>;

    const Review = <>
        <Card>
            <div className="documents-page__icon federation-quality-icon" />
            <h3>ОЦЕНКА РАБОТЫ ФЕДЕРАЦИИ</h3>
            <p>В данном разделе Вы можете поделиться своими впечатлениями от посещения офиса Вашей федерации. Опрос займет всего несколько минут, но пройти его можно не чаще одного раза в месяц, поэтому просим Вас отвечать искренне и быть очень внимательными. Помогите нам стать лучше - нам важно Ваше мнение!</p>
            <hr />
            <div className="Card__links">
                <Link to={`/`}
                    onClick={e => handleClick(e, null, 'federation')}
                    className={`Card__link${!federation ? ' _not-active' : ''}`}
                >Оценить работу {federation || 'Федерации'}</Link>
            </div>
        </Card>
        <Card>
            <div className="documents-page__icon federation-support-quality-icon" />
            <h3>ОЦЕНКА РАБОТЫ СЛУЖБЫ ПОДДЕРЖКИ ФЕДЕРАЦИИ</h3>
            <p>В данном разделе Вы можете поделиться своими впечатлениями от взаимодействия со службой поддержки федерации.  Опрос займет всего несколько минут, но пройти его можно не чаще одного раза в месяц, поэтому просим Вас отвечать искренне и быть очень внимательными. Помогите нам стать лучше - нам важно Ваше мнение!</p>
            <hr />
            <div className="Card__links">
                <Link to={`/`}
                    onClick={e => handleClick(e, null, 'support')}
                    className={`Card__link${!federation ? ' _not-active' : ''}`}
                >Оценить работу службы поддержки {federation || 'Федерации'}</Link>
            </div>
        </Card>
    </>;

    return loading ?
        <Loading /> :
        <div className="documents-page__right">
            {distinction === 'bookform' ? Bookform : Review}
            <Modal showModal={showModal}
                handleClose={() => {
                    setLink('');
                    setShowModal(false);
                }}
                className={`documents-page__modal${color ? ' ' + color : ''}`}
                headerName={headerName}
            >
                <iframe src={link} title="unique_iframe" />
            </Modal>
            {showAlert &&
                <Alert
                    text="Ваша организация не приписана ни к одной федерации. Для уточнения деталей обратитесь в Центр Поддержки."
                    okButton={true}
                    onOk={() => setShowAlert(false)}
                />
            }
        </div>
}

export default React.memo(BookformCard);
