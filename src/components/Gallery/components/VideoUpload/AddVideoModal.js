import React from "react";
import Modal from "components/Modal";
import AddVideoLink from "components/UserAddArticle/AddVideoLink";

export const AddVideoModal = ({ showModal, setShowModal, onSuccess }) => {
    return <Modal showModal={showModal} handleClose={() => setShowModal(false)} className="AddAlbum__modal">
        <h3>Добавить видеозапись</h3>
        <AddVideoLink setVideoLink={onSuccess} showModal={setShowModal} />
    </Modal>
};