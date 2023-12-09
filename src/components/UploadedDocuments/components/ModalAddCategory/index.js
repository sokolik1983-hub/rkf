import React from "react";
import Modal from "../../../../components/Modal";
import CreateCategoryForm from "../CreateCategoryForm";
import "./index.scss";

const ModalAddCategory = ({ handleSuccess, handleError, getCategories, closeModal }) => {

    return (
        <Modal
            iconName="addfolder"
            className="edit-category-modal"
            showModal={true}
            handleClose={closeModal}
            headerName = {'Добавление категории'}
        >
            <div className="edit-category-modal__content">
                <CreateCategoryForm
                    getCategories={getCategories}
                    handleSuccess={handleSuccess}
                    handleError={handleError}
                    closeModal={closeModal}
                />
            </div>
        </Modal >
    )
};

export default React.memo(ModalAddCategory);