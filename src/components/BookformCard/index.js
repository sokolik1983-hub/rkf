import React, {memo, useEffect, useState} from "react";
import ls from "local-storage";
import Loading from "../Loading";
import Card from "../Card";
import Modal from "../Modal";
import ZlineWidget from "../ZLineWidget";
import Alert from "../Alert";
import {Request} from "../../utils/request";
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

const RKF = 'https://zline.me/widgets/registration-for-service?id=18';
const RFSS = 'https://zline.me/widgets/registration-for-service?id=25';
const RFOS = 'https://zline.me/widgets/registration-for-service?id=24';
const RFLS = 'https://zline.me/widgets/registration-for-service?id=23';
const ELITA = 'https://zline.me/widgets/registration-for-service?id=22';
const FAUNA = 'https://zline.me/widgets/registration-for-service?id=21';
const RKK = 'https://zline.me/widgets/registration-for-service?id=20';

const BookformCard = ({url, distinction}) => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showZlineModal, setShowZlineModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [iframeLink, setIframeLink] = useState('');
    const [federation, setFederation] = useState('');
    const [color, setColor] = useState('');
    const [headerName, setHeaderName] = useState('');
    const [authorizedAccess, setAuthorizedAccess] = useState(true);
    const user_type = ls.get('user_info') ? ls.get('user_info').user_type : '';

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

        (() => Request({url},
            data => {
                if(data && data.short_name) {
                    setFederation(data.short_name);
                }
                setLoading(false);
            }, error => {
                console.log(error.response);
                setLoading(false);
        }))();
    }, []);

    const handleClick = (e, isRKF, destination) => {
        e.preventDefault();
        if (!destination) {
            let frameLink = 'https://zsstage.uep24.ru/widgets/registration-for-service?id=92';

            if(process.env.NODE_ENV === 'production') {
                frameLink = isRKF ? RKF :
                    federation === 'РФСС' ? RFSS :
                    federation === 'РФОС' ? RFOS :
                    federation === 'РФЛС' ? RFLS :
                    federation === 'ОАНКОО/Элита' ? ELITA :
                    federation === 'ОАНКОО/Фауна' ? FAUNA :
                    federation === 'ОАНКОО/РКК' ? RKK : '';
            }

            setIframeLink(frameLink);
            setShowZlineModal(true);
        } else {
            if (federation) {
                setColor('_blue');
                setIframeLink(feds[federation][destination]);
                setHeaderName(`Оценка работы ${destination === "support" ? `службы поддержки ${federation}` : federation}`);
                setShowModal(true);
            } else {
                setShowAlert(true);
            }
        }
    };

    return loading ?
        <Loading /> :
        <div className="documents-page__right">
            {distinction === 'bookform' ?
                <>
                    {federation && authorizedAccess &&
                        <Card>
                            <div className="documents-page__icon registration-icon" />
                            <h3>ЗАПИСЬ НА ОЧНЫЙ ПРИЕМ В ФЕДЕРАЦИЮ</h3>
                            <p>В данном разделе Вы можете записаться на очный прием в офисе Вашей федерации. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
                            <p>Отменить запись в Федерацию Вы можете в группе в Telegram по ссылке <a href="https://t.me/EntryRKFOnline" target="_blank" rel="noopener noreferrer">https://t.me/EntryRKFOnline</a></p>
                            <hr />
                            <div className="Card__links">
                                <span
                                    className={`Card__link${!federation ? ' _not-active' : ''}`}
                                    onClick={e => handleClick(e, false, null)}
                                >
                                    Запись в {federation}
                                </span>
                            </div>
                        </Card>
                    }
                    <Card>
                        <div className="documents-page__icon registration-icon" />
                        <h3>ЗАПИСЬ НА ОЧНЫЙ ПРИЕМ В РКФ</h3>
                        <p>В данном разделе Вы можете записаться на очный прием в офисе РКФ. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
                        <p>Отменить запись в РКФ Вы можете в группе в Telegram по ссылке <a href="https://t.me/EntryRKFOnline" target="_blank" rel="noopener noreferrer">https://t.me/EntryRKFOnline</a></p>
                        <hr />
                        <div className="_flex-start-wrap">
                            <div className="Card__links">
                                <span
                                    className={`Card__link${!federation ? ' _not-active' : ''}`}
                                    onClick={e => handleClick(e, true, null)}
                                >
                                    Запись на услуги РКФ
                                </span>
                            </div>
                        </div>
                    </Card>
                </> :
                <>
                    <Card>
                        <div className="documents-page__icon federation-quality-icon" />
                        <h3>ОЦЕНКА РАБОТЫ ФЕДЕРАЦИИ</h3>
                        <p>В данном разделе Вы можете поделиться своими впечатлениями от посещения офиса Вашей федерации. Опрос займет всего несколько минут, но пройти его можно не чаще одного раза в месяц, поэтому просим Вас отвечать искренне и быть очень внимательными. Помогите нам стать лучше - нам важно Ваше мнение!</p>
                        <hr />
                        <div className="Card__links">
                            <span
                                className={`Card__link${!federation ? ' _not-active' : ''}`}
                                onClick={e => handleClick(e, null, 'federation')}
                            >
                                Оценить работу {federation || 'Федерации'}
                            </span>
                        </div>
                    </Card>
                    <Card>
                        <div className="documents-page__icon federation-support-quality-icon" />
                        <h3>ОЦЕНКА РАБОТЫ СЛУЖБЫ ПОДДЕРЖКИ ФЕДЕРАЦИИ</h3>
                        <p>В данном разделе Вы можете поделиться своими впечатлениями от взаимодействия со службой поддержки федерации.  Опрос займет всего несколько минут, но пройти его можно не чаще одного раза в месяц, поэтому просим Вас отвечать искренне и быть очень внимательными. Помогите нам стать лучше - нам важно Ваше мнение!</p>
                        <hr />
                        <div className="Card__links">
                            <span
                                className={`Card__link${!federation ? ' _not-active' : ''}`}
                                onClick={e => handleClick(e, null, 'support')}
                            >
                                Оценить работу службы поддержки {federation || 'Федерации'}
                            </span>
                        </div>
                    </Card>
                </>
            }
            <Modal showModal={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setIframeLink('');
                }}
                className={`documents-page__modal${color ? ' ' + color : ''}`}
                headerName={headerName}
            >
                <iframe src={iframeLink} title="unique_iframe" />
            </Modal>
            <ZlineWidget
                isModalShow={showZlineModal}
                handleClose={() => {
                    setShowZlineModal(false);
                    setIframeLink('');
                }}
                iframeLink={iframeLink}
            />
            {showAlert &&
                <Alert
                    text="Ваша организация не приписана ни к одной федерации. Для уточнения деталей обратитесь в Центр Поддержки."
                    okButton={true}
                    onOk={() => setShowAlert(false)}
                />
            }
        </div>
}

export default memo(BookformCard);