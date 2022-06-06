import React, { useRef, useState } from "react";
import { DEFAULT_IMG } from "../../../../../../appConfig";
import { connectClientClubLogoPicture } from "../../../../connectors";
import EditAvatar from "../../../../../../components/EditAvatar";
import "./styles.scss";


const ClubLogoPicture = ({ backgroundImage, clubLogoUpdateSuccess }) => {
    const [modalType, setModalType] = useState('');
    const ref = useRef(null);

    return (<>
        <div className="ClubLogoPicture__holder" onClick={() => setModalType('edit')}>
            <h3>Логотип</h3>
            <div ref={ref} style={{
                backgroundImage: `url(${backgroundImage ? backgroundImage : DEFAULT_IMG.clubAvatar})`
            }} className="ClubLogoPicture" />
            <span style={{cursor: 'pointer', color: '#36f'}}>Изменить</span>
        </div>
        {modalType && <EditAvatar
            setModalType={setModalType}
            avatar={backgroundImage}
            userType="club"
            onSubmitSuccess={clubLogoUpdateSuccess}
        />}
    </>
    )
};

export default connectClientClubLogoPicture(React.memo(ClubLogoPicture));