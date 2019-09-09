import React from 'react';
import {Link} from 'react-router-dom';
import AuthVisible from 'apps/Auth/containers/AuthVisible';
import {BtnEdit} from 'components/Svg'
import './EditLink.scss'


export default function EditLink({canEdit, exhibitionId}) {
    return (
        <AuthVisible>
            {canEdit ? (
                <Link className="ExhibitionEditLink" to={`client/exhibitions/${exhibitionId}/details/common`}>
                    <span>Редактировать</span> <BtnEdit className="ExhibitionEditLink__ico"/>
                </Link>
            ) : null}
        </AuthVisible>
    );
}
