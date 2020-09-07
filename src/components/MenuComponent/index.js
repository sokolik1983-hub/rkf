import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import Modal from "../Modal";
import Loading from "../Loading";
import { Request, getHeaders } from "utils/request";
import {CSSTransition} from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import "./index.scss";

const presidium = {
    rkf: {
        title: 'Состав Президиума РКФ:',
        members: [
            'В.С. Голубев (ОАНКОО)',
            'В.А. Александров (РФСС)',
            'Л.В. Галиаскарова (РФСС)',
            'Т.В. Григоренко (РФСС)',
            'Н.А. Деменёв (ОАНКОО)',
            'Е.Г. Домогацкая (РФОС)',
            'Е.С. Купляускас (РФЛС)',
            'А.В. Никитин (РФЛС)',
            'Н.Б. Седых (РФЛС)',
            'А.А. Солдатов (РФОС)',
            'Н.Г. Харатишвили (ОАНКОО)',
            'Р.Р. Хомасуридзе (РФОС)'
        ]
    },
    rfls: {
        title: 'Состав Президиума СОКО РФЛС:',
        members: [
            'Голубев Владимир Семенович',
            'Бычкова Елена Ивановна',
            'Ваулина Нина Павловна',
            'Горева Светлана Викторовна',
            'Городилов Станислав Валентинович',
            'Зубкова Людмила Анатольевна',
            'Купляускас Евгений Стасович',
            'Мазина Людмила Анатольевна',
            'Набиева Марина Борисовна',
            'Никитин Александр Владимирович',
            'Новиславский Олег Юрьевич',
            'Седых Николай Борисович',
            'Швец Ирина Львовна'
        ]
    },
    rfss: {
        title: 'Состав Президиума РФСС:',
        members: [
            'Александров Владимир Аркадьевич - президент',
            'Галиаскарова Лариса Викторовна - вице-президент, член бюро',
            'Круценко Елена Юрьевна - вице-президент, член бюро',
            'Янчев Олег Владимирович - вице-президент, член бюро',
            'Трофимов Дмитрий Валерьевич - ответственный секретарь, член бюро',
            'Луговой Алексей Алексеевич - член бюро',
            'Коробейников Александр Филиппович - член бюро',
            'Григоренко Татьяна Васильевна',
            'Григорьева Надежда Геннадьевна',
            'Овсянникова Юлия Валерьевна',
            'Дубенский Александр Анатольевич',
            'Котельникова Ольга Капитоновна',
            'Попов Сергей Анатольевич',
            'Попов Сергей Викторович',
            'Соловьев Валерий Викторович'
        ]
    },
    rfos: {
        title: 'Состав Президиума РФОС:',
        members: [
            'Домогацкая Екатерина Григорьевна - президент',
            'Солдатов Алексей Андреевич - Председатель Попечительского совета',
            'Галкин Артем Андреевич',
            'Гусева Юлия Вячеславовна',
            'Краснова Ольга Борисовна',
            'Островская Марина Григорьевна',
            'Синяк Александр Николаевич',
            'Стусь Виктор Николаевич',
            'Чалдина Татьяна Алексеевна'
        ]
    },
    oankoo: {
        title: 'Состав Президиума ОАНКОО:',
        members: [
            'Голубев Владимир Семенович - президент'
        ]
    }
};

