import React, {memo} from "react";
import {connect, FieldArray} from "formik";
import {FormField, FormGroup} from "../../../../../../components/Form";
import MaskedInput from "../../../../../../components/Form/Field/MaskedInput";
import LightTooltip from "../../../../../../components/LightTooltip";
import Button from "../../../../../../components/Button";
import {editFormFields} from "../../config";


const Contact = ({formik, name, title, className}) => {
    return (
        <FieldArray
            name={name}
            className={className}
            render={arrayHelpers => (
                <div className="contacts-array">
                    <h4>{title}</h4>
                    {formik.values[name]?.map((item, i) =>
                        <FormGroup className="contacts-array__item" key={`field-${i}`}>
                            {item.contact_type_id === 1 ?
                                <MaskedInput
                                    {...editFormFields[name][0]}
                                    name={`phones[${i}].value`}
                                /> :
                                <FormField
                                    {...editFormFields[name][0]}
                                    name={`${name}[${i}].value`}
                                />
                            }
                            <FormField
                                placeholder="Введите описание"
                                name={`${name}[${i}].description`}
                            />
                            <div className="contacts-array__checkbox-wrap">
                                <span>Основной</span>
                                <FormField
                                    name={`${name}[${i}].is_main`}
                                    fieldType="customCheckbox"
                                    onChange={e => {
                                        formik.setFieldTouched(`${name}[${i}].is_main`, true);
                                        formik.handleChange(e);
                                        if(e.target.checked) {
                                            formik.values[name].forEach((value, index) => {
                                                if(index !== i) {
                                                    arrayHelpers.replace(index, {...value, is_main: false});
                                                }
                                            })
                                        }
                                    }}
                                />
                            </div>
                            <LightTooltip title="Удалить">
                                <Button
                                    className="btn contacts-array__button-delete"
                                    onClick={() => {
                                        if(formik.values[name].length === 1) {
                                            arrayHelpers.replace(i, {
                                                value: '',
                                                description: '',
                                                is_main: false,
                                                contact_type_id: item.contact_type_id
                                            })
                                        } else {
                                            arrayHelpers.remove(i);
                                        }
                                    }}
                                >
                                </Button>
                            </LightTooltip>
                        </FormGroup>
                    )}
                    <div className="contacts-array__controls">
                        {formik.values[name].length < 3 &&
                            <Button
                                className="btn-green btn-mini contacts-array__button-add"
                                onClick={() => arrayHelpers.push({
                                    value: '',
                                    description: '',
                                    is_main: false,
                                    contact_type_id: formik.values[name][0].contact_type_id
                                })}
                            >
                                {`Добавить ${title.toLowerCase()}`}
                            </Button>
                        }
                    </div>
                </div>
            )}
        />
    )
};

export default memo(connect(Contact));