import React from "react";
import Modal from "components/Modal";
import { Form, SubmitButton } from "components/Form";
import { addAlbumForm, editAlbumForm } from "./config";
import { FormField, FormGroup } from "components/Form";

const RenderFields = ({ fields }) => {
    return <>
        <FormGroup inline>
            <FormField {...fields.name} />
        </FormGroup>
        <FormGroup inline>
            <FormField {...fields.description} />
        </FormGroup>
    </>
};

export const AddAlbum = ({ showModal, onModalClose, onSuccess }) => {
    return <Modal showModal={showModal} handleClose={onModalClose} className="AddAlbum__modal">
        <h3>Новый альбом</h3>
        <Form {...addAlbumForm} onSuccess={onSuccess}>
            <RenderFields fields={addAlbumForm.fields} />
            <SubmitButton className="btn-primary AddAlbum__modal-button">Создать альбом</SubmitButton>
        </Form>
    </Modal>
};

export const EditAlbum = ({ onSuccess, album }) => {
    const { id, name, description } = album;
    const initialValues = {
        ...editAlbumForm.initialValues,
        id,
        name,
        description
    };

    return <Form {...editAlbumForm} initialValues={initialValues} onSuccess={onSuccess} className="EditAlbum">
        <RenderFields fields={editAlbumForm.fields} />
        <SubmitButton className="btn-primary EditAlbum__button">Сохранить</SubmitButton>
    </Form>
};