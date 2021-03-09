import React, { memo } from "react";
import Modal from "./Modal";
import CustomAvatarEditor from "./AvatarEditor";


const EditAvatar = ({ avatar, setModalType, onSubmitSuccess, userType }) => {

    return (
        <Modal
            open={true}
            onClose={() => setModalType('')}
            title="Редактирование аватара"
        >
            <CustomAvatarEditor
                avatar={avatar}
                setModalType={setModalType}
                userType={userType}
                onSubmitSuccess={onSubmitSuccess}
            />
        </Modal>
    )
};

export default memo(EditAvatar);