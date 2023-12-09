import React from "react";
import {Link} from 'react-router-dom';
import Container from "../Layouts/Container";
import ls from 'local-storage';
import SubmitButton from "../../components/Form/SubmitButton";
import "./index.scss";




const ProfileEditPageControls = () => {
    const {alias} = ls.get('user_info') || {}

    return (
    <div className="ProfileEditPageControls">
        <Container className="container ProfileEditPageControls__inner">
            <Link className="ProfileEditPageControls__back" to={`/kennel/${alias}`}>Назад</Link>
                <SubmitButton>Сохранить</SubmitButton>
        </Container>
    </div>
    )
};
export default React.memo(ProfileEditPageControls);