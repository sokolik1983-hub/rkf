import React, { useRef } from 'react'
import { connectClientClubHeaderPicture } from 'apps/ClientClub/connectors'
import ActiveImageWrapper from 'components/ActiveImageWrapper'
import './styles.scss'

function ClubHeaderPicture({ backgroundImage, clubPictureUpdateSuccess }) {
    const ref = useRef(null);
    return (
        <div>
            <h3>Картинка в шапке</h3>
            <ActiveImageWrapper
                requestUrl={'/api/HeaderPicture/full'}
                onSubmitSuccess={clubPictureUpdateSuccess}
            >
                <div ref={ref} style={{
                    backgroundImage: `url(${
                        backgroundImage
                            ? backgroundImage
                            : "/static/images/header/default.png"
                        })`
                }} className="ClubHeaderPicture" />
            </ActiveImageWrapper>
        </div>
    )
}

ClubHeaderPicture.defaultProps = {
    backgroundImage: "/static/images/header/default.png"
};

export default connectClientClubHeaderPicture(ClubHeaderPicture)