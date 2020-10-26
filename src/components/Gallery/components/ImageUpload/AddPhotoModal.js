import React from "react";
import Modal from "components/Modal";
import { DndImageUpload } from "components/Gallery";

export const AddPhotoModal = ({ showModal, onModalClose, albumId, onSuccess }) => (
    <Modal showModal={showModal} handleClose={onModalClose} className="AddAlbum__modal">
        <h3>Добавить фото</h3>
        <DndImageUpload callback={onSuccess} album_id={albumId} />
    </Modal>
);