import React from 'react';
import { connect, FieldArray } from 'formik';
import { FormField, FormGroup } from '../../../../components/Form';
import Button from '../../../../components/Button';

import './styles.scss';


const SocialNetworks = ({ socials }) => {

    return <div className="SocialNetworks">
        <FieldArray
            name="socials"
            render={arrayHelpers => (
                <div>
                    {socials.map((social, index) => (
                        <FormGroup key={index}>
                            <FormField
                                label={'Социальная сеть'}
                                placeholder={'Введите ссылку'}
                                name={`socials[${index}].site`}
                            />
                            <FormField
                                placeholder="Введите название"
                                name={`socials[${index}].description`}
                            />
                            <Button className="btn SocialNetworks__button-delete" onClick={() => arrayHelpers.remove(index)}>Удалить</Button>
                        </FormGroup>
                    ))}
                    <div className="SocialNetworks__buttons-wrap">
                        <Button
                            className={`btn-green SocialNetworks__button-add ${(arrayHelpers.form.values.socials.length > 0) && 'btn-mini'}`}
                            onClick={() => arrayHelpers.push({
                                id: null,
                                site: '',
                                description: '',
                                social_network_type_id: 1
                            })}>Добавить социальную сеть</Button>
                    </div>
                </div>
            )}
        />
    </div>
};

export default connect(SocialNetworks);