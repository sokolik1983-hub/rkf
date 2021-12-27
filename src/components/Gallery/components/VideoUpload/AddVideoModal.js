import React from "react";
import Modal from "components/Modal";
import AddVideoLink from "components/UserAddArticle/AddVideoLink";

export const AddVideoModal = ({ showModal,onModalClose, setShowModal, onSuccess }) => (
    <Modal showModal={showModal} handleClose={onModalClose} className="AddAlbum__modal" headerName = {"Добавить видеозапись"} iconName={'icon-youtube-white'}>
        <AddVideoLink setVideoLink={onSuccess} closeModal={() => setShowModal(false)} />
    </Modal>
);