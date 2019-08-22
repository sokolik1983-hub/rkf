import React, {useRef} from 'react'
import {connectClientClubHeaderPicture} from 'apps/ClientClub/connectors'
import EditableImageWrapper from 'components/EditableImageWrapper'
import './styles.scss'

function ClubHeaderPicture({backgroundImage, clubPictureUpdateSuccess}) {
    console.log({backgroundImage, clubPictureUpdateSuccess})
    const ref = useRef(null);
    return (
        <div>
            <h3>Картинка в шапке</h3>
            <EditableImageWrapper
                requestUrl={'/api/HeaderPicture/full'}
                onSubmitSuccess={clubPictureUpdateSuccess}
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
        </div>
    )
}

ClubHeaderPicture.defaultProps = {
    backgroundImage: "/static/images/header/clientDefaultBanner.jpeg"
};

export default connectClientClubHeaderPicture(ClubHeaderPicture)