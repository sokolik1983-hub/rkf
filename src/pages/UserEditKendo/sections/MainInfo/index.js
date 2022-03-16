import React, { useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { nameRequiredValidator, nameValidator } from "../../validators";
import FormInput from "../../components/FormInput";
import FormDatePicker from "../../components/FormDatePicker";
import FormDropDownList from "../../components/FormDropDownList";
import UploadDocsEditPage from "../../../../components/UploadDocsEditPage/UploadDocsEditPage";

import "./styles.scss";


const MainInfo = ({
        initialValues,
        setFormModified,
        visibilityStatuses,
        handleSubmit,
        formBusy,
        alias,
        history,
        judgeInfo,
}) => {
    const [formProps, setFormProps] = useState(null);
    const today = new Date();

    useEffect(() => {
        document.querySelector('.FormDatePicker')
            .querySelector('input.k-input').readOnly = true;
    }, []);

    useEffect(() => {
        formProps && formProps.onFormReset();
    }, [initialValues]);

    return <div className="MainInfo">
        <Form
            onSubmit={data => handleSubmit(data, 'general')}
            initialValues={initialValues}
            render={(formRenderProps) => {
                setFormModified(formRenderProps.modified)
                if (!formProps) setFormProps(formRenderProps);
                return (
                    <FormElement style={{ maxWidth: 550 }} >
                        <Prompt when={formRenderProps.modified} message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны." />
                        <fieldset className="k-form-fieldset">
                            <legend className="k-form-legend">Основная информация</legend>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field
                                        id="first_name"
                                        name="first_name"
                                        label="Имя"
                                        component={FormInput}
                                        maxLength="100"
                                        validator={value => nameRequiredValidator(value, 100)}
                                        disabled={!!judgeInfo?.length}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field
                                        id="last_name"
                                        name="last_name"
                                        label="Фамилия"
                                        component={FormInput}
                                        maxLength="100"
                                        validator={value => nameRequiredValidator(value, 100)}
                                        disabled={!!judgeInfo?.length}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field
                                        id="second_name"
                                        name="second_name"
                                        label="Отчество"
                                        component={FormInput}
                                        maxLength="100"
                                        validator={value => nameValidator(value, 100)}
                                        disabled={!!judgeInfo?.length}
                                    />
                                </div>
                            </div>

                            <section className="form-row__wrap">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <Field
                                            id="birth_date"
                                            name="birth_date"
                                            label="Дата рождения"
                                            min={new Date('1900')}
                                            max={today}
                                            component={FormDatePicker}
                                            disabled={!!judgeInfo?.length}
                                        />
                                    </div>
                                    <div className="form-group col-md-6 no-label-field">
                                        <Field
                                            id="birth_date_visibility_status_id"
                                            name="birth_date_visibility_status_id"
                                            component={FormDropDownList}
                                            data={visibilityStatuses.map(status => ({ text: status.name, value: status.id }))}
                                            disabled={!!judgeInfo?.length}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <Field
                                            id="sex_type_id"
                                            name="sex_type_id"
                                            label="Пол"
                                            component={FormDropDownList}
                                            data={[
                                                { text: 'Не выбран', value: '', id: null },
                                                { text: 'Мужской', value: 1, id: 1 },
                                                { text: 'Женский', value: 2, id: 2 },
                                            ]}
                                            disabled={!!judgeInfo?.length}
                                        />
                                    </div>
                                </div>
                            </section>
                        </fieldset>
                        <UploadDocsEditPage
                            clubAlias={alias}
                            history={history}
                        />
                        <div className="k-form-buttons text-center">
                            <button
                                type="submit"
                                className="k-button k-primary mx-auto"
                                disabled={!formRenderProps.modified || !formRenderProps.valid || formBusy}
                            >Сохранить</button>
                        </div>
                    </FormElement>
                )
            }}
        />
    </div>
};

export default React.memo(MainInfo);
