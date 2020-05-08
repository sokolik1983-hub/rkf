import React, { useState } from "react";
import Alert from "components/Alert";
import Button from "components/Button";
import { FormGroup, FormField } from "components/Form";
import DeleteButton from "../../components/DeleteButton";
import FormFile from "../../components/FormFile";
import HideIf from "components/HideIf";
import { connect, getIn } from "formik";
import { Request } from "utils/request";

const VerkParent = ({formik, update, view, declarant, i, who, whoRu, checkboxCaption, distinction, addDocument, everkData}) => {
    const [everk, setEverk] = useState(false);
    const [everkAlert, setEverkAlert] = useState(false);

    const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));
    const getEverk = who => {
        let rfc = getIn(formik.values, `${who}_pedigree_number`);
        rfc = rfc.split('-')[1] || rfc;
        if (!rfc) return;
        PromiseRequest(`/api/dog/Dog/everk_dog/${rfc}`)
        .then(data => data && (data.name || data.name_lat))
        .then(name => {
            if (!name) {
                throw new Error("name not set");
            }
            setEverk && setEverk(true);
            formik.setFieldValue(`${who}_name`, name);
        })
        .catch(x => setEverkAlert(true));
    }
    const clearEverk = who => {
        if (!setEverk) return;
        setEverk(false);
        formik.setFieldValue(`${who}_name`, '');
        formik.setFieldValue(`${who}_pedigree_number`, '');
    }
    const filledEverk = !!everkData && !!everkData[`${who}_pedigree_number`];
    filledEverk && everk && setEverk(false);
    if (filledEverk && getIn(formik.values, `${who}_foreign`)) {
        formik.setFieldValue(`${who}_foreign`, false);
        formik.setFieldValue(`${who}_pedigree_document`, '');
    }
    return <>
        {everkAlert &&
            <Alert
                title="Ошибка"
                text="Номер родословной не найден в базе ВЕРК. Если производитель иностранный, пожалуйста заполните поля вручную и прикрепите копию свидетельства о происхождении"
                autoclose={false}
                okButton={true}
                onOk={() => setEverkAlert(false)}
            />
        }
    <FormGroup inline>
                <FormField disabled={update || everk || filledEverk} name={`${who}_pedigree_number`} label={`Номер родословной ${whoRu}`}/>
                <HideIf cond={update || declarant[`${who}_foreign`] || everk || filledEverk}>
                    <Button style={{marginRight: '16px'}} className="btn-primary" onClick={e => getEverk(who)} disabled={everk}>Поиск</Button>
                </HideIf>
                <HideIf cond={update || !everk || filledEverk}>
                    <DeleteButton className="btn-red" onClick={e => clearEverk(who)} title={`Удалить данные ${whoRu}`}/> 
                </HideIf>
            <FormField
                style={{minWidth:'50%'}}
                disabled={update || !declarant[`${who}_foreign`]}
                name={`${who}_name`}
                label={`Кличка ${whoRu}`}
                placeholder={declarant[`${who}_foreign`] ? 'Введите кличку' : 'Кличка заполняется автоматически по номеру родословной'}
            />
            </FormGroup>
    <FormGroup inline>
            <HideIf cond={everk || filledEverk}>
                <FormField
                    disabled={update}
                    fieldType="customCheckbox"
                    name={`${who}_foreign`}
                    label={checkboxCaption}
                    onChange={e => {
                        formik.handleChange(e);
                        formik.setFieldValue(`${who}_pedigree_document`, '');
                        formik.setFieldValue(`${who}_name`, '');
                    }}
                />
                <HideIf cond={!getIn(formik.values, `${who}_foreign`)}>
                    <FormFile
                        name={`${who}_pedigree_document`}
                        label={`Копия родословной ${whoRu}`}
                        docId={declarant[`${who}_pedigree_document_id`]}
                        document_type_id={7}
                        disabled={update || !declarant[`${who}_foreign`]}
                        distinction={distinction}
                    />
                </HideIf>
            </HideIf>
            </FormGroup>
            </>}

export default connect(React.memo(VerkParent))
