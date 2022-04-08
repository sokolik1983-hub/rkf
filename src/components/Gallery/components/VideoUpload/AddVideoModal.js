import React from "react";
import Modal from "components/Modal";
import AddVideoLink from "components/UserAddArticle/AddVideoLink";
import {blockContent} from "../../../../utils/blockContent";

export const AddVideoModal = ({ showModal, setShowModal, onSuccess }) => {
    return (
        <Modal showModal={showModal}
               handleClose={() => {
                   setShowModal(false);
                   blockContent(false);
               }}
               headerName="Добавить видеозапись"
               iconName="icon-youtube-white">
            <AddVideoLink
                setVideoLink={onSuccess}
                closeModal={() => setShowModal(false)}
            />
        </Modal>
    );
};