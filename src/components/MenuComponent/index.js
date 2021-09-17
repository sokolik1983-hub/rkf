import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import { CSSTransition } from "react-transition-group";

import Card from "../Card";
import Modal from "../Modal";
import Loading from "../Loading";
import { Request, getHeaders } from "utils/request";
import useIsMobile from "../../utils/useIsMobile";
import PopupModal from "../PopupModal";
import DocsInFrame from "../DocsInFrame";

import "./index.scss";


const presidium = {
    rkf: {
        title: 'Состав Президиума РКФ',
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
        title: 'Состав Президиума СОКО РФЛС',
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
        title: 'Состав Президиума РФСС',
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
        title: 'Состав Президиума РФОС',
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
        title: 'Состав Президиума ОАНКОО',
        members: [
            'Голубев Владимир Семенович - президент'
        ]
    }
};

const presidiumRfls = <>
    <h4 className="menu-component__wrap-title">ПРЕЗИДИУМ РФЛС</h4>
    <table className="menu-component__table">
        <tbody>
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
        </tbody>
    </table>
    <br />
    <h4 className="menu-component__wrap-title">СПИСОК ЧЛЕНОВ РЕВИЗИОННОЙ КОМИССИИ РФЛС:</h4>
    <table className="menu-component__table" style={{ maxWidth: '68%' }}>
        <tbody>
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
        </tbody>
    </table>
</>;

