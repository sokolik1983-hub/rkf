import React, {useState, useEffect} from 'react';
import ls from 'local-storage';
import Loading from '../../components/Loading';
import Layout from '../../components/Layouts';
import Container from '../../components/Layouts/Container';
import {Form} from '../../components/Form';
import RenderFields from './RenderFields';
import Alert from '../../components/Alert';
import {Request} from '../../utils/request';
import {editForm, defaultValues} from './config';
import UserHeader from './components/UserHeader';
import CopyrightInfo from '../../components/CopyrightInfo';
import StickyBox from 'react-sticky-box';
import useIsMobile from '../../utils/useIsMobile';
import UserMenu from '../../components/Layouts/UserMenu';
import {endpointGetNurseryInfo, kennelNav} from '../../components/Layouts/NurseryLayout/config';
import {Redirect} from 'react-router-dom';
import ClickGuard from '../../components/ClickGuard';
import BreedsList from '../../components/BreedsList';
import {connectAuthVisible} from '../Login/connectors';
import {connectShowFilters} from '../../components/Layouts/connectors';
import randomKeyGenerator from '../../utils/randomKeyGenerator'

import './styles.scss';


let unblock;

const NurseryEdit = ({
                         history,
                         profile_id,
                         is_active_profile,
                         isAuthenticated,
                         isOpenFilters,
                         setShowFilters,
                         match,
                     }) => {
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [nursery, setNursery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [streetTypes, setStreetTypes] = useState([]);
    const [houseTypes, setHouseTypes] = useState([]);
    const [flatTypes, setFlatTypes] = useState([]);
    const [working, setWorking] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const PromiseRequest = url => new Promise((res, rej) => Request({url}, res, rej));
    const isMobile = useIsMobile(1080);
    const alias = match.params.id;

    useEffect(() => {
        unblock = is_active_profile ? history.block('Вы точно хотите уйти со страницы редактирования?') : history.block();
        return () => unblock();
    }, []);

    useEffect(() => {
        Promise.all([getInfo(), getAddresses()])
            .then(() => setLoading(true))
            .catch(e => handleError(e));
    }, []);

    useEffect(() => {
        (() => Request({
            url: endpointGetNurseryInfo + alias
        }, data => {
            if (data.user_type !== 4) {
                history.replace(`/club/${alias}`);
            } else {
                const legal_address = data.legal_address ? getAddressString(data.legal_address) : '';
                const address = data.fact_address ? getAddressString(data.fact_address) : legal_address;
                const city_name = data.fact_address ? data.fact_address.city_name : data.legal_address ? data.legal_address.city_name : '';

                setNursery({...data, legal_address, address, city: {name: city_name}});
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            setError(error.response);
            setLoading(false);
        }))();
    }, [alias]);

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
                const {street_types, house_types, flat_types} = data;
                setStreetTypes(street_types.map(item => ({value: item.id, label: item.name})));
                setHouseTypes(house_types.map(item => ({value: item.id, label: item.name})));
                setFlatTypes(flat_types.map(item => ({value: item.id, label: item.name})));
            }
        });

    const getAddressString = addressObj => {
        let address = '';
        if (addressObj.postcode) address += `${addressObj.postcode}, `;
        if (addressObj.city_name) address += `${addressObj.city_name}, `;
        if (addressObj.street_type_name && addressObj.street_name) address += `${addressObj.street_type_name} ${addressObj.street_name}, `;
        if (addressObj.house_type_name && addressObj.house_name) address += `${addressObj.house_type_name} ${addressObj.house_name}, `;
        if (addressObj.flat_type_name && addressObj.flat_name) address += `${addressObj.flat_type_name} ${addressObj.flat_name}`;
        return address;
    };

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


    return (loading
        ? <Loading/>
        : error ?
            <Redirect to="404"/> :
            <Layout withFilters setNotificationsLength={setNotificationsLength}>
                <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
                <div className="NurseryEdit__wrap">
                    <Container className="NurseryEdit content">
                        <aside className="NurseryEdit__left">
                            <StickyBox offsetTop={60}>
                                <UserHeader
                                    user="nursery"
                                    logo={nursery.logo_link}
                                    name={nursery.name || "Имя отсутствует"}
                                    alias={alias}
                                    profileId={nursery.id}
                                    federationName={nursery.federation_name}
                                    federationAlias={nursery.federation_alias}
                                    canEdit={canEdit}
                                    isAuthenticated={isAuthenticated}
                                />
                                {nursery.breeds && !!nursery.breeds.length &&
                                    <BreedsList breeds={nursery.breeds}/>
                                }
                                {!isMobile && <UserMenu userNav={canEdit
                                    ? kennelNav(alias)
                                    : kennelNav(alias).filter(i => i.id !== 2)}
                                                        notificationsLength={notificationsLength}
                                />}
                                <CopyrightInfo withSocials={true}/>
                            </StickyBox>
                        </aside>
                        <div className="NurseryEdit__right">
                            {loading
                                ? <Loading/>
                                : <Form
                                    {...editForm}
                                    initialValues={initialValues}
                                    transformValues={transformValues}
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                    className="NurseryEdit__form"
                                    withLoading={false}
                                >
                                    <RenderFields
                                        success={success}
                                        setSuccess={setSuccess}
                                        isOpenFilters={isOpenFilters}
                                        setShowFilters={setShowFilters}
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
                                        randomKeyGenerator={randomKeyGenerator}
                                    />
                                </Form>
                            }
                            {showAlert && <Alert {...showAlert} />}
                        </div>
                    </Container>
                </div>
            </Layout>
    );
};

export default React.memo(connectShowFilters(connectAuthVisible(NurseryEdit)));