import React, {useEffect, useState} from "react";
import Layout from "../../../../components/Layouts";
import AuthLayout from "../../../../components/Layouts/AuthLayout";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
// import {Request} from "../../../../utils/request";
import {connectAuthVisible} from "../../../Login/connectors";


const ConfirmIndividualRegistration = ({history, location, isAuthenticated}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alias = '';

        if(location.search && location.search.includes('?alias=')) {
            alias = location.search.split('=')[1];
        } else {
            history.replace('/');
        }

        console.log('alias', alias);

        // (() => Request({
        //     url: ``
        // }, data => {
        //
        // }, error => {
        //
        // }))();

        setLoading(false);
    }, []);

    if(isAuthenticated) history.replace('/');

    return loading ?
        <Loading/> :
        <Layout>
            <AuthLayout className="login-page">
                <Card>
                    <h1 className="registration-page__title">Регистрация</h1>
                    <p></p>
                </Card>
            </AuthLayout>
        </Layout>
};

export default connectAuthVisible(React.memo(ConfirmIndividualRegistration));