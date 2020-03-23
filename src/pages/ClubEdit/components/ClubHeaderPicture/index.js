import React, {useRef} from "react";
import {connectClientClubHeaderPicture} from "../../connectors";
import ActiveImageWrapper from "../../../../components/ActiveImageWrapper";
import "./styles.scss";


const ClubHeaderPicture = ({backgroundImage, club_id, clubPictureUpdateSuccess, bindSubmitForm}) => {
    const ref = useRef(null);

    return (
        <div>
            <h3>Картинка в шапке</h3>
            <ActiveImageWrapper
                requestUrl={'/api/HeaderPicture/full'}
                onSubmitSuccess={clubPictureUpdateSuccess}
                backgroundImage={backgroundImage}
                bindSubmitForm={bindSubmitForm}
                club_id={club_id}
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
};

ClubHeaderPicture.defaultProps = {
    backgroundImage: "/static/images/header/default.png"
};

export default connectClientClubHeaderPicture(React.memo(ClubHeaderPicture));