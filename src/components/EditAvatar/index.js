import React, { memo } from "react";
import Modal from "./Modal";
import CustomAvatarEditor from "./AvatarEditor";


const EditAvatar = ({ avatar, setModalType, onSubmitSuccess, userType, pageBanner }) => {

    return (
        <Modal
            open={true}
            onClose={() => setModalType('')}
            title={pageBanner ? "Редактирование заставки" : "Редактирование аватара"}
            pageBanner={pageBanner}
        >
            <CustomAvatarEditor
                avatar={avatar}
                setModalType={setModalType}
                userType={userType}
                onSubmitSuccess={onSubmitSuccess}
                pageBanner={pageBanner}
            />
        </Modal>
    )
};

export default memo(EditAvatar);