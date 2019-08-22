import React, {useRef} from 'react'
import {connectClientClubLogoPicture} from 'apps/ClientClub/connectors'
import EditableImageWrapper from 'components/EditableImageWrapper'
import './styles.scss'

function ClubLogoPicture({backgroundImage, clubLogoUpdateSuccess}) {
    console.log('clubLogoUpdateSuccess',clubLogoUpdateSuccess)
    const ref = useRef(null);
    return (
        <EditableImageWrapper
            requestUrl={'/api/Avatar/full'}
            onSubmitSuccess={clubLogoUpdateSuccess}
        >
            <div ref={ref} style={{
                backgroundImage: `url(${
                    backgroundImage ?
                        backgroundImage
                        :
                        '/static/images/noimg/no-avatar.png'
                })`
            }} className="ClubLogoPicture"/>
        </EditableImageWrapper>
    )
}

ClubLogoPicture.defaultProps = {
    backgroundImage: "/static/images/noimg/no-avatar.png"
};

export default connectClientClubLogoPicture(ClubLogoPicture)