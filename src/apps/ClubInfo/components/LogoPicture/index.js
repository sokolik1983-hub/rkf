import React, {useRef} from 'react'
import {connectClientClubLogoPicture} from 'apps/ClientClub/connectors'
import ActiveImageWrapper from 'components/ActiveImageWrapper'
import './styles.scss'


function ClubLogoPicture({backgroundImage, clubLogoUpdateSuccess}) {
    const ref = useRef(null);
    return (
        <div className="ClubLogoPicture__holder">
            <h3>Логотип</h3>
            <ActiveImageWrapper
                requestUrl={'/api/Avatar/full'}
                onSubmitSuccess={clubLogoUpdateSuccess}
            >
                <div ref={ref} style={{
                    backgroundImage: `url(${backgroundImage })`
                }} className="ClubLogoPicture"/>
            </ActiveImageWrapper>
        </div>
    )
}

ClubLogoPicture.defaultProps = {
    backgroundImage: "/static/images/noimg/no-avatar.png"
};

export default connectClientClubLogoPicture(ClubLogoPicture)