const presidiumRfls = <>
    <h4 className="menu-component__wrap-title">ПРЕЗИДИУМ РФЛС</h4>
    <table className="menu-component__table">
        <tr>
            <td>1.</td>
            <td>Голубев Владимир Семенович</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>Бычкова Елена Ивановна</td>
            <td>Тел.: +7-918-748-85-20</td>
            <td>E-mail:elena 69@bk.ru</td>
        </tr>
        <tr>
            <td>3.</td>
            <td>Ваулина Нина Павловна</td>
            <td>Тел.: +7-922-236-44-13</td>
            <td>E-mail:chelregools@gmail.com</td>
        </tr>
        <tr>
            <td>4.</td>
            <td>Горева Светлана Викторовна</td>
            <td>Тел.: +7-926-580-79-29</td>
            <td>E-mail: sgoreva@inbox.ru</td>
        </tr>
        <tr>
            <td>5.</td>
            <td>Городилов Станислав Валентинович</td>
            <td>Тел.: +7-914-237-24-66</td>
            <td>E-mail: yras89142732466@icloud.com</td>
        </tr>
        <tr>
            <td>6.</td>
            <td>Зубкова Людмила Анатольевна</td>
            <td>Тел.: +7-903-947-07-35</td>
            <td>E-mail: zubkova-69@mail.ru</td>
        </tr>
        <tr>
            <td>7.</td>
            <td>Купляускас Евгений Стасович</td>
            <td>Тел.: +7-903-509-57-68</td>
            <td>E-mail: koulstas@mail.ru</td>
        </tr>
        <tr>
            <td>8.</td>
            <td>Мазина Людмила Анатольевна</td>
            <td>Тел.: +7-917-219-50-00</td>
            <td>E-mail: volga.rfls.info@yandex.ru</td>
        </tr>
        <tr>
            <td>9.</td>
            <td>Набиева Марина Борисовна</td>
            <td>Тел.: +7-921-261-72-12</td>
            <td>E-mail: m.b.nabieva@yandex.ru</td>
        </tr>
        <tr>
            <td>10.</td>
            <td>Никитин Александр Владимирович</td>
            <td>Тел.: +7-903-856-87-80</td>
            <td>E-mail: cacchr@mail.ru</td>
        </tr>
        <tr>
            <td>11.</td>
            <td>Новиславский Олег Юрьевич</td>
            <td>Тел.: +7-926-211-39-39</td>
            <td>E-mail: denfris@gmail.com</td>
        </tr>
        <tr>
            <td>12.</td>
            <td>Седых Николай Борисович</td>
            <td>Тел.: +7-911-241-34-16</td>
            <td>E-mail: nik5978824@yandex.ru</td>
        </tr>
        <tr>
            <td>13.</td>
            <td>Швец Ирина Львовна</td>
            <td>Тел.: +7-916-145-16-41</td>
            <td>E-mail: icetoifel@mail.ru</td>
        </tr>
    </table>
    <br />
    <h4 className="menu-component__wrap-title">СПИСОК ЧЛЕНОВ РЕВИЗИОННОЙ КОМИССИИ РФЛС:</h4>
    <table className="menu-component__table" style={{ maxWidth: '68%' }}>
        <tr>
            <td>
                Председатель:
            </td>
            <td>
                Бородин Дмитрий
            </td>
            <td>
                Тел.: +7-919-247-69065
            </td>
        </tr>
        <tr>
            <td>
                Члены:
            </td>
            <td>
                Бойко Надежда
            </td>
            <td>
                Тел.: +7-915-089-81-58
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                Эглит Вероника
            </td>
            <td>
                Тел.: +7-909-670-35-54
            </td>
        </tr>
    </table>
</>;

