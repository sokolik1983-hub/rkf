import React from "react";
import Modal from "components/Modal";
import AddVideoLink from "components/UserAddArticle/AddVideoLink";

export const AddVideoModal = ({ showModal, setShowModal, onSuccess }) => (
    <Modal showModal={showModal} handleClose={() => setShowModal(false)} className="AddAlbum__modal" headerName = {"Добавить видеозапись"} iconName={'icon-youtube-white'}>
        <AddVideoLink setVideoLink={onSuccess} closeModal={() => setShowModal(false)} />
    </Modal>
);