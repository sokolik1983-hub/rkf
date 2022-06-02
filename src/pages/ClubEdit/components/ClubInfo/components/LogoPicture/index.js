import React, { useEffect, useRef, useState } from "react";
import { DEFAULT_IMG } from "../../../../../../appConfig";
import { connectClientClubLogoPicture } from "../../../../connectors";
// import ActiveImageWrapper from "../../../../../../components/ActiveImageWrapper";
import EditAvatar from "../../../../../../components/EditAvatar";
import "./styles.scss";


const ClubLogoPicture = ({ backgroundImage, clubLogoUpdateSuccess }) => {
    const [modalType, setModalType] = useState('');
    const [logoSize, setLogoSize] = useState({});

    const ref = useRef(null);

    useEffect(() => {
        ref.current && setLogoSize({
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
        })
    }, [ref]);


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
            size={logoSize}
        />}
    </>
    )
};

export default connectClientClubLogoPicture(React.memo(ClubLogoPicture));