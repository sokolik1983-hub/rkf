import React, {useRef} from 'react'
import {connectClientClubLogoPicture} from 'apps/ClientClub/connectors'
import ActiveImageWrapper from 'components/ActiveImageWrapper'
import './styles.scss'
import {DEFAULT_IMG} from "../../../../appConfig";

function ClubLogoPicture({backgroundImage, clubLogoUpdateSuccess}) {
    console.log('clubLogoUpdateSuccess',clubLogoUpdateSuccess)
    const ref = useRef(null);
    return (
        <ActiveImageWrapper
            requestUrl={'/api/Avatar/full'}
            onSubmitSuccess={clubLogoUpdateSuccess}
        >
            <div ref={ref}
                 style={{backgroundImage: `url(${backgroundImage || DEFAULT_IMG.clubAvatar})`}}
                 className="ClubLogoPicture"
            />
        </ActiveImageWrapper>
    )
}

ClubLogoPicture.defaultProps = {
    backgroundImage: DEFAULT_IMG.clubAvatar
};

export default connectClientClubLogoPicture(ClubLogoPicture)