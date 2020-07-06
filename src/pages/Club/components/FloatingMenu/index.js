import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../../../components/Dropdown";
import { DropDownItem } from "../../../../components/DropDownItem";
import Modal from "components/Modal";
import Loading from "components/Loading";
import { Request } from "utils/request";
import formatDate from 'utils/formatDate';
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

const FloatingMenu = ({ alias, name, profileId, isFederation }) => {
    const [showModal, setShowModal] = useState(false);
    const [stamps, setStamps] = useState(null);
    const [showStampsModal, setShowStampsModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState(null);

    const handleStampsClick = e => {
        e.preventDefault();
        setErrorText(null);
        setShowStampsModal(true);
        if (!stamps) {
            setLoading(true);
            Request({
                url: `/api/clubs/ClubStampCode/activated_codes?id=${profileId}`,
                method: 'GET'
            }, data => {
                setStamps(data);
                setLoading(false);
            },
                error => {
                    console.log(error.response);
                    if (error.response) {
                        setErrorText(`Ошибка: ${error.response.status} ${error.response.statusText}`);
                    }
                    setLoading(false);
                });
        }
    };

    const handlePresidiumClick = e => {
        e.preventDefault();
        setShowModal(true);
    };

    return <div className="FloatingMenu__wrap">
        <Dropdown
            className="FloatingMenu"
            position="dropup"
            closeOnClick={true}
            innerComponent={
                <div className="FloatingMenu__icon">
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            }
        >
            <DropDownItem>
                <Link to={`/exhibitions?Alias=${alias}`} className="FloatingMenu__link" title="Мероприятия">Мероприятия</Link>
            </DropDownItem>
            {presidium[alias] &&
                <DropDownItem>
                    <Link to="/" onClick={handlePresidiumClick} className="FloatingMenu__link" title="Президиум">Президиум</Link>
                </DropDownItem>
            }
            <DropDownItem>
                <Link to={`/${alias}/news`} className="FloatingMenu__link" title="Новости">Новости</Link>
            </DropDownItem>
            <DropDownItem>
                <Link to={`/${alias}/gallery`} className="FloatingMenu__link" title="Фотогалерея">Фотогалерея</Link>
            </DropDownItem>
            {alias !== 'rkf' &&
                <DropDownItem>
                    <Link to="/" onClick={handleStampsClick} className="FloatingMenu__link" title="Клейма">Клейма</Link>
                </DropDownItem>
            }
            <DropDownItem>
                <Link to={`/${alias}/document-status`} title="Статус документов">Статус документов</Link>
            </DropDownItem>
            <DropDownItem>
                <Link to={`/${alias}`} className="FloatingMenu__link" title={name}>
                    {`Cтраница ${isFederation ? 'федерации' : 'клуба'}`}
                </Link>
            </DropDownItem>
        </Dropdown>
        {showStampsModal &&
            <Modal className="menu-component__modal" showModal={showStampsModal} handleClose={() => setShowStampsModal(false)} noBackdrop={true}>
                <div className="menu-component__presidium">
                    {
                        loading
                            ? <Loading centered={false} />
                            : <>
                                <h4 className="menu-component__presidium-title">Клейма</h4>
                                {
                                    stamps && stamps.length
                                        ? <ol className="menu-component__presidium-list">
                                            {stamps.map((s, i) =>
                                                <li className="menu-component__presidium-item" key={i}>
                                                    {`${s.stamp_code} (${formatDate(s.registration_date)})`}
                                                </li>
                                            )}
                                        </ol>
                                        : errorText ? errorText : 'Клейм не найдено'
                                }
                            </>
                    }
                </div>
            </Modal>
        }
        {showModal &&
            <Modal className="menu-component__modal" showModal={showModal} handleClose={() => setShowModal(false)} noBackdrop={true}>
                <div className="menu-component__presidium">
                    <h4 className="menu-component__presidium-title">{presidium[alias].title}</h4>
                    <ol className="menu-component__presidium-list">
                        {presidium[alias].members.map((member, i) =>
                            <li className="menu-component__presidium-item" key={i}>{member}</li>
                        )}
                    </ol>
                </div>
            </Modal>
        }
    </div>
};

export default React.memo(FloatingMenu);