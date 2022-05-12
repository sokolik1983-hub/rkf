import React, {useEffect, useState} from "react";
import {NavLink, Redirect, useParams} from "react-router-dom";
import Container from "../../components/Layouts/Container";
import NBCLayout from "../../components/Layouts/NBCLayout";
import AuthOrLogin from "../Login/components/AuthOrLogin";

import "./styles.scss"
import {defaultValues, editForm} from "./config";
import {Request} from "../../utils/request";
import useIsMobile from "../../utils/useIsMobile";
import {endpointGetNurseryInfo} from "../../components/Layouts/NurseryLayout/config";
import ls from "local-storage";
import Loading from "../../components/Loading";
import {Form} from "../../components/Form";
import RenderFields from "./RenderFields";
import randomKeyGenerator from "../../utils/randomKeyGenerator";
import Alert from "../../components/Alert";
import ClickGuard from "../../components/ClickGuard";



let unblock;

const Content = ({
                     history,
                     profile_id,
                     isAuthenticated,
                     isOpenFilters,
                     setShowFilters,
                     match,
                 }) => {

    const [initialValues, setInitialValues] = useState(defaultValues);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const PromiseRequest = url => new Promise((res, rej) => Request({url}, res, rej));
    const isMobile = useIsMobile(1080);
    // const alias = match.params.id;

    // useEffect(() => {
    //     unblock = is_active_profile ? history.block('Вы точно хотите уйти со страницы редактирования?') : history.block();
    //     return () => unblock();
    // }, []);

    // useEffect(() => {
    //     Promise.all([getInfo()])
    //         .then(() => setLoading(true))
    //         .catch(e => handleError(e));
    // }, []);

    // useEffect(() => {
    //     (() => Request({
    //         url: endpointGetNurseryInfo + alias
    //     }, data => {
    //         if (data.user_type !== 4) {
    //             history.replace(`/club/${alias}`);
    //         } else {
    //             const legal_address = data.legal_address ? getAddressString(data.legal_address) : '';
    //             const address = data.fact_address ? getAddressString(data.fact_address) : legal_address;
    //             const city_name = data.fact_address ? data.fact_address.city_name : data.legal_address ? data.legal_address.city_name : '';
    //
    //             setNursery({...data, legal_address, address, city: {name: city_name}});
    //             setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
    //             setLoading(false);
    //         }
    //     }, error => {
    //         setError(error.response);
    //         setLoading(false);
    //     }))();
    // }, [alias]);

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

    // const getAddresses = () => PromiseRequest('/api/Address/all_address_types')
    //     .then(data => {
    //         if (data) {
    //             const {street_types, house_types, flat_types} = data;
    //             setStreetTypes(street_types.map(item => ({value: item.id, label: item.name})));
    //             setHouseTypes(house_types.map(item => ({value: item.id, label: item.name})));
    //             setFlatTypes(flat_types.map(item => ({value: item.id, label: item.name})));
    //         }
    //     });

    // const getAddressString = addressObj => {
    //     let address = '';
    //     if (addressObj.postcode) address += `${addressObj.postcode}, `;
    //     if (addressObj.city_name) address += `${addressObj.city_name}, `;
    //     if (addressObj.street_type_name && addressObj.street_name) address += `${addressObj.street_type_name} ${addressObj.street_name}, `;
    //     if (addressObj.house_type_name && addressObj.house_name) address += `${addressObj.house_type_name} ${addressObj.house_name}, `;
    //     if (addressObj.flat_type_name && addressObj.flat_name) address += `${addressObj.flat_type_name} ${addressObj.flat_name}`;
    //     return address;
    // };

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