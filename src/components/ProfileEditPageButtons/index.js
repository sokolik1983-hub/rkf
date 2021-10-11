import React from "react";
import {Link} from 'react-router-dom';
import Container from "../Layouts/Container";
import ls from 'local-storage';
// import {connectClubPublicLink} from "../../connectors"; // ссылка клуба или питомника

import SubmitButton from "../../components/Form/SubmitButton";

import "./index.scss";




const ProfileEditPageButtons = ({handleSubmitForms}) => {
    // const alias = useLocation();
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';

    return (
    <div className="ProfileEditPageButtons">
        <Container className="container ProfileEditPageButtons__inner">
            <Link className="ProfileEditPageButtons__back" to={`/kennel/${alias}`}>Назад</Link>

             {/*<button className="ProfileEditPageButtons__save" onClick={handleSubmitForms}>Сохранить</button>*/}
                <SubmitButton handleSubmitForms=''>Сохранить</SubmitButton>
        </Container>

    </div>
    )
};
// ${working ? ' working' : ''}
export default React.memo(ProfileEditPageButtons);