const MenuComponent = ( { alias, name, user, isFederation, noCard = false, history, footerNav } ) => {
    const [showModal, setShowModal] = useState(false);
    const [blankCategories, setBlankCategories] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState(null);
    const [openMenuComponent, setOpenMenuComponent] = useState(false);
    const [openDoc, setOpenDoc] = useState(false);
    const [fedFeesId, setFedFeesId] = useState(null);
    const [fedDetails, setFedDetails] = useState(null);
    const isMobile = useIsMobile(1080);
    const showDetails = isFederation && alias !== 'rkf' && alias !== 'oankoo';
    const [doc, setDoc] = useState(null)


    useEffect(() => {
        if (showDetails) {
            //FederationDocumentType (1 - Реквизиты, 2 - членские взносы)
            //Alias (алиас федерации)
            (() => Request({
                url: `/api/federation/federation_documents?Alias=${alias}`
            }, data => {
                setFedFeesId(data[0]?.documents?.filter(i => i.document_type_id === 2)[0].document_id);
                setFedDetails(data[0]?.documents?.filter(i => i.document_type_id === 1)[0].document_id);
            }, error => {
                console.log(error.response);
                history.replace('/');
            }))();
        }
    }, [alias]);

    // const PromiseRequest = payload => new Promise((res, rej) => Request(payload, res, rej));

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
                <ol className="menu-component__wrap-list">
                    {presidium[alias].members.map((member, i) =>
                        <li className="menu-component__wrap-item" key={i}>{member}</li>
                    )}
                </ol>
            </>
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

    // const getBlanks = e => {
    //     e.preventDefault();
    //     setErrorText(null);
    //     setShowModal('blanks');
    //     if (!data.blanks) {
    //         setLoading(true);
    //         Promise.all([
    //             PromiseRequest({ url: `/api/federation/federationblank/all?alias=${alias}` }),
    //             PromiseRequest({ url: `/api/federation/federationblank/categories?alias=${alias}` })
    //         ]).then(result => {
    //             setData({ ...data, blanks: [...result[0]] });
    //             setBlankCategories(result[1]);
    //             setLoading(false);
    //         }).catch(error => {
    //             console.log(error.response);
    //             if (error.response) {
    //                 setErrorText(`${error.response.status} ${error.response.statusText}`);
    //             }
    //             setLoading(false);
    //         });
    //     }
    // };

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

    const showDoc = (id) => {
        setOpenDoc(true);
        setDoc(id);
    }

    return (
        <>
            <PopupModal
                showModal={openDoc}
                handleClose={() => setOpenDoc(false)}
            >
                <DocsInFrame fedDetails={doc}></DocsInFrame>
            </PopupModal>
            {isMobile ?
                <OutsideClickHandler onOutsideClick={() => setOpenMenuComponent(false)}>
                    {isMobile &&
                    <button
                        className={`user-nav__button${openMenuComponent ? ' _open' : ''}`}
                        onClick={() => setOpenMenuComponent(!openMenuComponent)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.04099 13.8913C3.99341 13.5411 3.42809 12.4079 3.7783 11.3604C4.12852 10.3128 5.26165 9.74745 6.30923 10.0977C7.35681 10.4479 7.92214 11.581 7.57192 12.6286C7.40374 13.1317 7.04261 13.5473 6.56797 13.7841C6.09333 14.0209 5.54406 14.0595 5.04099 13.8913ZM11.3655 13.8968C10.318 13.5466 9.75264 12.4135 10.1029 11.3659C10.4531 10.3183 11.5862 9.753 12.6338 10.1032C13.6814 10.4534 14.2467 11.5866 13.8965 12.6341C13.7283 13.1372 13.3672 13.5529 12.8925 13.7897C12.4179 14.0265 11.8686 14.065 11.3655 13.8968ZM17.6901 13.9024C16.6425 13.5522 16.0772 12.419 16.4274 11.3715C16.7776 10.3239 17.9108 9.75855 18.9583 10.1088C20.0059 10.459 20.5712 11.5921 20.221 12.6397C20.0528 13.1428 19.6917 13.5584 19.2171 13.7952C18.7424 14.032 18.1932 14.0706 17.6901 13.9024Z" fill="#979797"/>
                        </svg>
                         Еще
                    </button>
                    }
                    <CSSTransition
                        in={openMenuComponent}
                        timeout={350}
                        classNames="user-menu__transition"
                        unmountOnExit
                    >
                        <PopupModal
                            showModal={openMenuComponent}
                            handleClose={() => setOpenMenuComponent(false)}
                            bottomStyle
                        >
                            <div className="user-menu__inner">
                                <div className="close-btn">
                                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#90999E"/>
                                    </svg>
                                </div>
                                <ul className="user-menu__list">

                                    {user !== 'nursery' &&
                                    <li className="user-menu__item">
                                        <NavLink exact to={`/exhibitions?Alias=${alias}`} className="user-menu__link _events" title="Мероприятия">Мероприятия</NavLink>

                                    </li>
                                    }
                                    {presidium[alias] &&
                                    <li className="user-menu__item">
                                        <NavLink exact to="/" onClick={getPresidium} className="user-menu__link _presidium" title="Президиум">Президиум</NavLink>

                                    </li>
                                    }
                                    <li className="user-menu__item">
                                        <NavLink exact to={user === 'nursery' ? `/kennel/${alias}/news` : `/${alias}/news`} className="user-menu__link _public" title="Публикации">Публикации</NavLink>
                                    </li>
                                    <li className="user-menu__item">
                                        <NavLink exact to={user === 'nursery' ? `/kennel/${alias}/uploaded-documents/` : `/${alias}/uploaded-documents/`} className="user-menu__link _documents" title="Документы">Документы</NavLink>
                                    </li>
                                    <li className="user-menu__item">
                                        <NavLink exact to={user === 'nursery' ? `/kennel/${alias}/gallery` : `/${alias}/gallery`} className="user-menu__link _gallery" title="Фотогалерея">Фотогалерея</NavLink>
                                    </li>
                                    <li className="user-menu__item">
                                        <NavLink exact to={user === 'nursery' ? `/kennel/${alias}/video` : `/${alias}/video`} className="user-menu__link _video" title="Фотогалерея">Видеозаписи</NavLink>
                                    </li>
                                    {showDetails &&
                                    <>
                                        {fedFeesId && <li className="user-menu__item" onClick={() => showDoc(fedFeesId)}>
                                        <span className="menu-component__link _fees">
                                            Размеры членских взносов
                                        </span>
                                        </li>}
                                        {/* <li className="user-menu__item">
                                        <Link to="/" onClick={getBlanks} className="user-menu__link" title="Бланки">
                                            Бланки
                                    </Link>
                                    </li> */}
                                        {fedDetails &&
                                        <li className="user-menu__item" onClick={() => showDoc(fedDetails)}>
                            <span className="menu-component__link _requisites">
                                Реквизиты
                            </span>

                                        </li>}
                                    </>
                                    }
                                    {isFederation &&
                                    <li className="user-menu__item">
                                        <NavLink exact to={user === 'nursery' ? `/kennel/${alias}/document-status` : `/${alias}/document-status`} className="user-menu__link _documents" title="Статус документов">Статус документов</NavLink>
                                    </li>
                                    }
                                    <li className="user-menu__item">
                                        <NavLink exact to={user === 'nursery' ? `/kennel/${alias}` : `/${alias}`} className="user-menu__link _club" title={name}>
                                            {`Cтраница ${isFederation ? 'федерации' : (user === 'nursery' ? 'питомника' : 'клуба')}`}
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </PopupModal>

                    </CSSTransition>
                </OutsideClickHandler>
            :
            <Card>
                <ul className="menu-component__list">
                {user !== 'nursery' &&
                    <li className="menu-component__item">
                        <NavLink
                            exact
                            to={`/exhibitions?Alias=${alias}`}
                            className="menu-component__link _events"
                            title="Мероприятия"
                        >Мероприятия</NavLink>
                    </li>
                }
                {presidium[alias] &&
                    <li className="menu-component__item">
                        <NavLink
                            exact
                            to="/"
                            onClick={getPresidium}
                            className="menu-component__link _presidium"
                            title="Президиум"
                        >Президиум</NavLink>
                    </li>
                }
                <li className="menu-component__item">
                    <NavLink
                        exact
                        to={user === 'nursery' ? `/kennel/${alias}/news` : `/${alias}/news`}
                        className="menu-component__link _public"
                        title="Публикации"
                    >Публикации</NavLink>
                </li>
                <li className="menu-component__item">
                    <NavLink
                        exact
                        to={user === 'nursery' ? `/kennel/${alias}/uploaded-documents/` : `/${alias}/uploaded-documents/`}
                        className="menu-component__link _documents"
                        title="Документы"
                    >Документы</NavLink>
                </li>
                <li className="menu-component__item">
                    <NavLink
                        exact
                        to={user === 'nursery' ? `/kennel/${alias}/gallery` : `/${alias}/gallery`}
                        className="menu-component__link _gallery"
                        title="Фотогалерея"
                    >Фотогалерея</NavLink>
                </li>
                <li className="menu-component__item">
                    <NavLink
                        exact
                        to={user === 'nursery' ? `/kennel/${alias}/video` : `/${alias}/video`}
                        className="menu-component__link _video"
                        title="Фотогалерея"
                    >Видеозаписи</NavLink>
                </li>
                {showDetails &&
                    <>
                        {fedFeesId && <li className="menu-component__item" onClick={() => showDoc(fedFeesId)}>
                            <span className="menu-component__link _fees">
                                Размеры членских взносов
                                </span>
                        </li>}
                        {/* <li className="menu-component__item">
                            <Link
                                to="/"
                                onClick={getBlanks}
                                className="menu-component__link _blanks"
                                title="Бланки"
                            >
                                Бланки
                        </Link>
                        </li> */}
                        {fedDetails && <li className="menu-component__item" onClick={() => showDoc(fedDetails)}>
                            <span class="menu-component__link _requisites">
                                Реквизиты
                            </span>

                        </li>}
                    </>
                }
                {isFederation &&
                    <li className="menu-component__item">
                        <NavLink
                            exact
                            to={user === 'nursery' ? `/kennel/${alias}/document-status` : `/${alias}/document-status`}
                            className="menu-component__link _documents"
                            title="Статус документов"
                        >Статус документов</NavLink>
                    </li>
                }
                <li className="menu-component__item">
                    <NavLink
                        exact
                        to={user === 'nursery' ? `/kennel/${alias}` : `/${alias}`}
                        className="menu-component__link _club"
                        title={name}
                    >
                        {`Cтраница ${isFederation ? 'федерации' : (user === 'nursery' ? 'питомника' : 'клуба')}`}
                    </NavLink>
                </li>
            </ul>
            </Card>
            }
            {showModal &&
                <Modal
                    headerName={alias === 'rfls' ? "" : "Президиум"}
                    className="menu-component__modal"
                    showModal={showModal} handleClose={() => setShowModal(false)}
                    noBackdrop={true}>
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
        </>
    )
};

export default React.memo(MenuComponent);