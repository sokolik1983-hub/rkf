import React, {memo, useState} from "react";
import Modal from "./Modal";
import CustomAvatarEditor from "./AvatarEditor";


const EditAvatar = ({setModalType, onSubmitSuccess, pageBanner, owner, avatar}) => {
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
                    setModalType={setModalType}
                    onSubmitSuccess={onSubmitSuccess}
                    pageBanner={pageBanner}
                    canvasWidth={canvasWidth}
                    avatar={avatar}
                    owner
                />
            </div>
        </Modal>
    )
};

export default memo(EditAvatar);