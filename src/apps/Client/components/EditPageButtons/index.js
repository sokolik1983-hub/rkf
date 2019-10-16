import React from 'react'
import { Link } from 'react-router-dom'
import { connectClubPublicLink } from 'apps/ClientClub/connectors'
import './styles.scss';

function EditPageButtons({ club_alias, handleSubmitForms }) {
    return (
        <div className="EditPageButtons">
            <div className="EditPageButtons__inner">
                <Link className="EditPageButtons__back" to={`/${club_alias}`}>Назад</Link>
                {handleSubmitForms &&
                    <button className="EditPageButtons__save" onClick={handleSubmitForms}>Сохранить</button>
                }
            </div>
        </div>
    )
}

export default connectClubPublicLink(EditPageButtons)
