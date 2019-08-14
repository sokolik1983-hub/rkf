import React, {useRef} from 'react'
import {connectClientClubHeaderPicture} from 'apps/ClientClub/connectors'
import EditableImageWrapper from 'components/EditableImageWrapper'
import './styles.scss'

function ClubHeaderPicture({backgroundImage, getClubPictureUpdateSuccess}) {
    const ref = useRef(null);
    return (
        <EditableImageWrapper
            requestUrl={'/api/HeaderPicture/full'}
            onSubmitSuccess={getClubPictureUpdateSuccess}
        >
            <div ref={ref} style={{
                backgroundImage: `url(${
                    backgroundImage ?
                        backgroundImage
                        :
                        "/static/images/header/clientDefaultBanner.jpeg"
                })`
            }} className="ClubHeaderPicture"/>
        </EditableImageWrapper>
    )
}

ClubHeaderPicture.defaultProps = {
    backgroundImage: "/static/images/header/clientDefaultBanner.jpeg"
};

export default connectClientClubHeaderPicture(ClubHeaderPicture)