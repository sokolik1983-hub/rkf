import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import AuthVisible from 'apps/Auth/containers/AuthVisible';
import {BtnEdit} from 'components/Svg'
import './EditLink.scss'


export default function EditLink({canEdit, exhibitionId}) {
    if(!canEdit) return null;

    const [redirect, setRedirect] = useState(false);

    const handleOnClick = (e) => {
        e.preventDefault();
        setRedirect(true);
    };

    return (
        redirect ?
            <Redirect push to={`client/exhibitions/${exhibitionId}/details/common`} /> :
            <AuthVisible>
                <div className="ExhibitionEditLink" onClick={handleOnClick}>
                    <span>Редактировать</span> <BtnEdit className="ExhibitionEditLink__ico"/>
                </div>
            </AuthVisible>
    );
}
