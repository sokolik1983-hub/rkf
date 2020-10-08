import React from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
import "./styles.scss";

const SocialNetworks = ({ social_networks }) => {

    return <div className="SocialNetworks">
        <h4>Ссылки на социальные сети</h4>
        <FieldArray
            name="social_networks"
            render={arrayHelpers => (
                <div>
                    {social_networks.map((social, index) => (
                        <FormGroup inline key={index}>
                            <FormField
                                placeholder={'Введите ссылку на сайт'}
                                name={`social_networks[${index}].site`}
                            />
                            <FormField
                                placeholder="Введите название"
                                name={`social_networks[${index}].description`}
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
    </div>
};

export default connect(SocialNetworks);