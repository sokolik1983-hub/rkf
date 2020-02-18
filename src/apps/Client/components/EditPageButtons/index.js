import React from "react";
import {Link} from "react-router-dom";
import Container from "../../../../components/Layouts/Container";
import {connectClubPublicLink} from "apps/ClientClub/connectors";
import './styles.scss';


function EditPageButtons({ club_alias, handleSubmitForms }) {
    return (
        <div className="EditPageButtons">
            <Container className="EditPageButtons__inner">
                <Link className="EditPageButtons__back" to={`/${club_alias}`}>Назад</Link>
                {handleSubmitForms &&
                    <button className="EditPageButtons__save" onClick={handleSubmitForms}>Сохранить</button>
                }
            </Container>
        </div>
    )
}

export default connectClubPublicLink(EditPageButtons)
