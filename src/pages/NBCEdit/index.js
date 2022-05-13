import React, {useEffect, useState} from "react";
import NBCLayout from "../../components/Layouts/NBCLayout";
import AuthOrLogin from "../Login/components/AuthOrLogin";
import {defaultValues, editForm} from "./config";
import {Request} from "../../utils/request";
import ls from "local-storage";
import Loading from "../../components/Loading";
import {Form} from "../../components/Form";
import RenderFields from "./RenderFields";
import randomKeyGenerator from "../../utils/randomKeyGenerator";
import Alert from "../../components/Alert";
import ClickGuard from "../../components/ClickGuard";

import "./styles.scss"

const Content = ({
                     isOpenFilters,
                     setShowFilters,
                 }) => {

    const [initialValues, setInitialValues] = useState(defaultValues);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const PromiseRequest = url => new Promise((res, rej) => Request({url}, res, rej));

    const getInfo = () => PromiseRequest('/api/NationalBreedClub/edit_info')
        .then(data => {
            setLoading(false)
            if (data) {
                if (data.phones && data.phones.length) {
                    data.phones.map(item => {
                        if (item.contact_type_id === 1 && !/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/.test(item.value)) {
                            const valueArr = item.value.split(' ');
                            item.value = '+' + valueArr[0] + valueArr[1].slice(0, 6) + '-' + valueArr[1].slice(-2);
                        }
                        return item;
                    });
                }
                data.is_public = !data.is_public; // Backend workaround
                setInitialValues({
                    ...initialValues,
                    ...data
                });
            }
        });

    useEffect(() => {
        getInfo();
    }, [])

    const transformValues = values => {
        const newValues = {...values};
        delete newValues.banner;
        delete newValues.logo;
        newValues.is_public = !newValues.is_public; // Backend workaround

        return newValues;
    };

    const handleSuccess = (data, {alias, name}) => {
        setSuccess(true);
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
        let updatedUserInfo = {
            ...ls.get('user_info'),
            alias,
            name
        };
        ls.set('user_info', updatedUserInfo);
        setShowAlert({
            title: 'Сохранение данных',
            text: 'Данные сохранены!',
            autoclose: 2.5,
            onOk: () => setShowAlert(false)
        });
    };

    const handleError = e => {
        if (e.response) {
            let errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
            setShowAlert({
                title: `Ошибка: ${errorText}`,
                text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
                autoclose: 7.5,
                onOk: () => setShowAlert(false)
            });
        }
    };

    return (
        <AuthOrLogin>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
            <div className="nursery-edit__right">
                {loading
                    ? <Loading/>
                    : <Form
                        {...editForm}
                        initialValues={initialValues}
                        transformValues={transformValues}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        className="nursery-edit__form"
                        withLoading={false}
                    >
                        <RenderFields
                            isOpenFilters={isOpenFilters}
                            setShowFilters={setShowFilters}
                            handleError={handleError}
                            randomKeyGenerator={randomKeyGenerator}
                        />
                    </Form>
                }
                {showAlert && <Alert {...showAlert} />}
            </div>
        </AuthOrLogin>
    );
};

const NBCEdit = (props) => {
    return (
        <NBCLayout {...props}>
            <Content />
        </NBCLayout>
    )
};

export default NBCEdit;