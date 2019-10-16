import React, {useRef} from 'react';
import {connectClientClubLogoPicture} from 'apps/ClientClub/connectors';
import ActiveImageWrapper from 'components/ActiveImageWrapper';
import { DEFAULT_IMG } from 'appConfig';
import './styles.scss';

function ClubLogoPicture({backgroundImage, clubLogoUpdateSuccess, bindSubmitForm}) {
    const ref = useRef(null);

    return (
        <div className="ClubLogoPicture__holder">
            <h3>Логотип</h3>
            <ActiveImageWrapper
                requestUrl={'/api/Avatar/full'}
                onSubmitSuccess={clubLogoUpdateSuccess}
                bindSubmitForm={bindSubmitForm}
            >
                <div ref={ref} style={{
                    backgroundImage: `url(${backgroundImage ? backgroundImage : DEFAULT_IMG.clubAvatar })`
                }} className="ClubLogoPicture"/>
            </ActiveImageWrapper>
        </div>
    )
}

export default connectClientClubLogoPicture(ClubLogoPicture)