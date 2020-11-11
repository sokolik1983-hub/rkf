import React, {useState} from "react";
import {Link} from "react-router-dom";
import ls from "local-storage";
import {Form, Field, FormElement} from "@progress/kendo-react-form";
import Card from "../../../../../components/Card";
import FormInput from "../../../../../components/kendo/Form/FormInput";
import FormUpload from "../../../../../components/kendo/Form/FormUpload";
import FormDatePicker from "../../../../../components/kendo/Form/FormDatePicker";
import FormEditorTextarea from "../../../../../components/kendo/Form/FormEditorTextarea";
import {requiredValidator} from "../../../../../components/kendo/Form/validators";
import "./index.scss";


const PatellaForm = ({alias}) => {
    const [initialValues, setInitialValues] = useState({
        declarant_name: ls.get('user_info') ? ls.get('user_info').name : '',
        veterinary_contract_document: [],
        pedigree_number: '',
        dog_name: '',
        payment_document: [],
        payment_date: '',
        payment_number: '',
        payment_name: '',
        comment: ''
    });

    const handleSubmit = data => {
        const newData = {
            ...data,
            payment_document: data.payment_document.length ? data.payment_document[0] : null,
            veterinary_contract_document: data.veterinary_contract_document.length ? data.veterinary_contract_document[0] : null
        };

        delete newData.declarant_name;

        console.log('data', newData);
    };

    return (
        <div className="patella-form">
            <Card>
                <div className="user-documents__breadcrumbs">
                    <Link to={`/user/${alias}/documents`} className="user-documents__breadcrumbs-link">Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Сертификат клинической оценки коленных суставов (PL) (Пателла)</span>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    render={formRenderProps =>
                        <FormElement>
                            <div className="patella-form__content">
                                <h4 className="patella-form__title" style={{marginBottom: 0}}>Добавление заявки</h4>
                                <div className="patella-form__row">
                                    <Field
                                        id="declarant_name"
                                        name="declarant_name"
                                        label="Ответственное лицо"
                                        component={FormInput}
                                        disabled={true}
                                    />
                                </div>
                                <div className="patella-form__row">
                                    <Field
                                        id="veterinary_contract_document"
                                        name="veterinary_contract_document"
                                        label="Заполненный договор-заявка с печатью ветеринарного учреждения и подписью ветеринарного врача (PDF, JPEG, JPG, PNG)"
                                        fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                        component={FormUpload}
                                        validator={requiredValidator}
                                    />
                                </div>
                                <div className="patella-form__row">
                                    <Field
                                        id="pedigree_number"
                                        name="pedigree_number"
                                        label="№ родословной собаки"
                                        hint="Допускается ввод только цифр"
                                        maxLength="30"
                                        component={FormInput}
                                    />
                                    <button type="button" className="btn btn-primary" onClick={() => null}>Поиск</button>
                                    <Field
                                        id="dog_name"
                                        name="dog_name"
                                        label="Кличка собаки"
                                        component={FormInput}
                                    />
                                </div>
                            </div>
                            <div className="patella-form__content">
                                <h4 className="patella-form__title">Информация о платеже</h4>
                                <p>Приложите квитанцию об оплате заявки и заполните информацию о платеже.</p>
                                <div className="patella-form__row">
                                    <Field
                                        id="payment_document"
                                        name="payment_document"
                                        label="Квитанция об оплате (PDF, JPEG, JPG, PNG)"
                                        fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                        component={FormUpload}
                                        validator={requiredValidator}
                                    />
                                </div>
                                <div className="patella-form__row">
                                    <Field
                                        id="payment_date"
                                        name="payment_date"
                                        label="Дата оплаты"
                                        max={new Date()}
                                        component={FormDatePicker}
                                    />
                                    <Field
                                        id="payment_number"
                                        name="payment_number"
                                        label="Номер платежного документа"
                                        component={FormInput}
                                    />
                                    <Field
                                        id="payment_name"
                                        name="payment_name"
                                        label="ФИО плательщика"
                                        component={FormInput}
                                    />
                                </div>
                                <div className="patella-form__row">
                                    <Field
                                        id="comment"
                                        name="comment"
                                        label="Комментарий к заявке"
                                        component={FormEditorTextarea}
                                    />
                                </div>
                            </div>
                            <div className="patella-form__controls">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!formRenderProps.modified || !formRenderProps.valid}
                                >Отправить</button>
                            </div>
                        </FormElement>
                    }
                />
            </Card>
        </div>
    )
};

export default React.memo(PatellaForm);