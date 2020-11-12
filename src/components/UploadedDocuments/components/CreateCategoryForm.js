
import React from "react";
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import FormInput from './FormInput';
import { categoryNameValidator } from '../validators';
import { Request } from "utils/request";

const CreateCategoryForm = ({ getCategories, handleSuccess, handleError, closeModal }) => {

    const handleSubmit = async ({ name }) => {
        await Request({
            url: `/api/document/publicdocument/category?name=${name}`,
            method: 'POST',
        }, () => {
            closeModal();
            handleSuccess('Категория добавлена!');
            getCategories();
        }, error => {
            closeModal();
            handleError(error);
        });
    };

    return <Form
        onSubmit={data => handleSubmit(data)}
        initialValues={{ name: "" }}
        render={(formRenderProps) => {
            return (
                <FormElement style={{ maxWidth: 550 }} >
                    <Field
                        id="category-name"
                        name="name"
                        placeholder="Введите название"
                        maxLength="50"
                        component={FormInput}
                        validator={value => categoryNameValidator(value, 50)}
                        formRenderProps={formRenderProps}
                    />
                    <div className="k-form-buttons">
                        <button
                            type={'submit'}
                            className="k-button k-primary"
                            disabled={!formRenderProps.modified || !formRenderProps.valid}
                        >Добавить</button>
                    </div>
                </FormElement>
            )
        }}
    />;
};

export default CreateCategoryForm;