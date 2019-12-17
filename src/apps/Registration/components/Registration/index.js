import React, { useState } from 'react';
import CommonLayout from 'components/Layout/CommonRegistrationLogin';
import Modal from 'components/Modal';
import { useDictionary } from 'apps/Dictionaries';
import { DICTIONARIES } from 'apps/Dictionaries/config';
import ActivateClub from './ActivateClub';
import Select from 'react-select';
import './style.scss';

const Registration = () => {
    const [clubs, setClubs] = useState(undefined);
    const [activeClub, setActiveClub] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const onClubClick = (id) => {
        setShowModal(true);
        setActiveClub(...clubs.filter((club) => club.club_id === id));
    }
    const onModalClose = () => {
        if (showModal && window.confirm("Закрыть?")) {
            setShowModal(false);
            setActiveClub(false);
        }
    }
    const { dictionary } = useDictionary(DICTIONARIES.cities);
    const selectOptions = [
        { value: 'reset', label: 'Все города' },
        ...dictionary.options
    ];
    const onCityChange = value => {
        if (value.value && value.value !== 'reset') {
            fetch('/api/Club/short_all?LegalCityId=' + value.value + '&QueryDate=' + new Date().toISOString().split('T')[0], { method: "GET" })
                .then(response => response.json())
                .then(({ result }) => setClubs([...result]))
        }
        if (value.value === 'reset') setClubs(undefined);
    };

    return (
        <CommonLayout image={'/static/images/registration/banner.png'}>
            <div className="registration__holder registration">
                <div className="registration__logo" />
                <div className="registration__title">Регистрация</div>
                <Select
                    className="registration__select"
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
                {clubs &&
                    <>
                        {clubs.length ?
                            <ul className="registration__list">
                                {clubs.map(club =>
                                    <li key={club.club_id} onClick={() => onClubClick(club.club_id)}>
                                        {club.name ? club.name : club.legal_name}
                                    </li>
                                )}
                            </ul> :
                            <h3>Ничего не найдено</h3>
                        }
                        <p className="registration__not-found">Если Вы не нашли Ваш клуб в списке, воспользуйтесь формой обратной связи</p>
                    </>
                }
            </div>

            {activeClub && <Modal showModal={showModal} handleClose={onModalClose}>
                <ActivateClub club={activeClub} />
            </Modal>}
        </CommonLayout>
    );
};

export default Registration;