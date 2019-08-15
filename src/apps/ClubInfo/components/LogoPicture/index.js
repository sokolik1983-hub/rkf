import React, {useRef} from 'react'
import {connectClientClubLogoPicture} from 'apps/ClientClub/connectors'
import EditableImageWrapper from 'components/EditableImageWrapper'
import './styles.scss'

function ClubLogoPicture({backgroundImage, getClubPictureUpdateSuccess}) {
    const ref = useRef(null);
    return (
        <div>
            <h3>Логотип</h3>
        <EditableImageWrapper
            requestUrl={'/api/Avatar/full'}
            onSubmitSuccess={getClubPictureUpdateSuccess}
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
        </div>
    )
}

ClubLogoPicture.defaultProps = {
    backgroundImage: "/static/images/noimg/no-avatar.png"
};

export default connectClientClubLogoPicture(ClubLogoPicture)