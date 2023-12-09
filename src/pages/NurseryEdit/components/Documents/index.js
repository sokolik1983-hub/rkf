import React from 'react';
import { connect, FieldArray } from 'formik';
import { FormField, FormGroup } from '../../../../components/Form';
import Button from '../../../../components/Button';

import './styles.scss';


const Documents = ({ documents }) => {

    return <div className="Documents">
        <FieldArray
            name="documents"
            render={arrayHelpers => (
                <div>
                    {documents.map(({ contact_type_id }, index) => (
                        <FormGroup key={index}>
                            <FormField
                                label="Ссылка на документ"
                                placeholder="Введите ссылку на документ"
                                name={`documents[${index}].url`}
                            />
                            <FormField
                                placeholder="Введите название"
                                name={`documents[${index}].name`}
                            />
                            <Button
                                className="btn Documents__button-delete"
                                onClick={() => arrayHelpers.remove(index)}
                            >
                            </Button>
                        </FormGroup>
                    ))}
                    <div className="Documents__buttons-wrap">
                        <Button
                            className={`btn-green Documents__button-add ${(arrayHelpers.form.values.documents.length > 0) && "btn-mini"}`}
                            onClick={() => {
                                arrayHelpers.push({
                                    id: null,
                                    name: "",
                                    url: ""
                                });
                            }}>Добавить ссылку на документ</Button>
                    </div>
                </div>
            )}
        />
    </div>
};

export default connect(Documents);