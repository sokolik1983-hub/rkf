
import React from "react";
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import FormInput from 'pages/UploadedDocuments/components/FormInput';
import { categoryNameValidator } from '../validators';
import { Request } from "utils/request";

const CreateCategoryForm = ({ getCategories, handleSuccess, handleError }) => {

    const handleSubmit = async ({ name }) => {
        await Request({
            url: `/api/document/publicdocument/category?name=${name}`,
            method: 'POST',
        }, () => {
            handleSuccess('Категория добавлена!');
            getCategories();
        }, error => {
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
                    />
                    <div className="k-form-buttons">
                        <button
                            type={'submit'}
                            className="k-button k-primary"
                            disabled={!formRenderProps.modified || !formRenderProps.valid}
                        >Создать</button>
                    </div>
                </FormElement>
            )
        }}
    />;
};

export default CreateCategoryForm;