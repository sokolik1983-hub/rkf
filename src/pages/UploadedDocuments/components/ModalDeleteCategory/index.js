import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import { Request } from "../../../../utils/request";
import "./index.scss";


const ModalDeleteCategory = ({ handleSuccess, handleError, getCategories, categoryId, closeModal }) => {
    const [loading, setLoading] = useState(false);

    const deleteCategory = async () => {
        setLoading(true);
        await Request({
            url: `/api/document/publicdocument/category?id=${categoryId}`,
            method: 'DELETE'
        }, () => {
            setLoading(false);
            closeModal();
            handleSuccess('Категория удалена!');
            getCategories();
        }, error => {
            setLoading(false);
            closeModal();
            handleError(error);
        });
    };

    return (
        <Modal
            className="delete-category-modal"
            showModal={true}
            handleClose={closeModal}
        >
            <div className="delete-category-modal__content">
                <h3 className="delete-category-modal__title">Удаление категории</h3>
                {loading ?
                    <Loading centered={false} /> :
                    <>
                        <p className="delete-category-modal__describe">
                            Вы действительно хотите удалить категорию со всем её содержимым?
                            </p>
                        <div className="k-form-buttons">
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={closeModal}
                            >
                                Отменить
                                </button>
                            <Button
                                className="btn btn-danger"
                                type="button"
                                onClick={deleteCategory}
                            >
                                Удалить
                                </Button>
                        </div>
                    </>
                }
            </div>
        </Modal>
    )
};

export default React.memo(ModalDeleteCategory);