const MenuComponent = ({ alias, name, user, isFederation, noCard = false }) => {
    const [showModal, setShowModal] = useState(false);
    const [blankCategories, setBlankCategories] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState(null);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 990);

        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 990);
        });

        return window.removeEventListener('resize', () => {
            setIsMobile(window.innerWidth < 990);
        });
    }, []);

    const PromiseRequest = payload => new Promise((res, rej) => Request(payload, res, rej));

    const getPresidium = e => {
        e.preventDefault();
        setErrorText(null);
        setShowModal('presidium');
        setLoading(false);
    };

    const showPresidium = () => {
        if (alias === 'rfls') {
            return presidiumRfls
        } else {
            return <>
                <h4 className="menu-component__wrap-title">{presidium[alias].title}</h4>
                <ol className="menu-component__wrap-list">
                    {presidium[alias].members.map((member, i) =>
                        <li className="menu-component__wrap-item" key={i}>{member}</li>
                    )}
                </ol>
            </>
        }
    };

    const getFees = e => {
        e.preventDefault();
        setErrorText(null);
        setShowModal('fees');
        if (!data.fees) {
            setLoading(true);
            Request({
                url: `/api/federation/membership_fees?alias=${alias}`,
                method: 'GET'
            }, result => {
                setData({ ...data, fees: [...result] });
                setLoading(false);
            },
                error => {
                    console.log(error.response);
                    if (error.response) {
                        setErrorText(`${error.response.status} ${error.response.statusText}`);
                    }
                    setLoading(false);
                });
        }
    };

    const showFees = () => {
        return <>
            <h4 className="menu-component__wrap-title">РАЗМЕР, СРОКИ И ПОРЯДОК ВНЕСЕНИЯ ВСТУПИТЕЛЬНЫХ И ЧЛЕНСКИХ ВЗНОСОВ  В РФЛС</h4>
            <table className="menu-component__table fees">
                {data.fees
                    ? data.fees.map(({ name, price, description }) => {
                        return <tr>
                            <td>{name}</td>
                            <td dangerouslySetInnerHTML={{ __html: `${price} руб.${description ? '<br/>' + description : ''}` }} />
                        </tr>
                    })
                    : errorText ? errorText : 'Не найдено'}
            </table>
        </>
    };

    const getBlanks = e => {
        e.preventDefault();
        setErrorText(null);
        setShowModal('blanks');
        if (!data.blanks) {
            setLoading(true);
            Promise.all([
                PromiseRequest({ url: `/api/federation/federationblank/all?alias=${alias}` }),
                PromiseRequest({ url: `/api/federation/federationblank/categories?alias=${alias}` })
            ]).then(result => {
                setData({ ...data, blanks: [...result[0]] });
                setBlankCategories(result[1]);
                setLoading(false);
            }).catch(error => {
                console.log(error.response);
                if (error.response) {
                    setErrorText(`${error.response.status} ${error.response.statusText}`);
                }
                setLoading(false);
            });
        }
    };

    const showBlanks = () => blankCategories.map(({ id, name }) => {
        return <div className="menu-component__show-blanks" key={id}>
            <h4 className="menu-component__wrap-title">{name}</h4>
            {
                data.blanks
                    ? data.blanks.filter(b => b.category_id === id).map(({ document_name, document_id }) => {
                        return <p key={document_id}><a href="/" onClick={e => downloadBlank(e, document_id, document_name)}>{document_name}</a></p>
                    })
                    : errorText ? errorText : 'Не найдено'
            }
        </div>
    });

    const getRequisites = e => {
        e.preventDefault();
        setErrorText(null);
        setShowModal('requisites');
        if (!data.requisites) {
            setLoading(true);
            Request({
                url: `/api/federation/requisites?alias=${alias}`,
                method: 'GET'
            }, result => {
                setData({ ...data, requisites: { ...result } })
                setLoading(false);
            },
                error => {
                    console.log(error.response);
                    if (error.response) {
                        setErrorText(`${error.response.status} ${error.response.statusText}`);
                    }
                    setLoading(false);
                });
        }
    };

    const showRequisites = () => {
        const { owner_name,
            legal_address,
            actual_address,
            mailing_address,
            inn,
            rs_number,
            bic_number,
            ks_number,
            phone,
            work_time } = data.requisites;
        return <>
            <h4 className="menu-component__wrap-title">РЕКВИЗИТЫ</h4>
            <p><strong>Президент СОКО РФЛС - {owner_name}</strong></p>
            <p><strong>Юридический адрес:</strong> {legal_address}</p>
            <p><strong>Фактический адрес:</strong> {actual_address}</p>
            <p><strong>Почтовый адрес:</strong> {mailing_address}</p>
            <p><strong>Реквизиты:</strong><br />
            ИНН {inn}<br />
            Р/с {rs_number}<br />
            БИК {bic_number}<br />
            К/с {ks_number}
            </p>
            <p><strong>Телефон:</strong> {phone}</p>
            <p>{work_time}</p>
        </>
    };

    const downloadBlank = async (e, id, name) => {
        e.preventDefault();
        const el = e.target;
        const blankName = e.target.innerText;
        el.innerText = 'Загрузка...';
        el.classList.add('disabled');
        await fetch(`/api/federationblankdocument?id=${id}`, {
            method: 'GET',
            headers: getHeaders()
        })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob),
                    a = document.createElement('a');
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
        el.classList.remove('disabled');
        el.innerText = blankName;
    };

    const MenuContent = () => isMobile ? <Card className="user-menu">
    <h4 className="user-menu__title">Меню</h4>
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        {isMobile &&
            <button className={`user-menu__button${open ? ' _open' : ''}`} onClick={() => setOpen(!open)}>
                <span/>
                <span/>
                <span/>
                <span/>
            </button>
        }
        <CSSTransition
            in={!isMobile || (isMobile && open)}
            timeout={350}
            classNames="user-menu__transition"
            unmountOnExit
        >
            <ul className="user-menu__list">
                {user !== 'nursery' && <li className="user-menu__item">
                    <Link to={`/exhibitions?Alias=${alias}`} className="menu-component__link" title="Мероприятия">Мероприятия</Link>
                </li>}
                <li className="user-menu__item">
                    <Link to={user === 'nursery' ? `/kennel/${alias}/news` : `/${alias}/news`} className="menu-component__link" title="Публикации">Публикации</Link>
                </li>
                <li className="user-menu__item">
                    <Link to={user === 'nursery' ? `/kennel/${alias}/gallery` : `/${alias}/gallery`} className="menu-component__link" title="Фотогалерея">Фотогалерея</Link>
                </li>
                {user !== 'nursery' &&
                <li className="user-menu__item">
                    <Link to={`/${alias}/document-status`} className="menu-component__link" title="Статус документов">Статус документов</Link>
                </li>}
                <li className="user-menu__item">
                    <Link to={user === 'nursery' ? `/kennel/${alias}` : `/${alias}`} className="menu-component__link not-active" title={name}>
                        {`Cтраница ${isFederation ? 'федерации' : (user === 'nursery' ? 'питомника' : 'клуба')}`}
                    </Link>
                </li>
            </ul>
        </CSSTransition>
    </OutsideClickHandler>
