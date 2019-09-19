import React, { useRef } from 'react'
import { connectClientClubHeaderPicture } from 'apps/ClientClub/connectors'
import ActiveImageWrapper from 'components/ActiveImageWrapper'
import './styles.scss'

function ClubHeaderPicture(props) {
    const { backgroundImage, clubPictureUpdateSuccess } = props;
    const ref = useRef(null);
    return (
        <ActiveImageWrapper
            requestUrl={'/api/HeaderPicture/full'}
            onSubmitSuccess={clubPictureUpdateSuccess}
        >
            <div ref={ref} style={{
                backgroundImage: `url(${backgroundImage})`
            }} className="ClubHeaderPicture" />
        </ActiveImageWrapper>
    )
}

ClubHeaderPicture.defaultProps = {
    backgroundImage: "/static/images/header/clientDefaultBanner.jpeg"
};

export default connectClientClubHeaderPicture(ClubHeaderPicture)