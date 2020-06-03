import React, { useState } from "react";
import Select from "react-select";
import Loading from "components/Loading";
import Modal from "components/Modal";
import ActivateClub from "./ActivateClub";
import { useDictionary } from "dictionaries";
import { DICTIONARIES } from "dictionaries/config";
import { Request } from "utils/request";
import "./index.scss";


const ClubRegistration = () => {
    const [clubs, setClubs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeClub, setActiveClub] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { dictionary } = useDictionary(DICTIONARIES.cities);
    const selectOptions = [
        { value: 'reset', label: 'Все города' },
        ...dictionary.options
    ];

    const onClubClick = id => {
        setShowModal(true);
        setActiveClub(...clubs.filter(club => club.club_id === id));
    };

    const onModalClose = () => {
        if (showModal && window.confirm("Закрыть?")) {
            setShowModal(false);
            setActiveClub(null);
        }
    };

    const onCityChange = async value => {
        if (value.value && value.value !== 'reset') {
            setLoading(true);
            await Request({
                url: `/api/Club/short_all?LegalCityId=${value.value}&QueryDate=${new Date().toISOString().split('T')[0]}`
            }, data => {
                setClubs(data);
                setLoading(false);
            },
                error => {
                    setLoading(false);
                    console.log(error.response);
                });
        }
        if (value.value === 'reset') setClubs(null);
    };

    return (<>
        <div className="registration-page__holder club-registration">
            <Select
                className="club-registration__select"
                placeholder={'Введите название города'}
                noOptionsMessage={() => 'Город не найден'}
                options={selectOptions}
                onChange={onCityChange}
                styles={{
                    input: styles => ({
                        ...styles,
                        width: 200
                    }),
                    container: styles => ({
                        ...styles,
                        width: 300
                    })
                }}
            />
            {loading && <Loading inline />}
            {!loading && clubs &&
                <>
                    {clubs.length ?
                        <ul className="club-registration__list">
                            {clubs.map(club =>
                                <li key={club.club_id} onClick={() => onClubClick(club.club_id)}>
                                    {club.name ? club.name : club.legal_name}
                                </li>
                            )}
                        </ul> :
                        <div className="club-registration__empty">
                            <h3 className="club-registration__empty-title">Ничего не найдено</h3>
                            <div className="club-registration__empty-icon" />
                        </div>
                    }
                    <p className="club-registration__not-found">Если Вы не нашли Ваш клуб в списке, воспользуйтесь формой обратной связи</p>
                </>
            }
            {activeClub &&
                <Modal showModal={showModal} handleClose={onModalClose} className="club-registration__modal">
                    <ActivateClub club={activeClub} />
                </Modal>
            }
        </div>
        <div className="registration-page__support-links">
            <p>
                <a href="https://help.rkf.online/ru/knowledge_base/article/36/category/3/#/" target="_blank" rel="noopener noreferrer">Инструкция по регистрации клуба на портале RKF.Online</a>
            </p>
            <p>
                <a href="https://help.rkf.online/ru/knowledge_base/art/52/cat/3/#/" target="_blank" rel="noopener noreferrer">Видео-инструкция по регистрации клуба на портале RKF.Online</a>
            </p>
        </div>
    </>
    )
};

export default React.memo(ClubRegistration);