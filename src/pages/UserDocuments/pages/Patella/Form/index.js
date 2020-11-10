import React, {useState} from "react";
import {Link} from "react-router-dom";
import ls from "local-storage";
import {Form, Field, FormElement} from "@progress/kendo-react-form";
import Card from "../../../../../components/Card";
import FormInput from "../../../../../components/kendo/Form/FormInput";
import FormUpload from "../../../../../components/kendo/Form/FormUpload";
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

    return (
        <div className="patella-form">
            <Card>
                <div className="user-documents__breadcrumbs">
                    <Link to={`/user/${alias}/documents`} className="user-documents__breadcrumbs-link">Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Сертификат клинической оценки коленных суставов (PL) (Пателла)</span>
                </div>
                <Form
                    onSubmit={() => null}
                    initialValues={initialValues}
                    render={formRenderProps =>
                        <FormElement>
                            <h4 className="patella-form__title">Добавление заявки</h4>
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
                                    formatFiles={['.pdf', '.jpg', '.jpeg', '.png']}
                                    component={FormUpload}
                                />
                            </div>
                        </FormElement>
                    }
                />
            </Card>
        </div>
    )
};

export default React.memo(PatellaForm);