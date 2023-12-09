import React from "react";
import Modal from "components/Modal";
import { DndImageUpload } from "components/Gallery";

export const AddPhotoModal = ({ showModal, onModalClose, albumId, onSuccess}) => (
    <Modal showModal={showModal} handleClose={onModalClose} className="AddAlbum__modal" headerName = "Добавление фотографии" iconName="galleryIcon-white">
        <DndImageUpload callback={onSuccess} album_id={albumId} />
    </Modal>
);
