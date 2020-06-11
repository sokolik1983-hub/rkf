import React, { useState, useEffect } from "react";
import Container from "components/Layouts/Container";
import { editForm, defaultValues } from './config';
import Disclaimer from "components/Disclaimer";
import Loading from "components/Loading";
import { Form } from "components/Form";
import SubmitButton from "components/Form/SubmitButton";
import RenderFields from "./RenderFields";
import Alert from "components/Alert";
import Layout from "components/Layouts";
import { Request } from "utils/request";
import ls from 'local-storage';
import './styles.scss';

const NurseryEdit = () => {
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [streetTypes, setStreetTypes] = useState([]);
    const [houseTypes, setHouseTypes] = useState([]);
    const [flatTypes, setFlatTypes] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [working, setWorking] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));

    useEffect(() => {
        Promise.all([getInfo(), getAddresses()])
            .then(() => setLoaded(true))
            .catch(e => handleError(e));
    }, []);

    const getInfo = () => PromiseRequest('/api/nurseries/nursery/nursery_edit_information')
        .then(data => {
            if (data) {
                setInitialValues({
                    ...initialValues,
                    ...data
                });
            }
        });

    const getAddresses = () => PromiseRequest('/api/Address/all_address_types')
        .then(data => {
            if (data) {
                const { street_types, house_types, flat_types } = data;
                setStreetTypes(street_types.map(item => ({ value: item.id, label: item.name })));
                setHouseTypes(house_types.map(item => ({ value: item.id, label: item.name })));
                setFlatTypes(flat_types.map(item => ({ value: item.id, label: item.name })));
            }
        });

    const transformValues = values => {
        const newValues = { ...values };
        delete newValues.banner;
        delete newValues.logo;

        return newValues;
    };

    const handleSuccess = (data, { alias, logo_link }) => {

        setShowAlert({
            title: "Информация сохранена!",
            autoclose: 2,
            onOk: () => setShowAlert(false)
        });
        let updatedUserInfo = {
            ...ls.get('user_info'),
            alias,
            logo_link
        };
        ls.set('user_info', updatedUserInfo);
    };

    const handleError = e => {
        let errorText = e.response.data.errors
            ? Object.values(e.response.data.errors)
            : `${e.response.status} ${e.response.statusText}`;
        setShowAlert({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setShowAlert(false)
        });
    };

    return <Layout>
        <Container className="NurseryEdit content">
            <h2 className="NurseryEdit__page-heading">Редактирование профиля</h2>
            <Disclaimer>
                <a className="Disclaimer__support-link" href="https://help.rkf.online/ru/knowledge_base/art/54/cat/3/#/" target="_blank" rel="noopener noreferrer">
                    Инструкция по редактированию профиля
                    </a>
            </Disclaimer>
            {!loaded
                ? <Loading />
                : <Form
                    {...editForm}
                    initialValues={initialValues}
                    transformValues={transformValues}
                    onSuccess={handleSuccess}
                    onError={handleError}
                    className="NurseryEdit__form"
                    withLoading={true}
                >
                    <RenderFields
                        streetTypes={streetTypes}
                        houseTypes={houseTypes}
                        flatTypes={flatTypes}
                        working={working}
                        handleError={handleError}
                        setWorking={setWorking}
                    />

                    <div className={`NurseryEdit__submit${working ? ' working' : ''}`}>
                        <SubmitButton className="btn-primary">Сохранить</SubmitButton>
                    </div>
                </Form>
            }
            {showAlert && <Alert {...showAlert} />}
        </Container>
    </Layout>
};

export default NurseryEdit;