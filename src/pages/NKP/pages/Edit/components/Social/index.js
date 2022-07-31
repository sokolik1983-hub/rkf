import React, {memo} from "react";
import {connect, FieldArray} from "formik";
import {FormField, FormGroup} from "../../../../../../components/Form";
import LightTooltip from "../../../../../../components/LightTooltip";
import Button from "../../../../../../components/Button";
import "./index.scss";


const SocialNetworks = ({formik}) => {
    const {social_networks} = formik.values;

    return (
        <FieldArray
            name="social_networks"
            render={arrayHelpers => (
                <div className="socials-array">
                    <h4>Социальная сеть</h4>
                    {social_networks?.map((social, index) => (
                        <FormGroup key={index}>
                            <FormField
                                placeholder="Введите ссылку"
                                name={`social_networks[${index}].site`}
                            />
                            <FormField
                                placeholder="Введите название"
                                name={`social_networks[${index}].description`}
                            />
                            <LightTooltip title="Удалить">
                                <Button
                                    className="btn socials-array__button-delete"
                                    onClick={() => {
                                        if(social_networks.length === 1) {
                                            arrayHelpers.replace(index, {
                                                site: '',
                                                description: '',
                                                social_network_type_id: 1
                                            })
                                        } else {
                                            arrayHelpers.remove(index);
                                        }
                                    }}
                                />
                            </LightTooltip>
                        </FormGroup>
                    ))}
                    <div className="socials-array__controls">
                        <Button
                            className="btn-green btn-mini socials-array__button-add"
                            onClick={() => arrayHelpers.push({
                                site: '',
                                description: '',
                                social_network_type_id: 1
                            })}
                        >
                            Добавить социальную сеть
                        </Button>
                    </div>
                </div>
            )}
        />
    );
};

export default memo(connect(SocialNetworks));