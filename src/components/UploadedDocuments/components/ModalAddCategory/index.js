import React from "react";
import Modal from "../../../../components/Modal";
import CreateCategoryForm from "../CreateCategoryForm";
import "./index.scss";

const ModalAddCategory = ({ handleSuccess, handleError, getCategories, closeModal }) => {

    return (
        <Modal
            className="edit-category-modal"
            showModal={true}
            handleClose={closeModal}
        >
            <div className="edit-category-modal__content">
                <h3 className="edit-category-modal__title">Добавление категории</h3>
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