</Card> : <>
        <ul className="menu-component__list">
            {user !== 'nursery' && <li className="menu-component__item">
                <Link to={`/exhibitions?Alias=${alias}`} className="menu-component__link" title="Мероприятия">Мероприятия</Link>
            </li>}
            {presidium[alias] &&
                <li className="menu-component__item">
                    <Link to="/" onClick={getPresidium} className="menu-component__link" title="Президиум">Президиум</Link>
                </li>
            }
            <li className="menu-component__item">
                <Link to={user === 'nursery' ? `/kennel/${alias}/news` : `/${alias}/news`} className="menu-component__link" title="Публикации">Публикации</Link>
            </li>
            <li className="menu-component__item">
                <Link to={user === 'nursery' ? `/kennel/${alias}/gallery` : `/${alias}/gallery`} className="menu-component__link" title="Фотогалерея">Фотогалерея</Link>
            </li>
            {alias === 'rfls' && <>
                <li className="menu-component__item">
                    <Link to="/" onClick={getFees} className="menu-component__link" title="Размеры членских взносов">
                        Размеры членских взносов
                        </Link>
                </li>
                <li className="menu-component__item">
                    <Link to="/" onClick={getBlanks} className="menu-component__link" title="Бланки">
                        Бланки
                        </Link>
                </li>
                <li className="menu-component__item">
                    <Link to="/" onClick={getRequisites} className="menu-component__link" title="Реквизиты">
                        Реквизиты
                        </Link>
                </li>
            </>}
            
                <li className="menu-component__item">
                    <Link to={`/${alias}/document-status`} className="menu-component__link" title="Статус документов">Статус документов</Link>
                </li>
            <li className="menu-component__item">
                <Link to={user === 'nursery' ? `/kennel/${alias}` : `/${alias}`} className="menu-component__link not-active" title={name}>
                    {`Cтраница ${isFederation ? 'федерации' : (user === 'nursery' ? 'питомника' : 'клуба')}`}
                </Link>
            </li>
        </ul>
        {showModal &&
            <Modal className="menu-component__modal" showModal={showModal} handleClose={() => setShowModal(false)} noBackdrop={true}>
                <div className="menu-component__wrap">
                    {
                        loading
                            ? <Loading centered={false} />
                            : <>
                                {showModal === 'presidium' && showPresidium()}
                                {showModal === 'fees' && showFees()}
                                {showModal === 'blanks' && showBlanks()}
                                {showModal === 'requisites' && showRequisites()}
                            </>
                    }
                </div>
            </Modal>
        }
    </>;
    return (
        noCard
            ? <MenuContent />
            : <Card className="menu-component"><MenuContent /></Card>
    )
};

export default React.memo(MenuComponent);