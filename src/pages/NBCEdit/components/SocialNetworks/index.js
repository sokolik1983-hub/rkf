import React from 'react';
import { connect, FieldArray } from 'formik';
import { FormField, FormGroup } from '../../../../components/Form';
import Button from '../../../../components/Button';

import './styles.scss';

const SocialNetworks = ({ social_networks }) => {

    return <div className="SocialNetworks">
        <FieldArray
            name="social_networks"
            render={arrayHelpers => (
                <div>
                    {social_networks.map((social, index) => (
                        <FormGroup key={index}>
                            <FormField
                                label="Социальная сеть"
                                placeholder="Введите ссылку"
                                name={`social_networks[${index}].site`}
                            />
                            <FormField
                                placeholder="Введите название"
                                name={`social_networks[${index}].description`}
                            />
                            <Button
                                className="btn SocialNetworks__button-delete"
                                onClick={() => arrayHelpers.remove(index)}
                            >
                            </Button>
                        </FormGroup>
                    ))}
                    <div className="SocialNetworks__buttons-wrap">
                        <Button
                            className={`btn-green SocialNetworks__button-add ${(arrayHelpers.form.values.social_networks.length > 0) && "btn-mini"}`}
                            onClick={() => arrayHelpers.push({
                                site: "",
                                description: "",
                                social_network_type_id: 1
                            })}>
                            Добавить социальную сеть
                        </Button>
                    </div>
                </div>
            )}
        />
    </div>
};

export default connect(SocialNetworks);