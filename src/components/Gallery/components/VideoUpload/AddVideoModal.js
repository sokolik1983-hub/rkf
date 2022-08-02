import React from "react";
import Modal from "../../../Modal";
import AddVideoLink from "../../../UserAddArticle/AddVideoLink";
import {blockContent} from "../../../../utils/blockContent";


export const AddVideoModal = ({ showModal, onClose, onSuccess }) => (
    <Modal showModal={showModal}
           handleClose={() => {
               onClose();
               blockContent(false);
           }}
           headerName="Добавить видеозапись"
           iconName="icon-youtube-white">
        <AddVideoLink
            setVideoLink={onSuccess}
            closeModal={() => onClose()}
        />
    </Modal>
);