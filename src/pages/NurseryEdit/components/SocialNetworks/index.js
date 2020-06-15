import React from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
import Card from "components/Card";
import "./styles.scss";

const SocialNetworks = ({ socials }) => {

    return <Card className="SocialNetworks">
        <h3>Социальные сети</h3>

        <FieldArray
            name="socials"
            render={arrayHelpers => (
                <div>
                    {socials.map((social, index) => (
                        <FormGroup inline key={index}>
                            <FormField
                                label={'Ссылка'}
                                placeholder={'Введите ссылку'}
                                name={`socials[${index}].site`}
                            />
                            <FormField
                                label={'Название'}
                                placeholder="Введите название"
                                name={`socials[${index}].description`}
                            />
                            <Button className="btn SocialNetworks__button-delete" onClick={() => arrayHelpers.remove(index)}>Удалить</Button>
                        </FormGroup>
                    ))}
                    <div className="SocialNetworks__buttons-wrap">
                        <Button
                            className="btn-green SocialNetworks__button-add"
                            onClick={() => arrayHelpers.push({
                                id: null,
                                site: '',
                                description: '',
                                social_network_type_id: 1
                            })}>Добавить ссылку</Button>
                    </div>
                </div>
            )}
        />
    </Card>
};

export default connect(SocialNetworks);