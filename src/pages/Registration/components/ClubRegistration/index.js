import React, {useState} from "react";
import Select from "react-select";
import Modal from "../../../../components/Modal";
import ActivateClub from "./ActivateClub";
import {useDictionary} from "../../../../apps/Dictionaries";
import {DICTIONARIES} from "../../../../apps/Dictionaries/config";
import {Request} from "../../../../utils/request";
import "./index.scss";


const ClubRegistration = () => {
    const [clubs, setClubs] = useState(null);
    const [activeClub, setActiveClub] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {dictionary} = useDictionary(DICTIONARIES.cities);
    const selectOptions = [
        {value: 'reset', label: 'Все города'},
        ...dictionary.options
    ];

    const onClubClick = (id) => {
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
            await Request({
                url: `/api/Club/short_all?LegalCityId=${value.value}&QueryDate=${new Date().toISOString().split('T')[0]}`
            }, data => setClubs(data),
            error => {
                console.log(error.response);
            });
        }
        if (value.value === 'reset') setClubs(null);
    };

    return (
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
            {clubs &&
                <>
                    {clubs.length ?
                        <ul className="club-registration__list">
                            {clubs.map(club =>
                                <li key={club.club_id} onClick={() => onClubClick(club.club_id)}>
                                    {club.name ? club.name : club.legal_name}
                                </li>
                            )}
                        </ul> :
                        <h3>Ничего не найдено</h3>
                    }
                    <p className="club-registration__not-found">Если Вы не нашли Ваш клуб в списке, воспользуйтесь формой обратной связи</p>
                </>
            }
            {activeClub && <Modal showModal={showModal} handleClose={onModalClose}>
                <ActivateClub club={activeClub}/>
            </Modal>}
        </div>
    )
};

export default React.memo(ClubRegistration);