import React from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
import Card from "components/Card";
import "./styles.scss";

const Documents = ({ documents }) => {

    return <Card className="Documents">
        <h3>Ссылки на документы</h3>

        <FieldArray
            name="documents"
            render={arrayHelpers => (
                <div>
                    {documents.map(({ contact_type_id }, index) => (
                        <FormGroup inline key={index}>
                            <FormField
                                label={'Ссылка на документ'}
                                placeholder={'Введите ссылку на документ'}
                                name={`documents[${index}].url`}
                            />
                            <FormField
                                label={'Название'}
                                placeholder="Введите название"
                                name={`documents[${index}].name`}
                            />
                            <Button className="btn Documents__button-delete" onClick={() => arrayHelpers.remove(index)}>Удалить</Button>
                        </FormGroup>
                    ))}
                    <div className="Documents__buttons-wrap">
                        <Button
                            className="btn-primary Documents__button-add"
                            onClick={() => arrayHelpers.push({
                                id: null,
                                name: '',
                                url: ''
                            })}>Добавить ссылку</Button>
                    </div>
                </div>
            )}
        />
    </Card>
};

export default connect(Documents);