import React, {memo, useState} from 'react';
import Modal from './Modal';
import CustomAvatarEditor from './AvatarEditor';


const EditAvatar = ({ avatar, setModalType, onSubmitSuccess, userType, pageBanner, owner, name }) => {
    const [canvasWidth, setCanvasWidth] = useState(null);

    return (
        <Modal
            open={true}
            onClose={() => setModalType('')}
            title={pageBanner ? "Редактирование заставки" : "Редактирование аватара"}
            pageBanner={pageBanner}
        >
            <div ref={el => {el && setCanvasWidth(el.getBoundingClientRect().width * .9)}}>
                <CustomAvatarEditor
                    avatar={avatar}
                    setModalType={setModalType}
                    userType={userType}
                    onSubmitSuccess={onSubmitSuccess}
                    pageBanner={pageBanner}
                    canvasWidth={canvasWidth}
                    owner={owner}
                    name={name}
                />
            </div>
        </Modal>
    )
};

export default memo(EditAvatar);