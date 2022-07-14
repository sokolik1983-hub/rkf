import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import FormInput from '../FormInput';
import { categoryNameValidator } from '../../validators';
import { Request } from "utils/request";
import "./index.scss";


const ModalEditCategory = ({ handleSuccess, handleError, getCategories, categoryName, categoryId, closeModal }) => {
    const [loading, setLoading] = useState(false);

    const editCategory = async (data) => {
        setLoading(true);
        await Request({
            url: `/api/document/publicdocument/category`,
            method: 'PUT',
            data: JSON.stringify({
                id: categoryId,
                name: data.name
            })
        }, () => {
            setLoading(false);
            closeModal();
            handleSuccess();
            getCategories();
        }, error => {
            setLoading(false);
            closeModal();
            handleError(error);
        });
    };

    return (
        <Modal
            iconName="pen-opaque-white"
            className="edit-category-modal"
            showModal={true}
            handleClose={closeModal}
            headerName = {'Редактирование категории'}
        >
            <div className="edit-category-modal__content">
                {loading ?
                    <Loading centered={false} /> :
                    <Form
                        onSubmit={data => editCategory(data)}
                        initialValues={{ name: categoryName }}
                        render={() => {
                            return (
                                <FormElement className="edit-category-modal__form-element">
                                    <Field
                                        id="category-name"
                                        name="name"
                                        placeholder="Введите название"
                                        maxLength="50"
                                        component={FormInput}
                                        validator={value => categoryNameValidator(value, 50)}
                                    />
                                    <div className="k-form-buttons">
                                        <Button className="k-button k-light" type="button" onClick={closeModal}>Отменить</Button>
                                        <Button className="k-button k-primary" type="submit">Применить</Button>
                                    </div>
                                </FormElement>
                            )
                        }}
                    />
                }
            </div>
        </Modal >
    )
};

export default React.memo(ModalEditCategory);