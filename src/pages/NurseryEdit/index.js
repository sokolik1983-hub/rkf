import React, { useState, useEffect } from "react";
import ls from 'local-storage';
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Disclaimer from "../../components/Disclaimer";
import { Form } from "../../components/Form";
import SubmitButton from "../../components/Form/SubmitButton";
import RenderFields from "./RenderFields";
import Alert from "../../components/Alert";
import { Request } from "../../utils/request";
import { editForm, defaultValues } from './config';
import './styles.scss';


const NurseryEdit = ({ history }) => {
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
                if (data.contacts && data.contacts.length) {
                    data.contacts.map(item => {
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
        newValues.is_public = !newValues.is_public; // Backend workaround

        return newValues;
    };

    const handleSuccess = (data, { alias }) => {
        setShowAlert({
            title: "Информация сохранена!",
            autoclose: 2,
            onOk: () => setShowAlert(false)
        });
        let updatedUserInfo = {
            ...ls.get('user_info'),
            alias,
        };
        ls.set('user_info', updatedUserInfo);
        history.push(`/kennel/${alias}`);
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
        <Layout>
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
                            coOwner={{
                                lastName: initialValues.co_owner_last_name,
                                firstName: initialValues.co_owner_first_name,
                                secondName: initialValues.co_owner_second_name,
                                mail: initialValues.co_owner_mail
                            }}
                        />

                        <div className={`NurseryEdit__submit${working ? ' working' : ''}`}>
                            <SubmitButton className="btn-primary">Сохранить</SubmitButton>
                        </div>
                    </Form>
                }
                {showAlert && <Alert {...showAlert} />}
            </Container>
        </Layout>
    )
};

export default React.memo(NurseryEdit);