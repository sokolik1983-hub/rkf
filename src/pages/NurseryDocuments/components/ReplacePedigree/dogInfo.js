import React, {useEffect, useState} from 'react';
import {reqText, numbersOnly} from "./config.js";
import {number,string,boolean} from "yup";
import { FormGroup, FormField } from "components/Form";
import { Request } from "utils/request";
import Alert from "components/Alert";
import Button from "components/Button";
import HideIf from "components/HideIf";
import FormFile from "./components/FormFile";

const validation = {
    stamp_code: string().required(reqText).matches(/^[A-Z]{3}$/, {message:'Введите 3 латинские буквы'}),
    stamp_number: numbersOnly().required(reqText),
    dog_name: string().required(reqText),
    breed_id: number().required(reqText).typeError(reqText),
}

const initial = {
    stamp_code: '',
    stamp_number: '',
    dog_name: '',
    breed_id: '',
}

const options = {
    breeds: {
        url: '/api/dog/Breed',
        mapping: data => data.filter(f => typeof f.id === 'number' && f.id !== 1).map(m => ({value: m.id, label:m.name})),
    },
    stampCodes: {
        url: nurseryId => '/api/nurseries/nurserystampcode/nursery?id=' + nurseryId,
        mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default)).map(m => ({value: m.stamp_code_id, label:m.stamp_code}))
    },
}

const component = ({formik, view, update, options, alias}) => {
    const [init, setInit] = useState(false);
    const [everkData, setEverkData] = useState(null);
    const [everkAlert, setEverkAlert] = useState(false);
    const {stampCodes} = options;
    useEffect(() => {
        if (!init && !formik.values.id) {
            setInit(true);
            let stamp = stampCodes[0];
            if (!!stamp) {
                formik.setFieldValue('stamp_code', stamp.label);
            }
        }
    }, []);
    const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));
    const getEverkData = (stamp_number, stamp_code) =>
        PromiseRequest(`/api/requests/PedigreeRequest/everk_dog_info?stamp_number=${stamp_number}&stamp_code=${stamp_code}`)
        .then(data => {
            if (!data.dog_name) throw ":(";
            formik.setFieldValue('dog_name', data.dog_name);
            /*Object.keys(data).forEach(k => {
                if (!data[k]) return;
                formik.setFieldValue(`${k}`, data[k]);
                !data[`${k}_lat`] && formik.setFieldValue(`${k}_lat`, transliterate(data[k]));
            });*/
            setEverkData(data);
            setEverkAlert(true);
        })
        .catch(e => setEverkAlert(true));
    const clearEverkData = () => {
        if (!everkData) return;
        //Object.keys(everkData).forEach(k => everkData[k] && formik.setFieldValue(`${k}`, ''));
        formik.setFieldValue('dog_name', '');
        formik.setFieldValue(`stamp_number`, '');
        setEverkData(null);
    }


    return <>
{everkAlert &&
            <Alert
                title={everkData ? "" : "Ошибка"}
                text={everkData ? "Данные подгружены из базы ВЕРК" : "Указанный код клейма не найден. Возможно, помет не был зарегистрирован. Если вы уверены в правильности заполнения данного поля - просим вас обратиться в кинологическую организацию, осуществлявшую регистрацию помета"}
                autoclose={!!everkData}
                okButton={!everkData}
                onOk={() => setEverkAlert(false)}
            />
        }

    <FormGroup inline>
                <FormField disabled={view || !!everkData} placeholder="XXX" fieldType="reactSelectCreatable" options={stampCodes} name={`stamp_code`} label={`Код клейма (<a href="/${alias}/documents/stamps/add">Добавить клеймо</a>)`} onChange={e => formik.setFieldValue(`stamp_code`, e.toUpperCase())}/>
                <FormField disabled={view || !!everkData} name={`stamp_number`} label='Номер клейма' placeholder="0000"/>
                <HideIf cond={!!everkData || view}>
                    <Button className="btn-primary" onClick={e => {
                        getEverkData(formik.values.stamp_number, formik.values.stamp_code);
                    }}>Поиск</Button>
                </HideIf>
                <HideIf cond={!everkData || update}>
                    <Button className="btn-red" onClick={e => clearEverkData()}>Очистить</Button>
                </HideIf>

        </FormGroup>
        <FormGroup inline>
            <FormField disabled={view} name={`breed_id`} label='Порода' options={options.breeds} fieldType="reactSelect" placeholder="Выберите..."/>
            <FormField disabled={view || !!everkData} name='dog_name' label='Кличка' />
        </FormGroup></>
}

const DogInfo = { component, validation, initial, options }

export default DogInfo

export { validation, component, initial }
