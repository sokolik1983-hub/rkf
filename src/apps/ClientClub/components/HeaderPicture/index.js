import React from 'react'
import {connectClientClubHeaderPicture} from 'apps/ClientClub/connectors'
import {usePictureWithUpdate} from 'shared/hooks'
import EditableImageWrapper from 'components/EditableImageWrapper'
import './styles.scss'

function ClubHeaderPicture({backgroundImage, getClubPictureUpdateSuccess}) {
    const {
        filePreview, handleFileInputChange, clear, sendFile
    } = usePictureWithUpdate('/api/HeaderPicture/full', getClubPictureUpdateSuccess);
    return (
        <div style={{
            backgroundImage: `url(${
                backgroundImage ?
                    backgroundImage
                    :
                    "/static/images/header/clientDefaultBanner.jpeg"
            })`
        }} className="ClubHeaderPicture">

            <input className={'ImageInputPreview'} style={{backgroundImage: `url(${
                filePreview
            })`}} type="file" onChange={handleFileInputChange} />
            <button onClick={sendFile}>Обновить картинку</button>
            <button onClick={clear}>clear</button>
        </div>
    )
}

ClubHeaderPicture.defaultProps = {
    backgroundImage: "/static/images/header/clientDefaultBanner.jpeg"
};

export default connectClientClubHeaderPicture(ClubHeaderPicture)