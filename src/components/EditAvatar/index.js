import React, {memo} from 'react';
import Modal from './Modal';
import CustomAvatarEditor from './AvatarEditor';


const EditAvatar = ({
                        avatar,
                        setModalType,
                        onSubmitSuccess,
                        userType,
                        pageBanner,
                        owner,
                        name,
                        size,
}) => {
    return (
        <Modal
            open={true}
            onClose={() => setModalType('')}
            title={pageBanner ? "Редактирование заставки" : "Редактирование аватара"}
            pageBanner={pageBanner}
        >
            <div>
                <CustomAvatarEditor
                    avatar={avatar}
                    setModalType={setModalType}
                    userType={userType}
                    onSubmitSuccess={onSubmitSuccess}
                    pageBanner={pageBanner}
                    owner={owner}
                    name={name}
                    size={size}
                />
            </div>
        </Modal>
    )
};

export default memo(EditAvatar);