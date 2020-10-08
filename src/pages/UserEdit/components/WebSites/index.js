import React from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
import "./styles.scss";

const WebSites = ({ web_sites }) => {

    return <div className="WebSites">
        <h3>Ссылки на сайты</h3>

        <FieldArray
            name="web_sites"
            render={arrayHelpers => (
                <div>
                    {web_sites.map((social, index) => (
                        <FormGroup inline key={index}>
                            <FormField
                                label={'Ссылка'}
                                placeholder={'Введите ссылку'}
                                name={`web_sites[${index}].value`}
                            />
                            <Button className="btn WebSites__button-delete" onClick={() => arrayHelpers.remove(index)}>Удалить</Button>
                        </FormGroup>
                    ))}
                    <div className="WebSites__buttons-wrap">
                        <Button
                            className="btn-green WebSites__button-add"
                            onClick={() => arrayHelpers.push({ id: null, value: '' })}>Добавить ссылку</Button>
                    </div>
                </div>
            )}
        />
    </div>
};

export default connect(WebSites);